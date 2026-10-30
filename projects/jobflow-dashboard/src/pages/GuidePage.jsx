import { Button } from '@mui/material';
import CheckRounded from '@mui/icons-material/CheckRounded';
import { Link } from 'react-router-dom';
import { PageHeading } from '../components/ui/PageUI';
import { useAuth } from '../context/AuthContext';
import { BOARD_COLUMNS } from '../utils/applicationBoard';
import { DEMO_TODAY } from '../constants';

const steps = [
  { title: '회사 등록', description: '회사별로 상태·마감·준비를 하나의 기록에 모아요.', kind: 'fields', to: '/applications/new', label: '회사 등록하기' },
  { title: '전형 기록', description: '실제 지원 후 상태를 직접 바꿔요. 마감일이 지나도 자동으로 바뀌지 않아요.', kind: 'board', to: '/', label: '지원 관리 열기' },
  { title: '회사별 준비', description: '준비를 체크해도 지원 완료가 되지는 않아요. 할 일과 전형 상태를 구분해 관리해요.', kind: 'checks', to: '/checklist', label: '준비 열기' }
];

function GuideExample({ kind }) {
  if (kind === 'fields') return <div className="guide-example guide-example-fields" role="img" aria-label="회사와 직무를 직접 입력하는 화면 구조 예시">
    <div className="guide-example-field"><span>회사</span><span>회사명 입력</span></div>
    <div className="guide-example-field"><span>직무</span><span>지원 직무 입력</span></div>
  </div>;
  if (kind === 'board') return <div className="guide-example guide-example-board" role="img" aria-label={`전형 분류 예시: ${BOARD_COLUMNS.map(column => column.label).join(', ')}`}>
    {BOARD_COLUMNS.map(column => <div className="guide-example-lane" key={column.id} style={{ '--stage-ink': column.color, '--stage-tint': column.tint }}><span>{column.label}</span></div>)}
  </div>;
  return <div className="guide-example guide-example-checks" role="img" aria-label="이력서와 포트폴리오 준비의 체크 구조 예시. 실제 완료 상태가 아닙니다.">
    <div className="guide-example-check is-checked"><span className="guide-example-checkbox"><CheckRounded aria-hidden="true" /></span><span>이력서</span></div>
    <div className="guide-example-check"><span className="guide-example-checkbox" /><span>포트폴리오</span></div>
  </div>;
}

export default function GuidePage() {
  const { isGuest } = useAuth();
  return <>
    <PageHeading art="guide" title="이용 안내" description="내 입사지원을 관리하는 세 단계" />
    <ol className="guide-steps">
      {steps.map((step, index) => <li key={step.title} data-step={index + 1}>
        <div className="guide-step-kicker"><span className="guide-step-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span><span className="guide-example-caption">화면 예시</span></div>
        <GuideExample kind={step.kind} />
        <h2>{step.title}</h2>
        <p>{step.description}</p>
        <Button component={Link} to={step.to} variant="outlined">{step.label}</Button>
      </li>)}
    </ol>
    <dl className="guide-display-rules">
      <div><dt>오늘의 회사</dt><dd>지원 전·면접 예정 회사와 준비가 남은 서류 전형을 모아요. 마감이 지난 지원 전 회사는 ‘지원 여부 확인’으로 따로 표시해요.</dd></div>
      <div><dt>현황 달력</dt><dd>지원 전(관심·지원 예정) 회사의 공고 마감만 표시해요. 지원 후 기록은 회사 목록에서 확인해요.</dd></div>
    </dl>
    <p className="guide-scope-note">{isGuest ? `샘플 일정은 ${DEMO_TODAY.replaceAll('-', '.')} 기준입니다. 가상 기록은 새로고침하면 초기화됩니다.` : '지원 기록은 로그인한 계정에 저장됩니다.'}</p>
  </>;
}
