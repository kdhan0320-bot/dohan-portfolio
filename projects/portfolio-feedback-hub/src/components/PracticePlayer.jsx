import { useEffect, useId, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import ExerciseArtwork from './ExerciseArtwork';
import PracticeIcon from './PracticeIcon';

function focusBelowHeader(target, smooth = true) {
  if (!target) return;
  const header = target.closest('.practice-surface')?.querySelector('.site-header');
  const offset = (header?.getBoundingClientRect().height || 0) + 20;
  target.focus({ preventScroll: true });
  window.scrollTo({ top: Math.max(0, window.scrollY + target.getBoundingClientRect().top - offset), behavior: smooth && !window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'smooth' : 'instant' });
}

export default function PracticePlayer({ exercise, nextExercise, number = 1, total = 6, standalone = false }) {
  const [selected, setSelected] = useState(null);
  const [revealed, setRevealed] = useState(false);
  const [hint, setHint] = useState(false);
  const [memo, setMemo] = useState('');
  const [zoom, setZoom] = useState(null);
  const [zoomWidth, setZoomWidth] = useState(0);
  const [zoomHeight, setZoomHeight] = useState(0);
  const [zoomCenterX, setZoomCenterX] = useState(0);
  const [fitScale, setFitScale] = useState(1);
  const [enlarged, setEnlarged] = useState(false);
  const [reviewedGoals, setReviewedGoals] = useState([]);
  const [alternateGoal, setAlternateGoal] = useState(false);
  const [visibleSide, setVisibleSide] = useState('A');
  const id = useId();
  const dialogRef = useRef(null);
  const zoomViewportRef = useRef(null);
  const artworkRefs = useRef({});
  const comparisonRef = useRef(null);
  const mobileComparisonRef = useRef(null);
  const goalControlsRef = useRef(null);
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
    focusBelowHeader(goalControlsRef.current || questionRef.current, false);
  }, [alternateGoal]);

  useEffect(() => {
    if (!zoom) return undefined;
    const dialog = dialogRef.current;
    const root = document.documentElement;
    const previousGutter = root.style.getPropertyValue('--practice-modal-gutter');
    root.style.setProperty('--practice-modal-gutter', `${window.innerWidth - root.getBoundingClientRect().width}px`);
    dialog.showModal();
    const viewport = zoomViewportRef.current;
    // Measure the outer frame so optional scrollbars cannot change the fit scale.
    const fitArtwork = () => {
      setFitScale(Math.min((viewport.offsetWidth - 4) / zoomWidth, (viewport.offsetHeight - 4) / zoomHeight));
      setZoomCenterX(window.innerWidth / 2);
    };
    const observer = new ResizeObserver(fitArtwork);
    observer.observe(viewport);
    window.addEventListener('resize', fitArtwork);
    fitArtwork();
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', fitArtwork);
      if (dialog.open) dialog.close();
      if (previousGutter) root.style.setProperty('--practice-modal-gutter', previousGutter);
      else root.style.removeProperty('--practice-modal-gutter');
    };
  }, [zoom, zoomWidth, zoomHeight]);

  useEffect(() => {
    if (!revealed) return;
    focusBelowHeader(resultRef.current);
  }, [revealed]);

  const choose = side => {
    if (selected === side) return;
    setSelected(side); setRevealed(false);
  };
  const revealReason = () => {
    setVisibleSide(preferredSide);
    setRevealed(true);
    if (exercise.alternateGoal) setReviewedGoals(previous => previous.includes(alternateGoal) ? previous : [...previous, alternateGoal]);
  };
  const returnToSuggested = () => {
    setVisibleSide(preferredSide);
    const target = window.matchMedia('(max-width: 700px)').matches ? mobileComparisonRef.current : comparisonRef.current;
    focusBelowHeader(target);
  };
  const openZoom = side => {
    setZoomWidth(artworkRefs.current[side].clientWidth);
    setZoomHeight(artworkRefs.current[side].clientHeight);
    setZoomCenterX(window.innerWidth / 2);
    setEnlarged(false);
    setZoom(side);
  };
  const panZoom = event => {
    if (!enlarged || !['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
    if (event.target !== event.currentTarget && event.target !== zoomViewportRef.current) return;
    event.preventDefault();
    zoomViewportRef.current?.scrollBy({ left: event.key === 'ArrowRight' ? 80 : -80 });
  };
  const resetComparison = (clearMemo = true) => {
    setSelected(null); setRevealed(false); setHint(false);
    setVisibleSide('A');
    if (clearMemo) setMemo('');
  };
  const restart = () => {
    resetComparison();
    setReviewedGoals([]);
    focusBelowHeader(goalControlsRef.current || questionRef.current, false);
  };
  const switchGoal = (nextGoal, moveToQuestion = false) => {
    if (nextGoal === alternateGoal) return;
    resetComparison(false);
    goalChangePending.current = moveToQuestion;
    setAlternateGoal(nextGoal);
  };
  const hintButton = <button className="practice-hint-button" aria-expanded={hint} aria-controls={`${id}-hint`} onClick={() => setHint(!hint)}>힌트 {hint ? '닫기' : '보기'}</button>;
  const closeOnBackdrop = event => {
    if (event.target !== event.currentTarget) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialogRef.current.close();
  };

  return <section className="practice-player" aria-labelledby={`${id}-question`}>
    <div className={`practice-toolbar${standalone ? ' practice-toolbar-standalone' : ''}${exercise.alternateGoal ? ' practice-toolbar-goals' : ''}`}>
      {standalone && <Link className="practice-back" to="/exercises">연습 모음</Link>}
      <div className="practice-meta"><span className="practice-step">{String(number).padStart(2, '0')}<span> / {String(total).padStart(2, '0')}</span></span><span className="practice-step-track" aria-hidden="true">{Array.from({ length: total }, (_, index) => <i key={index} className={index === number - 1 ? 'is-current' : undefined} />)}</span><span>{exercise.context}</span></div>
      {exercise.alternateGoal && <div className="practice-goal-controls" ref={goalControlsRef} tabIndex={-1} role="group" aria-label="같은 두 화면의 비교 목표와 힌트">
        <span className="practice-goal-label">비교 목표</span>
        <button aria-pressed={!alternateGoal} aria-controls={`${id}-question`} onClick={() => switchGoal(false)}>제목 먼저</button>
        <button aria-pressed={alternateGoal} aria-controls={`${id}-question`} onClick={() => switchGoal(true)}>작품 먼저</button>
        {hintButton}
      </div>}
    </div>
    <div className="practice-question">
      <QuestionHeading id={`${id}-question`} ref={questionRef} tabIndex={-1} aria-live={exercise.alternateGoal ? 'polite' : undefined}>{goal.question}</QuestionHeading>
      {!exercise.alternateGoal && hintButton}
    </div>
    {hint && <p className="practice-hint" id={`${id}-hint`}>{goal.cue}</p>}
    <p className="practice-comparison-note">그림 속 버튼은 비교용입니다. 아래의 선택 버튼을 눌러주세요.</p>
    <div className="practice-mobile-comparison" ref={mobileComparisonRef} tabIndex={-1} role="group" aria-label="비교할 화면과 확대">
      <div className="practice-view-toolbar">
        <div className="practice-view-switch" role="group" aria-label="비교할 화면">
          {['A', 'B'].map(side => <button key={side} aria-label={`${side} 화면 보기${selected === side ? ', 내 선택' : ''}`} aria-pressed={visibleSide === side} aria-controls={`${id}-option-${side}`} onClick={() => setVisibleSide(side)}>{side} 보기<span className={`practice-view-selection${selected === side ? ' is-visible' : ''}`} aria-hidden="true"><PracticeIcon name="check" /></span></button>)}
        </div>
        <button className="practice-zoom" aria-label={`${visibleSide} 화면 크게 보기`} onClick={() => openZoom(visibleSide)}><PracticeIcon name="expand" /><span>확대</span></button>
      </div>
      {revealed && <p className="practice-current-view" aria-live="polite">현재 {visibleSide} 화면 · {visibleSide === preferredSide ? '이 목표의 제안' : '다른 안과 비교 중'}</p>}
    </div>
    <div className="practice-options" ref={comparisonRef} tabIndex={-1} role="group" aria-labelledby={`${id}-question`}>
      {['A', 'B'].map(side => <article id={`${id}-option-${side}`} className={`practice-option${visibleSide === side ? ' is-current-view' : ''}${selected === side ? ' is-selected' : ''}${revealed && side === preferredSide ? ' is-suggested' : ''}`} key={side}>
        <div className="practice-option-top"><span className="practice-letter">{side}</span><span className="practice-option-status">{revealed && side === preferredSide ? '이 목표의 제안' : selected === side ? '내 선택' : ''}</span><button className="practice-zoom" aria-label={`${side} 화면 크게 보기`} onClick={() => openZoom(side)}><PracticeIcon name="expand" /><span>확대</span></button></div>
        <div className="practice-art-frame" ref={element => { artworkRefs.current[side] = element; }}><ExerciseArtwork kind={exercise.kind} variant={variantFor(side)} highlight={revealed} /></div>
        <p className="sr-only" id={`${id}-description-${side}`}>{descriptionFor(side)}</p>
        <button className="practice-choice" aria-pressed={selected === side} aria-describedby={`${id}-description-${side}`} onClick={() => choose(side)}><span className="practice-choice-dot" aria-hidden="true"><PracticeIcon name="check" /></span><span className="practice-choice-label">{side} {selected === side ? '선택됨' : '선택하기'}</span></button>
      </article>)}
    </div>
    <div className="practice-action-row">
      {!revealed && <div className="practice-confirm"><span aria-live="polite">{selected ? `내 선택 ${selected}` : 'A 또는 B를 선택해 주세요.'}</span><button className="practice-primary" disabled={!selected} onClick={revealReason}>설계 이유 보기</button></div>}
    </div>
    {revealed && <div className="practice-result" ref={resultRef} tabIndex={-1} aria-label="선택과 설계 이유">
      <p className="practice-result-status">내 선택 {selected}<span>·</span>이 목표의 제안 {preferredSide}</p>
      <div className="practice-result-heading"><span className="practice-result-symbol" aria-hidden="true">{preferredSide}</span><ResultHeading>{goal.takeaway}</ResultHeading></div>
      <p className="practice-result-explanation">{goal.explanation}</p>
      <button className="practice-result-artwork-link" onClick={returnToSuggested}>{preferredSide} 화면{visibleSide === preferredSide ? ' 다시 보기' : '으로 돌아가기'}</button>
      {exercise.alternateGoal && <div className={`practice-goal-switch${reviewedGoals.length === 2 ? ' has-perspective' : ''}`}>
        {reviewedGoals.length === 2 ? <div className="practice-perspective" aria-label="두 목표의 제안 비교">
          <p className="practice-perspective-title">같은 화면, 달라진 선택의 기준</p>
          <dl><div><dt><span>{exercise.revisedSide}</span>제목 먼저</dt><dd>전시 이름에 시선이 머물게</dd></div><div><dt><span>{exercise.alternateGoal.preferredSide}</span>작품 먼저</dt><dd>작품을 볼 공간을 넓게</dd></div></dl>
          <p>두 화면은 그대로예요. 무엇을 먼저 보느냐에 따라 제안이 달라져요.</p>
        </div> : <p>목표를 바꾸면, 같은 두 화면의 제안도 달라질까요?</p>}
        <button className="practice-secondary" onClick={() => switchGoal(!alternateGoal, true)}>{alternateGoal ? '제목 먼저 비교' : '작품 먼저 비교'}</button>
      </div>}
      <div className="practice-result-details">
        <details><summary><span>다른 상황에서는?</span><PracticeIcon name="plus" /></summary><p>{goal.tradeoff}</p><p className="practice-limits">예제의 설계 판단이며, 실제 사용자 검증 결과는 아닙니다.</p></details>
        <details><summary><span>내 생각 한 줄 <span className="practice-optional">선택</span></span><PracticeIcon name="plus" /></summary><label htmlFor={`${id}-memo`} className="sr-only">이 예제에 대한 내 생각</label><textarea id={`${id}-memo`} value={memo} onChange={event => setMemo(event.target.value.slice(0, 160))} maxLength={160} placeholder="내가 이 화면을 고른 이유는…" /><div className="practice-memo-meta"><span>이동·새로고침하면 사라져요. {memo.length}/160</span><button disabled={!memo} onClick={() => setMemo('')}>지우기</button></div></details>
      </div>
      <div className="practice-result-actions"><button className="practice-secondary" onClick={restart}>다시 비교하기</button>{nextExercise ? <Link className="practice-primary" to={`/practice/${nextExercise.id}`}>다음 연습</Link> : <Link className="practice-primary" to="/recap">6가지 기준 정리</Link>}</div>
    </div>}
    <dialog ref={dialogRef} className="practice-zoom-dialog" style={{ '--art-ratio': zoomWidth && zoomHeight ? zoomWidth / zoomHeight : 1.8, '--dialog-center-x': `${zoomCenterX}px` }} aria-labelledby={`${id}-zoom-title`} onClose={() => setZoom(null)} onKeyDown={panZoom} onClick={closeOnBackdrop}>
      {zoom && <>
        <div className="practice-zoom-heading"><h2 id={`${id}-zoom-title`}>{zoom} 화면 · {exercise.context}</h2><button className="practice-secondary" onClick={() => dialogRef.current.close()} autoFocus>닫기</button></div>
        <div className="practice-zoom-tools" role="group" aria-label="그림 크기">
          <button aria-pressed={!enlarged} onClick={() => setEnlarged(false)}>전체 보기</button>
          <button aria-pressed={enlarged} onClick={() => setEnlarged(true)}>150% 확대</button>
        </div>
        <p className="practice-zoom-help" id={`${id}-zoom-help`}>전체 배치가 한눈에 보여요. 150% 확대를 선택하면 스크롤·방향키로 살펴볼 수 있어요.</p>
        <div className={`practice-zoom-viewport${enlarged ? ' is-enlarged' : ''}`} ref={zoomViewportRef} tabIndex={0} role="region" aria-label={`${zoom} 비교 그림`} aria-describedby={`${id}-zoom-help`} onPointerDown={event => event.currentTarget.focus({ preventScroll: true })}>
          <div className={`practice-zoom-canvas${enlarged ? ' is-enlarged' : ''}`} style={{ '--art-width': `${zoomWidth}px`, '--art-scale': fitScale }}><ExerciseArtwork kind={exercise.kind} variant={variantFor(zoom)} highlight={revealed} /></div>
        </div>
        <div className="practice-zoom-caption"><p>{descriptionFor(zoom)}</p><span className="practice-image-note">비교용 그림 · Esc로 닫기</span></div>
      </>}
    </dialog>
  </section>;
}
