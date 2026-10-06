import { useState } from 'react';
import { Link } from 'react-router-dom';
import WorkCover from './WorkCover';
import CategoryThumbnail from './CategoryThumbnail';
import { getCategoryLabel } from '../constants/samplePosts';
import { validateAndNormalizeImageUrl } from '../utils/imageUrlPolicy';

export default function WorkCard({ post, onNavigate }) {
  const [failed, setFailed] = useState(false);
  const image = validateAndNormalizeImageUrl(post.image_url).imageUrl;
  const follow = event => {
    if (!onNavigate || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    onNavigate(post);
  };
  return <article className="work-card">
    <Link to={`/posts/${post.id}`} className="work-card-link" onClick={follow} data-route-focus-id={`post-${post.id}`} aria-label={`${post.title} 리뷰 보기`}>
      <div className="work-card-image">
        {post.kind ? <WorkCover kind={post.kind} /> : image && !failed ? <img className="cover-art" src={image} alt="" onError={() => setFailed(true)} /> : <CategoryThumbnail category={getCategoryLabel(post)} height={250} />}
        {post.kind && <span className="cover-label">샘플 리뷰</span>}
        <span className="card-image-action" aria-hidden="true">리뷰 열기</span>
      </div>
      <div className="card-caption"><div><h3>{post.title}</h3>{post.notes?.[0]?.title && <p>{post.notes[0].title}</p>}</div><span>{getCategoryLabel(post)}</span></div>
    </Link>
  </article>;
}
