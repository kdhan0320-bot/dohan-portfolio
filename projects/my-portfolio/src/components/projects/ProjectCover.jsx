import './projectCovers.css';
const BASE=import.meta.env.BASE_URL;
const COVERS={
 seolbiit:{theme:'equipment',width:1024,height:768},
 jobflow:{theme:'record',width:1363,height:936},
 'ott-service':{theme:'cinema',width:1425,height:950},
 gongjeongbom:{theme:'industry',width:1363,height:936},
 'feedback-hub':{theme:'feedback',width:1348,height:926},
 'bus-arrival-app':{theme:'transit',width:390,height:844,mobile:true},
 brewstep:{theme:'cafe',width:370,height:1024,mobile:true},
};
const ProjectCover=({project,eager=false,image,imageAlt})=>{
 const cover=COVERS[project.id]||{};
 return <div className={`project-cover project-cover--${cover.theme||'default'}${cover.mobile?' project-cover--mobile':''}`}>
  <div className="project-cover__screens"><img className="project-cover__main" src={image?`${BASE}${image}`:project.thumbnailUrl} alt={imageAlt||project.thumbnailAlt||`${project.title} 실제 화면`} width={cover.width} height={cover.height} loading={eager?'eager':'lazy'} decoding="async"/></div>
 </div>;
};
export default ProjectCover;
