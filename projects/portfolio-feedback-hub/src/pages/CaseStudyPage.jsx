import { Link } from 'react-router-dom';
import TipsLayout from '../components/TipsLayout';
import TipsIcon from '../components/TipsIcon';
import TipLink from '../components/TipLink';
import SightMark from '../components/SightMark';
import ExhibitionExample, { ExhibitionTitle, ExhibitionFacts, ExhibitionActions } from '../components/ExhibitionExample';
import { usePageTitle } from '../utils/pageMeta';

const steps = [
  { id: 'type', number: '01', title: '전시 이름이 묻힌다면', rule: '설명은 그대로 두고, 제목만 키웁니다.', kept: '사진 · 문구 · 글자 굵기 · 색', before: '16px', after: '28px', tip: 'type-hierarchy', link: '글자 위계의 기준', Drawing: ExhibitionTitle, description: '같은 전시에서 이름만 16px에서 28px로 키웁니다. 괄호가 바뀐 제목을 가리킵니다.' },
  { id: 'spacing', number: '02', title: '기간과 장소가 섞여 보인다면', rule: '이름과 값은 가깝게, 다른 묶음은 멀리 둡니다.', kept: '문구 · 글자 크기 · 색 · 순서', before: '같은 간격', after: '묶음 구분', tip: 'group-spacing', link: '정보 간격의 기준', Drawing: ExhibitionFacts, description: '표시선은 실제 빈 공간의 높이입니다. 모든 간격 16px에서 묶음 안 6px, 묶음 사이 36px로 바뀝니다.' },
  { id: 'action', number: '03', title: '다음 행동이 모호하다면', rule: '예약으로 이어지도록 예약 버튼에만 채움색을 줍니다.', kept: '문구 · 버튼 크기 · 위치', before: '같은 강조', after: '예약 강조', tip: 'primary-action', link: '주요 행동의 기준', Drawing: ExhibitionActions, description: '두 버튼의 크기와 위치는 같습니다. 괄호 안의 관람 예약 버튼만 짙은 청록색으로 채웁니다.' },
];

export default function CaseStudyPage() {
  usePageTitle('한 화면 고치기 | 고른시선');
  return <TipsLayout><article className="tips-detail tips-case">
    <header className="tips-page-heading"><p className="tips-eyebrow">적용 사례 · 전시 안내</p><h1>한 화면 고치기</h1><p className="tips-lead">전시를 알고 예약하기까지, 같은 내용에서 하나씩 바꿉니다.</p></header>
    <div className="case-steps">{steps.map(({ Drawing, ...step }) => <section className={`case-step case-step-${step.id}`} key={step.id} aria-labelledby={`case-${step.id}-title`}>
      <header className="case-step-heading"><span className="tips-list-number">{step.number}</span><h2 id={`case-${step.id}-title`} tabIndex={-1}>{step.title}</h2></header>
      <div className="case-step-visual"><div className="case-focus-pair" role="group" aria-label={step.description}>{[false, true].map(revised => <figure key={String(revised)} className={revised ? 'is-revised' : ''}><figcaption><span>{revised ? '바꾼 뒤' : '바꾸기 전'}</span><span>{revised ? step.after : step.before}</span></figcaption><div className="case-focus-window" aria-hidden="true"><Drawing revised={revised} annotate={revised || step.id === 'spacing'} /></div></figure>)}</div></div>
      <div className="case-step-notes"><p className="case-step-rule"><SightMark />{step.rule}</p><p className="case-kept"><span>그대로</span>{step.kept}</p><TipLink to={`/tips/${step.tip}`} focusId={`case-tip-${step.id}`} className="tips-text-link">{step.link}<TipsIcon /></TipLink></div>
    </section>)}</div>
    <section className="case-result" aria-labelledby="case-result-title"><div className="tips-section-heading"><div><p className="tips-eyebrow">세 기준을 모으면</p><h2 id="case-result-title">같은 화면, 달라진 읽는 순서.</h2></div></div>
      <div className="case-overview" role="group" aria-label="같은 사진과 내용을 담은 전시 안내의 수정 전후입니다. 제목 크기, 정보 간격, 예약 버튼의 채움색만 바꿨습니다.">{[false, true].map(revised => <figure key={String(revised)}><figcaption className="case-result-caption"><span>{revised ? '바꾼 뒤' : '바꾸기 전'}</span><span>{revised ? '이름 → 정보 → 예약' : '비슷한 강조'}</span></figcaption><ExhibitionExample revised={revised} annotate={revised} /></figure>)}</div>
      <div className="case-result-notes"><section aria-labelledby="case-mobile-title"><h3 id="case-mobile-title" tabIndex={-1}>작은 화면에서는</h3><p>사진 아래에 정보를 놓고, 글자 크기와 읽는 순서를 유지합니다.</p></section><div><h3>작품 감상이 먼저라면</h3><p>사진의 비중을 높이고 예약의 강조를 낮출 수 있습니다.</p></div></div>
    </section>
    <p className="tips-evidence-note">직접 만든 설명용 예시입니다. 예약은 작동하지 않으며, 수치는 예시의 값입니다. 사용자 실험 결과가 아닙니다.</p>
    <nav className="tips-detail-nav" aria-label="다음으로 살펴보기"><Link to="/?section=tips" className="tips-text-link">디자인 팁 살펴보기</Link><Link to="/checklist" className="tips-next"><span>내 화면에 적용했다면</span><strong>화면 점검으로 마무리하기</strong><TipsIcon className="tips-arrow" /></Link></nav>
  </article></TipsLayout>;
}
