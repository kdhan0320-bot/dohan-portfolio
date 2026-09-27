import { useId } from 'react';
import sculpture from '../assets/perspective-sculpture.webp';
import iris from '../assets/season-iris.webp';
export default function WorkCover({
  kind,
  eager = false
}) {
  const uid = useId().replaceAll(':', '');
  if (kind === 'gallery') return <img className="cover-art" src={sculpture} alt="라벤더 유리와 도자기 고리가 겹친 조형 작품" width="1536" height="1024" loading={eager ? 'eager' : 'lazy'} decoding="async" />;
  if (kind === 'flower') return <img className="cover-art" src={iris} alt="짙은 자주색 배경 위 연보라색 꽃" width="1536" height="1024" loading="lazy" decoding="async" />;
  return <svg className="cover-art vector-cover" viewBox="0 0 960 640" role="img" aria-label={{
    sound: '느린 파장 사운드 플레이어 디자인',
    portfolio: '서로 다른 장면 포트폴리오 디자인',
    walk: '가벼운 산책 지도 디자인',
    signup: '작은 시작 가입 화면 디자인'
  }[kind]}>
    {kind === 'sound' && <>
      <defs><linearGradient id={`${uid}-wave`} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#CDE3DE" /><stop offset="1" stopColor="#7AA79F" /></linearGradient></defs>
      <rect width="960" height="640" fill="#173F41" />
      <text x="56" y="67" fill="#D3E8E3" fontSize="15" letterSpacing="4">SLOW WAVE / SOUND EXPERIENCE</text>
      {Array.from({
        length: 30
      }, (_, i) => <ellipse key={i} cx={670 + i * 1.5} cy="350" rx={90 + i * 6} ry={150 + i * 5} fill="none" stroke={`url(#${uid}-wave)`} strokeWidth="1.6" opacity={.25 + i * .021} transform={`rotate(${-30 + i * .6} 680 350)`} />)}
      <text x="57" y="248" fill="#F0F4E9" fontSize="104" fontWeight="650" letterSpacing="-5">느린</text><text x="57" y="370" fill="#F0F4E9" fontSize="104" fontWeight="650" letterSpacing="-5">파장.</text>
      <text x="61" y="439" fill="#C5D8D1" fontSize="20">잠깐, 나를 위한 고요.</text><circle cx="89" cy="544" r="30" fill="#D8E2CB" /><path d="m83 532 18 12-18 12Z" fill="#173F41" /><path d="M142 544H360" stroke="#6F9994" /><text x="809" y="581" fontSize="15" fill="#C5D8D1">20:00</text>
    </>}
    {kind === 'portfolio' && <>
      <rect width="960" height="640" fill="#E1E4EC" /><text x="55" y="63" fontSize="15" fill="#3D415D" letterSpacing="3">SELECTED PERSPECTIVES</text>
      <rect x="385" y="110" width="465" height="440" fill="#6965A0" transform="rotate(9 617 330)" /><rect x="432" y="88" width="372" height="457" fill="#D1D6DF" transform="rotate(-8 618 317)" />
      <g transform="rotate(-8 618 317)"><circle cx="618" cy="295" r="115" fill="#8792AD" /><path d="M525 382 622 171 720 382Z" fill="#E8E9ED" /><rect x="461" y="437" width="308" height="2" fill="#737C92" /><text x="464" y="478" fontSize="20" fill="#424963">01 — 새로운 관점</text></g>
      <text x="54" y="231" fontSize="68" fontWeight="720" fill="#24283D" letterSpacing="-3">서로</text><text x="54" y="313" fontSize="68" fontWeight="720" fill="#24283D" letterSpacing="-3">다른</text><text x="54" y="395" fontSize="68" fontWeight="720" fill="#24283D" letterSpacing="-3">장면.</text><text x="57" y="580" fontSize="17" fill="#424963">생각을 정리하고, 경험으로 연결합니다.</text>
    </>}
    {kind === 'walk' && <>
      <rect width="960" height="640" fill="#DCE4D9" /><path d="m530-20-43 227 156 95-160 167 90 197M190-20l102 194-103 125 146 316M-20 146l297 19 94 199 595 99M-20 508l213-113 293 43 143-181 360-83" fill="none" stroke="#F3F5ED" strokeWidth="35" />
      <path d="M291 456C497 565 479 138 711 235" fill="none" stroke="#6D8773" strokeWidth="12" strokeLinecap="round" /><circle cx="291" cy="456" r="16" fill="#2E503E" stroke="#fff" strokeWidth="6" /><circle cx="711" cy="235" r="16" fill="#2E503E" stroke="#fff" strokeWidth="6" />
      <rect x="47" y="47" width="330" height="207" rx="5" fill="#F9FAF5" /><text x="74" y="92" fontSize="14" letterSpacing="3" fill="#4F6856">A SMALL WALK</text><text x="72" y="153" fontSize="43" fontWeight="650" fill="#2E4938">오늘은, 천천히.</text><text x="76" y="207" fontSize="20" fill="#4F6856">나무 그늘길 / 35분</text>
      <rect x="548" y="478" width="326" height="89" rx="5" fill="#F9FAF5" /><circle cx="587" cy="522" r="18" fill="#AABCA6" /><text x="621" y="515" fontSize="17" fill="#2E4938" fontWeight="650">가벼운 산책</text><text x="621" y="544" fontSize="15" fill="#4F6856">발견하는 즐거움, 2.1 km</text>
    </>}
    {kind === 'signup' && <>
      <rect width="960" height="640" fill="#D6D9EC" /><circle cx="260" cy="352" r="174" fill="#9EA7D0" /><path d="M82 333c139-266 176 239 349-40" stroke="#EEF0FA" strokeWidth="17" fill="none" />
      <rect x="473" y="64" width="386" height="512" rx="12" fill="#F9FAFD" /><circle cx="523" cy="115" r="12" fill="#575C94" /><text x="548" y="122" fill="#323857" fontSize="20" fontWeight="650">작은 시작</text><text x="511" y="201" fill="#323857" fontSize="28" fontWeight="650">반가워요.</text><text x="512" y="235" fill="#666D86" fontSize="16">필요한 정보만, 간결하게.</text>
      {[0, 1].map(n => <g key={n}><text x="513" y={289 + n * 87} fill="#454C67" fontSize="15">{n ? '비밀번호' : '이메일'}</text><rect x="511" y={303 + n * 87} width="309" height="48" rx="4" stroke="#A6ABC0" fill="#FFF" /><path d={`M530 ${326 + n * 87}h${n ? 83 : 154}`} stroke="#959CB5" strokeWidth="3" /></g>)}
      <rect x="511" y="471" width="309" height="54" rx="4" fill="#575C94" /><text x="640" y="504" fill="#FFF" fontSize="17">다음 →</text><text x="55" y="590" fontSize="17" fill="#434C72">작은 입력에서 시작되는 경험.</text>
    </>}
  </svg>;
}
