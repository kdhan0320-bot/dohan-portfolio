import { Link, useParams } from 'react-router-dom';
import Header from '../components/Header';
import SiteFooter from '../components/SiteFooter';
import PracticePlayer from '../components/PracticePlayer';
import { EXERCISES, getExercise } from '../constants/exercises';
import { usePageTitle } from '../utils/pageMeta';

export default function PracticePage() {
  const { id } = useParams();
  const exercise = getExercise(id);
  const index = EXERCISES.findIndex(item => item.id === id);
  usePageTitle(exercise ? `${exercise.title} | 고른시선` : '연습을 찾을 수 없음 | 고른시선');
  return <div className="app-surface practice-surface"><Header /><div className="shell practice-page">
    {exercise ? <PracticePlayer key={exercise.id} exercise={exercise} nextExercise={EXERCISES[index + 1]} number={index + 1} total={EXERCISES.length} standalone /> : <div className="practice-empty"><h1>이 연습을 찾을 수 없어요.</h1><p>연습 모음에서 다른 화면을 골라주세요.</p><Link className="practice-primary" to="/exercises">연습 모음 보기</Link></div>}
  </div><SiteFooter /></div>;
}
