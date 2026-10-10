import { Link, Navigate, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import SiteFooter from '../components/SiteFooter';
import PracticePlayer from '../components/PracticePlayer';
import ExerciseCard from '../components/ExerciseCard';
import ComparisonMotif from '../components/ComparisonMotif';
import { EXERCISES } from '../constants/exercises';
import { PAGE_TITLES, usePageTitle } from '../utils/pageMeta';
import { getLegacyWorksPath } from '../utils/workList';

export default function HomePage() {
  const location = useLocation();
  usePageTitle(PAGE_TITLES.home);
  if (getLegacyWorksPath(location.search)) return <Navigate to="/exercises" replace />;
  return <div className="app-surface practice-surface"><Header /><div className="shell practice-home">
    <header className="practice-intro"><div><h1>UI 디자인 <span>비교 연습</span></h1><p>두 화면 중 하나를 고르고, 차이를 발견해요.</p></div><ComparisonMotif /></header>
    <PracticePlayer exercise={EXERCISES[0]} nextExercise={EXERCISES[1]} total={EXERCISES.length} />
    <section className="practice-more" aria-labelledby="more-title"><div className="practice-section-heading"><h2 id="more-title">다른 연습</h2><Link className="practice-text-link" to="/exercises">6개 모두 보기</Link></div><div className="exercise-grid">{[EXERCISES[1], EXERCISES[2], EXERCISES[5]].map(exercise => <ExerciseCard key={exercise.id} exercise={exercise} number={EXERCISES.indexOf(exercise) + 1} />)}</div></section>
  </div><SiteFooter /></div>;
}
