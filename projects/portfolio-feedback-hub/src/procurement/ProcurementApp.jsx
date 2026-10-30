import { useEffect, useRef, useState } from 'react';
import { createHashRouter, RouterProvider, Link, NavLink, Navigate, Route, Routes, useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { WorkspaceProvider, useWorkspace } from './Workspace';
import { ROLES, STATUS, amount, canEdit, canReview, day, money, nextAction, orderMessage, owner, similarRequests, timestamp } from './model';
import RequestEditor from './RequestEditor';
import Icon from './Icons';

export function Badge({ status }) { return <span className={`badge ${STATUS[status].tone}`}><span/>{STATUS[status].label}</span>; }
export function PageHead({ eyebrow, title, children, action }) {
  return <header className="page-head"><div><p className="eyebrow">{eyebrow}</p><h1 tabIndex="-1">{title}</h1>{children && <p className="page-description">{children}</p>}</div>{action}</header>;
}
export function Empty({ title = '표시할 요청이 없습니다.', children }) { return <div className="empty"><span className="empty-icon"><Icon name="file" size={28}/></span><h3>{title}</h3>{children}</div>; }

function Modal({ title, children, onClose }) {
  const ref = useRef(null);
  useEffect(() => {
    const previous = document.activeElement;
    ref.current.showModal();
    const dialog = ref.current;
    (dialog.querySelector('textarea') || dialog.querySelector('.dialog-actions .secondary'))?.focus();
    return () => { dialog.close(); if (previous?.isConnected) previous.focus(); else document.querySelector('h1')?.focus({ preventScroll: true }); };
  }, []);
  return <dialog ref={ref} className="dialog" aria-labelledby="dialog-title" onCancel={e => { e.preventDefault(); onClose(); }} onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
    <div className="dialog-head"><h2 id="dialog-title">{title}</h2><button className="icon-button" onClick={onClose} aria-label="닫기"><Icon name="close"/></button></div>{children}
  </dialog>;
}

function Shell() {
  const { role, setRole, storage, notice, setNotice, reset } = useWorkspace();
  const [confirmReset, setConfirmReset] = useState(false);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0 });
    const heading = document.querySelector('h1');
    heading?.focus({ preventScroll: true });
    document.title = `${heading?.textContent || '업무 현황'} · 구매 요청·결재 관리`;
  }, [location.pathname]);
  const nav = [['/', '업무 현황', 'grid'], ['/requests', '구매 요청', 'file'], ['/approvals', '결재함', 'approval'], ['/orders', '발주 준비', 'box']];
  return <div className="workspace-shell">
    <a className="skip-link" href="#main-content" onClick={e => { e.preventDefault(); document.getElementById('main-content').focus(); }}>본문으로 이동</a>
    <aside className="sidebar">
      <Link to="/" className="brand" aria-label="구매 요청·결재 관리 업무 현황"><span className="brand-symbol" aria-hidden="true"><i/><i/><i/></span><span className="brand-name">구매 요청<span>결재 관리</span><small>DEMO WORKSPACE</small></span></Link>
      <p className="nav-label">WORKSPACE</p>
      <nav aria-label="주 메뉴">{nav.map(([to, label, icon]) => <NavLink key={to} to={to} end={to === '/'}><Icon name={icon}/><span>{label}</span></NavLink>)}</nav>
      <div className="sidebar-bottom"><div className="workspace-card"><span className="workspace-avatar">운</span><div>운영지원팀<small>샘플 업무 공간</small></div></div><Link className="about-link" to="/about"><Icon name="info" size={17}/>기획 의도·시연 안내</Link></div>
    </aside>
    <div className="workspace-main">
      <header className="topbar"><form className="global-search" onSubmit={e => { e.preventDefault(); navigate(`/requests?q=${encodeURIComponent(search.trim())}`); }}><Icon name="search" size={18}/><input aria-label="전체 구매 요청 검색" placeholder="요청명·품목 검색" enterKeyHint="search" value={search} onChange={e => setSearch(e.target.value)}/><button type="submit" className="search-submit">검색</button></form><div className="role-control"><span className="demo-pill">시연</span><label htmlFor="demo-role">역할</label><select aria-label="시연 역할" id="demo-role" value={role} onChange={e => setRole(e.target.value)}>{Object.entries(ROLES).map(([key, value]) => <option key={key} value={key}>{value}</option>)}</select></div></header>
      <main id="main-content" tabIndex="-1"><Routes>
        <Route path="/" element={<Dashboard/>}/><Route path="/requests" element={<RequestList/>}/><Route path="/requests/new" element={<RequestEditor/>}/><Route path="/requests/:id/edit" element={<RequestEditor/>}/><Route path="/requests/:id" element={<RequestDetail/>}/><Route path="/approvals" element={<RequestList mode="approvals"/>}/><Route path="/orders" element={<RequestList mode="orders"/>}/><Route path="/about" element={<About/>}/>
        {['tips', 'guide', 'recap', 'exercises', 'case-study', 'checklist'].map(path => <Route key={path} path={`/${path}/*`} element={<Navigate to="/" replace/>}/>)}
        <Route path="*" element={<><PageHead eyebrow="PAGE NOT FOUND" title="페이지를 찾을 수 없습니다."/><Link className="button primary" to="/">업무 현황으로</Link></>}/>
      </Routes></main>
      <footer className="workspace-footer"><p><span className="status-dot"/>{storage ? '시연 데이터 · 이 브라우저에 저장' : '임시 시연 · 새로고침 시 초기화'}<span className="footer-separator">/</span><span>실제 AI·결재·메일 전송 없음</span></p><button className="text-button" onClick={() => setConfirmReset(true)}>샘플 초기화</button></footer>
    </div>
    {notice && <div className="toast" role="status"><Icon name="info" size={18}/><span>{notice}</span><button aria-label="알림 닫기" className="icon-button" onClick={() => setNotice('')}><Icon name="close" size={16}/></button></div>}
    {confirmReset && <Modal title="시연을 처음부터 다시 시작할까요?" onClose={() => setConfirmReset(false)}><p>이 브라우저에서 추가·수정한 요청과 결재 이력을 기본 샘플 7건으로 바꿉니다.</p><div className="dialog-actions"><button className="button secondary" onClick={() => setConfirmReset(false)}>취소</button><button className="button primary" onClick={() => { reset(); setConfirmReset(false); navigate('/'); }}>샘플 초기화</button></div></Modal>}
  </div>;
}

function Dashboard() {
  const { requests, role } = useWorkspace();
  const personal = requests.filter(r => role === 'staff' ? ['draft', 'revision', 'approved'].includes(r.status) : canReview(r, role));
  const priority = { revision: 0, approved: 1, draft: 2 };
  personal.sort((a, b) => (priority[a.status] ?? 0) - (priority[b.status] ?? 0));
  const waiting = requests.filter(r => ['team', 'director'].includes(r.status));
  const stats = [
    { label: '내 처리 대기', count: personal.length, hint: role === 'staff' ? '작성·보완·발주 준비' : `${ROLES[role]} 승인 필요`, icon: 'approval', url: role === 'staff' ? '/requests?status=action' : '/approvals', accent: true },
    { label: '결재 진행', count: waiting.length, hint: '팀장 → 사장님', icon: 'clock', url: '/requests?status=waiting' },
    { label: '발주 대기', count: requests.filter(r => r.status === 'approved').length, hint: '최종 승인 완료', icon: 'box', url: '/orders?status=approved' },
    { label: '발주 기록', count: requests.filter(r => r.status === 'ordered').length, hint: '샘플 전체 기간', icon: 'check', url: '/orders?status=ordered' },
  ];
  return <>
    <PageHead eyebrow="WORK OVERVIEW" title="업무 현황" action={role === 'staff' && <Link className="button primary" to="/requests/new"><Icon name="plus" size={18}/>구매 요청 작성</Link>}>요청부터 발주까지, 다음 할 일을 놓치지 않도록.</PageHead>

    <section className="stats-grid" aria-label="구매 현황">{stats.map(s => <Link to={s.url} key={s.label} className={`stat-card ${s.accent ? 'accent' : ''}`}><div className="stat-label">{s.label}<Icon name={s.icon} size={19}/></div><strong>{s.count}<small>건</small></strong><p>{s.hint}<Icon name="arrow" size={16}/></p></Link>)}</section>
    <div className="dashboard-grid"><section className="panel action-panel"><div className="panel-head"><div><h2>지금 처리할 요청 <span className="count">{personal.length}</span></h2><p>{ROLES[role]} 역할에서 할 수 있는 업무입니다.</p></div><Link className="subtle-link" to={role === 'staff' ? '/requests?status=action' : '/approvals'}>전체 보기<Icon name="arrow" size={16}/></Link></div>
      <div className="action-list">{personal.slice(0, 4).map(r => <Link to={`/requests/${r.id}`} key={r.id} className="action-row"><span className={`row-icon ${STATUS[r.status].tone}`}><Icon name={r.status === 'approved' ? 'box' : 'file'} size={21}/></span><div className="action-copy"><div className="row-topline"><span className="mono">{r.id}</span><Badge status={r.status}/></div><h3>{r.title || '제목 없는 요청'}</h3><p>{r.status === 'revision' ? r.reason : `${money(amount(r))} · 필요일 ${r.needBy ? day(r.needBy) : '미정'}`}</p></div><span className="row-action">{nextAction(r, role)}<Icon name="arrow" size={17}/></span></Link>)}{!personal.length && <Empty title="지금 처리할 요청이 없습니다."><p>다른 역할로 전환하면 다음 결재를 이어볼 수 있습니다.</p></Empty>}</div>
    </section><section className="panel waiting-panel"><div className="panel-head"><div><h2>결재 진행 중</h2><p>현재 확인할 사람과 대기 시작일</p></div></div><div className="waiting-list">{waiting.map(r => <Link to={`/requests/${r.id}`} key={r.id}><div className="row-topline"><span className="mono">{r.id}</span><span className="waiting-since">{day(r.updatedAt)}부터</span></div><h3>{r.title}</h3><div className="waiting-person"><span className="person-dot">{owner(r).slice(0, 1)}</span><span>{owner(r)} 확인 대기</span><Icon name="arrow" size={16}/></div></Link>)}{!waiting.length && <Empty title="진행 중인 결재가 없습니다."/>}</div><div className="quiet-note"><Icon name="info" size={17}/><span>승인 완료와 발주 완료를 구분합니다.<br/>승인된 요청은 ‘발주 준비’에서 이어가세요.</span></div></section></div>
    <section className="overview-banner" aria-label="구매 업무 흐름"><div><span className="tiny-label">하나의 요청, 이어지는 업무</span><h2>구매의 흐름을 <br/>한 선으로 잇다.</h2><Link to="/about">이 업무 공간의 설계 기준<Icon name="arrow" size={16}/></Link></div><ol className="process-line">{[['01', '요청 정리', '구매 담당자'], ['02', '팀장 결재', '1차 확인'], ['03', '사장님 결재', '최종 승인'], ['04', '발주 기록', '구매 담당자']].map(([n, name, sub], i) => <li key={n}><span className={`process-node node-${i}`}>{i === 3 ? <Icon name="check" size={17}/> : n}</span><strong>{name}</strong><small>{sub}</small></li>)}</ol></section>
    <section className="demo-help"><div><span className="demo-pill">TRY IT</span><p><strong>직접 업무 흐름을 확인해 보세요.</strong> 요청 작성 → 상단 역할을 팀장·사장님으로 전환 → 승인 → 구매 담당자로 발주 기록</p></div><Link to="/about" className="subtle-link">시연 안내<Icon name="arrow" size={16}/></Link></section>
  </>;
}

function RequestList({ mode = 'requests' }) {
  const { requests, role } = useWorkspace();
  const [params, setParams] = useSearchParams();
  const query = params.get('q') || '';
  const status = params.get('status') || 'all';
  const setParam = (key, value) => { const next = new URLSearchParams(params); value && value !== 'all' ? next.set(key, value) : next.delete(key); setParams(next, { replace: true }); };
  const config = mode === 'approvals' ? { title: '결재함', eyebrow: 'APPROVAL INBOX', description: role === 'staff' ? '결재 진행 상황을 확인하세요. 승인 시연은 팀장·사장님 역할에서 가능합니다.' : '내 결재 차례의 요청을 검토하고 승인·보완·반려를 기록하세요.', tabs: [['all', '전체'], ['team', '팀장 결재'], ['director', '사장님 결재']] } : mode === 'orders' ? { title: '발주 준비', eyebrow: 'ORDER HANDOFF', description: '최종 승인된 내용으로 발주 문안을 준비하고 기록을 남깁니다.', tabs: [['all', '전체'], ['approved', '발주 대기'], ['ordered', '발주 기록 완료']] } : { title: '구매 요청', eyebrow: 'PURCHASE REQUESTS', description: '요청 내용과 진행 상태를 하나의 기록으로 확인하세요.', tabs: [['all', '전체'], ['action', '내 처리 대기'], ['waiting', '결재 진행'], ['approved', '발주 대기'], ['closed', '처리 완료']] };
  let base = requests.filter(r => mode === 'approvals' ? ['team', 'director'].includes(r.status) : mode === 'orders' ? ['approved', 'ordered'].includes(r.status) : true);
  const matches = (r, value) => value === 'all' || (value === 'action' ? (role === 'staff' ? ['draft', 'revision', 'approved'].includes(r.status) : canReview(r, role)) : value === 'waiting' ? ['team', 'director'].includes(r.status) : value === 'closed' ? ['ordered', 'rejected'].includes(r.status) : r.status === value);
  const shown = base.filter(r => matches(r, status) && `${r.title} ${r.id} ${r.items.map(i => i.name).join(' ')} ${r.supplier}`.toLowerCase().includes(query.toLowerCase()));
  return <><PageHead eyebrow={config.eyebrow} title={config.title} action={role === 'staff' && <Link className="button primary" to="/requests/new"><Icon name="plus" size={18}/>구매 요청 작성</Link>}>{config.description}</PageHead>
    {mode === 'approvals' && role !== 'staff' && <div className="inline-note"><Icon name="approval"/><span><strong>{ROLES[role]} 검토 대상 {base.filter(r => canReview(r, role)).length}건</strong> · 해당 결재 단계의 요청만 처리할 수 있습니다.</span></div>}
    <section className="panel requests-panel"><div className="list-toolbar"><div className="filter-tabs" aria-label="상태 필터">{config.tabs.map(([key, label]) => <button key={key} className={status === key ? 'active' : ''} aria-pressed={status === key} onClick={() => setParam('status', key)}>{label}<span>{base.filter(r => matches(r, key)).length}</span></button>)}</div><label className="list-search"><Icon name="search" size={18}/><input aria-label="현재 목록 검색" placeholder="요청명·품목·번호 검색" value={query} onChange={e => setParam('q', e.target.value)}/>{query && <button className="icon-button" aria-label="검색어 지우기" onClick={() => setParam('q', '')}><Icon name="close" size={16}/></button>}</label></div>
    <div className="list-caption"><span>총 <strong>{shown.length}</strong>건</span><span>금액은 부가세 포함 · 샘플 데이터</span></div>
    <div className="request-table"><div className="table-heading" aria-hidden="true"><span>구매 요청</span><span>합계 금액</span><span>필요일</span><span>진행 상태</span><span>현재 담당</span><span/></div>{shown.map(r => <Link className="request-table-row" key={r.id} to={`/requests/${r.id}`} state={{ from: `${mode === 'requests' ? '/requests' : `/${mode}`}${params.size ? `?${params}` : ''}`, fromLabel: config.title }}><div className="request-title-cell"><span className="mono">{r.id} <span>· {r.department}</span></span><h2>{r.title || '제목 없는 요청'}</h2><small>{r.items.map(i => i.name || '미입력 품목').join(', ')}</small></div><span className="table-amount"><small>합계 </small>{money(amount(r))}</span><span className="table-date"><small>필요일 </small>{r.needBy ? day(r.needBy) : '미정'}</span><span className="table-status"><Badge status={r.status}/></span><span className="table-owner">{owner(r)}</span><Icon name="arrow" size={18}/></Link>)}</div>
    {!shown.length && <Empty title={query ? '검색 결과가 없습니다.' : '해당 상태의 요청이 없습니다.'}><p>검색어 또는 상태 필터를 바꿔 보세요.</p><button className="button secondary" onClick={() => setParams({})}>전체 요청 보기</button></Empty>}</section></>;
}

function RequestDetail() {
  const { id } = useParams();
  const { requests, role, act, setNotice } = useWorkspace();
  const request = requests.find(r => r.id === id);
  const [dialog, setDialog] = useState('');
  const [reason, setReason] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  if (!request) return <><PageHead eyebrow="REQUEST NOT FOUND" title="요청을 찾을 수 없습니다."/><Link className="button primary" to="/requests">구매 요청으로</Link></>;
  const editable = canEdit(request, role), reviewable = canReview(request, role), approved = request.status === 'approved', ordered = request.status === 'ordered';
  const duplicates = similarRequests(request, requests);
  const open = action => { setReason(''); setError(''); setDialog(action); };
  const execute = () => {
    try {
      const result = act(id, dialog, { reason, reference: reason });
      setDialog('');
      setNotice(dialog === 'approve' ? `${ROLES[role]} 승인 시연을 기록했습니다.` : dialog === 'order' ? '발주 시연 기록을 남겼습니다. 실제 메일은 보내지 않았습니다.' : '처리 내용을 이력에 기록했습니다.');
      if (dialog === 'amend') navigate(`/requests/${result.id}/edit`);
    } catch (e) { setError(e.message); document.querySelector('dialog textarea')?.focus(); }
  };
  const titles = { approve: `${ROLES[role]} 승인을 기록할까요?`, revise: '어떤 내용을 보완해야 하나요?', reject: '반려 사유를 남겨 주세요.', amend: '승인된 요청의 내용을 변경할까요?', order: '발주 시연 기록을 남길까요?' };
  const currentIndex = ['draft', 'revision', 'rejected'].includes(request.status) ? 0 : request.status === 'team' ? 1 : request.status === 'director' ? 2 : 3;
  return <><Link className="back-link" to={location.state?.from || '/requests'}><Icon name="back" size={17}/>{location.state?.fromLabel || '구매 요청'}으로</Link>
    <PageHead eyebrow={`${request.id} / ${request.revision}차 요청서`} title={request.title || '제목 없는 요청'} action={<Badge status={request.status}/>}>{request.department} · 작성 {day(request.createdAt)} · 최근 변경 {timestamp(request.updatedAt)}</PageHead>
    <section className="detail-progress" aria-label="이 요청의 진행 단계">{['요청 정리', '팀장 결재', '사장님 결재', '발주 기록'].map((label, i) => <div key={label} className={`${i < currentIndex || ordered ? 'complete' : ''} ${i === currentIndex && !ordered ? 'current' : ''}`}><span>{i < currentIndex || ordered ? <Icon name="check" size={15}/> : `0${i + 1}`}</span><strong>{label}</strong><small>{i === currentIndex ? ordered ? '완료' : request.status === 'approved' ? '구매 담당자 처리 대기' : ['team', 'director'].includes(request.status) ? '확인 대기' : STATUS[request.status].label : i < currentIndex ? '완료' : '대기'}</small></div>)}</section>
    {['revision', 'rejected'].includes(request.status) && <div className="reason-banner"><Icon name="info"/><div><strong>{request.status === 'revision' ? '보완 요청 사유' : '반려 사유'}</strong><p>{request.reason}</p></div></div>}
    <div className="detail-grid"><div className="detail-content"><section className="panel"><div className="panel-head"><h2>구매 요청서</h2><span className="muted">{request.revision}차 · {request.status === 'draft' ? '작성 중' : '요청 내용'}</span></div><div className="panel-body"><dl className="request-facts"><div><dt>요청 부서</dt><dd>{request.department || '미입력'}</dd></div><div><dt>희망 납기일</dt><dd>{request.needBy || '미입력'}</dd></div><div className="full"><dt>검토 거래처</dt><dd>{request.supplier || '미입력'}</dd></div><div className="full"><dt>구매 사유</dt><dd>{request.purpose || '미입력'}</dd></div></dl><div className="item-table"><div className="item-head"><span>품목 / 규격</span><span>수량</span><span>단가</span><span>금액</span></div>{request.items.map((item, i) => <div className="item-row" key={i}><div><strong>{item.name || '품목 미입력'}</strong><small>{item.spec || '규격 미입력'}</small></div><span><small>수량 </small>{item.quantity || '—'}</span><span><small>단가 </small>{money(item.price)}</span><strong><small>금액 </small>{money(Number(item.quantity) * Number(item.price))}</strong></div>)}</div><div className="total-line"><span>총 요청 금액 <small>부가세 포함</small></span><strong>{money(amount(request))}</strong></div></div></section>
    {duplicates.length > 0 && !ordered && <section className="duplicate-note"><Icon name="info"/><div><h3>같은 품목의 진행 중인 요청 {duplicates.length}건</h3><p>품목명이 같은 요청입니다. 규격·수량·사용 목적을 비교해 중복 여부를 확인하세요.</p>{duplicates.map(r => <Link key={r.id} to={`/requests/${r.id}`}>{r.id} · {r.title}<Icon name="arrow" size={16}/></Link>)}</div></section>}
    {request.source && <details className="panel source-details"><summary>입력 원문 확인<span>요청 내용의 근거</span></summary><pre>{request.source}</pre></details>}
    {(approved || ordered) && <section className="panel order-panel"><div className="panel-head"><div><h2>발주 문안</h2><p>최종 승인된 {request.approvedSnapshot?.revision}차 요청서를 기준으로 작성했습니다.</p></div><button className="button secondary compact" onClick={async () => { try { await navigator.clipboard.writeText(orderMessage(request)); setNotice('시연용 발주 문안을 복사했습니다.'); } catch { setNotice('복사 권한을 사용할 수 없습니다. 아래 문안을 직접 선택해 복사해 주세요.'); } }}><Icon name="copy" size={16}/>문안 복사</button></div><pre className="order-copy" tabIndex="0" aria-label="시연용 발주 문안">{orderMessage(request)}</pre><p className="panel-note">실제 메일은 전송하지 않습니다. 발주 기록도 이 브라우저에만 저장됩니다.</p></section>}
    </div><aside className="detail-aside"><section className="panel next-panel"><div className="panel-head"><h2>다음 할 일</h2></div><div className="panel-body"><span className="tiny-label">현재 담당</span><h3>{owner(request)}</h3><p>{editable ? '내용을 확인하고 팀장 결재를 요청하세요.' : reviewable ? '품목·금액·구매 사유를 확인한 뒤 처리하세요.' : approved ? '승인된 내용으로 발주 문안을 확인하고 시연 기록을 남기세요.' : ordered ? '발주 시연 기록이 완료되었습니다.' : request.status === 'rejected' ? '반려된 요청입니다. 필요한 경우 새로운 요청을 작성하세요.' : `${owner(request)}의 확인을 기다리고 있습니다.`}</p>
      {editable && <Link className="button primary block" to={`/requests/${id}/edit`}>{nextAction(request, role)}<Icon name="arrow" size={17}/></Link>}
      {reviewable && <><button className="button primary block" onClick={() => open('approve')}><Icon name="check" size={18}/>승인하기</button><div className="paired-buttons"><button className="button secondary" onClick={() => open('revise')}>보완 요청</button><button className="button secondary" onClick={() => open('reject')}>반려</button></div></>}
      {approved && role === 'staff' && <><button className="button primary block" onClick={() => open('order')}>발주 기록 남기기<Icon name="arrow" size={17}/></button><button className="text-button amend-button" onClick={() => open('amend')}>요청 내용 변경·재결재</button></>}
      {ordered && <div className="completed-note"><Icon name="check" size={19}/><span>{request.order.reference}<small>{timestamp(request.order.at)} · 실제 전송 없음</small></span></div>}
      {!editable && !reviewable && !ordered && request.status !== 'rejected' && owner(request) !== ROLES[role] && <p className="role-hint">상단 ‘시연 역할’을 {owner(request)}{owner(request) === '구매 담당자' ? '로' : '으로'} 바꾸면 다음 업무를 이어볼 수 있습니다.</p>}
    </div></section><section className="panel history-panel"><div className="panel-head"><h2>처리 이력</h2><span className="muted">{request.events.length}개</span></div><ol>{[...request.events].reverse().map((event, i) => <li key={`${event.at}-${i}`}><span className="history-dot"/><div><div className="history-meta"><strong>{event.actor}</strong><span>{event.revision}차</span></div><p>{event.message}</p><time dateTime={event.at}>{timestamp(event.at)}</time></div></li>)}</ol></section>
    {request.submissions.length > 0 && <details className="panel snapshots"><summary>제출 기록 <span>{request.submissions.length}건</span></summary>{request.submissions.map((snapshot, i) => <div key={i}><strong>{snapshot.revision}차 제출 · {timestamp(snapshot.at)}</strong><p>{snapshot.title} · {money(amount(snapshot))}</p><small>{snapshot.items.map(item => `${item.name} (${item.spec}) ${item.quantity}개`).join(', ')}</small></div>)}</details>}
    </aside></div>
    {dialog && <Modal title={titles[dialog]} onClose={() => setDialog('')}><p>{dialog === 'approve' ? `${request.title} · ${money(amount(request))}. ${role === 'manager' ? '승인 후 사장님 결재 단계로 넘어갑니다.' : '최종 승인 후 구매 담당자가 발주를 준비합니다.'}` : dialog === 'amend' ? '기존 승인 이력은 보관합니다. 수정한 내용은 팀장·사장님의 결재를 다시 받아야 발주할 수 있습니다.' : dialog === 'order' ? '메일을 실제로 보내지 않고 발주 준비를 마쳤다는 시연 기록만 남깁니다.' : '입력한 사유는 구매 담당자에게 표시되고 처리 이력에 남습니다.'}</p>{['revise', 'reject', 'order'].includes(dialog) && <label className="field">{dialog === 'order' ? '발주 기록 메모' : '사유'} <span className="required">필수</span><textarea autoFocus rows="3" value={reason} onChange={e => setReason(e.target.value)} placeholder={dialog === 'order' ? '예: 승인 내용과 납기일 확인 후 발주 문안 준비' : '수정하거나 확인할 내용을 구체적으로 적어 주세요.'} maxLength="500"/></label>}{error && <p className="form-error" role="alert">{error}</p>}<div className="dialog-actions"><button className="button secondary" onClick={() => setDialog('')}>취소</button><button className="button primary" onClick={execute}>{dialog === 'approve' ? '승인 기록' : dialog === 'amend' ? '내용 변경 시작' : dialog === 'order' ? '시연 기록 완료' : '사유 전달'}</button></div></Modal>}
  </>;
}

function About() {
  return <><PageHead eyebrow="WHY THIS WORKSPACE" title="흩어진 구매 업무를 한 요청으로." >엑셀·메일·종이 결재로 이어졌던 실무 경험에서 출발했습니다.</PageHead><section className="about-intro panel"><span className="tiny-label">구매 담당자의 경험 → 화면의 규칙</span><h2>내용을 다시 옮겨 적고,<br/>어디까지 승인됐는지 묻던 일을 줄이기 위해.</h2><p>요청 내용을 직접 확인하고 결재 서류를 작성한 뒤, 팀장과 사장님의 승인을 받아 거래처에 발주를 전달했던 경험을 웹의 업무 흐름으로 재구성했습니다.</p><p>이 시연의 주 사용자는 그 과정을 이어주는 구매·총무 담당자입니다.</p></section><div className="about-rules">{[
      ['01', '복잡한 요청 양식', '원문은 남기고, 입력은 한 번만.', '요청 문장을 초안으로 옮기고 빠진 값은 직접 확인합니다. 제출한 품목·금액은 결재와 발주 문안에 이어집니다.'],
      ['02', '보이지 않는 결재 현황', '현재 담당과 다음 행동을 함께.', '팀장·사장님 결재를 분리하고 이력을 남깁니다. 보완 사유를 전달하며, 승인 후 내용을 바꾸면 재결재합니다.'],
      ['03', '중복 구매 가능성', '같은 품목은 알려주고 판단은 사람에게.', '진행 중인 요청 중 품목명이 같은 기록을 보여줍니다. 규격과 용도가 다를 수 있어 자동으로 차단하지 않습니다.'],
    ].map(([n, pain, rule, body]) => <section className="panel" key={n}><span className="rule-number">{n}</span><span className="tiny-label">핵심 문제 · {pain}</span><h2>{rule}</h2><p>{body}</p></section>)}</div><section className="panel about-demo"><div className="panel-head"><h2>직접 확인하는 시연</h2><span className="demo-pill">DEMO</span></div><ol><li><strong>구매 담당자</strong><span>새 요청 작성 → 샘플 원문 불러오기 → 초안 확인 → 필수 정보 입력 → 결재 요청</span></li><li><strong>팀장 → 사장님</strong><span>상단의 시연 역할을 바꿔 결재함에서 차례로 승인. 보완·반려도 시연 가능</span></li><li><strong>구매 담당자</strong><span>발주 준비 → 승인된 문안 확인·복사 → 발주 시연 기록</span></li></ol><div className="about-limits"><h3>구현 범위와 한계</h3><p>샘플과 변경 내용은 이 브라우저에만 저장됩니다. 역할 전환은 로그인이나 권한 인증이 아닙니다. 실제 업무 자료·개인정보는 입력하지 마세요.</p><p>초안 생성은 정해진 항목을 읽는 규칙 기반 시연으로 실제 AI에 연결되지 않았습니다. 결재·발주는 샘플 상태 변경이며 실제 알림·메일·업체 주문은 실행하지 않습니다.</p><p>처리 시간 단축이나 중복 구매 감소는 아직 측정하지 않았습니다. 실제 서비스에는 계정 권한, 서버 저장, 감사 기록, AI 검증이 추가로 필요합니다.</p></div><Link className="button primary" to="/requests/new">요청 작성부터 시작<Icon name="arrow" size={18}/></Link></section></>;
}

const router = createHashRouter([{ path: '*', element: <WorkspaceProvider><Shell/></WorkspaceProvider> }]);
export default function ProcurementApp() { return <RouterProvider router={router}/>; }
