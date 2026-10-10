import { useState } from 'react';
import Header from '../components/Header';
import SiteFooter from '../components/SiteFooter';
import ExerciseCard from '../components/ExerciseCard';
import { EXERCISES } from '../constants/exercises';
import { PAGE_TITLES, usePageTitle } from '../utils/pageMeta';

const categories = ['전체', '글자·여백', '버튼·조작', '입력·안내'];
export default function ExercisesPage() {
  const [category, setCategory] = useState('전체');
  usePageTitle(PAGE_TITLES.exercises);
  const items = EXERCISES.filter(item => category === '전체' || item.category === category);
  return <div className="app-surface practice-surface"><Header /><div className="shell exercise-library">
    <header className="exercise-library-heading"><div><span className="practice-eyebrow">한 번에 한 가지 차이</span><h1>오늘은 무엇을 비교할까요?</h1></div><p>직접 만든 6가지 UI 예제</p></header>
    <div className="exercise-filters" role="group" aria-label="연습 주제">{categories.map(item => <button key={item} aria-pressed={category === item} onClick={() => setCategory(item)}>{item}</button>)}</div>
    <p className="sr-only" role="status">{category} 연습 {items.length}개</p>
    <div className="exercise-grid">{items.map(exercise => <ExerciseCard key={exercise.id} exercise={exercise} number={EXERCISES.indexOf(exercise) + 1} />)}</div>
  </div><SiteFooter /></div>;
}
