import { useEffect, useId, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import ExerciseArtwork from './ExerciseArtwork';
import PracticeIcon from './PracticeIcon';

export default function PracticePlayer({ exercise, nextExercise, number = 1, total = 6, standalone = false }) {
  const [selected, setSelected] = useState(null);
  const [revealed, setRevealed] = useState(false);
  const [hint, setHint] = useState(false);
  const [memo, setMemo] = useState('');
  const [zoom, setZoom] = useState(null);
  const [alternateGoal, setAlternateGoal] = useState(false);
  const id = useId();
  const dialogRef = useRef(null);
  const resultRef = useRef(null);
  const questionRef = useRef(null);
  const goalChangePending = useRef(false);
  const QuestionHeading = standalone ? 'h1' : 'h2';
  const ResultHeading = standalone ? 'h2' : 'h3';
  const variantFor = side => side === exercise.revisedSide ? 'revised' : 'original';
  const descriptionFor = side => side === exercise.revisedSide ? exercise.revisedDescription : exercise.originalDescription;
  const goal = alternateGoal ? exercise.alternateGoal : exercise;
  const preferredSide = alternateGoal ? exercise.alternateGoal.preferredSide : exercise.revisedSide;

  useEffect(() => {
    if (!goalChangePending.current) return;
    goalChangePending.current = false;
    questionRef.current?.focus({ preventScroll: true });
    questionRef.current?.scrollIntoView({ block: 'start', behavior: 'instant' });
  }, [alternateGoal]);

  useEffect(() => {
    if (!zoom) return undefined;
    const dialog = dialogRef.current;
    dialog.showModal();
    return () => { if (dialog.open) dialog.close(); };
  }, [zoom]);

  useEffect(() => {
    if (!revealed) return;
    resultRef.current?.focus({ preventScroll: true });
    resultRef.current?.scrollIntoView({ block: 'nearest', behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  }, [revealed]);

  const choose = side => { setSelected(side); setRevealed(false); };
  const resetComparison = (clearMemo = true) => {
    setSelected(null); setRevealed(false); setHint(false);
    if (clearMemo) setMemo('');
  };
  const restart = () => {
    resetComparison();
    questionRef.current?.focus({ preventScroll: true });
    questionRef.current?.scrollIntoView({ block: 'start', behavior: 'instant' });
  };
  const switchGoal = () => {
    resetComparison(false);
    goalChangePending.current = true;
    setAlternateGoal(value => !value);
  };

  return <section className="practice-player" aria-labelledby={`${id}-question`}>
    <div className={`practice-toolbar${standalone ? ' practice-toolbar-standalone' : ''}`}>
      {standalone && <Link className="practice-back" to="/exercises">연습 모음</Link>}
      <div className="practice-meta"><span className="practice-step">{String(number).padStart(2, '0')}<span> / {String(total).padStart(2, '0')}</span></span><span className="practice-step-track" aria-hidden="true">{Array.from({ length: total }, (_, index) => <i key={index} className={index === number - 1 ? 'is-current' : undefined} />)}</span><span>{exercise.context}</span></div>
    </div>
    <div className="practice-question">
      <QuestionHeading id={`${id}-question`} ref={questionRef} tabIndex={-1}>{goal.question}</QuestionHeading>
      <button className="practice-hint-button" aria-expanded={hint} aria-controls={`${id}-hint`} onClick={() => setHint(!hint)}>힌트 {hint ? '닫기' : '보기'}</button>
    </div>
    {hint && <p className="practice-hint" id={`${id}-hint`}>{goal.cue}</p>}
    <div className="practice-options" role="group" aria-labelledby={`${id}-question`}>
      {['A', 'B'].map(side => <article className={`practice-option${selected === side ? ' is-selected' : ''}${revealed && side === preferredSide ? ' is-suggested' : ''}`} key={side}>
        <div className="practice-option-top"><span className="practice-letter">{side}</span><span className="practice-option-status">{revealed && side === preferredSide ? '이 목표의 제안' : selected === side ? '내 선택' : ''}</span><button className="practice-zoom" aria-label={`${side} 화면 크게 보기`} onClick={() => setZoom(side)}><PracticeIcon name="expand" /><span>확대</span></button></div>
        <div className="practice-art-frame"><ExerciseArtwork kind={exercise.kind} variant={variantFor(side)} highlight={revealed} /></div>
        <p className="sr-only" id={`${id}-description-${side}`}>{descriptionFor(side)}</p>
        <button className="practice-choice" aria-pressed={selected === side} aria-describedby={`${id}-description-${side}`} onClick={() => choose(side)}><span className="practice-choice-dot" aria-hidden="true">{selected === side && <PracticeIcon name="check" />}</span><span>{side} {selected === side ? '선택됨' : '선택하기'}</span></button>
      </article>)}
    </div>
    <div className="practice-action-row">
      <p className="practice-image-note">그림 속 버튼은 비교용입니다.</p>
      {!revealed && <div className="practice-confirm"><span className="sr-only" aria-live="polite">{selected ? `${selected} 화면을 골랐어요.` : 'A 또는 B를 골라보세요.'}</span><button className="practice-primary" disabled={!selected} onClick={() => setRevealed(true)}>설계 이유 보기</button></div>}
    </div>
    {revealed && <div className="practice-result" ref={resultRef} tabIndex={-1} aria-label="선택과 설계 이유">
      <p className="practice-result-status">내 선택 {selected}<span>·</span>이 목표의 제안 {preferredSide}</p>
      <div className="practice-result-heading"><span className="practice-result-symbol" aria-hidden="true">{preferredSide}</span><ResultHeading>{goal.takeaway}</ResultHeading></div>
      {exercise.alternateGoal && <div className="practice-goal-switch"><p>목표를 바꾸면 선택도 달라질까요?</p><button className="practice-secondary" onClick={switchGoal}>{alternateGoal ? '제목 먼저 비교' : '작품 먼저 비교'}</button></div>}
      <div className="practice-result-details">
        <details><summary><span>설계 이유 더 보기</span><PracticeIcon name="plus" /></summary><p>{goal.explanation}</p><p>{goal.tradeoff}</p><p className="practice-limits">예제의 설계 판단이며, 실제 사용자 검증 결과는 아닙니다.</p></details>
        <details><summary><span>내 생각 한 줄 <span className="practice-optional">선택</span></span><PracticeIcon name="plus" /></summary><label htmlFor={`${id}-memo`} className="sr-only">이 예제에 대한 내 생각</label><textarea id={`${id}-memo`} value={memo} onChange={event => setMemo(event.target.value.slice(0, 160))} maxLength={160} placeholder="내가 이 화면을 고른 이유는…" /><div className="practice-memo-meta"><span>이동·새로고침하면 사라져요. {memo.length}/160</span><button disabled={!memo} onClick={() => setMemo('')}>지우기</button></div></details>
      </div>
      <div className="practice-result-actions"><button className="practice-secondary" onClick={restart}>다시 비교하기</button>{nextExercise ? <Link className="practice-primary" to={`/practice/${nextExercise.id}`}>다음 연습</Link> : <Link className="practice-primary" to="/recap">6가지 기준 정리</Link>}</div>
    </div>}
    <dialog ref={dialogRef} className="practice-zoom-dialog" aria-labelledby={`${id}-zoom-title`} onClose={() => setZoom(null)} onClick={event => { if (event.target === event.currentTarget) dialogRef.current.close(); }}>
      {zoom && <><div className="practice-zoom-heading"><h2 id={`${id}-zoom-title`}>{zoom} 화면 · {exercise.context}</h2><button className="practice-secondary" onClick={() => dialogRef.current.close()} autoFocus>닫기</button></div><ExerciseArtwork kind={exercise.kind} variant={variantFor(zoom)} highlight={revealed} /><p>{descriptionFor(zoom)}</p><span className="practice-image-note">비교용 그림 · Esc로 닫기</span></>}
    </dialog>
  </section>;
}
