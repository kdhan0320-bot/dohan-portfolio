import { useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation, useParams } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Layout from './components/layout/Layout';
import LoginPage from './pages/LoginPage';
import WelcomePage from './pages/WelcomePage';
import DashboardPage from './pages/DashboardPage';
import CalendarPage from './pages/CalendarPage';
import ApplicationsPage from './pages/ApplicationsPage';
import ChecklistPage from './pages/ChecklistPage';
import InterviewPage from './pages/InterviewPage';
import DocumentHelperPage from './pages/DocumentHelperPage';
import SettingsPage from './pages/SettingsPage';
import GuidePage from './pages/GuidePage';
import NotFoundPage from './pages/NotFoundPage';
import { CircularProgress, Box } from '@mui/material';
import { getRouteTitle } from './constants';
import { legacyBoardDestination } from './utils/applicationBoard';
const RouteTitleManager = () => {
  const {
    pathname
  } = useLocation();
  useEffect(() => {
    const titlePathname = pathname === '/ai-prompt' ? '/document-helper' : pathname;
    document.title = `${titlePathname === '/guide' ? '이용 안내' : getRouteTitle(titlePathname)} | 갈피록`;
  }, [pathname]);
  return null;
};
function BoardAlias({ creating = false }) {
  const { id } = useParams();
  const { search } = useLocation();
  return <Navigate to={legacyBoardDestination({ id, creating, search })} replace />;
}
const AppRoutes = () => {
  const {
    user,
    loading,
    isGuest
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
  if (!user && !isGuest) return <Navigate to="/welcome" replace />;
  return <Routes>
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
const App = () => <HashRouter>
  <RouteTitleManager />
  <AuthProvider>
    <Routes>
      <Route path="/welcome" element={<WelcomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/*" element={<AppRoutes />} />
    </Routes>
  </AuthProvider>
</HashRouter>;
export default App;
