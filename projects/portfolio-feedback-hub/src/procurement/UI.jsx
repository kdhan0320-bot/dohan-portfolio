import { useEffect, useLayoutEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Icon from './Icons';
import { STATUS } from './model';
import { workflowStatus, materialTotals, orderProgress, qty } from './inventory';
import { listOrigin, rememberList } from './listNavigation';

export function ListLink({ to, state, id, children, ...props }) {
  const location = useLocation(), navigate = useNavigate();
  const open = event => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    const origin = { path: location.pathname + location.search, y: window.scrollY, focusId: id };
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
  const location = useLocation(), origin = listOrigin(location.state?.listOrigin, fallback);
  return <Link className="back-link" to={origin.path} state={{ restoreList: origin }}>{children}</Link>;
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
export function StockLedger({ data, materialId }) {
  const totals = materialTotals(data, materialId);
  return <div className="stock-ledger" role="group" aria-label="보유 수량 계산"><div><span><i aria-hidden="true"/>누적 입고</span><strong>{qty(totals.received)}</strong></div><span className="ledger-operator" aria-hidden="true">−</span><div><span><i aria-hidden="true"/>누적 지급</span><strong>{qty(totals.issued)}</strong></div><span className="ledger-operator" aria-hidden="true">=</span><div className="ledger-balance"><span><i aria-hidden="true"/>현재 보유</span><strong>{qty(totals.balance)}</strong></div></div>;
}
export function PageHead({ eyebrow, title, children, action }) {
  return <header className="page-head"><div>{eyebrow && <p className="eyebrow">{eyebrow}</p>}<h1 tabIndex="-1">{title}</h1>{children && <p className="page-description">{children}</p>}</div>{action}</header>;
}
export function Empty({ title = '표시할 기록이 없습니다.', children }) { return <div className="empty"><span className="empty-icon"><Icon name="file" size={28}/></span><h3>{title}</h3>{children}</div>; }
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
