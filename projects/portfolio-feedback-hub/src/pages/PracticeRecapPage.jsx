import { Link } from 'react-router-dom';
import Header from '../components/Header';
import SiteFooter from '../components/SiteFooter';
import PrincipleVisual from '../components/PrincipleVisual';
import { EXERCISES } from '../constants/exercises';
import { usePageTitle } from '../utils/pageMeta';
import '../styles/practice-recap.css';

const summaries = {
  gallery: '먼저 볼 정보에 크기와 비중을.',
  sound: '중심이 되는 조작을 눈에 띄게.',
  portfolio: '관련 정보는 가깝게, 다른 정보는 여유 있게.',
  flower: '사진 위에도 글자가 읽힐 공간을.',
  walk: '경로의 차이와 선의 뜻을 함께.',
  signup: '입력하는 동안에도 조건이 보이게.'
};

export default function PracticeRecapPage() {
  usePageTitle('6가지 디자인 기준 | 고른시선');

  return <div className="app-surface practice-surface">
    <Header />
    <div className="shell practice-recap">
      <header className="practice-recap-heading">
        <h1>6가지 디자인 기준</h1>
        <p>다음 화면을 볼 때도 떠올려 보세요.</p>
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
