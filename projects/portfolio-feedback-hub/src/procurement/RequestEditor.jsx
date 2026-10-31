import { useEffect, useRef, useState } from 'react';
import { Link, useBlocker, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useWorkspace } from './Workspace';
import { SAMPLE_SOURCE, amount, canEdit, emptyRequest, makeDemoDraft, money, similarRequests, validate } from './model';
import Icon from './Icons';
import RevisionChanges from './RevisionChanges';

function Field({ name, label, errors, children, hint }) {
  return <div className="field"><label htmlFor={name}>{label}<span className="required">필수</span>{hint && <span className={`field-origin ${hint.tone}`} id={`${name}-origin`}>{hint.text}</span>}</label>{children}{errors[name] && <small id={`${name}-error`} className="field-error">{errors[name]}</small>}</div>;
}

export default function RequestEditor() {
  const { id } = useParams();
  return <Editor key={id || 'new'} id={id}/>;
}
function Editor({ id }) {
  const { requests, role, save, act, setNotice } = useWorkspace();
  const existing = id ? requests.find(r => r.id === id) : null;
  const [form, setForm] = useState(() => existing ? structuredClone(existing) : emptyRequest());
  const [errors, setErrors] = useState({});
  const [feedback, setFeedback] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [confirmDraft, setConfirmDraft] = useState(false);
  const [checkedDuplicate, setCheckedDuplicate] = useState(false);
  const [sourceOpen, setSourceOpen] = useState(!existing);
  const [extracted, setExtracted] = useState(null);
  const formRef = useRef(null);
  const allowNavigation = useRef(false);
  const dialogRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const duplicates = similarRequests({ ...form, id }, requests);
  const allowed = role === 'staff' && (!id || (existing && canEdit(existing, role)));
  const blocker = useBlocker(({ currentLocation, nextLocation }) => dirty && !allowNavigation.current && currentLocation.pathname !== nextLocation.pathname);
  const leaving = blocker.state === 'blocked';
  const cancelDialog = () => { setConfirmDraft(false); if (blocker.state === 'blocked') blocker.reset(); };
  useEffect(() => {
    if (!dirty) return;
    const beforeUnload = e => { e.preventDefault(); e.returnValue = ''; };
    window.addEventListener('beforeunload', beforeUnload);
    return () => { window.removeEventListener('beforeunload', beforeUnload); };
  }, [dirty]);
  useEffect(() => {
    if (!confirmDraft && !leaving) return;
    const previous = document.activeElement;
    const dialog = dialogRef.current;
    dialog.showModal();
    return () => { dialog.close(); previous?.focus(); };
  }, [confirmDraft, leaving]);
  const update = (key, value) => { setForm(old => ({ ...old, [key]: value })); setDirty(true); setConfirmed(false); setCheckedDuplicate(false); setFeedback(''); setErrors(old => Object.fromEntries(Object.entries(old).filter(([field]) => field !== key && !(key === 'items' && field.startsWith('item-'))))); };
  const updateItem = (index, key, value) => update('items', form.items.map((item, i) => i === index ? { ...item, [key]: value } : item));
  const generate = () => {
    if (!form.source.trim()) { setFeedback('먼저 요청 원문을 입력해 주세요.'); return; }
    const draft = makeDemoDraft(form.source);
    setForm(old => ({ ...old, ...draft, department: old.department, needBy: draft.needBy || old.needBy }));
    setExtracted(draft);
    setSourceOpen(false);
    setConfirmed(false); setCheckedDuplicate(false); setDirty(true); setConfirmDraft(false); setErrors({});
    setFeedback('원문에 명시된 값만 읽었습니다. 비어 있는 값과 읽은 내용을 직접 확인해 주세요.');
    setNotice('초안을 만들었습니다. 원문에 없는 값은 직접 입력하고 전체 내용을 확인해 주세요.');
    requestAnimationFrame(() => {
      document.getElementById('request-fields')?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
      document.getElementById('title')?.focus({ preventScroll: true });
    });
  };
  const persist = submit => {
    if (!allowed) return;
    if (submit) {
      const nextErrors = validate(form);
      if (!confirmed) nextErrors.confirmed = '요청 내용과 금액을 직접 확인해 주세요.';
      if (duplicates.length && !checkedDuplicate) nextErrors.duplicate = '같은 품목의 요청을 비교하고 확인해 주세요.';
      setErrors(nextErrors);
      if (Object.keys(nextErrors).length) {
        setFeedback('필수 정보와 확인 항목을 살펴봐 주세요.');
        requestAnimationFrame(() => formRef.current?.querySelector('[aria-invalid="true"]')?.focus());
        return;
      }
    }
    try {
      const record = save(form, id);
      if (submit) act(record.id, 'submit');
      allowNavigation.current = true;
      setDirty(false);
      setNotice(submit ? '팀장 결재를 요청했습니다. 시연 역할을 팀장으로 바꾸면 이어서 확인할 수 있습니다.' : '작성 중인 요청을 이 브라우저에 저장했습니다.');
      navigate(`/requests/${record.id}`, { state: location.state });
    } catch (e) { setFeedback(e.message); }
  };
  const origin = name => {
    if (!extracted) return null;
    const match = name.match(/^item-(\d+)-(.*)$/);
    const before = match ? extracted.items[Number(match[1])]?.[match[2]] : extracted[name];
    const current = match ? form.items[Number(match[1])]?.[match[2]] : form[name];
    if (name === 'department') return { tone: 'manual', text: '직접 확인' };
    if (!String(current || '').trim()) return { tone: 'missing', text: '직접 입력 필요' };
    if (String(before || '') !== String(current)) return { tone: 'manual', text: '직접 입력·수정' };
    return { tone: 'read', text: name === 'title' ? '품목에서 구성' : '원문에서 읽음' };
  };
  const attrs = name => ({ id: name, name, 'aria-invalid': Boolean(errors[name]), 'aria-describedby': [errors[name] && `${name}-error`, extracted && `${name}-origin`].filter(Boolean).join(' ') || undefined });
  const editorDialog = (confirmDraft || leaving) && <dialog ref={dialogRef} className="dialog" aria-labelledby="editor-dialog-title" onCancel={e => { e.preventDefault(); cancelDialog(); }}><div className="dialog-head"><h2 id="editor-dialog-title">{confirmDraft ? '입력한 내용을 초안으로 바꿀까요?' : '저장하지 않고 이동할까요?'}</h2></div><p>{confirmDraft ? '원문에서 읽은 값으로 제목·거래처·사유·품목을 바꿉니다. 읽지 못한 값은 비워집니다.' : '이 화면에서 바꾼 내용은 저장되지 않습니다. 계속 작성하거나 임시 저장할 수 있습니다.'}</p><div className="dialog-actions"><button className="button secondary" onClick={() => { cancelDialog(); }}>계속 작성</button><button className="button primary" onClick={() => { if (confirmDraft) generate(); else { allowNavigation.current = true; setDirty(false); blocker.proceed(); } }}>{confirmDraft ? '초안으로 바꾸기' : '저장하지 않고 이동'}</button></div></dialog>;
  if (!allowed) return <><header className="page-head"><div><p className="eyebrow">PURCHASE REQUEST</p><h1 tabIndex="-1">{id && !existing ? '요청을 찾을 수 없습니다.' : '구매 담당자가 작성하는 요청서입니다.'}</h1><p className="page-description">{role !== 'staff' ? '상단 시연 역할을 구매 담당자로 바꾸세요. 입력 중인 내용은 이 화면에 유지됩니다.' : '진행 중인 결재 내용은 수정할 수 없습니다. 승인 후 내용 변경은 상세에서 재결재를 시작하세요.'}</p></div></header><Link className="button secondary" to={existing ? `/requests/${id}` : '/requests'}>요청 확인</Link>{editorDialog}</>;
  return <><Link className="back-link" to={id ? `/requests/${id}` : '/requests'} state={location.state}><Icon name="back" size={17}/>{id ? '요청 상세로' : '구매 요청으로'}</Link><header className="page-head"><div><p className="eyebrow">PURCHASE REQUEST / {existing ? `${existing.revision}차 요청서` : 'NEW'}</p><h1 tabIndex="-1">{existing?.status === 'revision' ? '구매 요청 보완' : existing ? '구매 요청 수정' : '구매 요청 작성'}</h1><p className="page-description">요청 내용을 정리하고, 확인한 정보로 결재를 시작하세요.</p></div><span className="draft-indicator"><span className="status-dot"/>{dirty ? '저장하지 않은 변경' : '구매 담당자 작성'}</span></header>
    {existing?.status === 'revision' && <div className="reason-banner"><Icon name="info"/><div><strong>보완 요청 사유</strong><p>{existing.reason}</p></div></div>}
    <div className="editor-grid"><details className="source-panel panel" open={sourceOpen} onToggle={e => setSourceOpen(e.currentTarget.open)}><summary className="panel-head"><div><span className="tiny-label">01 · 요청 원문</span><h2>받은 내용을 그대로</h2></div><span className="source-toggle">{sourceOpen ? '접기' : '원문 확인'}<Icon name="arrow" size={16}/></span></summary><div className="panel-body"><p className="muted source-description">메일이나 메모의 내용을 붙여넣으세요. 실제 업무 정보 대신 가상 자료로 시연해 주세요.</p><label className="field" htmlFor="request-source">요청 내용<textarea id="request-source" rows="11" value={form.source} onChange={e => update('source', e.target.value)} placeholder="가상의 구매 요청 메일이나 메모를 붙여넣으세요." maxLength="4000"/></label><button className="text-button sample-button" onClick={() => update('source', SAMPLE_SOURCE)}>샘플 원문 불러오기<Icon name="arrow" size={15}/></button><button className="button draft-button block" disabled={!form.source.trim()} onClick={() => { if (form.title || form.items.some(i => i.name)) setConfirmDraft(true); else generate(); }}><Icon name="spark" size={18}/>원문으로 초안 만들기<span>시연</span></button><p className="ai-disclosure">규칙 기반 시연 · 한 품목의 명시된 값만 읽습니다. 실제 AI는 연결하지 않았습니다.</p></div><div className="source-footer"><Icon name="file" size={18}/><div><strong>원문 → 요청서 → 발주 문안</strong><span>한 번 확인한 정보를 다음 업무에 이어 씁니다.</span></div></div></details>
    <form ref={formRef} id="request-fields" className="request-form" noValidate onSubmit={e => { e.preventDefault(); persist(true); }}>
      <section className="panel"><div className="panel-head"><div><span className="tiny-label">02 · 내용 확인</span><h2>구매 요청서</h2></div><span className="muted">표시된 항목은 필수</span></div>{extracted && <div className="draft-review" role="status"><strong>읽어 온 값도 한 번 확인해 주세요.</strong><span>{form.source !== extracted.source ? '원문이 변경됐습니다. 기존 초안과 다시 비교하거나 새로 만들어 주세요.' : '원문에 없는 값은 채우지 않았습니다. 직접 입력할 항목을 확인하세요.'}</span></div>}<div className="panel-body"><div className="form-grid"><div className="full"><Field name="title" label="요청 제목" errors={errors} hint={origin("title")}><input {...attrs('title')} value={form.title} maxLength="100" placeholder="예: 신규 입사자 모니터 구매" onChange={e => update('title', e.target.value)}/></Field></div><Field name="department" label="요청 부서" errors={errors} hint={origin("department")}><input {...attrs('department')} value={form.department} maxLength="50" placeholder="예: 운영지원팀" onChange={e => update('department', e.target.value)}/></Field><Field name="needBy" label="희망 납기일" errors={errors} hint={origin("needBy")}><input {...attrs('needBy')} type="date" value={form.needBy} onChange={e => update('needBy', e.target.value)}/></Field><div className="full"><Field name="supplier" label="검토 거래처" errors={errors} hint={origin("supplier")}><input {...attrs('supplier')} value={form.supplier} maxLength="100" placeholder="가상 거래처 이름을 입력해 주세요" onChange={e => update('supplier', e.target.value)}/></Field></div><div className="full"><Field name="purpose" label="구매 사유" errors={errors} hint={origin("purpose")}><textarea {...attrs('purpose')} value={form.purpose} rows="2" maxLength="800" placeholder="어디에, 왜 필요한 물품인가요?" onChange={e => update('purpose', e.target.value)}/></Field></div></div></div></section>
      <section className="panel"><div className="panel-head"><h2>구매 품목</h2><span className="muted">부가세 포함 금액</span></div><div className="panel-body item-editor-body">{form.items.map((item, index) => <fieldset className="item-editor" key={index}><legend>품목 {String(index + 1).padStart(2, '0')}</legend>{form.items.length > 1 && <button type="button" className="text-button remove-item" onClick={() => update('items', form.items.filter((_, i) => i !== index))}>품목 {index + 1} 삭제</button>}<div className="form-grid"><Field name={`item-${index}-name`} label="품목명" errors={errors} hint={origin(`item-${index}-name`)}><input {...attrs(`item-${index}-name`)} value={item.name} maxLength="100" placeholder="예: 모니터" onChange={e => updateItem(index, 'name', e.target.value)}/></Field><Field name={`item-${index}-spec`} label="규격" errors={errors} hint={origin(`item-${index}-spec`)}><input {...attrs(`item-${index}-spec`)} value={item.spec} maxLength="150" placeholder="예: 27인치 QHD" onChange={e => updateItem(index, 'spec', e.target.value)}/></Field><Field name={`item-${index}-quantity`} label="수량" errors={errors} hint={origin(`item-${index}-quantity`)}><input {...attrs(`item-${index}-quantity`)} type="number" min="1" max="10000" step="1" inputMode="numeric" value={item.quantity} onChange={e => updateItem(index, 'quantity', e.target.value)}/></Field><Field name={`item-${index}-price`} label="단가 (원)" errors={errors} hint={origin(`item-${index}-price`)}><input {...attrs(`item-${index}-price`)} type="number" min="1" max="100000000" step="1" inputMode="numeric" value={item.price} onChange={e => updateItem(index, 'price', e.target.value)}/></Field></div><div className="item-subtotal">품목 금액 <strong>{money(Number(item.quantity || 0) * Number(item.price || 0))}</strong></div></fieldset>)}<button type="button" className="button secondary" onClick={() => update('items', [...form.items, { name: '', spec: '', quantity: '', price: '' }])}><Icon name="plus" size={16}/>품목 추가</button><div className="total-line"><span>총 요청 금액 <small>부가세 포함</small></span><strong>{money(amount(form))}</strong></div></div></section>
      {existing && <RevisionChanges request={form}/>}
      {duplicates.length > 0 && <section className="duplicate-note"><Icon name="info"/><div><h3>같은 품목의 진행 중인 요청 {duplicates.length}건</h3><p>중복으로 단정하지 않습니다. 규격과 용도를 비교해 주세요.</p>{duplicates.map(r => <details key={r.id}><summary>{r.id} · {r.title}</summary><p>{r.items.map(i => `${i.name} / ${i.spec} / ${i.quantity}개`).join(', ')}<br/>{r.purpose} · {money(amount(r))}</p></details>)}<label className="checkbox-line"><input type="checkbox" checked={checkedDuplicate} aria-invalid={Boolean(errors.duplicate)} onChange={e => { setCheckedDuplicate(e.target.checked); setErrors(old => Object.fromEntries(Object.entries(old).filter(([key]) => key !== 'duplicate'))); }}/><span>위 요청과 용도를 비교했습니다.</span></label>{errors.duplicate && <small className="field-error">{errors.duplicate}</small>}</div></section>}
      <section className="submit-panel"><label className="checkbox-line"><input type="checkbox" checked={confirmed} aria-invalid={Boolean(errors.confirmed)} onChange={e => { setConfirmed(e.target.checked); setErrors(old => Object.fromEntries(Object.entries(old).filter(([key]) => key !== 'confirmed'))); }}/><span>품목·금액·거래처·납기일을 직접 확인했습니다.</span></label>{errors.confirmed && <small className="field-error">{errors.confirmed}</small>}<p>제출 후에는 팀장 → 사장님 순서로 결재합니다. 진행 중인 요청서는 직접 수정할 수 없습니다.</p>{feedback && <div className={Object.keys(errors).length ? 'form-error' : 'form-feedback'} role="status">{feedback}</div>}<div className="editor-actions"><Link to={id ? `/requests/${id}` : '/requests'} state={location.state} className="button secondary">취소</Link><button type="button" className="button secondary" onClick={() => persist(false)}>임시 저장</button><button type="submit" className="button primary">팀장 결재 요청<Icon name="arrow" size={18}/></button></div></section>
    </form></div>
    {editorDialog}
  </>;
}
