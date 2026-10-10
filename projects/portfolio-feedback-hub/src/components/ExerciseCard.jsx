import { Link } from 'react-router-dom';
import ExerciseArtwork from './ExerciseArtwork';

export default function ExerciseCard({ exercise, number }) {
  return <Link className="exercise-card" to={`/practice/${exercise.id}`} aria-label={`${exercise.title} 연습하기`}>
    <div className="exercise-card-art"><ExerciseArtwork kind={exercise.kind} variant="revised" compact /><span className="exercise-card-number">{String(number).padStart(2, '0')}</span><span className="exercise-card-ab" aria-hidden="true">A / B</span></div>
    <div className="exercise-card-copy"><span>{exercise.category}</span><h3>{exercise.title}</h3><p>{exercise.context}</p><span className="exercise-card-action">비교하기</span></div>
  </Link>;
}
