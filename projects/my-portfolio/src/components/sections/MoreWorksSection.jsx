import { Link } from 'react-router-dom';
import { ALL_PROJECTS } from '../../data/projectsData';
import './moreWorks.css';

const industrial = ALL_PROJECTS.find(project => project.id === 'gongjeongbom');
const otherWork = ALL_PROJECTS.filter(project => ['jobflow', 'bus-arrival-app', 'brewstep'].includes(project.id));
const media = `${import.meta.env.BASE_URL}detail/current/`;

const MoreWorksSection = () => (
  <section className="work-archive portfolio-shell" id="more-projects" aria-labelledby="more-title">
    <article className="industrial-work">
      <Link to={`/projects/${industrial.slug}`} aria-label="기준선 설계 과정 보기">
        <div className="industrial-heading">
          <div><p className="case-category">{industrial.categoryLabel}</p><h2 id="more-title">{industrial.title}</h2></div>
          <p>검사 사례에서 도입 상담까지 이어지는<br /> 산업용 비전 검사 웹사이트.</p>
          <span className="industrial-read">설계 과정 보기 <span aria-hidden="true">→</span></span>
        </div>
        <picture>
          <source media="(max-width: 520px)" srcSet={media + 'gijunseon-hero-390.webp'} width="780" height="1134" />
          <img src={media + 'gijunseon-hero-1440.webp'} width="2880" height="1120" loading="lazy" decoding="async"
            alt="기준선 공개 웹 첫 화면. 검사 카메라와 생산 라인 위에 ‘제품의 작은 결함, 카메라로 확인합니다’라는 제목이 놓여 있다." />
        </picture>
      </Link>
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
