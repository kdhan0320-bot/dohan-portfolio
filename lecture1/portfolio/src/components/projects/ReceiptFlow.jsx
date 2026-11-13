import { useCallback, useEffect, useId, useRef, useState } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import './receiptFlow.css';

// The same example as the public receipt: ordered 5, received 3, issued 2.
export default function ReceiptFlow({ compact = false, onStart, onComplete }) {
  const id = useId();
  const reduced = useMediaQuery('(prefers-reduced-motion: reduce)');
  const timers = useRef([]);
  const replayRef = useRef(null);
  const resultRef = useRef(null);
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
    setRunning(true);
    setPlayed(true);
    setPhase('received');
    callbacks.current.onStart?.();
    timers.current = [
      setTimeout(() => setPhase('issued'), 1400),
      setTimeout(() => {
        if (document.activeElement === resultRef.current) replayRef.current?.focus({ preventScroll: true });
        setPhase('settled');
        setRunning(false);
        callbacks.current.onComplete?.();
      }, 3400),
    ];
  }, [clearTimers]);
  const showResult = useCallback(() => {
    clearTimers();
    replayRef.current?.focus({ preventScroll: true });
    setPhase('settled');
    setRunning(false);
    callbacks.current.onStart?.();
  }, [clearTimers]);
  useEffect(() => {
    if (reduced) {
      clearTimers();
      setPhase('settled');
      setRunning(false);
    }
  }, [reduced, clearTimers]);
  useEffect(() => clearTimers, [clearTimers]);
  // Changing the OS motion setting during playback must leave a truthful end state.
  const receiving = !reduced && phase === 'received';
  const playing = !reduced && running;
  const status = playing ? receiving ? '입고 시점 · 자재 3개를 받았습니다.' : '지급 시점 · 받은 3개 중 2개를 현장에 지급합니다.' : '현재 결과 · 3개 입고 − 2개 지급 = 1개 보유';
  return <div className={`receipt-flow${compact ? ' receipt-flow--compact' : ''}`} data-phase={reduced ? 'settled' : phase} data-mode={playing ? 'playback' : 'result'}>
    <div className="receipt-flow__controls">
      <p>{playing ? `과정 재생 · ${receiving ? '입고' : '지급'} 단계` : '현재 결과'}</p>
      {!reduced ? <div className="receipt-flow__actions">
        <button ref={replayRef} type="button" onClick={play} aria-controls={`${id}-board`} aria-label="입고부터 수량 과정 재생">{playing ? '처음부터 재생' : played ? '과정 다시 보기' : '입고부터 재생'}</button>
        {playing && <button ref={resultRef} className="receipt-flow__result" type="button" onClick={showResult} aria-controls={`${id}-board`}>현재 결과 보기</button>}
      </div> : <span>움직임 없이 결과 보기</span>}
    </div>
    <div id={`${id}-board`} className="receipt-flow__board" role="group" aria-labelledby={id}>
      <div className="receipt-flow__heading"><strong id={id}>포토센서 <span>SEN-PH-01</span></strong><span>발주 5개 · 입고 예정 2개</span></div>
      <dl className="receipt-flow__quantities">
        <div><dt>받은 수량</dt><dd>3<span>개</span></dd></div>
        <div><dt>지급한 수량</dt><dd>{receiving ? '0' : '−2'}<span>개</span></dd></div>
        <div><dt>{playing ? '해당 시점 보유' : '현재 보유'}</dt><dd>{receiving ? '3' : '1'}<span>개</span></dd></div>
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
