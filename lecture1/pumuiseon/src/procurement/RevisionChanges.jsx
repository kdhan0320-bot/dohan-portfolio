import { revisionChanges } from './revisions';

// Use the same comparison as the full table; never infer a change from the round alone.
export function RevisionSummary({ request }) {
  if (request.revision < 2) return null;
  const { previous, changes } = revisionChanges(request);
  const priority = change => / · 수량$/.test(change.label) ? 0 : change.label === '품의 합계' ? 1 : 2;
  const highlights = [...changes].sort((a, b) => priority(a) - priority(b)).slice(0, 2);
  const showComparison = () => {
    const heading = document.getElementById('revision-heading');
    heading?.focus({ preventScroll: true });
    heading?.scrollIntoView({ block: 'start', behavior: 'instant' });
  };
  return <section className="revision-summary" aria-label="이번 품의의 변경 요약">
    <h2>이번 변경 요약</h2>
    {!previous ? <p>이전 제출 기록이 없어 비교할 수 없습니다.</p> : !changes.length ? <p>이전 제출본과 같은 내용입니다.</p> : <dl>
      {highlights.map((change, index) => <div key={`${change.label}-${index}`}>
        <dt>{change.label}</dt>
        <dd><span><span className="sr-only">이전 </span>{change.before}</span><span className="revision-direction" aria-hidden="true">→</span><strong><span className="sr-only">현재 </span>{change.after}</strong></dd>
      </div>)}
    </dl>}
    {previous && changes.length > 0 && <button type="button" onClick={showComparison} aria-controls="revision-heading">전체 변경 {changes.length}건 보기</button>}
  </section>;
}

export default function RevisionChanges({ request }) {
  if (request.revision < 2) return null;
  const { previous, changes } = revisionChanges(request);
  const currentLabel = `${request.revision}차 ${['draft', 'revision'].includes(request.status) ? '작성 중' : '품의서'}`;
  return <section className="panel revision-panel" aria-labelledby="revision-heading">
    <div className="panel-head"><div><h2 id="revision-heading" tabIndex="-1" aria-describedby="revision-context">이번에 바뀐 내용</h2><p className="revision-request" id="revision-context">{request.title || '제목 없는 품의'}</p><p>{previous ? `${previous.revision}차 제출본 → ${currentLabel}` : currentLabel}</p></div><span className="revision-mark" aria-hidden="true">{String(request.revision).padStart(2, '0')}</span></div>
    {!previous ? <p className="revision-empty">이전 제출 기록이 없어 변경 내용을 비교할 수 없습니다.</p> : !changes.length ? <p className="revision-empty">이전 제출본과 같은 내용입니다.</p> : <table className="revision-table">
      <caption className="sr-only">{previous.revision}차 제출본과 비교한 변경 항목</caption>
      <thead><tr><th scope="col">변경 항목</th><th scope="col">이전 · {previous.revision}차</th><th scope="col">현재 · {request.revision}차</th></tr></thead>
      <tbody>{changes.map((change, index) => <tr key={`${change.label}-${index}`}><th scope="row">{change.label}</th><td><span className="mobile-cell-label" aria-hidden="true">이전</span>{change.before}</td><td><span className="mobile-cell-label" aria-hidden="true">현재</span>{change.after}</td></tr>)}</tbody>
    </table>}
  </section>;
}
