import { revisionChanges } from './revisions';

export default function RevisionChanges({ request }) {
  if (request.revision < 2) return null;
  const { previous, changes } = revisionChanges(request);
  const currentLabel = `${request.revision}차 ${['draft', 'revision'].includes(request.status) ? '작성 중' : '요청서'}`;
  return <section className="panel revision-panel" aria-labelledby="revision-heading">
    <div className="panel-head"><div><h2 id="revision-heading">이번에 바뀐 내용</h2><p>{previous ? `${previous.revision}차 제출본 → ${currentLabel}` : currentLabel}</p></div><span className="revision-mark" aria-hidden="true">{String(request.revision).padStart(2, '0')}</span></div>
    {!previous ? <p className="revision-empty">이전 제출 기록이 없어 변경 내용을 비교할 수 없습니다.</p> : !changes.length ? <p className="revision-empty">이전 제출본과 같은 내용입니다.</p> : <table className="revision-table">
      <caption className="sr-only">{previous.revision}차 제출본과 비교한 변경 항목</caption>
      <thead><tr><th scope="col">변경 항목</th><th scope="col">이전 · {previous.revision}차</th><th scope="col">현재 · {request.revision}차</th></tr></thead>
      <tbody>{changes.map((change, index) => <tr key={`${change.label}-${index}`}><th scope="row">{change.label}</th><td><span className="mobile-cell-label" aria-hidden="true">이전</span>{change.before}</td><td><span className="mobile-cell-label" aria-hidden="true">현재</span>{change.after}</td></tr>)}</tbody>
    </table>}
  </section>;
}
