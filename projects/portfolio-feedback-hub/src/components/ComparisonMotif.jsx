// Original comparison artwork. Both canvases use the same content and tone;
// neither is marked as the preferred answer to the exercise below.
export default function ComparisonMotif() {
  return <svg className="comparison-motif" viewBox="0 0 420 200" fill="none" aria-hidden="true" focusable="false">
    <path d="M12 39V17h22M386 17h22v22M12 161v22h22m352 0h22v-22" stroke="#9286b4" strokeWidth="1.5" />
    <path d="M210 18v164" stroke="#6c637f" strokeDasharray="3 7" />
    {[32, 228].map((x, index) => <g key={x}>
      <rect x={x + 6} y="34" width="160" height="139" rx="8" fill="#18181f" fillOpacity=".5" />
      <rect x={x} y="27" width="160" height="139" rx="8" fill="#f7f5fc" stroke="#c9bfec" />
      <path d={`M${x} 52h160`} stroke="#dcd6e9" />
      <circle cx={x + 14} cy="40" r="2" fill="#a59bb9" /><circle cx={x + 22} cy="40" r="2" fill="#a59bb9" />
      <path d={`M${x + 125} 40h21`} stroke="#a59bb9" strokeWidth="2" strokeLinecap="round" />
      <rect x={x + 14} y="67" width="58" height="73" rx="4" fill="#ddd5f5" />
      <rect x={x + 23} y="87" width="27" height="35" rx="3" transform={`rotate(-12 ${x + 23} 87)`} fill="#ab9bd9" />
      <rect x={x + 38} y="79" width="23" height="39" rx="3" transform={`rotate(12 ${x + 38} 79)`} fill="#7461ac" />
      <path d={`M${x + 86} 74h56M${x + 86} 86h39`} stroke="#48424f" strokeWidth={index ? 5 : 3} />
      <path d={`M${x + 86} 104h53M${x + 86} 112h43`} stroke="#aaa3b5" strokeWidth="2" />
      <rect x={x + 86} y="127" width="52" height="13" rx="3" fill="#b4d3c9" />
      <path d={`M${x + 14} 151h44`} stroke="#c3bccf" strokeWidth="2" />
    </g>)}
    <path d="m205 153 5-25 18 19-11-1-8 11Z" fill="#c8b8fa" stroke="#302c3b" strokeWidth="2" strokeLinejoin="round" />
  </svg>;
}
