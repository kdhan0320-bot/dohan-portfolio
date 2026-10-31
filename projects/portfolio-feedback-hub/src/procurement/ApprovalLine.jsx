import Icon from './Icons';
import { owner, ROLES, rejectionStep } from './model';
import { purchaseSteps } from './inventory';

export default function ApprovalLine({ data, request }) {
  const steps = purchaseSteps(data, request);
  const current = steps.find(step => step.state === 'current');
  const currentOwner = request.status === 'ordered' ? ROLES.staff : owner(request);
  return <section className="approval-line with-request" aria-label="업무 진행">
    <div className="approval-line-caption"><h2>업무 진행</h2>
      {current && <span className="line-owner">현재 담당 <strong>{currentOwner}</strong></span>}
      {request.status === 'rejected' && rejectionStep(request) === null && <span className="line-owner">반려 단계 기록 없음</span>}
    </div>
    <ol>{steps.map(({ label, state, detail }) => <li key={label} className={state} aria-current={state === 'current' ? 'step' : undefined}>
      <span className="line-node" aria-hidden="true">{state === 'complete' ? <Icon name="check" size={14}/> : state === 'rejected' ? <Icon name="close" size={14}/> : null}</span>
      <span className="line-step">{label.split(' ').map((word, i) => <span key={word}>{i > 0 ? ' ' : ''}{word}</span>)}</span>
      <small title={detail}>{state === 'stopped' ? '중단' : detail}</small>
    </li>)}</ol>
  </section>;
}
