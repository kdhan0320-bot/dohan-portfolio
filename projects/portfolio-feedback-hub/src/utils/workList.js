import { getCategoryLabel } from '../constants/samplePosts';

export function getLegacyWorksPath(search) {
  const params = new URLSearchParams(search);
  return ['q', 'category', 'sort'].some(key => params.has(key)) ? `/works?${params.toString()}` : null;
}

export function selectWorks(posts, {
  category = '전체',
  query = '',
  sort = 'latest'
} = {}) {
  const keyword = query.trim().toLocaleLowerCase('ko');
  const selected = posts.filter(post => {
    if (category !== '전체' && getCategoryLabel(post) !== category) return false;
    const text = [post.title, post.content, post.profiles?.username, ...(post.hashtags || [])].filter(Boolean).join(' ').toLocaleLowerCase('ko');
    return text.includes(keyword);
  });
  return selected.sort((a, b) => sort === 'comments' ? (b.comment_count || 0) - (a.comment_count || 0) : sort === 'likes' ? (b.like_count || 0) - (a.like_count || 0) : new Date(b.created_at) - new Date(a.created_at));
}
