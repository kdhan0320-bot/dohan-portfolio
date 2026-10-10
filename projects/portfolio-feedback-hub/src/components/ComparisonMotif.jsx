// Original geometric artwork: two equivalent canvases, without a preferred side.
export default function ComparisonMotif() {
  return <svg className="comparison-motif" viewBox="0 0 310 142" fill="none" aria-hidden="true" focusable="false">
    <path d="M7 28V8h20M283 8h20v20M7 114v20h20m256 0h20v-20" stroke="#AAA3CE" strokeWidth="1" />
    <path d="M155 17v108" stroke="#C9C4DE" strokeDasharray="3 6" />
    {[22, 172].map(x => <g key={x}>
      <rect x={x} y="24" width="116" height="94" rx="9" fill="white" stroke="#BFBAD3" />
      <path d={`M${x} 43h116`} stroke="#E1DEED" />
      <rect x={x + 12} y="33" width="22" height="3" rx="1.5" fill="#83769F" />
      <rect x={x + 12} y="56" width="37" height="36" rx="4" fill="#DED8FB" />
      <path d={`m${x + 19} 83 9-14 7 9 7-5`} stroke="#8173BD" strokeWidth="1.5" />
      <rect x={x + 60} y="57" width="42" height="5" rx="2.5" fill="#898995" />
      <rect x={x + 60} y="69" width="31" height="3" rx="1.5" fill="#D3D2DC" />
      <rect x={x + 60} y="77" width="39" height="3" rx="1.5" fill="#D3D2DC" />
      <rect x={x + 60} y="91" width="33" height="13" rx="3" fill="#C3E2DE" />
    </g>)}
    <path d="m140 116 5-23 15 18-10-1-6 8Z" fill="#6958CB" stroke="#F7F8FB" strokeWidth="2" strokeLinejoin="round" />
    <path d="M31 15h21M260 125h21" stroke="#C28FA5" strokeWidth="3" strokeLinecap="round" />
  </svg>;
}
