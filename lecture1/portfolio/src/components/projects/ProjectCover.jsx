import './projectCovers.css';
const BASE=import.meta.env.BASE_URL;
const media=`${BASE}detail/current/`;
export default function ProjectCover({project,eager=false,image,imageAlt}){
 const id=project.id;
 const source=image?`${BASE}${image}`:project.thumbnailUrl;
 const alt=imageAlt||project.thumbnailAlt||`${project.title} 실제 화면`;
 const loading=eager?'eager':'lazy';
 if(id==='ott-service') return <div className="project-cover project-cover--cinema"><img className="cinema-cover-scene" src={media+'bluehour-scene.webp'} alt="잔상관의 가상 영화 파란 오후 — 바다를 바라보는 두 친구" loading={loading}/><div className="cinema-cover-type" aria-hidden="true"><small>짧은 영화, 오래 남을 장면.</small><strong>잔상관</strong><span>JANSANG CINEMA</span></div></div>;
 if(['bus-arrival-app','brewstep'].includes(id))return <div className={`project-cover project-cover--phones ${id==='brewstep'?'project-cover--cafe':'project-cover--transit'}`}><span className="cover-brand" aria-hidden="true">{id==='brewstep'?'SOYOBIT':'ONJEONGRYU'}</span><img className="art-phone art-phone--first" src={source} alt={alt} loading={loading} width="390" height="844"/><img className="art-phone art-phone--second" src={media+(id==='brewstep'?'soyobit-menu-20261112.png':'onjeongryu-busdetail-20261107.png')} alt="" loading={loading} width="390" height="844"/></div>;
 return <div className={`project-cover project-cover--${id}`}>
  <img className="art-desktop" src={source} alt={alt} loading={loading} decoding="async" width="1440" height={id==='seolbiit'?1080:1000}/>
  {id==='feedback-hub'&&<img className="art-slip" src={media+'pumuiseon-opening-slip.png'} alt="" loading={loading} width="1044" height="591"/>}
  {id==='seolbiit'&&<img className="art-picker" src={media+'seolbigyeol-picker-mobile-20261112.png'} alt="" loading={loading} width="390" height="844"/>}
 </div>;
}
