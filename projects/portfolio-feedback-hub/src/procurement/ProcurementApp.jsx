import { useEffect, useRef, useState } from 'react';
import { createHashRouter, RouterProvider, Link, Navigate, Route, Routes, useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { WorkspaceProvider, useWorkspace } from './Workspace';
import { ROLES, STATUS, amount, canEdit, canReview, day, eventRevisionLabel, money, nextAction, owner, timestamp } from './model';
import RequestEditor from './RequestEditor';
import Icon from './Icons';
import ApprovalLine from './ApprovalLine';
import RevisionChanges from './RevisionChanges';
import { PageHead, Empty, Modal, WorkflowStatus } from './UI';
import { WorkOverview, OrderList, OrderDetail, MaterialList, MaterialDetail, VendorList, VendorDetail, DocumentLinks } from './InventoryPages';
import { duplicateRequests, workflowStatus } from './inventory';

function detailOrigin(location) {
  const from = location.state?.from;
  if (from && /^\/(requests|approvals|orders)(\?|$)/.test(from)) return { path: from, label: from.startsWith('/orders') ? '발주·입고' : from.startsWith('/approvals') ? '결재함' : '구매·결재' };
  return { path: '/requests', label: '구매·결재' };
}

function Shell() {
  const { requests, role, setRole, storage, notice, setNotice, reset } = useWorkspace();
  const [confirmReset, setConfirmReset] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const detailId = location.pathname.match(/^\/requests\/([^/]+)(?:\/edit)?$/)?.[1];
  const detailRequest = requests.find(r => r.id === detailId);
  const activePath = detailRequest ? '/requests' : location.pathname === '/approvals' ? '/requests' : location.pathname;
  const sectionName = activePath.startsWith('/orders') ? '발주·입고' : activePath.startsWith('/materials') ? '자재·지급' : activePath.startsWith('/vendors') ? '업체 관리' : activePath === '/' ? '업무 현황' : '구매·결재';
  useEffect(() => {
    window.scrollTo({ top: 0 });
    const heading = document.querySelector('h1');
    heading?.focus({ preventScroll: true });
    document.title = `${heading?.textContent || '업무 현황'} · 품의선`;
  }, [location.pathname]);
  const nav = [['/requests', '구매·결재', 'approval'], ['/orders', '발주·입고', 'box'], ['/materials', '자재·지급', 'grid'], ['/vendors', '업체 관리', 'building']];
  return <div className="workspace-shell">
    <a className="skip-link" href="#main-content" onClick={e => { e.preventDefault(); document.getElementById('main-content').focus(); }}>본문으로 이동</a>
    <aside className="sidebar">
      <Link to="/" className="brand" aria-label="품의선 업무 현황"><span className="brand-symbol" aria-hidden="true"><i/><i/><i/></span><span className="brand-name">품의선<small>부품 구매·입출고 관리</small></span></Link>
      <p className="nav-label">WORKSPACE</p>
      <nav aria-label="주 메뉴">{nav.map(([to, label, icon]) => { const active = to === '/' ? activePath === '/' : activePath.startsWith(to); return <Link key={to} to={to} className={active ? 'active' : ''} aria-current={active ? 'page' : undefined}><Icon name={icon}/><span>{label}</span></Link>; })}</nav>
      <div className="sidebar-bottom"><div className="workspace-card"><span className="workspace-avatar">자</span><div>자재 보관실<small>EA · 샘플 업무 공간</small></div></div></div>
    </aside>
    <div className="workspace-main">
      <header className="topbar erp-topbar"><div className="workspace-context"><Link to="/" aria-label="업무 현황으로"><Icon name="grid" size={17}/></Link><span>/</span><span>{sectionName}</span></div><div className="role-control"><label htmlFor="demo-role">시연 역할</label><select id="demo-role" value={role} onChange={e => setRole(e.target.value)}>{Object.entries(ROLES).map(([key, value]) => <option key={key} value={key}>{value}</option>)}</select></div></header>
      <main id="main-content" tabIndex="-1"><Routes>
        <Route path="/" element={<WorkOverview/>}/><Route path="/requests" element={<RequestList/>}/><Route path="/requests/new" element={<RequestEditor/>}/><Route path="/requests/:id/edit" element={<RequestEditor/>}/><Route path="/requests/:id" element={<RequestDetail/>}/><Route path="/approvals" element={<RequestList mode="approvals"/>}/><Route path="/orders" element={<OrderList/>}/><Route path="/orders/:id" element={<OrderDetail/>}/><Route path="/materials" element={<MaterialList/>}/><Route path="/materials/:id" element={<MaterialDetail/>}/><Route path="/vendors" element={<VendorList/>}/><Route path="/vendors/:id" element={<VendorDetail/>}/><Route path="/about" element={<Navigate to="/" replace/>}/>
        {['tips', 'guide', 'recap', 'exercises', 'case-study', 'checklist'].map(path => <Route key={path} path={`/${path}/*`} element={<Navigate to="/" replace/>}/>)}
        <Route path="*" element={<><PageHead eyebrow="PAGE NOT FOUND" title="페이지를 찾을 수 없습니다."/><Link className="button primary" to="/">업무 현황으로</Link></>}/>
      </Routes></main>
      <footer className="workspace-footer"><p><span className="status-dot"/>{storage ? '시연 데이터 · 이 브라우저에 저장' : '임시 시연 · 새로고침 시 초기화'}<span className="footer-separator">/</span><span>실제 AI·결재·메일 전송 없음</span></p><div className="footer-actions"><button className="text-button" onClick={() => setConfirmReset(true)}>샘플 초기화</button></div></footer>
    </div>
    {notice && <div className="toast" role="status"><Icon name="info" size={18}/><span>{notice}</span><button aria-label="알림 닫기" className="icon-button" onClick={() => setNotice('')}><Icon name="close" size={16}/></button></div>}
    {confirmReset && <Modal title="시연을 처음부터 다시 시작할까요?" onClose={() => setConfirmReset(false)}><p>이 브라우저에서 추가·수정한 자재·업체·구매·입출고 기록을 기본 샘플로 바꿉니다.</p><div className="dialog-actions"><button className="button secondary" onClick={() => setConfirmReset(false)}>취소</button><button className="button primary" onClick={() => { reset(); setConfirmReset(false); navigate('/'); }}>샘플 초기화</button></div></Modal>}
  </div>;
}

function RequestList({ mode = 'requests' }) {
  const { data, requests, role } = useWorkspace();
  const [params, setParams] = useSearchParams();
  const query = params.get('q') || '';
  const defaultStatus = role !== 'staff' ? 'action' : 'all';
  const requestedStatus = params.get('status') || defaultStatus;
  const status = mode === 'approvals' && role === 'staff' && requestedStatus === 'action' ? 'all' : requestedStatus;
  const setParam = (key, value) => { const next = new URLSearchParams(params); value ? next.set(key, value) : next.delete(key); setParams(next, { replace: true }); };
  const config = mode === 'approvals' ? { title: '결재함', eyebrow: 'APPROVAL INBOX', tabs: [['all', '전체'], ['team', '팀장 결재'], ['director', '사장님 결재']] } : mode === 'orders' ? { title: '발주 관리', eyebrow: 'ORDER HANDOFF', tabs: [['all', '전체'], ['approved', '발주 대기'], ['ordered', '발주 기록 완료']] } : { title: '구매·결재', eyebrow: 'PURCHASE REQUESTS', tabs: [['all', '전체'], ['action', '내 처리 대기'], ['waiting', '결재 진행'], ['approved', '발주 대기'], ['closed', '발주·반려']] };
  if (mode === 'approvals' && role !== 'staff') config.tabs.unshift(['action', '내 차례']);
  let base = requests.filter(r => mode === 'approvals' ? ['team', 'director'].includes(r.status) : mode === 'orders' ? ['approved', 'ordered'].includes(r.status) : true);
  const matches = (r, value) => value === 'all' || (value === 'action' ? (role === 'staff' ? ['draft', 'revision', 'approved'].includes(r.status) : canReview(r, role)) : value === 'waiting' ? ['team', 'director'].includes(r.status) : value === 'closed' ? ['ordered', 'rejected'].includes(r.status) : r.status === value);
  const shown = base.filter(r => matches(r, status) && `${r.title} ${r.id} ${r.items.map(i => i.name).join(' ')} ${r.supplier}`.toLowerCase().includes(query.toLowerCase()));
  return <><PageHead eyebrow={config.eyebrow} title={config.title} action={role === 'staff' && <Link className="button primary" to="/requests/new"><Icon name="plus" size={18}/>구매 요청 작성</Link>}/>

    <section className="panel requests-panel"><div className="list-toolbar"><div className="filter-tabs" aria-label="상태 필터">{config.tabs.map(([key, label]) => <button key={key} className={status === key ? 'active' : ''} aria-pressed={status === key} onClick={() => setParam('status', key)}>{label}<span>{base.filter(r => matches(r, key)).length}</span></button>)}</div><label className="list-search"><Icon name="search" size={18}/><input aria-label="현재 목록 검색" placeholder="요청명·품목·번호 검색" value={query} onChange={e => setParam('q', e.target.value)}/>{query && <button className="icon-button" aria-label="검색어 지우기" onClick={() => setParam('q', '')}><Icon name="close" size={16}/></button>}</label></div>
    <div className="list-caption">{query && <span>검색 결과 <strong>{shown.length}</strong>건</span>}<span>금액은 부가세 포함</span></div>
    <div className="request-table"><div className="table-heading" aria-hidden="true"><span>구매 요청</span><span>합계 금액</span><span>필요일</span><span>진행 상태</span><span>현재 담당</span><span/></div>{shown.map(r => <Link className="request-table-row" key={r.id} to={`/requests/${r.id}`} state={{ from: `${mode === 'requests' ? '/requests' : `/${mode}`}${params.size ? `?${params}` : ''}`, fromLabel: config.title }}><div className="request-title-cell"><span className="mono">{r.id} <span>· {r.department}</span></span><h2>{r.title || '제목 없는 요청'}</h2><small>{r.items.map(i => i.name || '미입력 품목').join(', ')}</small></div><span className="table-amount"><small>합계 </small>{money(amount(r))}</span><span className="table-date"><small>필요일 </small>{r.needBy ? day(r.needBy) : '미정'}</span><span className="table-status"><WorkflowStatus data={data} request={r}/></span><span className="table-owner">{workflowStatus(data, r).owner}</span><Icon name="arrow" size={18}/></Link>)}</div>
    {!shown.length && <Empty title={query ? '검색 결과가 없습니다.' : status === 'action' ? '지금 처리할 요청이 없습니다.' : '해당 상태의 요청이 없습니다.'}><p>검색어 또는 상태 필터를 바꿔 보세요.</p><button className="button secondary" onClick={() => setParams({ status: 'all' })}>전체 요청 보기</button></Empty>}</section></>;
}

function RequestDetail() {
  const { id } = useParams();
  const { data, requests, role, setRole, act, setNotice } = useWorkspace();
  const request = requests.find(r => r.id === id);
  const [dialog, setDialog] = useState('');
  const [reason, setReason] = useState('');
  const [error, setError] = useState('');
  const nextHeading = useRef(null);
  const [allHistory, setAllHistory] = useState(false);
  const focusPanel = ref => requestAnimationFrame(() => {
    const heading = ref.current;
    if (!heading) return;
    heading.focus({ preventScroll: true });
    const bounds = heading.getBoundingClientRect();
    if (bounds.top < 0 || bounds.bottom > window.innerHeight) heading.scrollIntoView({ block: 'nearest' });
  });
  const focusNext = () => focusPanel(nextHeading);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (!location.state?.focusComparison) return;
    const frame = requestAnimationFrame(() => {
      const heading = document.getElementById('revision-heading');
      heading?.focus({ preventScroll: true });
      heading?.scrollIntoView({ block: 'start' });
    });
    return () => cancelAnimationFrame(frame);
  }, [location.key, location.state]);
  if (!request) return <><PageHead eyebrow="REQUEST NOT FOUND" title="요청을 찾을 수 없습니다."/><Link className="button primary" to="/requests">구매 요청으로</Link></>;
  const editable = canEdit(request, role), reviewable = canReview(request, role), approved = request.status === 'approved', ordered = request.status === 'ordered';
  const closed = ordered || request.status === 'rejected';
  const duplicates = duplicateRequests(data, request);
  const followingRole = Object.keys(ROLES).find(key => ROLES[key] === owner(request));
  const handoff = followingRole && followingRole !== role;
  const open = action => { setReason(''); setError(''); setDialog(action); };
  const execute = () => {
    try {
      const result = act(id, dialog, { reason, reference: reason });
      setDialog('');
      setNotice(dialog === 'approve' ? `${ROLES[role]} 승인 시연을 기록했습니다.` : dialog === 'order' ? '발주 시연 기록을 남겼습니다. 실제 메일은 보내지 않았습니다.' : dialog === 'revise' ? '보완을 요청했습니다. 구매 담당자가 수정 후 다시 제출할 수 있습니다.' : dialog === 'reject' ? '반려로 요청을 종료했습니다. 사유는 처리 이력에 남겼습니다.' : '처리 내용을 이력에 기록했습니다.');
      if (dialog === 'amend') navigate(`/requests/${result.id}/edit`, { state: location.state });
      else if (dialog === 'approve' && role === 'director') focusNext();
      else focusNext();
    } catch (e) { setError(e.message); document.querySelector('dialog textarea')?.focus(); }
  };
  const titles = { approve: `${ROLES[role]} 승인을 기록할까요?`, revise: '어떤 내용을 보완해야 하나요?', reject: '반려 사유를 남겨 주세요.', amend: '승인된 요청의 내용을 변경할까요?', order: '발주 시연 기록을 남길까요?' };
  const origin = detailOrigin(location, request);
  return <><Link className="back-link" to={origin.path}><Icon name="back" size={17}/>{origin.label} 목록</Link>
    <header className="request-document">
      <div className="document-heading">
        <div className="document-register"><span className="document-number">{request.id}</span><span className="document-round">{request.revision}차{['draft', 'revision'].includes(request.status) ? ' 작성 중' : ' 요청서'}</span><WorkflowStatus data={data} request={request}/></div>
        <h1 tabIndex="-1">{request.title || '제목 없는 요청'}</h1>
        <p className="document-meta">{request.department} · 최근 변경 {timestamp(request.updatedAt)}</p>
      </div>
      <ApprovalLine request={request}/>
      <DocumentLinks request={request}/>
    </header>
    {['revision', 'rejected'].includes(request.status) && <div className="reason-banner"><Icon name="info"/><div><strong>{request.status === 'revision' ? '보완 요청 사유' : '반려 사유'}</strong><p>{request.reason}</p></div></div>}
    <div className="detail-grid"><div className="detail-content"><section className="panel"><div className="panel-head"><h2>구매 내용</h2></div><div className="panel-body"><div className="item-table"><div className="item-head"><span>품목 / 규격</span><span>수량</span><span>단가</span><span>금액</span></div>{request.items.map((item, i) => <div className="item-row" key={i}><div><strong>{item.materialId ? <Link className="record-link" to={`/materials/${item.materialId}`}>{item.name}<Icon name="arrow" size={13}/></Link> : item.name || '품목 미입력'}</strong><small>{item.spec || '규격 미입력'}</small></div><span><small>수량 </small>{item.quantity || '—'} EA</span><span><small>단가 </small>{money(item.price)}</span><strong><small>금액 </small>{money(Number(item.quantity) * Number(item.price))}</strong></div>)}</div><div className="total-line"><span>총 요청 금액 <small>부가세 포함</small></span><strong>{money(amount(request))}</strong></div><dl className="request-facts"><div><dt>요청 부서</dt><dd>{request.department || '미입력'}</dd></div><div><dt>희망 납기일</dt><dd>{request.needBy || '미입력'}</dd></div><div className="full"><dt>검토 거래처</dt><dd>{request.supplier || '미입력'}</dd></div><div className="full"><dt>구매 사유</dt><dd>{request.purpose || '미입력'}</dd></div></dl></div></section>
    <RevisionChanges request={request}/>
    {duplicates.length > 0 && !closed && <section className="duplicate-note"><Icon name="info"/><div><h3>같은 품목의 진행 중인 요청 {duplicates.length}건</h3><p>같은 자재코드의 요청입니다. 미입고 수량과 사용 목적을 확인하세요.</p>{duplicates.map(r => <Link key={r.id} to={`/requests/${r.id}`}>{r.id} · {r.title}<Icon name="arrow" size={16}/></Link>)}</div></section>}
    {request.source && <details className="panel source-details"><summary>입력 원문 확인</summary><pre>{request.source}</pre></details>}
    <section className={`panel next-panel${closed ? ' closed-panel' : ''}`}><div className="panel-head"><h2 ref={nextHeading} tabIndex="-1">{ordered ? '발주·입고' : closed ? STATUS[request.status].label : handoff ? `${owner(request)} ${approved ? '발주 대기' : ['draft', 'revision'].includes(request.status) ? '작성 대기' : '확인 대기'}` : reviewable ? '결재 처리' : approved ? '발주 준비' : '작성 이어가기'}</h2>{reviewable && <span className="current-demo-role">시연 역할 · {ROLES[role]}</span>}</div><div className="panel-body">{!handoff && !ordered && <p>{editable ? '내용을 확인한 뒤 결재를 요청하세요.' : reviewable ? '품목·금액·구매 사유를 확인한 뒤 결정하세요.' : approved ? '최종 승인본으로 발주일과 입고 예정일을 기록하세요.' : '이 요청은 종료되었습니다. 다시 구매하려면 새 요청을 작성하세요.'}</p>}
      {editable && <Link className="button primary block" to={`/requests/${id}/edit`} state={location.state}>{nextAction(request, role)}<Icon name="arrow" size={17}/></Link>}
      {reviewable && <><button className="button primary block" onClick={() => open('approve')}><Icon name="check" size={18}/>승인하기</button><div className="paired-buttons"><button className="button secondary" onClick={() => open('revise')}>보완 요청</button><button className="button secondary" onClick={() => open('reject')}>반려</button></div></>}
      {approved && role === 'staff' && <><Link className="button primary block" to={`/orders/${id}`}>발주 준비<Icon name="arrow" size={17}/></Link><button className="text-button amend-button" onClick={() => open('amend')}>요청 내용 변경·재결재</button></>}
      {request.status === 'rejected' && role === 'staff' && <Link className="button secondary" to="/requests/new">새 구매 요청 작성<Icon name="arrow" size={17}/></Link>}
      {ordered && <Link className="button primary block" to={`/orders/${id}`}>입고 수량·기록 보기<Icon name="arrow" size={17}/></Link>}
      {handoff && <div className="role-handoff"><button className="button secondary block" onClick={() => { setRole(followingRole); setNotice(`${ROLES[followingRole]} 역할로 전환했습니다. 요청 내용은 그대로 유지됩니다.`); focusNext(); }}>{ROLES[followingRole]} 역할로 이어보기<Icon name="arrow" size={17}/></button></div>}
    </div></section></div><aside className="detail-aside"><section className="panel history-panel"><div className="panel-head"><h2>처리 이력</h2><span className="muted">{request.events.length}개</span></div><ol>{[...request.events].reverse().slice(0, allHistory ? undefined : 3).map((event, i) => <li key={`${event.at}-${i}`}><span className="history-dot"/><div><div className="history-meta"><strong>{event.actor}</strong><span>{eventRevisionLabel(event)}</span></div><p>{event.message}</p><time dateTime={event.at}>{timestamp(event.at)}</time></div></li>)}</ol>{request.events.length > 3 && <button className="text-button history-toggle" onClick={() => setAllHistory(!allHistory)}>{allHistory ? '최근 기록만 보기' : `이전 기록 ${request.events.length - 3}개 더 보기`}</button>}</section>
    {request.submissions.length > 0 && <details className="panel snapshots"><summary>제출 기록 <span>{request.submissions.length}건</span></summary>{request.submissions.map((snapshot, i) => <div key={i}><strong>{snapshot.revision}차 제출 · {timestamp(snapshot.at)}</strong><p>{snapshot.title} · {money(amount(snapshot))}</p><small>{snapshot.items.map(item => `${item.name} (${item.spec}) ${item.quantity} ${item.unit || '개'}`).join(', ')}</small></div>)}</details>}
    </aside></div>
    {dialog && <Modal title={titles[dialog]} onClose={() => setDialog('')}><p>{dialog === 'approve' ? `${request.title} · ${money(amount(request))}. ${role === 'manager' ? '승인 후 사장님 결재 단계로 넘어갑니다.' : '최종 승인 후 구매 담당자가 발주를 준비합니다.'}` : dialog === 'amend' ? '기존 승인 이력은 보관합니다. 수정한 내용은 팀장·사장님의 결재를 다시 받아야 발주할 수 있습니다.' : dialog === 'order' ? '메일을 실제로 보내지 않고 발주 준비를 마쳤다는 시연 기록만 남깁니다.' : dialog === 'revise' ? '구매 담당자에게 돌려보냅니다. 사유를 확인해 수정한 뒤 다시 결재를 요청할 수 있습니다.' : '이 요청을 종료합니다. 같은 요청서는 수정·재제출할 수 없으며, 다시 구매하려면 새 요청을 작성해야 합니다.'}</p>{['revise', 'reject', 'order'].includes(dialog) && <label className="field"><span className="dialog-field-label">{dialog === 'order' ? '발주 기록 메모' : dialog === 'revise' ? '보완할 내용' : '반려 사유'} <span className="required">필수</span></span><textarea autoFocus rows="3" value={reason} onChange={e => { setReason(e.target.value); setError(''); }} placeholder={dialog === 'order' ? '예: 승인 내용과 납기일 확인 후 발주 문안 준비' : dialog === 'revise' ? '예: 필요한 케이블 길이를 규격에 추가해 주세요.' : '예: 사용 가능한 예비 장비가 있어 구매를 진행하지 않습니다.'} maxLength="500"/></label>}{error && <p className="form-error" role="alert">{error}</p>}<div className="dialog-actions"><button className="button secondary" onClick={() => setDialog('')}>취소</button><button className={`button primary${dialog === 'reject' ? ' reject-confirm' : ''}`} onClick={execute}>{dialog === 'approve' ? '승인 기록' : dialog === 'amend' ? '내용 변경 시작' : dialog === 'order' ? '시연 기록 완료' : dialog === 'revise' ? '보완 요청 보내기' : '반려 확정'}</button></div></Modal>}
  </>;
}


const router = createHashRouter([{ path: '*', element: <WorkspaceProvider><Shell/></WorkspaceProvider> }]);
export default function ProcurementApp() { return <RouterProvider router={router}/>; }
