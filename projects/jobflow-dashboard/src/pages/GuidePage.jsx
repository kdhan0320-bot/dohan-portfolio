import { Button } from '@mui/material';
import CheckRounded from '@mui/icons-material/CheckRounded';
import { Link } from 'react-router-dom';
import { PageHeading } from '../components/ui/PageUI';
import { useAuth } from '../context/AuthContext';
import { BOARD_COLUMNS } from '../utils/applicationBoard';

const steps = [
  { title: '회사 등록', description: '회사·직무·마감일을 입력해요.', kind: 'fields', to: '/?new=1', label: '회사 등록하기' },
  { title: '전형 기록', description: '서류와 면접 진행 상태를 기록해요.', kind: 'board', to: '/', label: '지원 현황 보기' },
  { title: '다음 준비', description: '서류·면접 준비를 하나씩 체크해요.', kind: 'checks', to: '/checklist', label: '준비 체크 열기' }
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
        <span className="guide-step-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
        <GuideExample kind={step.kind} />
        <h2>{step.title}</h2>
        <p>{step.description}</p>
        <Button component={Link} to={step.to} variant="outlined">{step.label}</Button>
      </li>)}
    </ol>
    <p className="guide-scope-note">{isGuest ? '가상 샘플을 수정하며 체험할 수 있어요. 새로고침하면 초기화됩니다.' : '지원 기록은 로그인한 계정에 저장됩니다.'}</p>
  </>;
}
