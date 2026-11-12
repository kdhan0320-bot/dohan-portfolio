import { useEffect, useRef, useState } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import './cinemaScene.css';
const BASE = import.meta.env.BASE_URL;

export default function CinemaScene() {
  const reduced = useMediaQuery('(prefers-reduced-motion: reduce)');
  const mobile = useMediaQuery('(max-width:700px)');
  const [view, setView] = useState('scene');
  const [manual, setManual] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const surface = useRef(null);
  useEffect(() => {
    if (reduced || manual || !loaded || !window.IntersectionObserver) return;
    let timer;
    const observer = new IntersectionObserver(([entry]) => {
      clearTimeout(timer);
      if (entry.isIntersecting) timer = setTimeout(() => {
        setView('ui');
        observer.disconnect();
      }, 1800);
    }, { threshold: .6 });
    observer.observe(surface.current);
    return () => { clearTimeout(timer); observer.disconnect(); };
  }, [reduced, manual, loaded]);
  const active = reduced && !manual ? 'ui' : view;
  return <>
    <div ref={surface} className="cinema-scene" data-view={active} id="cinema-scene-screen">
      <picture className="cinema-scene__art" aria-hidden={active !== 'scene'}>
        <source media="(max-width:700px)" srcSet={`${BASE}detail/current/bluehour-cover-scene-390-20261113.jpg`} width="375" height="227" />
        <img src={`${BASE}detail/current/bluehour-cover-scene-1440-20261113.jpg`} alt={active === 'scene' ? '파란 오후의 실제 표지에 사용한 AI 장면 — 바닷가에서 자전거를 탄 두 친구' : ''} width="1425" height="476" fetchPriority="high" />
      </picture>
      <picture className="cinema-scene__ui" aria-hidden={active !== 'ui'}>
        <source media="(max-width:700px)" srcSet={`${BASE}detail/current/bluehour-cover-ui-390-20261113.jpg`} width="375" height="227" />
        <img src={`${BASE}detail/current/bluehour-cover-ui-1440-20261113.jpg`} alt={active === 'ui' ? '잔상관 공개 웹의 실제 파란 오후 표지 UI — 같은 장면 위에 영화 제목·장르·28분 정보가 표시됨' : ''} width="1425" height="476" onLoad={() => setLoaded(true)} />
      </picture>
    </div>
    <div className="cinema-scene__controls">
      <div role="group" aria-label="잔상관 장면과 실제 화면 선택">
        {[['scene', '작품 장면'], ['ui', '실제 표지 UI']].map(([id, label]) => <button key={id} type="button" aria-pressed={active === id} aria-controls="cinema-scene-screen" onClick={() => { setManual(true); setView(id); }}>{label}</button>)}
      </div>
      <a href={`${BASE}detail/current/bluehour-cover-ui-${mobile ? '390' : '1440'}-20261113.jpg`} target="_blank" rel="noopener noreferrer" aria-label="파란 오후 표지 UI 원본 보기 (새 탭)">원본 보기</a>
    </div>
    <p className="cinema-scene__caption">{active === 'scene' ? '파란 오후 · 실제 표지의 AI 생성 장면' : '파란 오후 · 공개 웹 표지 UI 발췌'}</p>
  </>;
}
