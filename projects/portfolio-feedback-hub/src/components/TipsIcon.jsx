export default function TipsIcon({ name = 'right', className = '' }) {
  return <svg className={`tips-icon ${className}`} viewBox="0 0 20 20" fill="none" aria-hidden="true" focusable="false">
    {name === 'right' && <path d="M4 10h12m-5-5 5 5-5 5" />}
    {name === 'left' && <path d="M16 10H4m5-5-5 5 5 5" />}
    {name === 'chevron' && <path d="m8 5 5 5-5 5" />}
    {name === 'play' && <path d="m7 4 9 6-9 6V4Z" />}
    {name === 'previous' && <><path d="M4 5v10m11-10-8 5 8 5V5Z" /></>}
    {name === 'next' && <><path d="M16 5v10M5 5l8 5-8 5V5Z" /></>}
  </svg>;
}
