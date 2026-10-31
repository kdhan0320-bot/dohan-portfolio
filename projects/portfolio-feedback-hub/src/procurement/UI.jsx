import { useEffect, useLayoutEffect, useRef } from 'react';
import Icon from './Icons';
import { STATUS } from './model';
import { workflowStatus, materialTotals, qty } from './inventory';

export function Badge({ status }) { return <StateTag tone={STATUS[status].tone}>{STATUS[status].label}</StateTag>; }
export function StateTag({ tone = 'gray', children }) { return <span className={`badge ${tone}`}><span/>{children}</span>; }
export function WorkflowStatus({ data, request, quantity = true }) {
  const status = workflowStatus(data, request);
  return <span className="workflow-status"><span className="workflow-tags"><StateTag tone={status.tone}>{status.label}</StateTag>{status.late && <span className="late-flag">입고 지연</span>}</span>{quantity && status.detail && <small>{status.detail}</small>}</span>;
}
export function StockLedger({ data, materialId }) {
  const totals = materialTotals(data, materialId);
  return <div className="stock-ledger" role="group" aria-label="보유 수량 계산"><div><span><i aria-hidden="true"/>누적 입고</span><strong>{qty(totals.received)}</strong></div><span className="ledger-operator" aria-hidden="true">−</span><div><span><i aria-hidden="true"/>누적 지급</span><strong>{qty(totals.issued)}</strong></div><span className="ledger-operator" aria-hidden="true">=</span><div className="ledger-balance"><span><i aria-hidden="true"/>현재 보유</span><strong>{qty(totals.balance)}</strong></div></div>;
}
export function PageHead({ eyebrow, title, children, action }) {
  return <header className="page-head"><div>{eyebrow && <p className="eyebrow">{eyebrow}</p>}<h1 tabIndex="-1">{title}</h1>{children && <p className="page-description">{children}</p>}</div>{action}</header>;
}
export function Empty({ title = '표시할 기록이 없습니다.', children }) { return <div className="empty"><span className="empty-icon"><Icon name="file" size={28}/></span><h3>{title}</h3>{children}</div>; }
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
