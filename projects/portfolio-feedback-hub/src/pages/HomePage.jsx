import { Link, Navigate, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import SiteFooter from '../components/SiteFooter';
import PracticePlayer from '../components/PracticePlayer';
import ExerciseCard from '../components/ExerciseCard';
import { EXERCISES } from '../constants/exercises';
import { PAGE_TITLES, usePageTitle } from '../utils/pageMeta';
import { getLegacyWorksPath } from '../utils/workList';

export default function HomePage() {
  const location = useLocation();
  usePageTitle(PAGE_TITLES.home);
  if (getLegacyWorksPath(location.search)) return <Navigate to="/exercises" replace />;
  return <div className="app-surface practice-surface"><Header /><div className="shell practice-home">
    <header className="practice-intro"><div><span className="practice-eyebrow">직접 고르고, 이유를 발견하는</span><h1>UI 디자인 비교 연습<span className="practice-title-dot">.</span></h1><p>목표에 맞는 화면을 골라보세요. 차이를 읽는 연습이 시작됩니다.</p></div><div className="practice-intro-mark" aria-hidden="true"><span>A</span><span>B</span></div></header>
    <PracticePlayer exercise={EXERCISES[0]} nextExercise={EXERCISES[1]} total={EXERCISES.length} />
    <section className="practice-more" aria-labelledby="more-title"><div className="practice-section-heading"><div><span className="practice-eyebrow">작은 차이, 다른 경험</span><h2 id="more-title">다음에는 이런 차이를 찾아보세요.</h2></div><Link className="practice-text-link" to="/exercises">연습 6개 모두 보기</Link></div><div className="exercise-grid">{[EXERCISES[1], EXERCISES[2], EXERCISES[5]].map(exercise => <ExerciseCard key={exercise.id} exercise={exercise} number={EXERCISES.indexOf(exercise) + 1} />)}</div></section>
  </div><SiteFooter /></div>;
}
