import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { PageHeading } from '../components/ui/PageUI';
import PaperGraphic from '../components/ui/PaperGraphic';
import { useAuth } from '../context/AuthContext';

const steps = [
  { title: '관심 회사를 담아요', description: '회사와 직무, 지원 마감일을 기록해요.', art: 'folder', to: '/?new=1', label: '지원할 회사 등록' },
  { title: '지원 과정을 정리해요', description: '서류 제출과 면접 등 전형 상태를 바꿔요.', art: 'steps', to: '/', label: '지원 현황 보기' },
  { title: '다음 준비를 이어가요', description: '남은 할 일을 확인하고 면접 답변을 연습해요.', art: 'check', to: '/checklist', label: '준비 체크 열기' }
];

export default function GuidePage() {
  const { isGuest } = useAuth();
  return <>
    <PageHeading art="folder" title="이용 안내" description="회사를 담고, 준비를 마치고, 다음 지원으로." />
    <ol className="guide-steps">
      {steps.map((step, index) => <li key={step.title}>
        <div className="guide-step-art"><span>{String(index + 1).padStart(2, '0')}</span><PaperGraphic kind={step.art} /></div>
        <h2>{step.title}</h2>
        <p>{step.description}</p>
        <Button component={Link} to={step.to} variant="outlined">{step.label}</Button>
      </li>)}
    </ol>
    <section className="guide-record-note" aria-labelledby="guide-record-title">
      <div><h2 id="guide-record-title">{isGuest ? '샘플로 편하게 체험하세요' : '나만의 기록을 이어가세요'}</h2><p>{isGuest ? '샘플은 가상 데이터예요. 직접 수정해볼 수 있고, 새로고침하면 처음 상태로 돌아와요.' : '지원 기록·준비 체크·면접 노트는 로그인한 계정에 저장돼요.'}</p></div>
      <Button component={Link} to="/" variant="contained">지원 현황 열기</Button>
    </section>
    <p className="guide-scope-note">채용 공고를 찾아주거나 자동으로 지원하는 서비스가 아니에요. 내가 선택한 회사와 준비 과정을 정리하는 개인 기록장이에요.</p>
  </>;
}
