import { Link } from 'react-router-dom';
import Header from '../components/Header';
import SiteFooter from '../components/SiteFooter';
import WorkArtwork from '../components/WorkArtwork';
import { SAMPLE_POSTS } from '../constants/samplePosts';
import { usePageTitle } from '../utils/pageMeta';

const challenges = [
  { sample: 'sample-1', title: '제목이 먼저 읽히도록', description: '이미지와 제목 사이에서 무엇을 먼저 보게 할지 정해 보세요.' },
  { sample: 'sample-4', title: '재생 버튼을 찾기 쉽게', description: '화면을 처음 본 사람이 재생 버튼을 바로 찾을 수 있을까요?' },
  { sample: 'sample-11', title: '입력 안내를 분명하게', description: '이메일 예시와 비밀번호 조건이 입력 전에 읽히는지 살펴보세요.' },
];

export default function ChallengesPage() {
  usePageTitle('연습 챌린지 | 고른시선');
  return <div className="app-surface"><Header />
    <div className="shell challenges-page">
      <header className="page-heading challenge-intro">
        <span className="section-kicker">연습 챌린지</span>
        <h1>작은 화면,<br className="mobile-break" /> 한 가지 개선.</h1>
        <p>주제를 고르고, 화면의 번호에 구체적인 의견을 남겨보세요.</p>
      </header>
      <p className="challenge-notice"><span className="sample-tag">가상 챌린지</span>연습용 콘텐츠 · 실제 모집·제출·시상은 없습니다.</p>
      <section className="challenge-grid" aria-label="디자인 피드백 연습 주제">
        {challenges.map((challenge, index) => {
          const post = SAMPLE_POSTS.find(item => item.id === challenge.sample);
          return <article className="challenge-card" key={post.id}>
            <div className="challenge-card-art"><WorkArtwork kind={post.kind} before title={`${post.title} · 피드백 연습용 디자인`} /></div>
            <div className="challenge-card-copy">
              <div className="challenge-card-meta"><span>0{index + 1}</span><span>{post.category}</span></div>
              <h2>{challenge.title}</h2>
              <p>{challenge.description}</p>
              <Link className="primary-link" to={`/posts/${post.id}`} aria-label={`${challenge.title} 연습 시작하기`}>이 주제로 연습하기</Link>
            </div>
          </article>;
        })}
      </section>
      <p className="challenge-footnote">의견은 현재 화면에서만 보이며, 페이지를 이동하거나 새로고침하면 사라집니다.</p>
    </div><SiteFooter />
  </div>;
}
