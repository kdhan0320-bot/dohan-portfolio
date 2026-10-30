import sculpture from '../assets/perspective-sculpture.webp';

// Static illustrations. Each step changes one visual variable; copy stays shared.
export function ExhibitionTitle({ revised = false }) {
  return <div className="case-title-slot"><span className={`case-exhibit-title${revised ? ' is-revised' : ''}`}>시선의 모양</span><p>일상에서 만나는 조형의 아름다움</p></div>;
}

export function ExhibitionFacts({ revised = false }) {
  return <div className={`case-facts${revised ? ' is-revised' : ''}`}>
    <div><span>전시 기간</span><strong>11. 01 — 11. 30</strong></div>
    <div><span>관람 장소</span><strong>모양 전시실 · 2층</strong></div>
  </div>;
}

export function ExhibitionActions({ revised = false }) {
  return <div className={`case-actions${revised ? ' is-revised' : ''}`}><span>전시 소개</span><span>관람 예약</span></div>;
}

export default function ExhibitionExample({ revised = false }) {
  return <div className={`case-screen${revised ? ' is-revised' : ''}`} aria-hidden="true">
    <div className="case-screen-bar"><span>FORM & SPACE</span><span>전시 안내</span></div>
    <div className="case-screen-body"><img src={sculpture} alt="" width="720" height="960" /><div className="case-screen-copy">
      <ExhibitionTitle revised={revised} /><ExhibitionFacts revised={revised} /><ExhibitionActions revised={revised} />
    </div></div>
  </div>;
}
