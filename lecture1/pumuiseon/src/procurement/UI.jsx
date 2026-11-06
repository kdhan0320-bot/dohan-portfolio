import { useEffect, useLayoutEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Icon from './Icons';
import useCompactViewport from './useCompactViewport';
import { STATUS } from './model';
import { workflowStatus, materialTotals, orderProgress, qty } from './inventory';
import { originReturn, listOrigin, plainClick, rememberList } from './listNavigation';

export function ListStatusFilter({ label, value, options, onChange, fallbackLabel = '지정된 상태' }) {
  const compact = useCompactViewport();
  if (compact) return <label className="request-status-filter">{label}
    <select value={value} onChange={event => onChange(event.target.value)}>
      {!options.some(option => option.key === value) && <option value={value}>{fallbackLabel}</option>}
      {options.map(({ key, label: text, count }) => <option key={key} value={key}>{text}{count != null ? ` · ${count}건` : ''}</option>)}
    </select>
  </label>;
  return <div className="filter-tabs" aria-label={label}>
    {options.map(({ key, label: text, count }) => <button key={key} className={value === key ? 'active' : ''}
      aria-pressed={value === key} onClick={() => onChange(key)}>{text}{count != null && <span>{count}</span>}</button>)}
  </div>;
}

export function ListLink({ to, state, id, children, ...props }) {
  const location = useLocation(), navigate = useNavigate();
  const open = event => {
    if (!plainClick(event)) return;
    event.preventDefault();
    const origin = { path: location.pathname + location.search, key: location.key, target: to, y: window.scrollY, focusId: id };
    rememberList(location.key, origin);
    navigate(to, { state: { ...state, listOrigin: origin } });
  };
  return <Link {...props} id={id} to={to} state={state} onClick={open}>{children}</Link>;
}
// Reserve the heavier label's size so hover does not change line wrapping.
export function LinkLabel({ children }) {
  return <span className="link-label" data-label={children}><span>{children}</span></span>;
}
export function ListBackLink({ fallback, children }) {
  const location = useLocation(), navigate = useNavigate();
  const home = originReturn(location, navigate, '/');
  if (home) return <Link className="back-link" {...home.linkProps}><Icon name="back" size={17}/>업무 현황으로</Link>;
  const origin = listOrigin(location.state?.listOrigin, fallback);
  return <Link className="back-link" to={origin.path} state={{ restoreList: origin }}>{children}</Link>;
}

export function DocumentNumber({ value }) {
  const prefix = value.split('-')[0];
  const series = { PR: '품의', PO: '발주', VN: '업체' }[prefix];
  if (!series) return <span>{value}</span>;
  return (
    <span className="ledger-number" data-series={prefix}>
      <span className="ledger-series">{series}</span>{' '}
      <span>{value}</span>
    </span>
  );
}

export function Badge({ status }) { return <StateTag tone={STATUS[status].tone}>{STATUS[status].label}</StateTag>; }
export function StateTag({ tone = 'gray', children }) { return <span className={`badge ${tone}`}><span/>{children}</span>; }
export function WorkflowStatus({ data, request, quantity = true }) {
  const status = workflowStatus(data, request);
  return <span className="workflow-status"><span className="workflow-tags"><StateTag tone={status.tone}>{status.label}</StateTag>{status.late && <span className="late-flag">입고 지연</span>}</span>{quantity && status.detail && <small className="workflow-detail">{status.detail}</small>}</span>;
}
export function ReceiptProgress({ data, request }) {
  if (request.status !== 'ordered') return null;
  const progress = orderProgress(data, request);
  const portion = progress.ordered ? Math.min(100, progress.received / progress.ordered * 100) : 0;
  return <div className="receipt-progress" role="img" aria-label={`발주 ${qty(progress.ordered)} 중 입고 ${qty(progress.received)}, 미입고 ${qty(progress.remaining)}`}><span style={{ width: `${portion}%` }}/></div>;
}
export function StockLedger({ data, materialId, receivedLabel = '누적 입고', issuedLabel = '누적 지급' }) {
  const totals = materialTotals(data, materialId);
  return <div className="stock-ledger" role="group" aria-label="보유 수량 계산">
    <div><span><i aria-hidden="true"/>{receivedLabel}</span><strong>{qty(totals.received)}</strong></div>
    <span className="ledger-operator" aria-hidden="true">−</span>
    <div><span><i aria-hidden="true"/>{issuedLabel}</span><strong>{qty(totals.issued)}</strong></div>
    <span className="ledger-operator" aria-hidden="true">=</span>
    <div className="ledger-balance"><span><i aria-hidden="true"/>현재 보유</span><strong>{qty(totals.balance)}</strong></div>
  </div>;
}

export function MaterialLedgerLinks({ materials, requestId }) {
  if (!materials.length) return null;
  return <div className="ledger-handoff">
    <div>
      <h3>현장 지급</h3>
      <p>입고는 발주별로 기록하고, 지급한 수량은 같은 자재의 전체 재고에서 뺍니다.</p>
    </div>
    <div className="ledger-destinations">
      {materials.map(material => (
        <ListLink key={material.id} id={`ledger-${requestId}-${material.id}`} to={`/materials/${material.id}#movement-history`}>
          {material.name}{materials.length > 1 && ` (${material.code})`} 장부 보기
        </ListLink>
      ))}
    </div>
  </div>;
}
function RegisterMark({ kind }) {
  return <svg className="register-mark" viewBox="0 0 72 54" aria-hidden="true" focusable="false">
    <g fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      {kind === 'purchase' ? <>
        <path d="M19 10h27l8 8v24H19zM46 10v9h8M15 16v30h33"/>
        <path d="M25 18h12M25 25h20M25 32h9"/>
        <path className="register-ink" d="m39 33 4 4 9-10"/>
      </> : kind === 'order' ? <>
        <path d="m14 22 16-8 16 8-16 8zM14 22v16l16 8 16-8V22M30 30v16M22 18l16 8"/>
        <path className="register-ink" d="M55 10v22m-6-6 6 6 6-6M49 40h12"/>
      </> : kind === 'material' ? <>
        <path d="M15 12v32M57 12v32M15 27h42M15 43h42M21 12h12v15H21zM39 12h12v15H39zM21 32h18v11H21z"/>
        <path className="register-ink" d="M26 16h3M44 16h3M27 36h6M46 33v7m-3-3 3 3 3-3"/>
      </> : <>
        <path d="M19 44V14l22-6v36M41 22h13v22M14 44h44M25 19h5M25 26h5M25 33h5M46 28h3M46 35h3"/>
        <path className="register-ink" d="M33 37h8v7M49 10h11v8H49zM52 14h5"/>
      </>}
    </g>
  </svg>;
}
export function PageHead({ eyebrow, title, children, action, register }) {
  return <header className={register ? 'page-head register-head' : 'page-head'}>
    <div>{register && <RegisterMark kind={register}/>}
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h1 tabIndex="-1">{title}</h1>
      {children && <p className="page-description">{children}</p>}
    </div>
    {action}
  </header>;
}
// Echoes the document register marks: a folded-corner slip with empty,
// dashed rows — the same "nothing recorded yet" idiom as 미입고 elsewhere.
function EmptyMark() {
  return <svg className="empty-mark" viewBox="0 0 28 28" aria-hidden="true" focusable="false">
    <g fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 4h10l4 4v16H7Z"/>
      <path d="M17 4v4h4"/>
      <path d="M10.5 14h7M10.5 18h4.5" strokeDasharray="2.2 2.6"/>
    </g>
  </svg>;
}
export function Empty({ title = '표시할 기록이 없습니다.', children }) { return <div className="empty"><span className="empty-icon"><EmptyMark/></span><h3>{title}</h3>{children}</div>; }
// Keep an explicit date format while retaining the browser's calendar picker.
export function DateInput({ label, value, onChange, onBlur, min, max, ...props }) {
  const picker = useRef(null), text = useRef(null);
  const normalize = value => /^\d{8}$/.test(value) ? `${value.slice(0, 4)}-${value.slice(4, 6)}-${value.slice(6)}` : value;
  const canPick = typeof HTMLInputElement !== 'undefined' && 'showPicker' in HTMLInputElement.prototype;
  return <span className="date-input">
    <input {...props} ref={text} type="text" aria-label={label} inputMode="numeric" autoComplete="off" placeholder="YYYY-MM-DD" maxLength={10} value={value} onChange={event => { const next = normalize(event.target.value); onChange(next === event.target.value ? event : { target: { value: next } }); }} onBlur={onBlur}/>
    {canPick && <><button type="button" className="date-picker-trigger" aria-label={`${label} 달력 열기`} onClick={() => picker.current.showPicker()}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 3v4M17 3v4M3 11h18M7 15h3"/></svg></button><input ref={picker} className="date-picker-native" type="date" value={/^\d{4}-\d{2}-\d{2}$/.test(value) ? value : ''} min={min} max={max} tabIndex={-1} aria-hidden="true" onChange={event => { onChange(event); text.current?.focus(); }}/></>}
  </span>;
}
export function Modal({ title, children, onClose, className = '', focusClose = false }) {
  const ref = useRef(null);
  useLayoutEffect(() => {
    const previous = document.activeElement, dialog = ref.current;
    dialog.showModal();
    (focusClose ? dialog.querySelector('.dialog-head button') : dialog.querySelector('input:not([readonly]),textarea,select') || dialog.querySelector('.dialog-actions .secondary'))?.focus();
    return () => { dialog.close(); if (previous?.isConnected) previous.focus(); else document.querySelector('h1')?.focus({ preventScroll: true }); };
  }, [focusClose]);
  return <dialog ref={ref} className={`dialog ${className}`} aria-labelledby="dialog-title" onCancel={e => { e.preventDefault(); onClose(); }}><div className="dialog-head"><h2 id="dialog-title">{title}</h2><button type="button" className="icon-button" onClick={onClose} aria-label="닫기"><Icon name="close"/></button></div>{children}</dialog>;
}
export function FormError({ children }) {
  const ref = useRef(null);
  useEffect(() => { if (children) ref.current?.focus(); }, [children]);
  return children ? <p className="form-error" role="alert" tabIndex="-1" ref={ref}>{children}</p> : null;
}
