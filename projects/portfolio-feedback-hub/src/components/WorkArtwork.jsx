import sculpture from '../assets/perspective-sculpture.webp';
import iris from '../assets/season-iris.webp';
/* Fictional review compositions: authored SVG UI + project-generated original artwork. */
const themes = {
  gallery: ['#EAE6F4', '#625594', '#34294D'],
  sound: ['#DAE9E8', '#547E78', '#193D3B'],
  portfolio: ['#E8E9EE', '#5F6C90', '#2B3247'],
  flower: ['#EDDFF0', '#96699C', '#3D264C'],
  walk: ['#E1EAE0', '#668269', '#2B493C'],
  signup: ['#E4E6F4', '#666BAD', '#2E325C']
};
export default function WorkArtwork({
  kind = 'gallery',
  before = false,
  title,
  viewBox = '0 0 960 680',
  className = ''
}) {
  const [surface, accent, ink] = themes[kind] || themes.gallery;
  const label = title || '직접 제작한 디자인 검토용 예시 화면';
  return <svg className={`work-art ${className}`} viewBox={viewBox} role="img" aria-label={label} xmlns="http://www.w3.org/2000/svg">
    <rect width="960" height="680" fill={surface} />
    {kind === 'gallery' && <>
      <rect x="56" y="48" width="848" height="584" rx="5" fill="#FAF8FC" />
      <text x="91" y="91" fill={ink} fontSize="22" fontWeight="800">시선의 모양</text>
      <text x="635" y="88" fill="#5C5668" fontSize="13">전시 소개</text><text x="728" y="88" fill="#5C5668" fontSize="13">작품</text><text x="798" y="88" fill="#5C5668" fontSize="13">방문 안내</text>
      <path d="M91 111H867" stroke="#E4DFEB" />
      <text x="101" y="180" fill={accent} fontSize="14" letterSpacing="2">작은 형태가 만드는 큰 여운</text>
      <text x="100" y={before ? '255' : '264'} fill={before ? '#776F84' : ink} fontSize={before ? '36' : '65'} fontWeight="700" letterSpacing="-3">가까이 보면,</text>
      <text x="100" y={before ? '306' : '341'} fill={before ? '#776F84' : ink} fontSize={before ? '36' : '65'} fontWeight="700" letterSpacing="-3">새로운 모양.</text>
      <text x="102" y="394" fill="#625B70" fontSize="16">일상의 틈에서 만나는 조형의 아름다움</text>
      <rect x="102" y="435" width={before ? '133' : '168'} height={before ? '36' : '50'} rx="3" fill={before ? '#D8D0E5' : ink} />
      <text x={before ? '168.5' : '186'} textAnchor="middle" y={before ? '458' : '466'} fill={before ? '#625B70' : '#fff'} fontSize={before ? '14' : '16'} fontWeight="600">전시 둘러보기</text>
      <rect x="552" y="147" width="304" height="374" fill="#EEE8F4" />
      <image href={sculpture} x="506" y="147" width="350" height="374" preserveAspectRatio="xMidYMid slice" />
      <text x="104" y="567" fill="#71677E" fontSize="13">가상의 전시 웹 디자인 · 화면 구성 예시</text>
      <path d="M101 587H856" stroke="#DCD5E5" />
    </>}
    {kind === 'sound' && <>
      <circle cx="490" cy="345" r="241" fill="#C6DAD5" />
      <circle cx="490" cy="345" r="186" fill="none" stroke="#B7CEC9" />
      <g transform="translate(310 36)">
        <rect width="340" height="608" rx="38" fill="#F7FAF8" stroke="#B4C7C0" strokeWidth="2" />
        <text x="29" y="50" fontSize="16" fill={ink} fontWeight="700">느린 파장</text><text x="291" y="50" fill={ink} fontSize="18">☰</text>
        <text x="28" y="107" fill="#516A61" fontSize="13">지금, 나에게 필요한 소리</text>
        <text x="27" y="145" fill={ink} fontSize={before ? '25' : '30'} fontWeight="700">잠깐 쉬어가도 좋아요.</text>
        <rect x="27" y="176" width="286" height="231" rx="8" fill="#AEC9BD" />
        <circle cx="170" cy="291" r="86" fill="#D8E8DF" /><circle cx="170" cy="291" r="59" fill="#8BAB9D" /><circle cx="170" cy="291" r="30" fill="#C6DCCF" />
        <path d="M60 370Q112 230 170 296T284 218" stroke="#F4FAF6" fill="none" strokeWidth="3" />
        <text x="28" y="447" fontSize="23" fontWeight="700" fill={ink}>숲의 아침</text><text x="28" y="473" fontSize="14" fill="#516A61">20분 · 자연의 소리</text>
        <path d="M30 502H310" stroke="#CBDAD3" strokeWidth="3" /><path d="M30 502H134" stroke={ink} strokeWidth="3" />
        <circle cx="170" cy="558" r={before ? '19' : '30'} fill={ink} /><path d="m164 548 17 10-17 10Z" fill="#fff" />
        <text x="78" y="566" fontSize="24" fill={ink}>↶</text><text x="242" y="566" fontSize="24" fill={ink}>↷</text>
      </g>
    </>}
    {kind === 'portfolio' && <>
      <rect x="55" y="50" width="850" height="580" rx="5" fill="#F7F8FA" />
      <text x="93" y="99" fill={ink} fontSize="17" fontWeight="800">서로 다른 장면</text><text x="711" y="99" fill="#62687C" fontSize="14">작업 ·  소개 ·  연락</text>
      <text x="94" y="199" fill={ink} fontSize={before ? '32' : '54'} fontWeight="700">생각을 정리하고,</text>
      <text x="94" y="266" fill={ink} fontSize={before ? '32' : '54'} fontWeight="700">경험으로 연결합니다.</text>
      <text x="96" y="314" fill="#62687C" fontSize="16">문제의 맥락을 살피는 디자이너의 작업 모음</text>
      {[0, 1, 2].map(n => <g key={n} transform={`translate(${94 + n * 263} 358)`}>
        <rect width="246" height="183" rx="3" fill={['#D7DDEE', '#C8D7D3', '#E6D7D0'][n]} />
        <circle cx="122" cy="91" r={63 - n * 8} fill={['#8290B8', '#71988E', '#BE9989'][n]} />
        <rect x="92" y="42" width="60" height="98" rx={n * 14 + 2} fill="#fff" opacity=".6" transform={`rotate(${n * 20} 122 91)`} />
        <text y="214" fill={ink} fontSize="15" fontWeight="600">0{n + 1} · {['사용 흐름 설계', '서비스 화면', '시각 아이덴티티'][n]}</text>
      </g>)}
    </>}
    {kind === 'flower' && <>
      <rect x="56" y="48" width="848" height="584" rx="5" fill="#F9F3F9" />
      <text x="92" y="96" fill={ink} fontSize="20" fontWeight="700">계절의 형태</text><text x="736" y="96" fill={ink} fontSize="14">컬렉션 ·  이야기</text>
      <rect x="91" y="130" width="778" height="363" fill="#E5D1E9" />
      <image href={iris} x="500" y="130" width="369" height="363" preserveAspectRatio="xMidYMid slice" />
      <text x="119" y="270" fill={ink} fontSize={before ? '38' : '60'} fontWeight="700">오래 머무는</text><text x="119" y="347" fill={ink} fontSize={before ? '38' : '60'} fontWeight="700">계절의 색.</text>
      <text x="121" y="404" fill="#63446E" fontSize="17">꽃에서 시작한 작은 그래픽 컬렉션</text>
      <text x="94" y="548" fill={ink} fontSize="23" fontWeight="600">이번 계절의 형태</text><path d="M94 581H868" stroke="#DCC8E1" />
      <text x="868" y="548" textAnchor="end" fill={ink} fontSize="15">전체 보기</text>
    </>}
    {kind === 'walk' && <>
      <rect x="56" y="48" width="848" height="584" rx="5" fill="#F6F8F3" />
      <text x="94" y="96" fill={ink} fontSize="20" fontWeight="700">가벼운 산책</text><text x="725" y="96" fill={ink} fontSize="14">산책길 ·  내 기록</text>
      <text x="94" y="179" fill={ink} fontSize="44" fontWeight="700">오늘은, 천천히.</text><text x="96" y="215" fill="#536C5D" fontSize="16">가까운 곳에서 발견하는 새로운 풍경</text>
      <rect x="94" y="247" width="482" height="331" rx="6" fill="#DFE8D6" />
      <path d="M100 330 273 265 361 360 556 307M190 252 262 435 102 521M389 250 326 560M570 450 351 478 280 579" fill="none" stroke="#F6F8F3" strokeWidth="23" />
      <path d="M178 486Q211 407 309 431T465 326" fill="none" stroke={accent} strokeWidth="7" strokeLinecap="round" strokeDasharray={before ? '8 10' : '0'} />
      <circle cx="178" cy="486" r="13" fill={ink} stroke="#fff" strokeWidth="5" /><circle cx="465" cy="326" r="13" fill={ink} stroke="#fff" strokeWidth="5" />
      <text x="617" y="282" fill={accent} fontSize="14">추천 산책</text><text x="615" y="327" fill={ink} fontSize="30" fontWeight="700">나무 그늘길</text>
      <text x="617" y="366" fill="#536C5D" fontSize="16">약 35분 · 2.1 km</text><path d="M617 397H859" stroke="#CFD8C9" />
      {['평탄한 길', '쉬어갈 벤치', '조용한 풍경'].map((s, i) => <text key={s} x="619" y={433 + i * 37} fill={ink} fontSize="16">✓ · {s}</text>)}
      <rect x="616" y="544" width="239" height="42" rx="3" fill={ink} /><text x="682" y="571" fill="#fff" fontSize="16">산책 시작하기</text>
    </>}
    {kind === 'signup' && <>
      <rect x="130" y="55" width="700" height="570" rx="12" fill="#FAFAFE" />
      <text x="179" y="111" fill={ink} fontSize="23" fontWeight="700">작업을 위한 작은 공간</text>
      <path d="M184 158H775" stroke="#D9DCEE" strokeWidth="3" />
      {[0, 1, 2].map(n => <g key={n}><circle cx={185 + n * 293} cy="158" r="15" fill={n === 0 ? accent : '#E1E3EF'} /><text x={181 + n * 293} y="164" fill={n === 0 ? '#fff' : ink} fontSize="14">{n + 1}</text></g>)}
      <text x="180" y="222" fontSize={before ? '24' : '35'} fontWeight="700" fill={ink}>처음 만나 반가워요.</text>
      <text x="182" y="255" fill="#626887" fontSize="15">시작에 필요한 정보만 먼저 알려주세요.</text>
      {['이메일', '비밀번호'].map((s, i) => <g key={s}><text x="182" y={309 + i * 92} fill={ink} fontSize="15" fontWeight="600">{s}</text><rect x="181" y={323 + i * 92} width="597" height="52" rx="4" fill="#fff" stroke="#B5BAD2" /><text x="199" y={356 + i * 92} fill={before ? '#B4B8C9' : '#68708B'} fontSize="15">{i ? '8자 이상 입력해주세요' : 'name@example.com'}</text></g>)}
      <rect x="181" y="500" width="597" height="53" rx="4" fill={accent} /><text x="479.5" y="533" textAnchor="middle" fill="#fff" fontSize="17" fontWeight="600">다음</text>
      <text x="329" y="591" fill="#626887" fontSize="13">검토용 화면 예시 · 실제 가입 폼이 아닙니다</text>
    </>}
  </svg>;
}
