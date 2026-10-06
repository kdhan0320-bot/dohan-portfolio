import { Link } from 'react-router-dom';
import Header from '../components/Header';
import SiteFooter from '../components/SiteFooter';
import WorkArtwork from '../components/WorkArtwork';
import { SAMPLE_POSTS } from '../constants/samplePosts';
import { usePageTitle } from '../utils/pageMeta';

const challenges = [
  { sample: 'sample-1', title: '제목이 먼저 읽히도록', description: '제목이 먼저 읽히려면, 이미지와 제목의 크기를 어떻게 조절할까요?' },
  { sample: 'sample-4', title: '재생 버튼을 찾기 쉽게', description: '재생 버튼을 다른 조작 버튼과 구분하려면, 무엇을 강조할까요?' },
  { sample: 'sample-11', title: '입력 전에 필요한 안내', description: '입력을 시작하기 전에 이메일 예시와 비밀번호 조건을 어디에 보여줄까요?' },
];

export default function ChallengesPage() {
  usePageTitle('피드백 연습 | 고른시선');
  return <div className="app-surface"><Header />
    <div className="shell challenges-page">
      <header className="page-heading challenge-intro">
        <span className="section-kicker">피드백 연습</span>
        <h1>작은 화면,<br className="mobile-break" /> 한 가지 개선.</h1>
        <p>주제를 고르고, 바꿀 부분과 이유를 적어보세요.</p>
      </header>
      <p className="challenge-notice"><span className="sample-tag">연습용 예제</span>미리 만든 화면과 수정안을 사용하는 체험입니다.</p>
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
