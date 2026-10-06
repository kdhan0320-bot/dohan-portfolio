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
          <p>주소를 확인하거나 리뷰 예제에서 다시 시작해 주세요.</p>
          <Link className="primary-link" to="/works" replace>리뷰 예제 보기</Link>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
};

export default NotFoundPage;
