import { lazy, Suspense } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import './portfolioRefresh.css';
import Navbar from './components/layout/Navbar';
import RouteEffects from './components/layout/RouteEffects';

const HomePage = lazy(() => import('./pages/HomePage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ProjectsPage = lazy(() => import('./pages/ProjectsPage'));
const ProjectDetailPage = lazy(() => import('./pages/ProjectDetailPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

const NAVBAR_HEIGHT = { xs: 72, md: 80 };

const RouteFallback = () => (
  <Box
    sx={{
      minHeight: { xs: `calc(100vh - ${NAVBAR_HEIGHT.xs}px)`, md: `calc(100vh - ${NAVBAR_HEIGHT.md}px)` },
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      bgcolor: 'background.default',
    }}
  >
    <CircularProgress size={28} sx={{ color: 'primary.main' }} />
  </Box>
);

/* 경로가 바뀔 때마다(같은 /projects/:slug 안에서 다음 작품으로 이동하는
 * 경우도 포함) key를 pathname으로 바꿔 아래 트리를 다시 마운트시킨다.
 * 리마운트된 요소에 index.css의 .route-transition CSS 애니메이션이 다시
 * 걸리는 방식으로, 새 라이브러리 없이 페이지 전환에 짧은 페이드를 준다.
 * 이미 로드된 lazy 청크는 Promise가 캐시돼 있어 재마운트해도 Suspense
 * fallback이 다시 뜨지 않는다. */
const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <Box key={location.pathname} className="route-transition">
      <Routes location={location}>
        <Route path="/"              element={<HomePage />} />
        <Route path="/about"         element={<AboutPage />} />
        <Route path="/projects"      element={<ProjectsPage />} />
        <Route path="/projects/:slug" element={<ProjectDetailPage />} />
        <Route path="*"              element={<NotFoundPage />} />
      </Routes>
    </Box>
  );
};

const App = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <HashRouter>
      <div className="portfolio-refresh">
      <RouteEffects />
      <Navbar />
      <Box sx={{ height: NAVBAR_HEIGHT }} aria-hidden="true" />
      {/* 스크롤 오프셋 계산은 hooks/useScrollNav.js의 HEADER_OFFSET, index.css의
       * scroll-margin-top과 함께 헤더 높이(모바일 72px / md+ 80px)를 기준으로 맞춘다. */}
      {/* tabIndex=-1: div/main은 기본적으로 focus를 받지 못해, skip link가
       * 스크롤만 시키고 실제 focus는 body에 남는 문제가 있었다(QA로 확인).
       * -1로 프로그램적 focus만 허용해 skip link 클릭 시 focus가 실제로
       * 여기로 이동하게 한다. */}
      <Box component="main" id="main-content" tabIndex={-1} sx={{ outline: 'none' }}>
      <Suspense fallback={<RouteFallback />}>
        <AnimatedRoutes />
      </Suspense>
      </Box>
      </div>
    </HashRouter>
  </ThemeProvider>
);

export default App;
