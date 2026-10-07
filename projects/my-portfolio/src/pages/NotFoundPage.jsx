import { Link } from 'react-router-dom';
const NotFoundPage = () => <section className="not-found portfolio-shell"><p className="eyebrow">404</p><h1>페이지를 찾을 수 없습니다.</h1><p>주소를 확인하거나 전체 작업에서 다시 찾아보세요.</p><div className="not-found-links"><Link className="text-link" to="/">홈으로 돌아가기 <span aria-hidden="true">↗</span></Link><Link className="text-link" to="/projects">전체 작업 <span aria-hidden="true">↗</span></Link></div></section>;
export default NotFoundPage;
