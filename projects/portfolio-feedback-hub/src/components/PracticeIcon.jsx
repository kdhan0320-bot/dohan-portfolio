// Original interface symbols share one artboard and stroke weight.
export default function PracticeIcon({ name, className = '' }) {
  return <svg className={`practice-icon ${className}`} viewBox="0 0 16 16" fill="none" aria-hidden="true" focusable="false">
    {name === 'expand' && <path d="M6 2.5H2.5V6m7.5-3.5h3.5V6M2.5 10v3.5H6m7.5-3.5v3.5H10" />}
    {name === 'check' && <path d="m3.5 8 3 3 6-6" />}
    {name === 'plus' && <><path d="M3 8h10" /><path className="practice-icon-vertical" d="M8 3v10" /></>}
  </svg>;
}
