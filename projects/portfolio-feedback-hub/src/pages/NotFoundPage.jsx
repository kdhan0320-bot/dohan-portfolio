import { Link } from 'react-router-dom';
import Header from '../components/Header';
import SiteFooter from '../components/SiteFooter';
import { PAGE_TITLES, usePageTitle } from '../utils/pageMeta';

const NotFoundPage = () => {
  usePageTitle(PAGE_TITLES.notFound);

  return (
    <div className="app-surface practice-surface">
      <Header />
      <section className="shell practice-page" aria-labelledby="not-found-title">
        <div className="practice-empty">
          <h1 id="not-found-title">페이지를 찾을 수 없어요.</h1>
          <p>주소를 확인하거나 연습 모음에서 다시 시작해 주세요.</p>
          <Link className="practice-primary" to="/exercises" replace>연습 모음 보기</Link>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
};

export default NotFoundPage;
