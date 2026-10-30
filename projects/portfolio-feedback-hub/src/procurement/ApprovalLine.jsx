import Icon from './Icons';
import { owner, STATUS } from './model';

const steps = ['요청 정리', '팀장 결재', '사장님 결재', '발주 기록'];

export default function ApprovalLine({ request }) {
  const current = !request ? -1 : ['draft', 'revision', 'rejected'].includes(request.status) ? 0 : request.status === 'team' ? 1 : request.status === 'director' ? 2 : 3;
  const done = request?.status === 'ordered';
  return <section className={`approval-line ${request ? 'with-request' : 'overview-line'}`} aria-label={request ? '이 요청의 결재선' : '구매 업무 결재선'}>
    <div className="approval-line-caption">
      <span>{request ? <><strong className="mono">{request.id}</strong><span>{request.revision}차{['draft', 'revision'].includes(request.status) ? ' 작성 중' : ' 요청서'}</span></> : <><strong>한 요청의 결재선</strong><span>확인한 정보를 다음 담당자에게</span></>}</span>
      {request && <span className="line-owner">{done || request.status === 'rejected' ? STATUS[request.status].label : <>현재 담당 <strong>{owner(request)}</strong></>}</span>}
    </div>
    <ol>{steps.map((label, index) => {
      const complete = request && (index < current || done);
      const active = index === current && !done;
      return <li key={label} className={`${complete ? 'complete' : ''} ${active ? 'current' : ''}`} aria-current={active ? 'step' : undefined}>
        <span className="line-node" aria-hidden="true">{complete ? <Icon name="check" size={14}/> : `0${index + 1}`}</span>
        <span className="line-step">{label}</span>
        {request && <small>{complete ? '완료' : active ? request.status === 'approved' ? '처리 대기' : ['team', 'director'].includes(request.status) ? '확인 대기' : STATUS[request.status].label : '대기'}</small>}
      </li>;
    })}</ol>
  </section>;
}
