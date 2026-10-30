import { Link } from 'react-router-dom';
import TipsLayout from '../components/TipsLayout';
import TipsIcon from '../components/TipsIcon';
import TipLink from '../components/TipLink';
import CheckSketch from '../components/CheckSketch';
import { usePageTitle } from '../utils/pageMeta';

const checks = [
  { id: 'type', topic: '글자', title: '먼저 읽을 정보가 보이나요?', action: '제목과 본문을 구분하세요.', tip: 'type-hierarchy' },
  { id: 'spacing', topic: '간격', title: '관련 내용끼리 가까운가요?', action: '같은 내용끼리 가까운지 보세요.', tip: 'group-spacing' },
  { id: 'action', topic: '버튼', title: '주요 행동이 구분되나요?', action: '주요 행동 하나가 구분되는지 보세요.', tip: 'primary-action' },
  { id: 'contrast', topic: '대비', title: '배경 위 글자가 읽히나요?', action: '밝은 부분에서도 글자를 확인하세요.', tip: 'text-contrast' },
  { id: 'labels', topic: '안내', title: '색과 기호의 뜻이 보이나요?', action: '표시와 뜻을 함께 읽어보세요.', tip: 'clear-labels' },
  { id: 'input', topic: '입력', title: '입력 중에도 조건이 남나요?', action: '입력 후에도 조건이 남는지 보세요.', tip: 'persistent-help' },
  { id: 'mobile', topic: '작은 화면', title: '좁아져도 읽기 편한가요?', action: '긴 제목·버튼의 줄바꿈을 보세요.', to: '/case-study?section=mobile', link: '작은 화면 설명' },
  { id: 'keyboard', topic: '이동', title: '키보드로 오갈 수 있나요?', action: 'Tab·Enter·뒤로 가기를 확인하세요.' },
];

export default function ChecklistPage() {
  usePageTitle('화면 점검 | 고른시선');
  return <TipsLayout><article className="tips-detail tips-checklist">
    <header className="tips-page-heading"><p className="tips-eyebrow">공개 전 다시 보는 기준</p><h1>화면 점검</h1><p className="tips-lead">내 화면을 옆에 두고, 여덟 가지만 확인하세요.</p></header>
    <ol className="screen-checks">{checks.map((check, index) => <li key={check.id}><div className="screen-check-heading"><span className="tips-list-number">{String(index + 1).padStart(2, '0')}</span><div><p className="tips-eyebrow">{check.topic}</p><h2 id={`check-${check.id}-title`} tabIndex={-1}>{check.title}</h2></div></div><CheckSketch kind={check.id} /><div className="screen-check-body"><p>{check.action}</p></div><div className="screen-check-link">{check.tip ? <TipLink className="tips-text-link" to={`/tips/${check.tip}`} focusId={`check-${check.tip}`} aria-label={`${check.topic} 비교 그림 보기`}>비교 그림<TipsIcon /></TipLink> : check.to ? <TipLink to={check.to} focusId="check-mobile-example" className="tips-text-link">{check.link}<TipsIcon /></TipLink> : null}</div></li>)}</ol>
    <p className="check-closing">마지막으로, 처음 보는 사람에게 화면의 목적과 다음 행동이 무엇인지 물어보세요.</p>
    <p className="tips-evidence-note">기초 UI 점검 자료이며, 모든 접근성·품질 기준을 대신하지 않습니다.</p>
    <nav className="tips-detail-nav" aria-label="다음으로 살펴보기"><Link to="/?section=tips" className="tips-text-link">디자인 팁 살펴보기</Link><Link to="/case-study" className="tips-next"><span>수정 순서가 막막하다면</span><strong>한 화면 고치기</strong><TipsIcon className="tips-arrow" /></Link></nav>
  </article></TipsLayout>;
}
