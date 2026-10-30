import { Link } from 'react-router-dom';
import TipsLayout from '../components/TipsLayout';
import TipsIcon from '../components/TipsIcon';
import TipLink from '../components/TipLink';
import ExhibitionExample, { ExhibitionTitle, ExhibitionFacts, ExhibitionActions } from '../components/ExhibitionExample';
import { usePageTitle } from '../utils/pageMeta';

const steps = [
  { id: 'type', number: '01', title: '먼저 읽을 이름을 정합니다.', problem: '전시 이름과 설명의 크기가 같아 읽는 순서가 약합니다.', rule: '설명을 유지하고 제목의 크기만 키웁니다.', reason: '이번 화면의 첫 역할은 어떤 전시인지 알리는 것입니다. 사진의 면적은 유지하고 이름을 먼저 구분했습니다.', kept: '문구 · 사진 · 글자 굵기 · 색', before: '제목 16px', after: '제목 28px', tip: 'type-hierarchy', link: '글자 위계의 기준', Drawing: ExhibitionTitle, description: '같은 전시 이름과 설명입니다. 제목만 16px에서 28px로 커집니다.' },
  { id: 'spacing', number: '02', title: '함께 읽을 정보를 묶습니다.', problem: '모든 간격이 같아 날짜와 장소의 관계를 한눈에 구분하기 어렵습니다.', rule: '이름과 값은 가깝게, 다른 묶음은 멀리 둡니다.', reason: '기간과 날짜, 장소와 위치를 각각 한 묶음으로 읽도록 합니다. 새 박스나 색은 더하지 않았습니다.', kept: '문구 · 크기 · 굵기 · 색 · 표시 순서', before: '모두 16px', after: '묶음 안 6px / 사이 36px', tip: 'group-spacing', link: '정보 간격의 기준', Drawing: ExhibitionFacts, description: '전시 기간과 날짜, 관람 장소와 위치를 비교합니다. 모든 간격 16px에서 묶음 안 6px, 묶음 사이 36px로 바뀝니다.' },
  { id: 'action', number: '03', title: '다음 행동 하나를 강조합니다.', problem: '소개와 예약이 같은 모습이라 다음 행동의 우선순위가 드러나지 않습니다.', rule: '크기와 위치를 유지하고 예약에만 채움색을 줍니다.', reason: '정보를 확인한 다음 예약으로 이어지는 목표에 맞췄습니다. 전시 소개도 같은 자리에 남겨 더 읽을 수 있는 선택을 보존했습니다.', kept: '문구 · 버튼 크기 · 위치 · 두 선택지', before: '같은 강조', after: '예약 강조', tip: 'primary-action', link: '주요 행동의 기준', Drawing: ExhibitionActions, description: '전시 소개와 관람 예약의 크기와 위치는 같습니다. 두 번째 그림에서 관람 예약만 짙은 청록색으로 채웁니다.' },
];

export default function CaseStudyPage() {
  usePageTitle('한 화면 고치기 | 고른시선');
  return <TipsLayout><article className="tips-detail tips-case">
    <header className="tips-page-heading"><p className="tips-eyebrow">적용 사례 · 전시 안내</p><h1>한 화면 고치기</h1><p className="tips-lead">전시를 알고, 관람을 예약하기까지.<br />{' '}제목 → 정보 묶음 → 행동 순서로 고칩니다.</p></header>
    <section className="case-brief" aria-labelledby="case-problem-title"><div className="case-brief-copy">
      <p className="tips-eyebrow">핵심 문제</p><h2 id="case-problem-title">여러 곳이 어색할 때,<br />어디부터 고칠까요?</h2><p>한꺼번에 바꾸면 차이의 이유를 놓치기 쉽습니다. 화면의 목표를 정하고, 하나씩 비교합니다.</p>
    </div><figure className="case-start"><figcaption><span>출발 화면</span><span>직접 만든 설명용 예시</span></figcaption><ExhibitionExample /><p>전시 이름·설명, 기간·장소, 소개·예약이 비슷한 강조로 놓여 있습니다.</p></figure>
      <dl className="case-constraints"><div><dt>이번 목표</dt><dd>전시 이름과 관람 정보를 확인한 뒤 예약으로 이어지기</dd></div><div><dt>설계 규칙</dt><dd>한 단계에 한 요소만 변경하기</dd></div><div><dt>유지할 조건</dt><dd>같은 사진과 문구, 같은 정보 순서. 정보를 삭제하거나 기능을 더하지 않기</dd></div></dl>
    </section>
    <div className="case-steps">{steps.map(({ Drawing, ...step }) => <section className={`case-step case-step-${step.id}`} key={step.id} aria-labelledby={`case-${step.id}-title`}>
      <div className="case-step-copy"><div className="tips-detail-meta"><span className="tips-list-number">{step.number}</span><span>한 번에 하나씩</span></div><h2 id={`case-${step.id}-title`}>{step.title}</h2><p className="case-step-problem">{step.problem}</p><p className="case-step-rule"><span>설계 규칙</span>{step.rule}</p><TipLink to={`/tips/${step.tip}`} focusId={`case-tip-${step.id}`} className="tips-text-link">{step.link}<TipsIcon /></TipLink></div>
      <div className="case-step-visual"><div className="case-focus-pair" role="group" aria-label={step.description}>{[false, true].map(revised => <figure key={String(revised)} className={revised ? 'is-revised' : ''}><figcaption><span>{revised ? '바꾼 뒤' : '바꾸기 전'}</span><span>{revised ? step.after : step.before}</span></figcaption><div className="case-focus-window" aria-hidden="true"><Drawing revised={revised} /></div></figure>)}</div><p className="case-step-reason">{step.reason}</p><p className="case-kept"><span>같게 둔 조건</span>{step.kept}</p></div>
    </section>)}</div>
    <section className="case-result" aria-labelledby="case-result-title"><div className="tips-section-heading"><div><p className="tips-eyebrow">세 기준을 함께 적용하면</p><h2 id="case-result-title">내용은 같아도, 읽는 순서는 달라집니다.</h2></div></div><div className="case-result-grid"><figure><figcaption className="case-result-caption"><span>수정한 전체 화면</span><span>제목 → 관람 정보 → 예약</span></figcaption><p className="tips-sr-only">전시 이름을 28px로 키우고, 기간과 장소를 간격으로 묶고, 관람 예약에 채움색을 준 결과입니다. 사진과 문구, 정보 순서는 유지했습니다.</p><ExhibitionExample revised /></figure>
      <div className="case-result-notes"><div><h3>작은 화면에서는</h3><p>사진과 정보를 위아래로 배치합니다. 글자를 축소해 한 줄에 끼워 넣지 않고, 제목부터 예약까지 같은 순서로 읽게 합니다.</p></div><div><h3>목표가 바뀐다면</h3><p>작품 감상이 먼저인 화면에서는 사진의 비중을 높이고 예약의 강조를 낮출 수 있습니다. 이 구성은 모든 전시 화면의 정답이 아닙니다.</p></div></div></div>
    </section>
    <p className="tips-evidence-note">수정 전후는 설계 의도를 설명하기 위해 직접 만든 예시입니다. 예약은 작동하지 않으며, 실제 사용자 실험이나 예약 증가를 입증한 사례가 아닙니다. 수치는 이 예시의 값입니다.</p>
    <nav className="tips-detail-nav" aria-label="다음으로 살펴보기"><Link to="/?section=tips" className="tips-text-link">디자인 팁 살펴보기</Link><Link to="/checklist" className="tips-next"><span>내 화면에도 적용했다면</span><strong>화면 점검으로 마무리하기</strong><TipsIcon className="tips-arrow" /></Link></nav>
  </article></TipsLayout>;
}
