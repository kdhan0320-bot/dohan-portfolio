import { Link } from 'react-router-dom';
import Header from '../components/Header';
import SiteFooter from '../components/SiteFooter';
import { PAGE_TITLES, usePageTitle } from '../utils/pageMeta';

const NotFoundPage = () => {
  usePageTitle(PAGE_TITLES.notFound);

  return (
    <div className="app-surface">
      <Header />
      <section className="shell not-found-page" aria-labelledby="not-found-title">
        <div className="not-found-card">
          <span className="section-kicker">404 · PAGE NOT FOUND</span>
          <h1 id="not-found-title">페이지를 찾을 수 없어요.</h1>
          <p>주소를 확인하거나 작업 갤러리에서 다시 시작해 주세요.</p>
          <Link className="primary-link" to="/works" replace>작업 갤러리로 <span aria-hidden="true">↗</span></Link>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
};

export default NotFoundPage;
