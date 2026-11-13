import { useState } from 'react';
import { PROCUREMENT_RECEIPT } from '../data/projectsData';
import { scrollToSection } from '../hooks/useScrollNav';
import ReceiptFlow from '../components/projects/ReceiptFlow';
import './procurementCase.css';
const media = `${import.meta.env.BASE_URL}detail/current/`;

function ReceiptAndHistory({ ready, liveUrl, question }) {
  const [arrived, setArrived] = useState(false);

  return (
    <section className="receipt-story" aria-labelledby="receipt-question">
      <h2 id="receipt-question">{question}</h2>
      <ReceiptFlow onStart={() => setArrived(false)} onComplete={() => setArrived(true)} />
      <div className="receipt-story-links"><span>품의선 예시 전표 · 수량 흐름 재구성</span><button type="button" onClick={() => scrollToSection('receipt-history')}>입출고 이력 보기</button></div>
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
          품의선에서 예시 이력 보기
        </a>
      </section>
      <details className="receipt-original"><summary>공개 웹의 원본 전표 보기</summary><img {...PROCUREMENT_RECEIPT} loading="lazy" /></details>
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
        <section className="procurement-decisions" aria-labelledby="procurement-decisions-title">
          <div className="procurement-decisions__heading"><p className="case-eyebrow">공개 웹의 실제 화면</p><h2 id="procurement-decisions-title">처리할 일과 재고.</h2></div>
          <div className="procurement-decisions__screens">
            <figure className="procurement-decisions__desktop">
              <img src={media+'pumuiseon-work-1440-20261113.png'} alt="품의선 PC 업무 현황. 왼쪽 업무 단계 메뉴, 상단 전표와 업무 요약, 하단 처리할 품의와 입고 대기 목록." width="1440" height="1000" />
              <figcaption><div><strong>PC · 전표와 업무 현황</strong><p>구매·결재, 발주·입고, 자재·지급을 구분해 보여줍니다.</p></div><a href={media+'pumuiseon-work-1440-20261113.png'} target="_blank" rel="noreferrer" aria-label="품의선 PC 원본 이미지 보기 (새 탭)">원본 보기</a></figcaption>
            </figure>
            <figure className="procurement-decisions__mobile">
              <img src={media+'pumuiseon-work-390-20261113.png'} alt="품의선 모바일 업무 현황. 보완이 필요한 품의 카드와 내용 보완 링크가 전표 위에 먼저 보입니다." width="390" height="844" />
              <figcaption><div><strong>모바일 · 처리할 일부터</strong><p>보완할 품의를 전표 위에 두고 ‘내용 보완’으로 연결합니다.</p></div><a href={media+'pumuiseon-work-390-20261113.png'} target="_blank" rel="noreferrer" aria-label="품의선 모바일 원본 이미지 보기 (새 탭)">원본 보기</a><a className="procurement-desktop-link" href={media+'pumuiseon-work-1440-20261113.png'} target="_blank" rel="noreferrer">PC 전체 화면 보기</a></figcaption>
            </figure>
          </div>
        </section>
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
