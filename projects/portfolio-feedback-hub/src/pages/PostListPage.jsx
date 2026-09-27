import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { supabase } from '../lib/supabase';
import { SAMPLE_POSTS, CATEGORIES, getCategoryLabel } from '../constants/samplePosts';
import Header from '../components/Header';
import SiteFooter from '../components/SiteFooter';
import WorkCard from '../components/WorkCard';
import { PAGE_TITLES, usePageTitle } from '../utils/pageMeta';
import { selectWorks } from '../utils/workList';

export default function PostListPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const [posts, setPosts] = useState([]);
  const [dataState, setDataState] = useState('loading');
  const searchRef = useRef(null);
  const query = searchParams.get('q') || '';
  const categories = useMemo(() => [...new Set([...CATEGORIES, ...posts.map(getCategoryLabel)])], [posts]);
  const category = categories.includes(searchParams.get('category')) ? searchParams.get('category') : '전체';
  const sort = ['latest', 'comments', 'likes'].includes(searchParams.get('sort')) ? searchParams.get('sort') : 'latest';
  const sample = dataState.startsWith('sample');
  const hasFilters = Boolean(query || category !== '전체');
  usePageTitle(PAGE_TITLES.list);
  const update = patch => setSearchParams(current => {
    const next = new URLSearchParams(current);
    Object.entries(patch).forEach(([key, value]) => {
      next.delete(key);
      if (value && value !== '전체' && !(key === 'sort' && value === 'latest')) next.set(key, value);
    });
    return next;
  }, { replace: true });
  const fetchPosts = useCallback(async () => {
    setDataState('loading');
    try {
      const { data, error } = await supabase.from('posts').select('*, profiles!posts_user_id_fkey(username), post_like_counts(like_count), comments(id)').order('created_at', { ascending: false });
      if (error) throw error;
      const normalized = (data || []).map(post => ({ ...post, comment_count: post.comments?.length || 0, like_count: Number((Array.isArray(post.post_like_counts) ? post.post_like_counts[0] : post.post_like_counts)?.like_count) || 0 }));
      setPosts(normalized.length ? normalized : SAMPLE_POSTS);
      setDataState(normalized.length ? 'live' : 'sample-empty');
    } catch {
      setPosts([]);
      setDataState('error');
    }
  }, []);
  useEffect(() => { fetchPosts(); }, [fetchPosts]);
  const filtered = useMemo(() => selectWorks(posts, { category, query, sort }), [posts, category, query, sort]);
  useEffect(() => {
    if (dataState === 'loading') return;
    const normalized = new URLSearchParams(searchParams);
    for (const [key, value] of [['q', query], ['category', category], ['sort', sample ? 'latest' : sort]]) {
      normalized.delete(key);
      if (value && value !== '전체' && !(key === 'sort' && value === 'latest')) normalized.set(key, value);
    }
    if (normalized.toString() !== searchParams.toString()) setSearchParams(normalized, { replace: true });
  }, [dataState, query, category, sort, sample, searchParams, setSearchParams]);
  const openPost = post => navigate(`/posts/${post.id}`, { state: { sampleSource: dataState, routeReturn: { entryKey: location.key, focusId: document.activeElement?.dataset.routeFocusId || `post-${post.id}`, scrollY: window.scrollY } } });
  const reset = () => {
    update({ q: '', category: '전체', sort: 'latest' });
    requestAnimationFrame(() => {
      const target = searchRef.current || document.getElementById('gallery-title');
      target?.focus({ preventScroll: true });
    });
  };
  const visiblePosts = filtered;

  return <div className="app-surface"><Header />
    <div className="shell works-page">
      <header className="page-heading"><span className="section-kicker">작업 갤러리</span><h1>어떤 디자인을<br className="mobile-break" /> 함께 볼까요?</h1><p>궁금한 작업을 고르면, 화면과 의견을 함께 볼 수 있어요.</p></header>
      <section className="gallery-section" id="gallery" aria-labelledby="gallery-title">
        <div className="gallery-title-row"><h2 id="gallery-title" tabIndex={-1}>{hasFilters ? '검색 결과' : sample ? '샘플 리뷰' : '공개 작업'} <span>{dataState === 'loading' ? '' : visiblePosts.length}</span></h2>{user && <button className="text-button" onClick={() => navigate('/write')}>작업 올리기 +</button>}</div>
        <div className="gallery-toolbar">
          <div className="category-filters" role="group" aria-label="작업 분류">{categories.map(item => <button key={item} aria-pressed={category === item} onClick={() => update({ category: item })}>{item}</button>)}</div>
          <div className="search-sort"><label className="search-box"><input ref={searchRef} type="search" aria-label="작업 검색" placeholder="작업 검색" value={query} onChange={event => update({ q: event.target.value })} /></label>{hasFilters && <button className="text-button filter-reset" onClick={reset}>초기화</button>}{!sample && <select aria-label="작업 정렬" value={sort} onChange={event => update({ sort: event.target.value })}><option value="latest">최신순</option><option value="comments">의견순</option><option value="likes">인기순</option></select>}</div>
        </div>
        <div className="sr-only" role="status">{dataState === 'loading' ? '작업을 불러오는 중입니다.' : `${visiblePosts.length}개 작업을 표시합니다.`}</div>
        {dataState === 'error' ? <div className="empty-state" role="alert"><h3>공개 작업을 불러오지 못했어요.</h3><p>다시 시도하거나 샘플 리뷰를 선택해 주세요.</p><button className="primary-link" onClick={fetchPosts}>다시 시도</button><button className="text-button" onClick={() => { setPosts(SAMPLE_POSTS); setDataState('sample-error'); }}>다른 샘플 보기</button></div> : dataState === 'loading' ? <p className="list-loading">다른 작업을 불러오는 중입니다.</p> : visiblePosts.length ? <div className="work-grid">{visiblePosts.map(post => <WorkCard key={post.id} post={post} onNavigate={openPost} />)}</div> : <div className="empty-state"><h3>일치하는 작업이 없어요.</h3><p>다른 검색어나 분류로 찾아보세요.</p><button className="primary-link" onClick={reset}>검색 조건 초기화</button></div>}
      </section>
    </div><SiteFooter />
  </div>;
}
