import { Link } from 'react-router-dom';
import TipsLayout from '../components/TipsLayout';
import { PAGE_TITLES, usePageTitle } from '../utils/pageMeta';

const NotFoundPage = () => {
  usePageTitle(PAGE_TITLES.notFound);

  return (
    <TipsLayout>
      <section className="tips-empty" aria-labelledby="not-found-title">
          <h1 id="not-found-title">페이지를 찾을 수 없어요.</h1>
          <p>주소를 확인하거나 팁 모음에서 필요한 내용을 찾아보세요.</p>
          <Link className="tips-primary" to="/tips" replace>팁 모음 보기<span aria-hidden="true">→</span></Link>
      </section>
    </TipsLayout>
  );
};

export default NotFoundPage;
