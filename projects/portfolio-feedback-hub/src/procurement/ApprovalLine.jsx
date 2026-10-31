import Icon from './Icons';
import { owner, STATUS, approvalSteps, rejectionStep } from './model';

export default function ApprovalLine({ request }) {
  const done = request?.status === 'ordered';
  const rejected = request?.status === 'rejected';
  return <section className={`approval-line ${request ? 'with-request' : 'overview-line'}`} aria-label={request ? '이 요청의 결재선' : '구매 업무 결재선'}>
    <div className="approval-line-caption">
      <span>{request ? <><strong className="mono">{request.id}</strong><span>{request.revision}차{['draft', 'revision'].includes(request.status) ? ' 작성 중' : ' 요청서'}</span></> : <><strong>한 요청의 결재선</strong><span>확인한 정보를 다음 담당자에게</span></>}</span>
      {request && <span className="line-owner">{done || rejected ? <>{STATUS[request.status].label}{rejected && rejectionStep(request) === null ? ' · 반려 단계 기록 없음' : ''}</> : <>현재 담당 <strong>{owner(request)}</strong></>}</span>}
    </div>
    <ol>{approvalSteps(request).map(({ label, state, detail }, index) => {
      return <li key={label} className={state} aria-current={state === 'current' ? 'step' : undefined}>
        <span className="line-node" aria-hidden="true">{state === 'complete' ? <Icon name="check" size={14}/> : state === 'rejected' ? <Icon name="close" size={14}/> : `0${index + 1}`}</span>
        <span className="line-step">{label}</span>
        {request && <small>{detail}</small>}
      </li>;
    })}</ol>
  </section>;
}
