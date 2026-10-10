import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { PageHeading } from '../components/ui/PageUI';
import PaperGraphic from '../components/ui/PaperGraphic';
import { useAuth } from '../context/AuthContext';

const steps = [
  { title: '회사 등록', description: '회사·직무·마감일을 입력해요.', art: 'folder', to: '/?new=1', label: '회사 등록하기' },
  { title: '전형 기록', description: '서류와 면접 진행 상태를 기록해요.', art: 'steps', to: '/', label: '지원 현황 보기' },
  { title: '다음 준비', description: '서류·면접 준비를 하나씩 체크해요.', art: 'check', to: '/checklist', label: '준비 체크 열기' }
];

export default function GuidePage() {
  const { isGuest } = useAuth();
  return <>
    <PageHeading art="guide" title="이용 안내" description="내 입사지원을 관리하는 세 단계" />
    <ol className="guide-steps">
      {steps.map((step, index) => <li key={step.title}>
        <div className="guide-step-art"><span>{String(index + 1).padStart(2, '0')}</span><PaperGraphic kind={step.art} /></div>
        <h2>{step.title}</h2>
        <p>{step.description}</p>
        <Button component={Link} to={step.to} variant="outlined">{step.label}</Button>
      </li>)}
    </ol>
    <section className="guide-record-note" aria-labelledby="guide-record-title">
      <div><h2 id="guide-record-title">{isGuest ? '샘플 체험' : '나의 지원 기록'}</h2><p>{isGuest ? '가상 기록을 수정해보세요. 새로고침하면 초기화됩니다.' : '지원 기록은 로그인한 계정에 저장됩니다.'}</p></div>
      <Button component={Link} to="/" variant="contained">지원 현황 열기</Button>
    </section>
  </>;
}
