import { Link } from 'react-router-dom';
import Header from '../components/Header';
import SiteFooter from '../components/SiteFooter';
import PrincipleVisual from '../components/PrincipleVisual';
import { EXERCISES } from '../constants/exercises';
import { usePageTitle } from '../utils/pageMeta';
import '../styles/practice-recap.css';

const summaries = {
  gallery: '문구는 그대로, 제목에 크기와 비중을.',
  sound: '조작은 그대로, 첫 재생에 강조를.',
  portfolio: '내용은 그대로, 간격으로 묶음을.',
  flower: '사진은 그대로, 글자 뒤에 읽을 면을.',
  walk: '경로는 그대로, 선과 범례로 구분을.',
  signup: '조건은 그대로, 입력 중에도 보이는 곳에.'
};

export default function PracticeRecapPage() {
  usePageTitle('6가지 디자인 기준 | 고른시선');

  return <div className="app-surface practice-surface">
    <Header />
    <div className="shell practice-recap">
      <header className="practice-recap-heading">
        <h1>6가지 디자인 기준</h1>
        <p>같게 둔 것과 달리 둔 것, 다음 화면에서도 살펴보세요.</p>
      </header>
      <div className="practice-recap-grid">
        {EXERCISES.map((exercise, index) => <Link className="practice-recap-card" key={exercise.id} to={`/practice/${exercise.id}`} aria-label={`${exercise.principle} 연습 다시 보기`} aria-describedby={`principle-${exercise.kind}`}>
          <div className="practice-recap-visual" aria-hidden="true"><PrincipleVisual kind={exercise.kind} /></div>
          <div className="practice-recap-caption">
            <div className="practice-recap-title"><span className="practice-recap-number" aria-hidden="true">0{index + 1}</span><h2>{exercise.principle}</h2></div>
            <p id={`principle-${exercise.kind}`}>{summaries[exercise.kind]}</p>
            <span className="practice-recap-link" aria-hidden="true">연습 다시 보기</span>
          </div>
        </Link>)}
      </div>
      <div className="practice-recap-actions"><Link className="practice-secondary" to="/">홈으로</Link><Link className="practice-primary" to="/exercises">연습 모음</Link></div>
    </div>
    <SiteFooter />
  </div>;
}
