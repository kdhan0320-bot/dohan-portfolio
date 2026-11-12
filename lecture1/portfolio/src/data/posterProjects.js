import { ALL_PROJECTS } from './projectsData';
const order = ['ott-service', 'feedback-hub', 'seolbiit', 'gijunseon', 'jobflow', 'bus-arrival-app', 'brewstep'];
export const POSTER_PROJECTS = ALL_PROJECTS.filter(project => project.is_featured || project.moreWorksPublished).sort((a, b) => order.indexOf(a.id) - order.indexOf(b.id));
