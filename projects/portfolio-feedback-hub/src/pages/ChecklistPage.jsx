import { Link } from 'react-router-dom';
import TipsLayout from '../components/TipsLayout';
import TipsIcon from '../components/TipsIcon';
import TipLink from '../components/TipLink';
import { usePageTitle } from '../utils/pageMeta';

const checks = [
  { topic: '글자', title: '먼저 읽을 정보가 구분되나요?', action: '화면의 목표를 한 문장으로 적고, 그 목표에 필요한 제목과 본문을 나란히 보세요.', signal: '제목과 설명이 같은 크기로 이어져 시작점을 찾기 어렵습니다.', tip: 'type-hierarchy', link: '글자 위계 살펴보기' },
  { topic: '간격', title: '같이 읽을 내용이 가까이 있나요?', action: '제목과 설명 사이, 다음 항목까지의 거리를 비교하세요. 긴 설명이 들어간 경우도 확인하세요.', signal: '설명이 자기 제목보다 다음 제목에 더 가까워 보입니다.', tip: 'group-spacing', link: '정보 묶기 살펴보기' },
  { topic: '버튼', title: '다음 행동의 우선순위가 보이나요?', action: '이 화면에서 가장 중요한 행동을 정하고, 주변 선택지와 강조를 비교하세요.', signal: '중요도가 다른 버튼들이 모두 같은 채움색으로 경쟁합니다.', tip: 'primary-action', link: '주요 행동 살펴보기' },
  { topic: '대비', title: '배경이 달라져도 글자가 읽히나요?', action: '실제 사용할 사진의 밝은 부분과 좁은 화면에서 잘리는 위치를 확인하세요.', signal: '흰 글자가 밝은 사진에 섞이거나, 사진 교체 후 제목이 흐려집니다.', tip: 'text-contrast', link: '사진 위 글자 살펴보기' },
  { topic: '안내', title: '색이나 기호의 뜻이 드러나나요?', action: '설명이 없는 표시를 찾아, 옆의 이름만으로 의미를 알 수 있는지 읽어보세요.', signal: '색이 다른 선은 보이지만 무엇을 가리키는지 알 수 없습니다.', tip: 'clear-labels', link: '표시와 뜻 살펴보기' },
  { topic: '입력', title: '입력 중에도 필요한 조건이 남나요?', action: '실제 양식에 글자를 입력해 보세요. 예시 문구가 사라진 뒤에도 필수 조건이 보이는지 확인하세요.', signal: '조건을 다시 보려고 입력한 내용을 지워야 합니다.', tip: 'persistent-help', link: '지속되는 안내 살펴보기' },
  { topic: '작은 화면', title: '읽는 순서와 내용이 유지되나요?', action: '폭을 줄여 보고 실제 휴대전화에서도 읽어보세요. 가장 긴 제목과 줄바꿈되는 버튼을 함께 확인하세요.', signal: '가로로 밀어야 내용을 읽거나, 글자를 줄여야 화면에 들어갑니다.', link: '작은 화면의 적용 사례 보기' },
  { topic: '이동', title: '키보드로 이동하고 돌아올 수 있나요?', action: 'Tab으로 링크에 접근하고 Enter로 여세요. 뒤로 갔을 때 보던 위치를 다시 찾을 수 있는지도 확인하세요.', signal: '초점이 보이지 않거나, 이동 후 출발한 위치를 잃습니다.', link: '수정 순서부터 다시 보기' },
];

export default function ChecklistPage() {
  usePageTitle('화면 점검 | 고른시선');
  return <TipsLayout><article className="tips-detail tips-checklist">
    <header className="tips-page-heading"><p className="tips-eyebrow">공개 전 다시 보는 기준</p><h1>화면 점검</h1><p className="tips-lead">내 화면을 옆에 두고, 하나씩 확인하세요.<br />{' '}막히는 항목은 관련 팁에서 비교 그림을 볼 수 있습니다.</p></header>
    <div className="check-intro"><p><span>핵심 문제</span>다 만들고 나면 무엇을 다시 봐야 할지 놓치기 쉽습니다.</p><p><span>설계 규칙</span>인상으로 판단하기보다, 화면에서 직접 읽고 눌러 확인합니다.</p></div>
    <ol className="screen-checks">{checks.map((check, index) => <li key={check.topic}><div className="screen-check-heading"><span className="tips-list-number">{String(index + 1).padStart(2, '0')}</span><div><p className="tips-eyebrow">{check.topic}</p><h2>{check.title}</h2></div></div><div className="screen-check-body"><p>{check.action}</p><p className="screen-check-signal"><span>다시 볼 신호</span>{check.signal}</p>{check.tip ? <TipLink className="tips-text-link" to={`/tips/${check.tip}`} focusId={`check-${check.tip}`}>{check.link}<TipsIcon /></TipLink> : <Link to="/case-study" className="tips-text-link">{check.link}<TipsIcon /></Link>}</div></li>)}</ol>
    <aside className="check-closing"><h2>모두 확인해도, 처음 보는 눈은 다릅니다.</h2><p>처음 보는 사람에게 화면의 목적과 다음 행동을 설명해 달라고 해보세요. 예상과 다르게 읽힌 부분을 다음 수정의 근거로 남기면 됩니다.</p><p className="tips-evidence-note">기초 UI 점검을 위한 읽기 자료입니다. 체크 상태나 점수를 저장하지 않으며, 모든 접근성·품질 기준을 대신하지 않습니다.</p></aside>
    <nav className="tips-detail-nav" aria-label="다음으로 살펴보기"><Link to="/?section=tips" className="tips-text-link">디자인 팁 살펴보기</Link><Link to="/case-study" className="tips-next"><span>무엇부터 바꿀지 막막하다면</span><strong>한 화면 고치는 순서 보기</strong><TipsIcon className="tips-arrow" /></Link></nav>
  </article></TipsLayout>;
}
