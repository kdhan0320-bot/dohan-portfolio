import { Link } from 'react-router-dom';
import { ALL_PROJECTS } from '../../data/projectsData';
import './moreWorks.css';

const industrial = ALL_PROJECTS.find(project => project.id === 'gongjeongbom');
const otherWork = ALL_PROJECTS.filter(project => ['jobflow', 'bus-arrival-app', 'brewstep'].includes(project.id));
const media = `${import.meta.env.BASE_URL}detail/current/`;

const MoreWorksSection = () => (
  <section className="work-archive portfolio-shell" id="more-projects" aria-labelledby="more-title">
    <article className="industrial-work">
      <div className="industrial-heading">
        <div><p className="case-category">{industrial.categoryLabel}</p><h2 id="more-title">{industrial.title}</h2></div>
        <p>검사 사례에서 도입 상담까지 이어지는<br /> 산업용 비전 검사 웹사이트.</p>
        <Link className="industrial-read" to={`/projects/${industrial.slug}`} aria-label="기준선 설계 과정 보기">설계 과정 보기 <span aria-hidden="true">→</span></Link>
      </div>
      <figure>
        <picture>
          <source media="(max-width: 700px)" srcSet={media + 'gijunseon-intro-390.webp'} width="780" height="522" />
          <img src={media + 'gijunseon-intro-1440.webp'} width="2880" height="688" loading="lazy" decoding="async"
            alt="기준선 첫 화면의 비전 검사 카메라와 생산 라인" />
        </picture>
        <figcaption>
          <span>기준선 웹사이트 · 첫 화면 발췌</span>
          <div className="industrial-destinations">
            <span className="industrial-destinations-label">기준선 사이트에서 더 보기</span>
            <a href={industrial.liveUrl + '#solutions'} target="_blank" rel="noreferrer">검사 솔루션 보기 <span aria-hidden="true">↗</span></a>
            <a href={industrial.liveUrl + 'adoption.html'} target="_blank" rel="noreferrer">도입 절차 알아보기 <span aria-hidden="true">↗</span></a>
          </div>
        </figcaption>
      </figure>
    </article>
    <section className="remaining-work" aria-labelledby="remaining-title">
      <h2 id="remaining-title">그 밖의 작업</h2>
      <ul>{otherWork.map(project => (
        <li key={project.id}>
          <Link to={`/projects/${project.slug || project.id}`}>
            <strong>{project.title}</strong><span>{project.categoryLabel}</span><span aria-hidden="true">→</span>
          </Link>
        </li>
      ))}</ul>
    </section>
  </section>
);

export default MoreWorksSection;
