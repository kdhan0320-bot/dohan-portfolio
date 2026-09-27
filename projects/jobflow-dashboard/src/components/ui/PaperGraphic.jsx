// Original vector artwork for Galpirok. Decorative: all meaning is in nearby text.
export default function PaperGraphic({ kind = 'folder', className = '' }) {
  return <svg className={`paper-graphic ${className}`} viewBox="0 0 180 140" fill="none" aria-hidden="true" focusable="false">
    <ellipse cx="92" cy="126" rx="62" ry="7" fill="#624B4F10" />
    {kind === 'folder' && <>
      <path d="M22 45a8 8 0 0 1 8-8h38l13 13h69a8 8 0 0 1 8 8v58H22Z" fill="#BEA6AA" stroke="#9D7F84" />
      <g transform="rotate(-9 90 70)"><rect x="48" y="22" width="76" height="89" rx="5" fill="#FFFDFA" stroke="#CFBEC1" /><path d="M65 45h39M65 56h28M65 67h39" stroke="#D6C7CA" strokeWidth="3" strokeLinecap="round" /><path d="M106 22v26l-8-5-8 5V22" fill="#94394B" /></g>
      <path d="M18 65h143l-10 52a7 7 0 0 1-7 6H32a7 7 0 0 1-7-6Z" fill="#E5DED8" stroke="#B09599" />
      <rect x="65" y="82" width="49" height="23" rx="4" fill="#FFFDFA" /><path d="M78 94h22" stroke="#AE9196" strokeWidth="3" strokeLinecap="round" />
    </>}
    {kind === 'steps' && <>
      <path d="M27 103h126" stroke="#CCBABD" strokeWidth="2" strokeDasharray="3 5" />
      {[{ x: 21, y: 67, c: '#E8E3DF' }, { x: 69, y: 44, c: '#C8B5B8' }, { x: 117, y: 21, c: '#A35462' }].map(({ x, y, c }) => <g key={x}><rect x={x} y={y} width="39" height="63" rx="5" fill={c} stroke="#B09599" /><path d={`M${x+10} ${y+19}h19M${x+10} ${y+27}h13`} stroke={x === 117 ? '#F6F4F2' : '#A68A8F'} strokeWidth="2" strokeLinecap="round" /><circle cx={x+19.5} cy={y+46} r="6" fill="#FFFDFA" /></g>)}
    </>}
    {kind === 'calendar' && <g transform="rotate(-7 90 73)">
      <rect x="43" y="26" width="107" height="101" rx="8" fill="#D3C0C3" />
      <rect x="31" y="18" width="107" height="101" rx="8" fill="#FFFDFA" stroke="#BEA7AB" />
      <path d="M31 50h107" stroke="#D5C5C8" /><path d="M58 12v17M111 12v17" stroke="#94394B" strokeWidth="6" strokeLinecap="round" />
      {[58,84,110].map(x => [67,91].map(y=><rect key={`${x}-${y}`} x={x-6} y={y-6} width="12" height="12" rx="3" fill={x === 84 && y === 91 ? '#94394B' : '#E6E2DD'} />))}
      <path d="m80 91 3 3 6-6" stroke="#FFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </g>}
    {kind === 'check' && <>
      <rect x="45" y="29" width="86" height="100" rx="7" fill="#D6C7CA" transform="rotate(8 88 79)" />
      <rect x="35" y="17" width="86" height="103" rx="7" fill="#FFFDFA" stroke="#BEA7AB" /><rect x="60" y="12" width="35" height="12" rx="4" fill="#A68A8F" />
      {[45,69,93].map((y,i)=><g key={y}><rect x="49" y={y-6} width="13" height="13" rx="3" fill={i<2?'#94394B':'#FFF'} stroke="#AF9297" />{i<2&&<path d={`m52 ${y} 3 3 5-6`} stroke="#FFF" strokeWidth="1.8" strokeLinecap="round" />}<path d={`M73 ${y}h32`} stroke="#C8B5B8" strokeWidth="3" strokeLinecap="round" /></g>)}
      <circle cx="130" cy="94" r="23" fill="#E1EBE6" stroke="#A5B7AC" /><path d="m120 94 7 7 14-15" stroke="#567061" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </>}
    {kind === 'chat' && <>
      <path d="M73 56h75a9 9 0 0 1 9 9v38a9 9 0 0 1-9 9h-6v14l-20-14H73a9 9 0 0 1-9-9V65a9 9 0 0 1 9-9Z" fill="#D2BFC2" stroke="#AD9195" />
      <path d="M28 22h88a9 9 0 0 1 9 9v43a9 9 0 0 1-9 9H62L41 99V83H28a9 9 0 0 1-9-9V31a9 9 0 0 1 9-9Z" fill="#FFFDFA" stroke="#BEA7AB" />
      {[48,72,96].map(x=><circle key={x} cx={x} cy="53" r="5" fill="#977278" />)}<path d="M88 94h44" stroke="#FFF" strokeWidth="3" strokeLinecap="round" />
    </>}
    {kind === 'write' && <>
      <path d="M40 18h63l27 27v76H40Z" fill="#FFFDFA" stroke="#BEA7AB" /><path d="M103 18v27h27" fill="#E2DAD3" stroke="#BEA7AB" /><path d="M57 60h47M57 75h35M57 90h26" stroke="#CDBBBE" strokeWidth="3" strokeLinecap="round" />
      <g transform="rotate(35 121 83)"><path d="M116 38h12v65l-6 14-6-14Z" fill="#94394B" /><path d="m116 103 6 14 6-14" fill="#D8C5B9" /><path d="m120 112 2 5 2-5" fill="#512E36" /><path d="M116 49h12" stroke="#CDBABD" strokeWidth="3" /></g>
    </>}
  </svg>;
}
