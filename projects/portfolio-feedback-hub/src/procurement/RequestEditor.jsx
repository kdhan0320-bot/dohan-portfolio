import { useEffect, useRef, useState } from 'react';
import { Link, useBlocker, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useWorkspace } from './Workspace';
import { amount, canEdit, emptyRequest, makeDemoDraft, money } from './model';
import { stock, incoming, qty, duplicateRequests, validateCatalogRequest, comparisonLines } from './inventory';
import Icon from './Icons';
import RevisionChanges from './RevisionChanges';
import RecordPreview, { ComparisonQuantities } from './RecordPreview';
import { PageHead, FormError, DateInput } from './UI';
import { MaterialForm, VendorForm } from './CatalogForms';
import { listOrigin } from './listNavigation';

const SAMPLE = '품목: 포토센서\n규격: 확산 반사형 · NPN · DC 24V\n수량: 2EA\n단가: 48,000원\n거래처: 한결센서 (가상)\n사유: 포장 라인 센서 교체';
const blankItem = () => ({ materialId: '', name: '', spec: '', unit: 'EA', quantity: '', price: '' });
function Field({ name, label, errors, children, action }) { return <div className="field"><div className="field-label-row"><label htmlFor={name}>{label}</label>{action}</div>{children}{errors[name] && <small id={`${name}-error`} className="field-error">{errors[name]}</small>}</div>; }
export default function RequestEditor() {
  const { id } = useParams(), location = useLocation();
  return <Editor key={id || `new-${location.search}`} id={id}/>;
}
function Editor({ id }) {
  const { data, requests, materials, vendors, role, save, act, setNotice } = useWorkspace();
  const location = useLocation(), navigate = useNavigate();
  const returnList = listOrigin(location.state?.listOrigin, '/requests');
  const existing = id ? requests.find(r => r.id === id) : null;
  const [form, setForm] = useState(() => {
    if (existing) return structuredClone(existing);
    const fresh = emptyRequest(), selected = materials.find(m => m.id === new URLSearchParams(location.search).get('material'));
    if (!selected) return fresh;
    const vendor = vendors.find(v => v.id === selected.vendorId);
    return { ...fresh, title: `${selected.name} 구매 품의`, supplierId: vendor?.id || '', supplier: vendor?.name || '', items: [{ ...blankItem(), materialId: selected.id, name: selected.name, spec: selected.spec, quantity: 1, price: selected.price }] };
  });
  const [errors, setErrors] = useState({}), [feedback, setFeedback] = useState(''), [dirty, setDirty] = useState(false);
  const [preview, setPreview] = useState(null), [catalog, setCatalog] = useState(null);
  const [confirmed, setConfirmed] = useState(false), [checkedDuplicate, setCheckedDuplicate] = useState(false);
  const [sourceOpen, setSourceOpen] = useState(false), [confirmDraft, setConfirmDraft] = useState(false), [extracted, setExtracted] = useState(false);
  const formRef = useRef(null), allowNavigation = useRef(false), dialogRef = useRef(null);
  const duplicates = duplicateRequests(data, { ...form, id });
  const allowed = role === 'staff' && (!id || (existing && canEdit(existing, role)));
  const blocker = useBlocker(({ currentLocation, nextLocation }) => dirty && !allowNavigation.current && (currentLocation.pathname !== nextLocation.pathname || currentLocation.search !== nextLocation.search));
  const leaving = blocker.state === 'blocked';
  const cancelDialog = () => { setConfirmDraft(false); if (leaving) blocker.reset(); };
  useEffect(() => {
    if (!dirty) return;
    const handle = e => { e.preventDefault(); e.returnValue = ''; };
    window.addEventListener('beforeunload', handle);
    return () => window.removeEventListener('beforeunload', handle);
  }, [dirty]);
  useEffect(() => {
    if (!confirmDraft && !leaving) return;
    const previous = document.activeElement, dialog = dialogRef.current;
    dialog.showModal();
    return () => { dialog.close(); previous?.focus(); };
  }, [confirmDraft, leaving]);
  const change = fields => { setForm(old => ({ ...old, ...fields })); setDirty(true); setConfirmed(false); setCheckedDuplicate(false); setErrors({}); setFeedback(''); };
  const itemChange = (index, fields) => change({ items: form.items.map((item, i) => i === index ? { ...item, ...fields } : item) });
  const selectMaterial = (index, materialId, registered, registeredVendor) => {
    const m = registered || materials.find(v => v.id === materialId);
    const nextItems = form.items.map((item, i) => i === index ? m ? { ...blankItem(), materialId: m.id, name: m.name, spec: m.spec, quantity: item.quantity || 1, price: m.price } : blankItem() : item);
    const v = registeredVendor || vendors.find(v => v.id === m?.vendorId);
    change({ items: nextItems, ...(!form.title && m ? { title: `${m.name} 구매 품의` } : {}), ...(!form.supplierId && v ? { supplierId: v.id, supplier: v.name } : {}) });
  };
  const generate = () => {
    const parsed = makeDemoDraft(form.source);
    const norm = value => value.trim().replace(/\s/g, '').toLowerCase();
    const m = materials.find(m => norm(m.name) === norm(parsed.items[0].name) && norm(m.spec) === norm(parsed.items[0].spec));
    const v = vendors.find(v => norm(v.name) === norm(parsed.supplier));
    change({ ...parsed, department: form.department, supplierId: v?.id || '', supplier: v?.name || parsed.supplier, items: [{ ...parsed.items[0], materialId: m?.id || '', unit: 'EA' }] });
    setExtracted(true); setSourceOpen(false); setConfirmDraft(false);
    requestAnimationFrame(() => document.getElementById('item-0-material')?.focus());
  };
  const attrs = name => ({ id: name, 'aria-required': true, 'aria-invalid': Boolean(errors[name]), 'aria-describedby': errors[name] ? `${name}-error` : undefined });
  const persist = submit => {
    if (!allowed) return;
    if (submit) {
      const nextErrors = validateCatalogRequest(data, form);
      if (!confirmed) nextErrors.confirmed = '요청 내용과 금액을 직접 확인해 주세요.';
      if (duplicates.length && !checkedDuplicate) nextErrors.duplicate = '진행 중인 구매·미입고 내역을 비교해 주세요.';
      setErrors(nextErrors);
      if (Object.keys(nextErrors).length) { setFeedback('필수 정보와 확인 항목을 살펴봐 주세요.'); requestAnimationFrame(() => formRef.current?.querySelector('[aria-invalid="true"]')?.focus()); return; }
    }
    try {
      const record = save(form, id);
      if (submit) act(record.id, 'submit');
      allowNavigation.current = true; setDirty(false);
      setNotice(submit ? '팀장 결재를 요청했습니다.' : '작성 중인 품의를 저장했습니다.');
      navigate(`/requests/${record.id}`, { state: location.state });
    } catch (e) { setFeedback(e.message); }
  };
  const saveAndLeave = () => {
    try { save(form, id); allowNavigation.current = true; setDirty(false); setNotice('품의를 임시 저장했습니다.'); blocker.proceed(); }
    catch (e) { setFeedback(e.message); }
  };
  const dialog = (confirmDraft || leaving) && <dialog ref={dialogRef} className="dialog" aria-labelledby="editor-dialog-title" onCancel={e => { e.preventDefault(); cancelDialog(); }}><div className="dialog-head"><h2 id="editor-dialog-title">{confirmDraft ? '입력 내용을 초안으로 바꿀까요?' : '작성 내용을 저장할까요?'}</h2></div><p>{confirmDraft ? '원문에 없는 값은 비워집니다. 등록된 자재·업체와 일치하지 않으면 직접 선택해야 합니다.' : '작성 중인 내용을 저장한 뒤 이동할 수 있습니다.'}</p><div className="dialog-actions"><button className="button secondary" onClick={cancelDialog}>계속 작성</button><button className={confirmDraft ? "button primary" : "button secondary"} onClick={() => { if (confirmDraft) generate(); else { allowNavigation.current = true; setDirty(false); blocker.proceed(); } }}>{confirmDraft ? '초안으로 바꾸기' : '저장하지 않고 이동'}</button>{leaving && <button type="button" className="button primary" onClick={saveAndLeave}>저장 후 이동</button>}</div>{leaving && <FormError>{feedback}</FormError>}</dialog>;
  if (!allowed) return <><PageHead title={id && !existing ? '품의를 찾을 수 없습니다.' : '구매·자재 담당자가 작성하는 품의서입니다.'}>상단 시연 역할을 확인해 주세요. 작성 중인 내용은 이 화면에 유지됩니다.</PageHead><Link className="button secondary" to={existing ? `/requests/${id}` : '/requests'}>품의 확인</Link>{dialog}</>;
  return <div className="request-editor-page"><Link className="back-link" to={id ? `/requests/${id}` : returnList.path} state={id ? location.state : { restoreList: returnList }}><Icon name="back" size={17}/>{id ? '요청 상세로' : '구매·결재 목록'}</Link><PageHead eyebrow={existing ? `${existing.id} / ${existing.revision}차 작성 중` : 'PURCHASE REQUISITION'} title={existing?.status === 'revision' ? '구매 품의 보완' : existing ? '구매 품의 수정' : '구매 품의 작성'} action={<span className="draft-indicator"><span className="status-dot"/>{dirty ? '저장하지 않은 변경' : '작성 중'}</span>}/>
    {existing?.status === 'revision' && <div className="reason-banner"><Icon name="info"/><div><strong>보완할 내용</strong><p>{existing.reason}</p></div></div>}
    <details className="panel source-optional" open={sourceOpen} onToggle={e => setSourceOpen(e.currentTarget.open)}><summary><span><Icon name="spark" size={17}/>메일·메모로 초안 만들기 <small>선택 · 시연</small></span><span>{sourceOpen ? '접기' : '열기'}</span></summary><div className="panel-body"><button className="text-button" onClick={() => change({ source: SAMPLE })}>샘플 원문 불러오기</button><label className="field">요청 원문<textarea rows="4" value={form.source} maxLength="4000" onChange={e => change({ source: e.target.value })}/></label><button className="button secondary" disabled={!form.source.trim()} onClick={() => form.title || form.items.some(i => i.name) ? setConfirmDraft(true) : generate()}>원문으로 초안 만들기</button><p className="ai-disclosure">명시된 한 품목의 값만 읽습니다. 실제 AI 연결 없음.</p></div></details>
    <form id="purchase-request-form" className="request-form catalog-request-form" ref={formRef} noValidate onSubmit={e => { e.preventDefault(); persist(true); }}>
      <section className="panel"><div className="panel-head"><h2>구매 자재</h2><span className="muted">단위 EA · 부가세 포함</span></div>{extracted && <div className="draft-review">초안의 자재·업체·금액과 빈 항목을 확인해 주세요.</div>}<div className="panel-body item-editor-body">{form.items.map((item, index) => <fieldset className="item-editor" key={index}><legend>자재 {String(index + 1).padStart(2, '0')}</legend>{form.items.length > 1 && <button type="button" className="text-button remove-item" onClick={() => change({ items: form.items.filter((_, i) => i !== index) })}>자재 {index + 1} 삭제</button>}<Field name={`item-${index}-material`} label="등록 자재" errors={errors} action={<button type="button" className="text-button" onClick={() => setCatalog({ type: 'material', index })}>새 자재 등록</button>}><select {...attrs(`item-${index}-material`)} value={item.materialId || ''} onChange={e => selectMaterial(index, e.target.value)}><option value="">자재 선택</option>{materials.map(m => <option key={m.id} value={m.id}>{m.code} · {m.name} · {m.spec}</option>)}</select></Field>{item.materialId && <div className="selected-material"><span>{item.spec}</span><button type="button" className="text-button" onClick={() => setPreview({ type: 'material', id: item.materialId })}>보유 {qty(stock(data, item.materialId))} · 미입고 {qty(incoming(data, item.materialId))}</button></div>}<div className="form-grid"><Field name={`item-${index}-quantity`} label="구매 수량 (EA)" errors={errors}><input {...attrs(`item-${index}-quantity`)} type="number" inputMode="numeric" min="1" max="10000" value={item.quantity} onChange={e => itemChange(index, { quantity: e.target.value })}/></Field><Field name={`item-${index}-price`} label="단가 (원)" errors={errors}><input {...attrs(`item-${index}-price`)} type="number" inputMode="numeric" min="1" max="100000000" value={item.price} onChange={e => itemChange(index, { price: e.target.value })}/></Field></div><div className="item-subtotal">자재 금액 <strong>{money(Number(item.quantity || 0) * Number(item.price || 0))}</strong></div></fieldset>)}<div className="item-tools"><button type="button" className="button secondary" onClick={() => change({ items: [...form.items, blankItem()] })}><Icon name="plus" size={16}/>품목 추가</button></div><div className="total-line"><span>품의 합계</span><strong>{money(amount(form))}</strong></div></div></section>
      <section className="panel"><div className="panel-head"><h2>품의 정보</h2><span className="muted">모든 항목 필수</span></div><div className="panel-body"><div className="form-grid"><div className="full"><Field name="title" label="품의 제목" errors={errors}><input {...attrs('title')} maxLength="100" value={form.title} onChange={e => change({ title: e.target.value })} placeholder="예: 포장 라인 포토센서 교체"/></Field></div><Field name="department" label="요청 부서" errors={errors}><input {...attrs('department')} maxLength="50" value={form.department} onChange={e => change({ department: e.target.value })}/></Field><Field name="needBy" label="희망 납기일" errors={errors}><DateInput {...attrs('needBy')} label="희망 납기일" value={form.needBy} onChange={e => change({ needBy: e.target.value })}/></Field><div className="full"><Field name="supplier" label="구매 업체" errors={errors} action={<button type="button" className="text-button" onClick={() => setCatalog({ type: 'vendor' })}>새 업체 등록</button>}><select {...attrs('supplier')} value={form.supplierId || ''} onChange={e => change({ supplierId: e.target.value, supplier: vendors.find(v => v.id === e.target.value)?.name || '' })}><option value="">업체 선택</option>{vendors.map(v => <option key={v.id} value={v.id}>{v.name}</option>)}</select></Field></div><div className="full"><Field name="purpose" label="구매 사유" errors={errors}><textarea {...attrs('purpose')} rows="2" maxLength="800" value={form.purpose} onChange={e => change({ purpose: e.target.value })} placeholder="사용할 설비·교체 이유 등을 입력해 주세요."/></Field></div></div></div></section>
      {existing && <RevisionChanges request={form}/>}
      {duplicates.length > 0 && <section className="duplicate-note"><Icon name="info"/><div><h3>같은 자재의 진행 중인 구매 {duplicates.length}건</h3>{duplicates.map(r => <details key={r.id}><summary>{r.id} · {r.title}</summary><div className="duplicate-quantities">{comparisonLines(data, r, form.items.map(i => i.materialId)).map(item => <div key={item.index}><strong>{item.name}</strong><ComparisonQuantities item={item} ordered={r.status === 'ordered'}/></div>)}</div><button type="button" className="text-button" onClick={() => setPreview({ type: 'request', id: r.id })}>내역 비교</button></details>)}<label className="checkbox-line"><input type="checkbox" checked={checkedDuplicate} aria-invalid={Boolean(errors.duplicate)} onChange={e => setCheckedDuplicate(e.target.checked)}/><span>진행 중인 구매·미입고 내역을 비교했습니다.</span></label>{errors.duplicate && <small className="field-error">{errors.duplicate}</small>}</div></section>}
      <section className="submit-panel"><label className="checkbox-line"><input type="checkbox" checked={confirmed} aria-invalid={Boolean(errors.confirmed)} onChange={e => setConfirmed(e.target.checked)}/><span>자재·수량·업체·금액을 확인했습니다.</span></label>{errors.confirmed && <small className="field-error">{errors.confirmed}</small>}<p>제출 후 팀장 → 사장님 순서로 결재합니다.</p>{Object.keys(errors).length ? <p className="form-error" role="status">{feedback}</p> : <FormError>{feedback}</FormError>}<p className="cancel-writing"><Link to={id ? `/requests/${id}` : returnList.path} state={id ? location.state : { restoreList: returnList }}>작성 취소</Link></p></section>
    </form><div className="editor-actionbar"><div className="actionbar-total"><span>품의 합계</span><strong>{money(amount(form))}</strong></div><button className="button secondary" type="button" onClick={() => persist(false)}>임시 저장</button><button className="button primary" form="purchase-request-form" type="submit">팀장 결재 요청</button></div>{dialog}{preview && <RecordPreview record={preview} materialIds={form.items.map(i => i.materialId)} onClose={() => setPreview(null)}/>}
    {catalog?.type === 'material' && <MaterialForm defaultVendorId={form.supplierId} onClose={() => setCatalog(null)} onSaved={(material, vendor) => selectMaterial(catalog.index, material.id, material, vendor)}/>}
    {catalog?.type === 'vendor' && <VendorForm onClose={() => setCatalog(null)} onSaved={vendor => change({ supplierId: vendor.id, supplier: vendor.name })}/>}
  </div>;
}
