import { useEffect, useRef, useState } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { PROCUREMENT_RECEIPT } from '../data/projectsData';
import { scrollToSection } from '../hooks/useScrollNav';
import './procurementCase.css';

function ReceiptAndHistory({ ready, liveUrl, question }) {
  const reduced = useMediaQuery('(prefers-reduced-motion: reduce)');
  const plate = useRef(null);
  const follow = useRef(false);
  const played = useRef(false);
  const [loaded, setLoaded] = useState(false);
  const [run, setRun] = useState(0);
  const [arrived, setArrived] = useState(false);

  useEffect(() => {
    if (reduced) {
      if (follow.current) scrollToSection('receipt-history', { instant: true });
      follow.current = false;
      return;
    }
    if (!loaded || played.current || !window.IntersectionObserver) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || played.current) return;
      played.current = true;
      setRun(n => n + 1);
      observer.disconnect();
    }, { threshold: 0.55 });
    observer.observe(plate.current);
    return () => observer.disconnect();
  }, [loaded, reduced]);

  useEffect(() => {
    const release = () => { follow.current = false; };
    window.addEventListener('wheel', release, { passive: true });
    window.addEventListener('touchmove', release, { passive: true });
    return () => {
      window.removeEventListener('wheel', release);
      window.removeEventListener('touchmove', release);
    };
  }, []);

  function traceToHistory(event) {
    if (reduced || !loaded) {
      scrollToSection('receipt-history', { instant: true });
      return;
    }
    event.currentTarget.focus({ preventScroll: true });
    played.current = true;
    follow.current = true;
    setArrived(false);
    setRun(n => n + 1);
  }

  function finishTrace() {
    setArrived(true);
    if (follow.current) scrollToSection('receipt-history');
    follow.current = false;
  }

  return (
    <section className="receipt-story" aria-labelledby="receipt-question">
      <h2 id="receipt-question">{question}</h2>
      <figure className="receipt-sheet">
        <div className="receipt-plate" ref={plate}>
          <img {...PROCUREMENT_RECEIPT} onLoad={() => setLoaded(true)} />
          {run > 0 && !reduced && (
            <div key={run} className="receipt-trace" aria-hidden="true">
              <i className="trace-in" /><i className="trace-out" />
              <i className="trace-balance" onAnimationEnd={finishTrace} />
            </div>
          )}
        </div>
        <figcaption>
          <span>품의선 공개 웹 · 예시 전표</span>
          <button type="button" aria-controls="receipt-history" onClick={traceToHistory}
            onBlur={() => { follow.current = false; }}>
            {reduced ? '입출고 이력 보기' : '수량 흐름 따라 이력 보기'} <span aria-hidden="true">↓</span>
          </button>
        </figcaption>
      </figure>
      <section className="receipt-ledger" data-arrived={arrived} aria-labelledby="receipt-history">
        <h3 id="receipt-history" tabIndex="-1">포토센서 입출고 이력</h3>
        <ol>
          {ready.history.map(row => (
            <li key={row.record}>
              <span className="ledger-event"><strong>{row.type}</strong><span>{row.party}</span></span>
              <span className="ledger-record">{row.record}</span>
              <b>{row.amount}</b>
            </li>
          ))}
        </ol>
        <a className="text-link" href={liveUrl + ready.historyPath} target="_blank" rel="noreferrer">
          품의선에서 실시간 이력 보기
        </a>
      </section>
    </section>
  );
}

export default function ProcurementCase({ project, ready, question, register }) {
  return (
    <div className="procurement-case">
      {register}
      <div className="procurement-layout">
        <header className="procurement-heading">
          <p className="case-eyebrow">{project.categoryLabel}</p>
          <h1>{project.title}</h1>
          <div className="procurement-role">
            <p>김도한의 역할</p>
            <p>{ready.role}</p>
          </div>
        </header>
        <ReceiptAndHistory ready={ready} liveUrl={project.liveUrl} question={question} />
        <section className="procurement-credits" aria-labelledby="procurement-credit-title">
          <h2 id="procurement-credit-title">업무 경험과 제작 범위</h2>
          <dl>{ready.aiCollaboration.map(person => (
            <div key={person.label}><dt>{person.label}</dt><dd>{person.value}</dd></div>
          ))}</dl>
          <p className="procurement-scope">React · MUI<br />가상 자재로 시연하며 입력한 기록은 이 브라우저에 저장됩니다.</p>
          <div className="case-actions">
            <a className="case-action case-action--primary" href={project.liveUrl} target="_blank" rel="noreferrer">웹사이트 보기</a>
            <a className="text-link" href={project.githubUrl} target="_blank" rel="noreferrer">코드 보기</a>
          </div>
        </section>
      </div>
    </div>
  );
}
