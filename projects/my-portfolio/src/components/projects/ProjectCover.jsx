import './projectCovers.css';

const BASE = import.meta.env.BASE_URL;
const COVERS = {
  seolbiit: { theme: 'equipment' },
  jobflow: { theme: 'record' },
  'ott-service': { theme: 'cinema' },
  gongjeongbom: { theme: 'industry' },
  'feedback-hub': { theme: 'feedback' },
  'bus-arrival-app': { theme: 'transit', secondary: 'detail/current/onjeongryu-station.png', mobile: true },
  brewstep: { theme: 'cafe', secondary: 'detail/current/soyobit-menu.png', mobile: true },
};

const ProjectCover = ({ project, eager = false, image, imageAlt }) => {
  const cover = COVERS[project.id];
  if (!cover) return <div className="project-cover"><img className="project-cover__main" src={project.thumbnailUrl} alt={project.thumbnailAlt} loading={eager ? 'eager' : 'lazy'} decoding="async" /></div>;
  return (
    <div className={`project-cover project-cover--${cover.theme}${cover.mobile ? ' project-cover--mobile' : ''}`}>
      <div className="project-cover__screens">
        <img className="project-cover__main" src={image ? `${BASE}${image}` : project.thumbnailUrl} alt={imageAlt || `${project.title} 실제 ${project.is_figma_project ? '디자인' : '웹'} 화면`} loading={eager ? 'eager' : 'lazy'} decoding="async" />
        {cover.secondary && <img className="project-cover__secondary" src={`${BASE}${cover.secondary}`} alt={`${project.title} 상세 화면`} loading={eager ? 'eager' : 'lazy'} decoding="async" />}
      </div>
    </div>
  );
};

export default ProjectCover;
