import Icon from './Icons';
import { owner, approvalSteps, rejectionStep } from './model';

export default function ApprovalLine({ request }) {
  const closed = ['ordered', 'rejected'].includes(request.status);
  return <section className="approval-line with-request" aria-label="이 요청의 결재선">
    {(!closed || (request.status === 'rejected' && rejectionStep(request) === null)) && <div className="approval-line-caption">
      {!closed && <span className="line-owner">현재 담당 <strong>{owner(request)}</strong></span>}
      {request.status === 'rejected' && rejectionStep(request) === null && <span className="line-owner">반려 단계 기록 없음</span>}
    </div>}
    <ol>{approvalSteps(request).map(({ label, state, detail }) => {
      return <li key={label} className={state} aria-current={state === 'current' ? 'step' : undefined}>
        <span className="line-node" aria-hidden="true">{state === 'complete' ? <Icon name="check" size={14}/> : state === 'rejected' ? <Icon name="close" size={14}/> : null}</span>
        <span className="line-step">{label}</span>
        <small>{detail}</small>
      </li>;
    })}</ol>
  </section>;
}
