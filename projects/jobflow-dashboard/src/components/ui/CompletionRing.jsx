export default function CompletionRing({ completed, total }) {
  const percent = total ? Math.round(completed / total * 100) : 0;
  return <div className="completion-ring" role="progressbar" aria-label="전체 준비 완료율" aria-valuemin={0} aria-valuemax={100} aria-valuenow={percent} aria-valuetext={`${total}개 중 ${completed}개 완료`}>
    <svg viewBox="0 0 180 180" aria-hidden="true">
      <circle className="completion-track" cx="90" cy="90" r="74" />
      <circle className="completion-value" cx="90" cy="90" r="74" pathLength="100" strokeDasharray={`${percent} 100`} transform="rotate(-90 90 90)" />
    </svg>
    <div aria-hidden="true"><strong>{percent}<small>%</small></strong><span>전체 준비 완료</span></div>
  </div>;
}
