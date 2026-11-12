import { useCallback, useEffect, useId, useRef, useState } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import './receiptFlow.css';

// The same example as the public receipt: ordered 5, received 3, issued 2.
export default function ReceiptFlow({ compact = false, onStart, onComplete }) {
  const id = useId();
  const reduced = useMediaQuery('(prefers-reduced-motion: reduce)');
  const surface = useRef(null);
  const timers = useRef([]);
  const autoStarted = useRef(false);
  const callbacks = useRef({ onStart, onComplete });
  const [phase, setPhase] = useState('settled');
  const [running, setRunning] = useState(false);
  const [played, setPlayed] = useState(false);
  useEffect(() => { callbacks.current = { onStart, onComplete }; }, [onStart, onComplete]);
  const clearTimers = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  }, []);
  const play = useCallback(() => {
    clearTimers();
    autoStarted.current = true;
    setRunning(true);
    setPlayed(true);
    setPhase('received');
    callbacks.current.onStart?.();
    timers.current = [
      setTimeout(() => setPhase('issued'), 1400),
      setTimeout(() => {
        setPhase('settled');
        setRunning(false);
        callbacks.current.onComplete?.();
      }, 3400),
    ];
  }, [clearTimers]);
  useEffect(() => {
    if (reduced) {
      clearTimers();
      setPhase('settled');
      setRunning(false);
      return;
    }
    if (!window.IntersectionObserver) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (autoStarted.current) { observer.disconnect(); return; }
      clearTimers();
      if (!entry.isIntersecting) return;
      timers.current = [setTimeout(() => { play(); observer.disconnect(); }, 1000)];
    }, { threshold: 0.65 });
    observer.observe(surface.current);
    return () => { observer.disconnect(); clearTimers(); };
  }, [reduced, play, clearTimers]);
  useEffect(() => clearTimers, [clearTimers]);
  // Changing the OS motion setting during playback must leave a truthful end state.
  const receiving = !reduced && phase === 'received';
  const status = reduced || phase === 'settled' ? '3개 입고 − 2개 지급 = 1개 보유' : receiving ? '먼저 자재 3개가 입고됩니다.' : '2개를 현장에 지급합니다.';
  return <div ref={surface} className={`receipt-flow${compact ? ' receipt-flow--compact' : ''}`} data-phase={reduced ? 'settled' : phase}>
    <div className="receipt-flow__controls">
      <p>입고에서 보유까지</p>
      {!reduced ? <button type="button" onClick={play} aria-controls={`${id}-board`} aria-label="수량 흐름 처음부터 재생">{running ? '처음부터 다시 보기' : played ? '수량 흐름 다시 보기' : '수량 흐름 보기'}</button> : <span>움직임 없이 결과 보기</span>}
    </div>
    <div id={`${id}-board`} className="receipt-flow__board" role="group" aria-labelledby={id}>
      <div className="receipt-flow__heading"><strong id={id}>포토센서 <span>SEN-PH-01</span></strong><span>발주 5개 · 입고 예정 2개</span></div>
      <dl className="receipt-flow__quantities">
        <div><dt>받은 수량</dt><dd>3<span>개</span></dd></div>
        <div><dt>지급한 수량</dt><dd>{receiving ? '0' : '−2'}<span>개</span></dd></div>
        <div><dt>현재 보유</dt><dd>{receiving ? '3' : '1'}<span>개</span></dd></div>
      </dl>
      <div className="receipt-flow__movement" aria-hidden="true">
        <span className="receipt-flow__bin">보유</span><span className="receipt-flow__bin">현장 지급</span>
        {[0, 1, 2].map(unit => <i key={unit} className={`receipt-flow__unit receipt-flow__unit--${unit}`}>1개</i>)}
      </div>
      {!compact && <p className="receipt-flow__explanation">아직 받지 않은 2개는 현재 보유 수량에 포함하지 않습니다.</p>}
    </div>
    <p className="receipt-flow__status" aria-live="polite" aria-atomic="true">{status}</p>
  </div>;
}
