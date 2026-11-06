import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FEATURED_CASES, PROCUREMENT_RECEIPT } from '../../data/projectsData';
import AssignmentPreview from '../projects/AssignmentPreview';
import './selectedWorks.css';

const media = `${import.meta.env.BASE_URL}detail/current/`;
const receipt = FEATURED_CASES.find(item => item.project.id === 'feedback-hub');
const maintenance = FEATURED_CASES.find(item => item.project.id === 'seolbiit');
const cinema = FEATURED_CASES.find(item => item.project.id === 'ott-service');

function CaseCopy({ item }) {
  const { project, question, choice, scope } = item;
  return (
    <div className="case-brief">
      <p className="case-category">{project.categoryLabel}</p>
      <h3>{project.title}</h3>
      <p className="case-prompt">{question}</p>
      <p className="case-reason">{choice}</p>
      <Link className="case-read" to={`/projects/${project.slug || project.id}`} aria-label={`${project.title} 설계 과정 보기`}>
        설계 과정 보기 <span aria-hidden="true">→</span>
      </Link>
      <p className="case-credit">{scope}</p>
    </div>
  );
}

const scenes = [
  { title: '파란 오후', info: '애니메이션 · 28분', src: 'bluehour-scene.webp', alt: '바다가 보이는 길에 자전거를 세운 두 친구' },
  { title: '새벽 두 시의 식탁', info: '드라마 · 23분', src: 'nocturne-scene.webp', alt: '늦은 식당에서 마주 앉은 손님과 주인' },
];

function CinemaScenes() {
  const [selected, setSelected] = useState(0);
  return (
    <div className="scene-editor">
      <Link className="scene-frame" to="/projects/ott-service" aria-label="잔상관 설계 과정 보기">
        {scenes.map((scene, i) => <img key={scene.src} src={media + scene.src} loading="lazy"
          className={selected === i ? 'active' : ''} alt={selected === i ? scene.alt : ''} aria-hidden={selected !== i} />)}
        <p className="scene-caption" aria-live="polite">{scenes[selected].title} <span>{scenes[selected].info}</span></p>
      </Link>
      <div className="scene-choices" role="group" aria-label="잔상관 영화 장면 선택">
        {scenes.map((scene, i) => <button key={scene.title} type="button" aria-pressed={i === selected}
          onClick={() => setSelected(i)}>{scene.title}</button>)}
      </div>
    </div>
  );
}

export default function ProjectsSection() {
  return (
    <section className="work-edition portfolio-shell" id="projects" aria-labelledby="selected-title">
      <div className="section-heading">
        <h2 id="selected-title">대표 작업</h2>
        <Link className="text-link" to="/projects">전체 작업 보기</Link>
      </div>
      <article id="receipt-feature" className="lead-case" aria-label="품의선 · 자재 입출고 전표" tabIndex="-1">
        <CaseCopy item={receipt} />
        <figure className="receipt-proof">
          <Link to="/projects/feedback-hub" className="slip-board" aria-label="품의선 전표의 설계 과정 보기">
            <span className="slip-print"><img id="sample-receipt" {...PROCUREMENT_RECEIPT} /></span>
          </Link>
          <figcaption>품의선 웹에서 발췌한 자재 입출고 전표 <span>예시 데이터</span></figcaption>
        </figure>
      </article>
      <div className="companion-cases">
        <article className="companion-case">
          <AssignmentPreview>
            <Link className="request-board" to="/projects/seolbiit" aria-label="설비결의 정비 요청 배정 과정 보기">
              <img src={media + 'seolbigyeol-assignment-2x.webp'} width="1568" height="1040"
                loading="lazy" alt="냉각수 펌프의 증상, 담당자와 완료 기한을 모은 배정 대기 요청" />
            </Link>
          </AssignmentPreview>
          <CaseCopy item={maintenance} />
        </article>
        <article className="companion-case">
          <CinemaScenes />
          <CaseCopy item={cinema} />
        </article>
      </div>
    </section>
  );
}
