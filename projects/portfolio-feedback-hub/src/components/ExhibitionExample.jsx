import sculpture from '../assets/perspective-sculpture.webp';
import { GapMeasure } from './TipComparison';
import SightLabel from './SightLabel';

// Static illustrations. Each step changes one visual variable; copy stays shared.
export function ExhibitionTitle({ revised = false, annotate = false }) {
  return <div className="case-title-slot"><span className={`case-exhibit-title${revised ? ' is-revised' : ''}`}><span className={annotate ? 'tip-outlined' : undefined}>시선의 모양{annotate && <SightLabel>제목 크기</SightLabel>}</span></span><p>일상에서 만나는 조형의 아름다움</p></div>;
}

export function ExhibitionFacts({ revised = false, annotate = false, label = false }) {
  return <div className={`case-facts${revised ? ' is-revised' : ''}${annotate ? ' is-measured' : ''}${label ? ' tip-outlined' : ''}`}>
    {label && <SightLabel>정보 묶음</SightLabel>}
    <div><span className="case-fact-label">전시 기간</span><GapMeasure size={revised ? 6 : 16} measure={annotate} /><strong>11. 01 — 11. 30</strong></div>
    <GapMeasure size={revised ? 36 : 16} measure={annotate} />
    <div><span className="case-fact-label">관람 장소</span><GapMeasure size={revised ? 6 : 16} measure={annotate} /><strong>모양 전시실 · 2층</strong></div>
  </div>;
}

export function ExhibitionActions({ revised = false, annotate = false }) {
  return <div className={`case-actions${revised ? ' is-revised' : ''}`}><span>전시 소개</span><span className={annotate ? 'tip-outlined' : undefined}>관람 예약{annotate && <SightLabel>예약 강조</SightLabel>}</span></div>;
}

export default function ExhibitionExample({ revised = false, annotate = false }) {
  return <div className={`case-screen${revised ? ' is-revised' : ''}`} aria-hidden="true">
    <div className="case-screen-bar"><span>FORM & SPACE</span><span>전시 안내</span></div>
    <div className="case-screen-body"><img src={sculpture} alt="" width="720" height="960" /><div className="case-screen-copy">
      <ExhibitionTitle revised={revised} annotate={annotate} /><ExhibitionFacts revised={revised} label={annotate} /><ExhibitionActions revised={revised} annotate={annotate} />
    </div></div>
  </div>;
}
