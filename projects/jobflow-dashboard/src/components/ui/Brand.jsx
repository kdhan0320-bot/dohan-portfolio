export function Brand({
  compact = false
}) {
  return <span className="brand">
  <svg width="32" height="36" viewBox="0 0 32 36" fill="none" aria-hidden="true">
    <path d="M5 3h15l7 7v23H5V3Z" fill="currentColor" />
    <path d="M20 3v8h7" stroke="#FFFDFA" strokeWidth="1.5" />
    <path d="M11 3v16l4-3 4 3V3" fill="#E9BBC3" />
    <path d="M11 25h10M11 29h6" stroke="#FFFDFA" strokeWidth="1.5" />
  </svg>
  {!compact && <span>갈피록<span className="brand-sub">개인 입사지원 관리</span></span>}
</span>;
}
export function PaperScene({
  className = ''
}) {
  return <svg className={`paper-scene ${className}`} viewBox="0 0 340 250" fill="none" aria-hidden="true">
  <ellipse cx="175" cy="225" rx="134" ry="13" fill="#524648" opacity=".12" />
  <path d="M46 216V119a110 110 0 0 1 220 0v97" fill="#D8C5C8" />
  <rect x="71" y="70" width="149" height="152" rx="6" transform="rotate(-13 71 70)" fill="#B5C8BD" />
  <rect x="123" y="37" width="148" height="181" rx="6" transform="rotate(9 123 37)" fill="#FEFCF8" stroke="#AD9195" />
  <path d="m216 52 27 4-9 56-12-11-15 7 9-56Z" fill="#94394B" />
  <path d="m138 92 47 8m-51 17 79 13m-83 12 89 14m-93 12 63 10" stroke="#C1ABAF" strokeWidth="4" strokeLinecap="round" />
  <circle cx="258" cy="191" r="26" fill="#94394B" />
  <path d="m245 190 9 9 17-20" stroke="#FFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
  <path d="M58 48v18m-9-9h18M292 124v12m-6-6h12" stroke="#826066" strokeWidth="2" />
</svg>;
}

/** Original vector composition: notebook, bookmark, and planning cards. */
export function JournalScene({ className = '' }) {
  return (
    <svg className={`journal-scene ${className}`} viewBox="0 0 520 340" fill="none" aria-hidden="true">
      <ellipse cx="275" cy="290" rx="186" ry="22" fill="#512E36" opacity=".08" />
      <circle cx="267" cy="160" r="140" fill="#DFD8D0" />
      <circle cx="267" cy="160" r="116" stroke="#C5AEB2" strokeWidth="1" strokeDasharray="3 8" />
      <g transform="translate(130 30) rotate(9 118 136)">
        <rect x="3" y="9" width="236" height="271" rx="14" fill="#512E36" opacity=".12" />
        <rect width="236" height="271" rx="12" fill="#7E6166" />
        <path d="M18 0v271" stroke="#B49A9E" strokeWidth="2" />
        <rect x="29" y="12" width="195" height="246" rx="5" fill="#FCF9F3" />
        <path d="M42 240h170M42 247h170" stroke="#DDD5D8" />
        <path d="M161 12h33v84l-16-11-17 11V12Z" fill="#B8959B" />
        <rect x="56" y="47" width="64" height="6" rx="3" fill="#BBA2A6" />
        <rect x="56" y="63" width="42" height="4" rx="2" fill="#D5C7C9" />
        <rect x="50" y="111" width="150" height="91" rx="7" fill="#EFECE8" />
        <rect x="64" y="126" width="12" height="12" rx="3" fill="#7E6166" />
        <path d="m67 131 3 3 4-5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M88 131h74" stroke="#AD8F94" strokeWidth="4" strokeLinecap="round" />
        <rect x="64" y="151" width="12" height="12" rx="3" fill="#7E6166" />
        <path d="m67 156 3 3 4-5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M88 156h59" stroke="#AD8F94" strokeWidth="4" strokeLinecap="round" />
        <rect x="64" y="176" width="12" height="12" rx="3" stroke="#AF9297" />
        <path d="M88 181h69" stroke="#C9B7BA" strokeWidth="4" strokeLinecap="round" />
        {[38, 80, 122, 164, 206, 244].map(y => <path key={y} d={`M11 ${y}h27`} stroke="#512E36" strokeWidth="5" strokeLinecap="round" />)}
      </g>
      <g transform="translate(34 176) rotate(-9)">
        <rect x="3" y="5" width="124" height="96" rx="10" fill="#512E36" opacity=".10" />
        <rect width="124" height="96" rx="10" fill="#FDFCFA" />
        <path d="M0 24h124" stroke="#E5E1DD" />
        <rect x="15" y="10" width="40" height="4" rx="2" fill="#B09599" />
        <path d="M18 42h14m15 0h14m15 0h14M18 59h14m15 0h14m15 0h14M18 76h14m15 0h14" stroke="#D0BFC2" strokeWidth="5" strokeLinecap="round" />
        <circle cx="84" cy="76" r="12" fill="#94394B" />
        <path d="m78 76 4 4 8-9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <g transform="translate(365 73) rotate(8)">
        <rect x="3" y="5" width="122" height="84" rx="11" fill="#512E36" opacity=".10" />
        <rect width="122" height="84" rx="11" fill="#D0DBD5" />
        <circle cx="29" cy="29" r="13" fill="#647F70" />
        <path d="m23 29 4 4 8-9" stroke="white" strokeWidth="2" strokeLinecap="round" />
        <path d="M52 23h48m-48 12h31M17 61h85" stroke="#91A89A" strokeWidth="4" strokeLinecap="round" />
      </g>
      <path d="M427 214c-8 17-18 25-33 29" stroke="#917176" strokeWidth="2" strokeLinecap="round" strokeDasharray="3 6" />
      <path d="m398 234-7 11 13 1" stroke="#917176" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M80 109v16m-8-8h16" stroke="#A4888D" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
