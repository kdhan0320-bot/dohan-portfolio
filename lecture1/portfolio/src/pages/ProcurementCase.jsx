import { useState } from 'react';
import { PROCUREMENT_RECEIPT } from '../data/projectsData';
import { scrollToSection } from '../hooks/useScrollNav';
import ReceiptFlow from '../components/projects/ReceiptFlow';
import './procurementCase.css';
const media = `${import.meta.env.BASE_URL}detail/current/`;

// Focus existing captures without changing the UI or the downloadable originals.
function FocusedScreen({ src, alt, width, height, crop }) {
  return <div className="procurement-focus" style={{ aspectRatio: `${crop.width} / ${crop.height}` }}>
    <img src={src} alt={alt} width={width} height={height} style={{ width: `${width / crop.width * 100}%`, left: `${-crop.x / crop.width * 100}%`, top: `${-crop.y / crop.height * 100}%` }} />
  </div>;
}

function ReceiptAndHistory({ ready, liveUrl, question }) {
  const [arrived, setArrived] = useState(false);

  return (
    <section className="receipt-story" aria-labelledby="receipt-question">
      <h2 id="receipt-question" tabIndex="-1">{question}</h2>
      <ReceiptFlow onStart={() => setArrived(false)} onComplete={() => setArrived(true)} />
      <div className="receipt-story-links"><span>실제 화면의 수량을 재구성한 설명입니다.</span><button type="button" onClick={() => scrollToSection('receipt-history')}>입출고 이력 보기</button></div>
      <p className="procurement-request"><span>김도한의 요청 · 포트폴리오 구성</span>현재 수량과 과정 재생을 구분해 설명하기.<small>입고 3개·지급 2개·보유 1개의 변화를 보여준 뒤 이력으로 이어달라는 요청입니다.</small></p>
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
            <p>김도한의 역할 · 업무 요구사항</p>
            <p><span className="procurement-role__full">구매관리·총무 경험을 바탕으로 발주·입고·지급 요구사항을 정리했습니다.</span><span className="procurement-role__short">발주·입고·지급 요구사항 정리</span></p>
          </div>
          <div className="procurement-entry" aria-label="품의선 바로 보기">
            <a className="case-action case-action--primary" href={project.liveUrl} target="_blank" rel="noreferrer" aria-label="품의선 웹앱 열기 (새 탭)">웹앱 열기</a>
            <button type="button" onClick={() => scrollToSection('receipt-question')}>수량 흐름 보기</button>
            <p>가상 자료로 체험하는 웹앱 · 기록은 브라우저에 저장</p>
          </div>
        </header>
        <section className="procurement-decisions" aria-labelledby="procurement-decisions-title">
          <div className="procurement-decisions__heading"><h2 id="procurement-decisions-title">처리할 품의와 전표.</h2></div>
          <div className="procurement-decisions__screens">
            <figure className="procurement-decisions__desktop">
              <div className="procurement-decisions__pc-regions">
                <FocusedScreen src={media+'pumuiseon-work-copy-1440-20261113.png'} alt="실제 품의선 PC 화면 발췌. 지금 처리할 품의의 검사 장비 스위치 교체, 보완 필요 상태와 내용 보완 링크. 오른쪽에는 입고 확인할 발주가 표시됩니다." width={1440} height={1000} crop={{ x:260, y:604, width:1132, height:212 }} />
                <FocusedScreen src={media+'pumuiseon-work-copy-1440-20261113.png'} alt="같은 PC 화면의 포토센서 입출고 전표 발췌. 받은 수량 3개, 지급한 수량 2개, 현재 보유 1개와 이력 보기." width={1440} height={1000} crop={{ x:260, y:204, width:1132, height:262 }} />
              </div>
              <figcaption><div><strong>PC · 처리할 품의부터 보기</strong><p>같은 업무 화면의 처리 영역과 전표를 나눠 발췌했습니다.</p></div><a href={media+'pumuiseon-work-copy-1440-20261113.png'} target="_blank" rel="noreferrer" aria-label="품의선 PC 전체 원본 이미지 보기 (새 탭)">전체 원본 보기</a></figcaption>
            </figure>
            <figure className="procurement-decisions__mobile">
              <FocusedScreen src={media+'pumuiseon-work-copy-390-20261113.png'} alt="실제 품의선 모바일 화면 발췌. 보완할 품의 카드 아래 포토센서 전표가 이어지며 입고 3개·지급 2개·보유 1개가 표시됩니다." width={390} height={844} crop={{ x:16, y:304, width:344, height:474 }} />
              <figcaption><div><strong>모바일 · 실제 업무 화면 발췌</strong><p>보완할 품의를 확인하고 바로 아래에서 재고를 읽습니다.</p></div><a href={media+'pumuiseon-work-copy-390-20261113.png'} target="_blank" rel="noreferrer" aria-label="품의선 모바일 전체 원본 이미지 보기 (새 탭)">전체 원본 보기</a><a className="procurement-desktop-link" href={media+'pumuiseon-work-copy-1440-20261113.png'} target="_blank" rel="noreferrer">PC 전체 화면 보기</a></figcaption>
            </figure>
            <p className="procurement-request procurement-request--screen"><span>김도한의 요청 · 포트폴리오 구성</span>처리할 품의를 먼저, 전표를 다음에.<small>설명보다 실제 업무 화면을 먼저 보여달라는 요청을 반영했습니다.</small></p>
          </div>
        </section>
        <ReceiptAndHistory ready={ready} liveUrl={project.liveUrl} question={question} />
        <section className="procurement-credits" aria-labelledby="procurement-credit-title">
          <h2 id="procurement-credit-title">업무 경험과 제작 범위</h2>
          <dl>{ready.aiCollaboration.map(person => (
            <div key={person.label}><dt>{person.label}</dt><dd>{person.value}</dd></div>
          ))}</dl>
          <p className="procurement-scope">{project.tools.join(' · ')}<br />실제 결재·메일·서버 저장은 연동하지 않았습니다.</p>
          <div className="case-actions">
            <a className="text-link" href={project.githubUrl} target="_blank" rel="noreferrer">코드 보기</a>
          </div>
        </section>
      </div>
    </div>
  );
}
