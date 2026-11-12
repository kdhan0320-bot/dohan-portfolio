import { useCallback, useEffect, useId, useRef, useState } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import './receiptFlow.css';

// The same example as the public receipt: ordered 5, received 3, issued 2.
export default function ReceiptFlow({ compact = false, onComplete }) {
  const id = useId();
  const reduced = useMediaQuery('(prefers-reduced-motion: reduce)');
  const surface = useRef(null);
  const timers = useRef([]);
  const completed = useRef(onComplete);
  const [phase, setPhase] = useState('settled');
  const [running, setRunning] = useState(false);
  useEffect(() => { completed.current = onComplete; }, [onComplete]);
  const clearTimers = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  }, []);
  const play = useCallback(() => {
    clearTimers();
    setRunning(true);
    setPhase('received');
    timers.current = [
      setTimeout(() => setPhase('issued'), 900),
      setTimeout(() => {
        setPhase('settled');
        setRunning(false);
        completed.current?.();
      }, 2250),
    ];
  }, [clearTimers]);
  useEffect(() => {
    if (reduced || !window.IntersectionObserver) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      play();
      observer.disconnect();
    }, { threshold: 0.5 });
    observer.observe(surface.current);
    return () => { observer.disconnect(); clearTimers(); };
  }, [reduced, play, clearTimers]);
  // Changing the OS motion setting during playback must leave a truthful end state.
  const receiving = !reduced && phase === 'received';
  const status = reduced || phase === 'settled' ? '3개 입고 − 2개 지급 = 1개 보유' : receiving ? '먼저 자재 3개가 입고됩니다.' : '2개를 현장에 지급합니다.';
  return <div ref={surface} className={`receipt-flow${compact ? ' receipt-flow--compact' : ''}`} data-phase={reduced ? 'settled' : phase}>
    <div className="receipt-flow__board" role="group" aria-labelledby={id}>
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
    <div className="receipt-flow__controls"><p aria-live="polite" aria-atomic="true">{status}</p>{!reduced && <button type="button" onClick={play} disabled={running}>{running ? '흐름 재생 중' : '수량 흐름 다시 보기'}</button>}</div>
  </div>;
}
