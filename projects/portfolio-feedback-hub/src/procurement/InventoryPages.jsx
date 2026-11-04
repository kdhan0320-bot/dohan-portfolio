import { useState } from 'react';
import { Link, useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { originReturn } from './listNavigation';
import { useWorkspace } from './Workspace';
import { PageHead, Empty, Modal, FormError, StateTag, Badge, WorkflowStatus, StockLedger, ListLink, ListBackLink, ReceiptProgress, LinkLabel, DateInput, DocumentNumber, MaterialLedgerLinks } from './UI';
import { dateInput, day, money, amount, canEdit, canReview, nextAction } from './model';
import { stock, incoming, qty, orderItems, ledgerMaterials, orderId, orderProgress, receivedQuantity, materialHistory } from './inventory';
import Icon from './Icons';
import { MaterialForm, VendorForm } from './CatalogForms';
import SensorSlip from './SensorSlip';
import useCompactViewport from './useCompactViewport';

function Search({ value, onChange, label, placeholder }) {
  return <label className="list-search"><Icon name="search" size={18}/><input value={value} onChange={e => onChange(e.target.value)} aria-label={label} placeholder={placeholder}/>{value && <button className="icon-button" onClick={() => onChange('')} aria-label="검색어 지우기"><Icon name="close" size={16}/></button>}</label>;
}
function useFilters() {
  const [params, setParams] = useSearchParams();
  const set = (key, value) => { const next = new URLSearchParams(params); value ? next.set(key, value) : next.delete(key); setParams(next, { replace: true }); };
  return { query: params.get('q') || '', status: params.get('status') || 'all', set, params };
}
const matches = (query, ...values) => values.join(' ').toLowerCase().includes(query.toLowerCase());
const staffButton = (role, action) => role === 'staff' ? action : <span className="muted role-readonly">조회 중 · 시연 역할 {role === 'manager' ? '팀장' : '사장님'}</span>;
function Field({ label, children, optional }) { return <label className="field"><span>{label}{optional && <small className="optional">선택</small>}</span>{children}</label>; }
function Actions({ onClose, children }) { return <div className="dialog-actions"><button type="button" className="button secondary" onClick={onClose}>취소</button><button className="button primary" type="submit">{children}</button></div>; }

function HomeTaskQueue({ tasks, role, compact }) {
  const preview = tasks.slice(0, compact ? 1 : 4);

  return (
    <section className={compact ? 'panel home-task-queue compact-task' : 'panel home-task-queue'} aria-labelledby="home-tasks-title">
      <div className="panel-head">
        <h2 id="home-tasks-title" tabIndex={-1}>지금 처리할 품의</h2>
        {tasks.length > 0 && (
          <ListLink id="home-all-tasks" className="subtle-link" to="/requests?status=action" aria-label={`처리할 품의 전체 ${tasks.length}건 보기`}>
            전체 {tasks.length}건 보기
          </ListLink>
        )}
      </div>
      <div className="erp-task-list">
        {preview.map(request => {
          let to = `/requests/${request.id}`;
          if (canEdit(request, role)) to += '/edit';
          if (request.status === 'approved') to = `/orders/${request.id}`;

          return (
            <ListLink key={request.id} id={`home-task-${request.id}`} to={to}>
              <div className="erp-row-top">
                <DocumentNumber value={request.id}/>
                <Badge status={request.status}/>
              </div>
              <h3>{request.title || '제목 없는 품의'}</h3>
              <div className="erp-row-bottom">
                {!compact && <span>{request.status === 'revision' ? request.reason : money(amount(request))}</span>}
                <strong>{nextAction(request, role)}</strong>
              </div>
            </ListLink>
          );
        })}
        {!tasks.length && <p className="home-queue-empty">지금 처리할 품의가 없습니다.</p>}
      </div>
    </section>
  );
}

function HomeReceipts({ waiting, data }) {
  return (
    <section className="panel home-receipts" aria-labelledby="home-receipts-title">
      <div className="panel-head">
        <h2 id="home-receipts-title">입고 확인할 발주</h2>
        {waiting.length > 0 && (
          <ListLink id="home-all-receipts" className="subtle-link" to="/orders?status=open" aria-label={`입고 확인할 발주 전체 ${waiting.length}건 보기`}>
            전체 {waiting.length}건 보기
          </ListLink>
        )}
      </div>
      <div className="receipt-agenda">
        {waiting.slice(0, 4).map(({ request, due, remaining }) => (
          <ListLink key={request.id} className="receipt-agenda-row" id={`home-receipt-${request.id}`} to={`/orders/${request.id}`}>
            <div className="receipt-agenda-date">
              <span>{request.order?.expectedDate ? '입고 예정' : '희망 납기'}</span>
              {due ? <time dateTime={due}>{day(due)}</time> : <strong>미정</strong>}
            </div>
            <div className="receipt-agenda-info">
              <div className="receipt-agenda-id">
                <DocumentNumber value={orderId(request)}/>
                <WorkflowStatus data={data} request={request} quantity={false}/>
              </div>
              <h3>{request.title}</h3>
              <p><span>{request.supplier}</span><strong>미입고 {qty(remaining)}</strong></p>
            </div>
          </ListLink>
        ))}
        {!waiting.length && <p className="home-queue-empty">미입고 발주가 없습니다.</p>}
      </div>
    </section>
  );
}

export function WorkOverview() {
  const { data, requests, role, materials } = useWorkspace();
  const compact = useCompactViewport();
  const tasks = requests.filter(request => role === 'staff'
    ? ['draft', 'revision', 'approved'].includes(request.status)
    : canReview(request, role));
  const rank = { revision: 0, approved: 1, draft: 2 };
  tasks.sort((a, b) => (rank[a.status] ?? 0) - (rank[b.status] ?? 0));

  const waiting = requests.filter(request => request.status === 'ordered')
    .map(request => ({
      request,
      due: request.order?.expectedDate || request.needBy,
      remaining: orderProgress(data, request).remaining,
    }))
    .filter(entry => entry.remaining > 0)
    .sort((a, b) => (a.due || '9999-12-31').localeCompare(b.due || '9999-12-31'));
  const movements = materials.flatMap(material =>
    materialHistory(data, material.id).map(event => ({ ...event, material }))
  ).sort((a, b) => b.date.localeCompare(a.date) || (b.at || '').localeCompare(a.at || '') || b.id.localeCompare(a.id)).slice(0, 5);

  const stats = [
    ['발주 대기', requests.filter(request => request.status === 'approved').length, '건', '/orders?status=ready'],
    ['입고할 건', waiting.length, '건', '/orders?status=open'],
    ['보유 자재', materials.filter(material => stock(data, material.id) > 0).length, '종', '/materials?status=stock'],
  ];
  if (!compact) stats.unshift(['내 처리 대기', tasks.length, '건', '/requests?status=action']);
  const taskQueue = <HomeTaskQueue tasks={tasks} role={role} compact={compact}/>;

  return (
    <>
      <PageHead eyebrow="구매·자재 관리" title="업무 현황">엑셀·메일로 품의를 정리하고 센서를 현장에 지급했던 경험을 살려, 주문량과 지금 쓸 수 있는 재고를 구분했습니다.</PageHead>
      {compact && taskQueue}
      <SensorSlip data={data} materials={materials}/>
      <section className="erp-stats" aria-label="업무 요약">
        {stats.map(([label, count, unit, to]) => (
          <Link key={label} to={to}><span>{label}</span><strong>{count}<small>{unit}</small></strong></Link>
        ))}
      </section>
      <div className="erp-overview-grid">
        {!compact && taskQueue}
        <HomeReceipts waiting={waiting} data={data}/>
        <section className="panel erp-recent">
          <div className="panel-head"><h2>최근 입고·지급</h2><Link className="subtle-link" to="/materials">자재 보기</Link></div>
          <div className="erp-movement-list">
            {movements.map(movement => (
              <ListLink to={`/materials/${movement.material.id}`} id={`home-movement-${movement.id}-${movement.material.id}-${movement.lineIndex ?? 'issue'}`} key={`${movement.id}-${movement.material.id}-${movement.lineIndex ?? 'issue'}`}>
                <span className={`movement-sign ${movement.quantity > 0 ? 'in' : 'out'}`}>{movement.type}</span>
                <strong className="movement-name">{movement.material.name}</strong>
                <span className="movement-quantity">{movement.quantity > 0 ? '+' : '−'}{qty(Math.abs(movement.quantity))}</span>
                <small className="movement-party">{movement.party}</small>
                <time className="movement-date" dateTime={movement.date}>{day(movement.date)}</time>
              </ListLink>
            ))}
          </div>
          {!movements.length && <Empty title="아직 입고·지급 기록이 없습니다."/>}
        </section>
      </div>
    </>
  );
}
export function OrderList() {
  const { data, requests } = useWorkspace();
  const { query, status, set, params } = useFilters();
  const orders = requests.filter(r => ['approved', 'ordered'].includes(r.status));
  const inTab = (r, key) => key === 'all' || (key === 'open' ? r.status === 'ordered' && orderProgress(data, r).remaining > 0 : orderProgress(data, r).key === key);
  const shown = orders.filter(r => {
    const issuedNumber = orderId(r);
    return inTab(r, status) && matches(query.trim(), r.title, `품의 ${r.id}`, r.supplier, issuedNumber && `발주 ${issuedNumber}`, ...r.items.map(i => i.name));
  });
  return <><PageHead eyebrow="PURCHASE ORDERS" title="발주·입고"/>
    <section className="panel"><div className="list-toolbar"><div className="filter-tabs" aria-label="발주 상태">{[['all', '전체'], ['ready', '발주 대기'], ['open', '입고할 건'], ['done', '입고 완료']].map(([key, label]) => <button key={key} className={status === key ? 'active' : ''} aria-pressed={status === key} onClick={() => set('status', key)}>{label}<span>{orders.filter(r => inTab(r, key)).length}</span></button>)}</div><Search value={query} onChange={v => set('q', v)} label="발주 검색" placeholder="문서번호·자재·업체 검색"/></div>
    <table className="erp-table order-list-table row-link-table"><thead><tr><th>발주 / 품의</th><th>업체</th><th>발주일 / 납기</th><th>입고 수량</th><th>상태</th></tr></thead><tbody>{shown.map(r => { const p = orderProgress(data, r); return <tr key={r.id}><td data-label="발주 / 품의" className="cell-main"><span className="mono"><DocumentNumber value={r.status === 'ordered' ? orderId(r) : r.id}/></span><ListLink className="row-link" id={`order-title-${r.id}`} to={`/orders/${r.id}`} state={{ orderFrom: `/orders?${params}` }}><LinkLabel>{r.title}</LinkLabel></ListLink></td><td data-label="업체">{r.supplier}</td><td data-label="발주일 / 납기" className="cell-dates">{r.order ? day(r.order.date || r.order.at) : '등록 전'}<small>{r.order ? '입고 예정' : '희망 납기'} {day(r.order?.expectedDate || r.needBy)}</small></td><td data-label="입고 수량" className="cell-quantity"><span>{r.status === 'ordered' ? <><strong>{p.received}</strong> / {p.ordered} EA</> : '발주 등록 전'}</span><ReceiptProgress data={data} request={r}/>{r.status === 'ordered' && p.remaining > 0 && <small>미입고 {qty(p.remaining)}</small>}</td><td data-label="상태" className="cell-status"><WorkflowStatus data={data} request={r} quantity={false}/></td></tr>; })}</tbody></table>
    {!shown.length && (
      <Empty title={query ? '검색된 발주가 없습니다.' : '이 목록에 표시할 발주가 없습니다.'}>
        {query && <button className="button secondary" onClick={() => set('q', '')}>검색어 지우기</button>}
        {!query && status !== 'all' && orders.length > 0 && (
          <button className="button secondary" onClick={() => set('status', '')}>전체 발주 보기</button>
        )}
      </Empty>
    )}
    </section></>;
}
export function OrderDetail() {
  const { id } = useParams(), { data, requests, role, setRole } = useWorkspace();
  const location = useLocation();
  const navigate = useNavigate();
  const backTo = /^\/orders(?:\?|$)/.test(location.state?.orderFrom || '') ? location.state.orderFrom : '/orders';
  const request = requests.find(r => r.id === id);
  const [dialog, setDialog] = useState('');
  if (!request || !['approved', 'ordered'].includes(request.status)) return <><PageHead title="발주 가능한 품의가 아닙니다."/><Link className="button secondary" to={request ? `/requests/${id}` : '/orders'}>품의 확인</Link></>;
  const materials = ledgerMaterials(data, request);
  const p = orderProgress(data, request), items = orderItems(request), receipts = data.receipts.filter(r => r.requestId === id);
  const sourcePath = `/requests/${id}`;
  const fromRequest = originReturn(location, navigate, sourcePath);
  const sourceLink = fromRequest?.linkProps || { to: sourcePath };
  const SourceLink = fromRequest ? Link : ListLink;
  return <>{fromRequest
    ? <Link className="back-link" {...sourceLink}><Icon name="back" size={17}/>품의 {request.id}로 돌아가기</Link>
    : <ListBackLink fallback={backTo}><Icon name="back" size={17}/>발주·입고 목록</ListBackLink>}
    <header className="request-document"><div className="document-heading"><div className="document-register"><DocumentNumber value={request.status === 'approved' ? request.id : orderId(request)}/><span className="document-round">{request.revision}차 승인본</span><WorkflowStatus data={data} request={request}/></div><h1 tabIndex="-1">{request.title}</h1><p className="document-meta"><Link to={`/vendors/${request.supplierId}`}>{request.approvedSnapshot?.supplier || request.supplier}</Link><SourceLink id={`order-source-${id}`} className="document-source" {...sourceLink}>원본 품의 {request.id}</SourceLink></p></div></header>
    <div className="order-work-grid"><section className="panel"><div className="panel-head"><h2>{request.order ? '발주 자재' : '발주할 자재'}</h2><span className="muted">단위 EA</span></div><table className="erp-table order-items"><thead><tr><th>자재 / 규격</th><th>{request.order ? '발주' : '승인 수량'}</th><th>입고</th><th>미입고</th></tr></thead><tbody>{items.map((item, i) => <tr key={i}><td className="cell-main"><Link to={`/materials/${item.materialId}`}><LinkLabel>{item.name}</LinkLabel></Link><small>{item.spec}</small></td><td data-label={request.order ? '발주' : '승인 수량'}>{item.quantity}</td><td data-label="입고">{request.order ? receivedQuantity(data, id, i) : '—'}</td><td data-label="미입고" className="number-accent">{request.order ? Number(item.quantity) - receivedQuantity(data, id, i) : '—'}</td></tr>)}</tbody></table><div className="order-facts"><div><span>승인 금액 · 부가세 포함</span><strong>{money(amount(request.approvedSnapshot || request))}</strong></div><div><span>발주일</span><strong>{request.order?.date || (request.order ? dateInput(request.order.at) : '등록 전')}</strong></div><div><span>{request.order ? '입고 예정일' : '희망 납기일'}</span><strong>{request.order?.expectedDate || request.needBy}</strong></div></div></section>
    <section className="panel order-task"><div className="panel-head"><h2>{request.status === 'approved' ? '발주 등록' : p.remaining ? '이번 입고 기록' : '입고 완료'}</h2></div><div className="panel-body">{role !== 'staff' ? <><p>구매·자재 담당자가 발주·입고를 기록합니다.</p><button className="button secondary block" onClick={() => setRole('staff')}>구매·자재 담당자로 전환</button></> : request.status === 'approved' ? <><p>업체에 주문한 뒤 발주일과 입고 예정일을 기록하세요.</p><button className="button primary block" onClick={() => setDialog('order')}>발주 등록</button></> : p.remaining ? <><ReceiptProgress data={data} request={request}/><div className="remaining-number"><span>남은 입고</span><strong>{qty(p.remaining)}</strong></div><button className="button primary block" onClick={() => setDialog('receipt')}>입고 수량 기록<Icon name="plus" size={17}/></button><small>받은 수량만 재고에 반영됩니다.</small></> : <><p>발주한 자재를 모두 받았습니다.</p>{materials.length > 1
        ? <button className="button secondary block" onClick={() => document.getElementById(`ledger-${id}-${materials[0].id}`)?.focus()}>자재별 장부 선택</button>
        : materials.length === 1 && <Link className="button secondary block" to={`/materials/${materials[0].id}`}>보유 수량·지급 보기</Link>}</>}</div></section></div>
    <section className="panel erp-recent"><div className="panel-head"><h2>입고 이력 <small>{receipts.length}건</small></h2></div><table className="erp-table receipt-history-table"><thead><tr><th>입고일</th><th>기록번호</th><th>받은 자재</th><th>메모</th></tr></thead><tbody>{[...receipts].reverse().map(r => <tr key={r.id}><td data-label="입고일">{r.date}</td><td data-label="기록번호" className="mono">{r.id}</td><td className="cell-main">{r.lines.map(l => <Link key={l.index} to={`/materials/${l.materialId}`}>{items[l.index]?.name} · {qty(l.quantity)}</Link>)}</td><td data-label="메모">{r.note || '—'}</td></tr>)}</tbody></table>{!receipts.length && <Empty title="아직 입고 기록이 없습니다."/>}
      <MaterialLedgerLinks materials={materials} requestId={id}/>
    </section>
    {dialog === 'order' && <OrderForm request={request} onClose={() => setDialog('')}/>}{dialog === 'receipt' && <ReceiptForm request={request} onClose={() => setDialog('')}/>}
  </>;
}
function OrderForm({ request, onClose }) {
  const { act, setNotice } = useWorkspace();
  const [form, setForm] = useState({ date: dateInput(), expectedDate: request.needBy < dateInput() ? dateInput() : request.needBy, note: '' }), [error, setError] = useState('');
  const set = (key, value) => setForm(old => ({ ...old, [key]: value }));
  const submit = e => { e.preventDefault(); try { act(request.id, 'order', form); setNotice('발주를 등록했습니다. 실제 업체 전송은 하지 않습니다.'); onClose(); } catch (err) { setError(err.message); } };
  return <Modal title="발주 등록" onClose={onClose}><p className="dialog-context">{request.supplier} · {money(amount(request))}</p><form noValidate onSubmit={submit}><div className="form-grid"><Field label="발주일"><DateInput label="발주일" value={form.date} onChange={e => set('date', e.target.value)} required max={dateInput()}/></Field><Field label="입고 예정일"><DateInput label="입고 예정일" value={form.expectedDate} onChange={e => set('expectedDate', e.target.value)} required/></Field><div className="full"><Field label="발주 메모" optional><textarea rows="2" maxLength="300" value={form.note} onChange={e => set('note', e.target.value)}/></Field></div></div><FormError>{error}</FormError><p className="muted">승인본으로 시연 발주를 등록합니다. 재고는 입고할 때 늘어납니다.</p><Actions onClose={onClose}>발주 확정</Actions></form></Modal>;
}
function ReceiptForm({ request, onClose }) {
  const { data, receive, setNotice } = useWorkspace();
  const [form, setForm] = useState({ date: dateInput(), note: '', quantities: {}, token: crypto.randomUUID() }), [error, setError] = useState('');
  const remaining = orderItems(request).map((item, index) => ({ ...item, index, remaining: Number(item.quantity) - receivedQuantity(data, request.id, index) })).filter(i => i.remaining > 0);
  const submit = e => { e.preventDefault(); try { receive(request.id, { ...form, lines: remaining.map(i => ({ index: i.index, quantity: form.quantities[i.index] || 0 })) }); setNotice('입고 기록을 저장하고 보유 수량에 반영했습니다.'); onClose(); } catch (err) { setError(err.message); } };
  return <Modal title="입고 수량 기록" onClose={onClose}><p className="dialog-context"><DocumentNumber value={orderId(request)}/> · {request.supplier}</p><form noValidate onSubmit={submit}><Field label="실제 입고일"><DateInput label="실제 입고일" max={dateInput()} value={form.date} required onChange={e => setForm({ ...form, date: e.target.value })}/></Field><div className="receipt-inputs">{remaining.map(i => <Field label={`${i.name} · 미입고 ${qty(i.remaining)}`} key={i.index}><input type="number" inputMode="numeric" min="0" max={i.remaining} placeholder="이번에 받은 수량" value={form.quantities[i.index] || ''} onChange={e => setForm({ ...form, quantities: { ...form.quantities, [i.index]: e.target.value } })}/></Field>)}</div><Field label="입고 메모" optional><textarea rows="2" maxLength="300" value={form.note} onChange={e => setForm({ ...form, note: e.target.value })}/></Field><FormError>{error}</FormError><Actions onClose={onClose}>입고 확정</Actions></form></Modal>;
}
export function MaterialList() {
  const { data, materials, vendors, role } = useWorkspace();
  const { query, status, set } = useFilters(), [adding, setAdding] = useState(false);
  const shown = materials.filter(m => matches(query, m.code, m.name, m.spec) && (status === 'stock' ? stock(data, m.id) > 0 : status === 'empty' ? stock(data, m.id) === 0 : true));
  return <><PageHead eyebrow="MATERIALS & ISSUES" title="자재·지급" action={staffButton(role, <button className="button primary" onClick={() => setAdding(true)}><Icon name="plus" size={17}/>자재 등록</button>)}/><section className="panel"><div className="list-toolbar"><div className="filter-tabs" aria-label="보유 상태">{[['all', '전체 자재'], ['stock', '보유 중'], ['empty', '재고 없음']].map(([key, label]) => <button key={key} className={status === key ? 'active' : ''} aria-pressed={status === key} onClick={() => set('status', key)}>{label}</button>)}</div><Search value={query} onChange={v => set('q', v)} label="자재 검색" placeholder="자재코드·이름·규격 검색"/></div><table className="erp-table material-list-table row-link-table"><thead><tr><th>자재 / 규격</th><th>보유</th><th>미입고</th><th>기본 업체</th></tr></thead><tbody>{shown.map(m => <tr key={m.id}><td className="cell-main"><span className="mono">{m.code}</span><ListLink className="row-link" id={`material-title-${m.id}`} to={`/materials/${m.id}`}><LinkLabel>{m.name}</LinkLabel></ListLink><small>{m.spec}</small></td><td data-label="보유" className="number-accent">{qty(stock(data, m.id))}</td><td data-label="미입고">{qty(incoming(data, m.id))}</td><td data-label="기본 업체" className="cell-vendor">{vendors.find(v => v.id === m.vendorId)?.name || '미지정'}</td></tr>)}</tbody></table>{!shown.length && <Empty title="조건에 맞는 자재가 없습니다."/>}</section>{adding && <MaterialForm onClose={() => setAdding(false)}/>}</>;
}
export function MaterialDetail() {
  const location = useLocation(), navigate = useNavigate();
  const { id } = useParams(), { data, materials, vendors, role } = useWorkspace();
  const m = materials.find(v => v.id === id), [dialog, setDialog] = useState('');
  if (!m) return <><PageHead title="자재를 찾을 수 없습니다."/><Link className="button secondary" to="/materials">자재 목록으로</Link></>;
  const balance = stock(data, id), waiting = incoming(data, id), history = materialHistory(data, id), vendor = vendors.find(v => v.id === m.vendorId);
  const linked = data.requests.filter(r => (r.status === 'ordered' ? orderItems(r) : r.items).some(i => i.materialId === id));
  const originPath = location.state?.listOrigin?.path;
  const source = linked.find(r => originPath === `/requests/${r.id}` || originPath === `/orders/${r.id}`);
  const back = source && originReturn(location, navigate, originPath);
  return <><ListBackLink fallback="/materials"><Icon name="back" size={17}/>자재·지급 목록</ListBackLink><PageHead eyebrow={m.code} title={m.name} action={staffButton(role, <button className="button secondary" onClick={() => setDialog('edit')}>자재 정보 수정</button>)}>{m.spec}</PageHead><section className="material-register panel"><StockLedger data={data} materialId={id}/><div className="material-pending"><span>발주 후 미입고</span><strong>{qty(waiting)}</strong></div><div className="material-actions">{role === 'staff' && <><button className="button primary" disabled={!balance} onClick={() => setDialog('issue')}>지급 기록</button><Link className="button secondary" to={`/requests/new?material=${id}`}>구매 품의 작성</Link></>}{!balance && <small>입고 후 지급할 수 있습니다.</small>}</div></section>
    <div className="material-meta"><span>기본 업체 {vendor ? <Link to={`/vendors/${vendor.id}`}>{vendor.name}</Link> : '미지정'}</span><span>기준 단가 {money(m.price)} · 부가세 포함</span></div>
    <section className="panel"><div className="panel-head movement-heading">
      <h2 id="movement-history" tabIndex="-1">{m.name} 입고·지급 이력</h2><span className="muted">{history.length}건</span>
      {back && <Link className="movement-origin" {...back.linkProps}>{originPath.startsWith('/orders/') ? `발주 ${orderId(source)}` : `품의 ${source.id}`}로 돌아가기</Link>}
    </div><table className="erp-table movement-history-table"><thead><tr><th>처리일</th><th>구분</th><th>수량</th><th>업체 / 받은 사람</th><th>연결 기록</th></tr></thead><tbody>{history.map((h, i) => <tr key={`${h.id}-${i}`}><td data-label="처리일">{h.date}</td><td data-label="구분"><StateTag tone={h.quantity > 0 ? 'green' : 'blue'}>{h.type}</StateTag></td><td data-label="수량" className="number-accent">{h.quantity > 0 ? '+' : '−'}{qty(Math.abs(h.quantity))}</td><td data-label="업체 / 받은 사람" className="cell-wide">{h.party}<small>{h.note}</small></td><td data-label="연결 기록">{h.requestId ? <Link className="record-link" {...(back && originPath === `/orders/${h.requestId}` ? back.linkProps : { to: `/orders/${h.requestId}` })}>{h.id}</Link> : <span className="mono">{h.id}</span>}</td></tr>)}</tbody></table>{!history.length && <Empty title="입고·지급 기록이 없습니다."/>}</section>
    <section className="panel erp-recent"><div className="panel-head"><h2>관련 구매 품의</h2></div><div className="related-documents">{linked.map(r => <Link className="related-record" {...(back && originPath === `/requests/${r.id}` ? back.linkProps : { to: `/requests/${r.id}` })} key={r.id}><span className="mono"><DocumentNumber value={r.id}/></span><WorkflowStatus data={data} request={r}/><strong className="related-title">{r.title}</strong></Link>)}{!linked.length && <Empty title="연결된 구매 품의가 없습니다."/>}</div></section>
    {dialog === 'issue' && <IssueForm material={m} onClose={() => setDialog('')}/>}{dialog === 'edit' && <MaterialForm material={m} onClose={() => setDialog('')}/>}
  </>;
}
function IssueForm({ material, onClose }) {
  const { data, issue, setNotice } = useWorkspace(), [form, setForm] = useState({ materialId: material.id, date: dateInput(), quantity: '', department: '', recipient: '', note: '', token: crypto.randomUUID() }), [error, setError] = useState('');
  const set = (key, value) => setForm(old => ({ ...old, [key]: value }));
  const submit = e => { e.preventDefault(); try { issue(form); setNotice('지급 이력을 남기고 보유 수량에서 차감했습니다.'); onClose(); } catch (err) { setError(err.message); } };
  return <Modal title={`${material.name} 지급 기록`} onClose={onClose}><p className="dialog-context">{material.code} · 보유 {qty(stock(data, material.id))}</p><form noValidate onSubmit={submit}><div className="form-grid"><Field label="지급일"><DateInput label="지급일" max={dateInput()} value={form.date} onChange={e => set('date', e.target.value)} required/></Field><Field label="지급 수량 (EA)"><input type="number" inputMode="numeric" min="1" max={stock(data, material.id)} value={form.quantity} onChange={e => set('quantity', e.target.value)} required/></Field><Field label="부서·사용처"><input maxLength="80" placeholder="예: 설비보전팀" value={form.department} onChange={e => set('department', e.target.value)} required/></Field><Field label="받는 사람"><input maxLength="80" placeholder="가상 담당자" value={form.recipient} onChange={e => set('recipient', e.target.value)} required/></Field><div className="full"><Field label="지급 메모" optional><textarea rows="2" maxLength="300" value={form.note} onChange={e => set('note', e.target.value)}/></Field></div></div><FormError>{error}</FormError><Actions onClose={onClose}>지급 확정</Actions></form></Modal>;
}
export function VendorList() {
  const { vendors, requests, role } = useWorkspace(), { query, set } = useFilters(), [adding, setAdding] = useState(false);
  const shown = vendors.filter(v => matches(query, v.name, v.contact, v.note));
  return <><PageHead eyebrow="SUPPLIERS" title="업체 관리" action={staffButton(role, <button className="button primary" onClick={() => setAdding(true)}><Icon name="plus" size={17}/>업체 등록</button>)}/><section className="panel"><div className="list-toolbar"><span className="muted">등록 업체 {vendors.length}곳</span><Search value={query} onChange={v => set('q', v)} label="업체 검색" placeholder="업체명·담당자·취급 자재 검색"/></div><table className="erp-table vendor-list-table row-link-table"><thead><tr><th>업체</th><th>담당자</th><th>연락처</th><th>연결 품의</th></tr></thead><tbody>{shown.map(v => <tr key={v.id}><td className="cell-main"><span className="mono">{v.id}</span><ListLink className="row-link" id={`vendor-title-${v.id}`} to={`/vendors/${v.id}`}><LinkLabel>{v.name}</LinkLabel></ListLink><small>{v.note}</small></td><td data-label="담당자">{v.contact || '—'}</td><td data-label="연락처" className="cell-contact">{v.phone || '전화 미등록'}<small>{v.email || '이메일 미등록'}</small></td><td data-label="연결 품의" className="cell-count">{requests.filter(r => r.supplierId === v.id).length}건</td></tr>)}</tbody></table>{!shown.length && <Empty title="검색된 업체가 없습니다."/>}</section>{adding && <VendorForm onClose={() => setAdding(false)}/>}</>;
}
export function VendorDetail() {
  const { id } = useParams(), { vendors, requests, materials, data, role } = useWorkspace(), [editing, setEditing] = useState(false);
  const vendor = vendors.find(v => v.id === id);
  if (!vendor) return <><PageHead title="업체를 찾을 수 없습니다."/><Link className="button secondary" to="/vendors">업체 목록으로</Link></>;
  const related = requests.filter(r => r.supplierId === id);
  return <><ListBackLink fallback="/vendors"><Icon name="back" size={17}/>업체 목록</ListBackLink><PageHead eyebrow={vendor.id} title={vendor.name} action={staffButton(role, <button className="button secondary" onClick={() => setEditing(true)}>업체 정보 수정</button>)}/><section className="panel"><dl className="vendor-facts"><div><dt>담당자</dt><dd>{vendor.contact || '미등록'}</dd></div><div><dt>전화</dt><dd>{vendor.phone || '미등록'}</dd></div><div><dt>이메일</dt><dd>{vendor.email || '미등록'}</dd></div><div><dt>메모</dt><dd>{vendor.note || '—'}</dd></div></dl></section><div className="erp-overview-grid erp-recent"><section className="panel"><div className="panel-head"><h2>구매·발주 내역</h2></div><div className="related-documents">{related.map(r => <Link className="related-record" key={r.id} to={r.status === 'ordered' ? `/orders/${r.id}` : `/requests/${r.id}`}><span className="mono"><DocumentNumber value={r.status === 'ordered' ? orderId(r) : r.id}/></span><WorkflowStatus data={data} request={r}/><strong className="related-title">{r.title}</strong></Link>)}{!related.length && <Empty title="연결된 구매 품의가 없습니다."/>}</div></section><section className="panel"><div className="panel-head"><h2>기본 구매 자재</h2></div><div className="related-documents">{materials.filter(m => m.vendorId === id).map(m => <Link key={m.id} to={`/materials/${m.id}`}><span className="mono">{m.code}</span><span>{m.name}<small>{m.spec}</small></span></Link>)}</div></section></div>{editing && <VendorForm vendor={vendor} onClose={() => setEditing(false)}/>}</>;
}
