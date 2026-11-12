import { ALL_PROJECTS } from './projectsData';
const order = ['feedback-hub', 'seolbiit', 'ott-service', 'gijunseon', 'jobflow', 'bus-arrival-app', 'brewstep'];
export const POSTER_PROJECTS = ALL_PROJECTS.filter(project => project.is_featured || project.moreWorksPublished).sort((a, b) => order.indexOf(a.id) - order.indexOf(b.id));
export const projectNumber = id => String(POSTER_PROJECTS.findIndex(project => project.id === id) + 1).padStart(2, '0');
