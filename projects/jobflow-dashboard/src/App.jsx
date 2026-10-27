import { lazy, Suspense, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation, useParams } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Layout from './components/layout/Layout';
import RouteBoundary from './components/ui/RouteBoundary';
import { CircularProgress, Box } from '@mui/material';
import { getRouteTitle } from './constants';
import { legacyBoardDestination } from './utils/applicationBoard';
import { observeVisibleViewport } from './utils/visibleViewport';
const LoginPage = lazy(() => import('./pages/LoginPage'));
const ResetPasswordPage = lazy(() => import('./pages/ResetPasswordPage'));
const WelcomePage = lazy(() => import('./pages/WelcomePage'));
const DashboardPage = lazy(() => import('./pages/DashboardPage'));
const CalendarPage = lazy(() => import('./pages/CalendarPage'));
const ApplicationsPage = lazy(() => import('./pages/ApplicationsPage'));
const ChecklistPage = lazy(() => import('./pages/ChecklistPage'));
const InterviewPage = lazy(() => import('./pages/InterviewPage'));
const DocumentHelperPage = lazy(() => import('./pages/DocumentHelperPage'));
const SettingsPage = lazy(() => import('./pages/SettingsPage'));
const GuidePage = lazy(() => import('./pages/GuidePage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));
const RouteTitleManager = () => {
  const {
    pathname
  } = useLocation();
  useEffect(() => {
    const titlePathname = pathname === '/ai-prompt' ? '/document-helper' : pathname;
    document.title = titlePathname === '/welcome'
      ? '갈피록 · 개인 입사지원 관리'
      : `${titlePathname === '/reset-password' ? '비밀번호 재설정' : titlePathname === '/guide' ? '이용 안내' : getRouteTitle(titlePathname)} · 갈피록`;
  }, [pathname]);
  return null;
};
function VisibleViewportManager() {
  useEffect(() => observeVisibleViewport(window, document.documentElement), []);
  return null;
}
function BoardAlias({ creating = false }) {
  const { id } = useParams();
  const { search } = useLocation();
  return <Navigate to={legacyBoardDestination({ id, creating, search })} replace />;
}
const AppRoutes = () => {
  const {
    user,
    loading,
    isGuest,
    recoveryReady
  } = useAuth();
  if (loading) {
    return <Box sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh'
    }}>
  <CircularProgress />
</Box>;
  }
  if (recoveryReady) return <Navigate to="/reset-password" replace />;
  if (!user && !isGuest) return <Navigate to="/welcome" replace />;
  return <Routes key={isGuest ? 'sample' : `user:${user.id}`}>
  <Route element={<Layout />}>
    <Route index element={<ApplicationsPage />} />
    <Route path="overview" element={<DashboardPage />} />
    <Route path="calendar" element={<CalendarPage />} />
    <Route path="applications" element={<BoardAlias />} />
    <Route path="applications/new" element={<BoardAlias creating />} />
    <Route path="applications/:id" element={<BoardAlias />} />
    <Route path="applications/:id/edit" element={<BoardAlias />} />
    <Route path="kanban" element={<BoardAlias />} />
    <Route path="checklist" element={<ChecklistPage />} />
    <Route path="interview" element={<InterviewPage />} />
    <Route path="document-helper" element={<DocumentHelperPage />} />
    <Route path="ai-prompt" element={<Navigate to="/document-helper" replace />} />
    <Route path="settings" element={<SettingsPage />} />
    <Route path="guide" element={<GuidePage />} />
    <Route path="*" element={<NotFoundPage />} />
  </Route>
</Routes>;
};
function PageRoutes() {
  const { pathname } = useLocation();
  return <RouteBoundary resetKey={pathname}>
    <Suspense fallback={<div className="route-load-state" role="status"><CircularProgress size={28} /><p>화면을 불러오고 있어요.</p></div>}>
      <Routes>
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/*" element={<AppRoutes />} />
      </Routes>
    </Suspense>
  </RouteBoundary>;
}
const App = () => {
  useEffect(() => {
    window.dispatchEvent(new Event('galpirok:ready'));
  }, []);
  return <HashRouter>
  <VisibleViewportManager />
  <RouteTitleManager />
  <AuthProvider>
    <PageRoutes />
  </AuthProvider>
</HashRouter>;
};
export default App;
