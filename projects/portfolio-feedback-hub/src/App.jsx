import { HashRouter as BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Box, CircularProgress, Typography } from '@mui/material';
import { AuthProvider, useAuth } from './hooks/useAuth';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import PostListPage from './pages/PostListPage';
import PostWritePage from './pages/PostWritePage';
import PostDetailPage from './pages/PostDetailPage';
import PostEditPage from './pages/PostEditPage';
import NotFoundPage from './pages/NotFoundPage';

const RouteLoading = () => (
  <Box
    role="status"
    aria-live="polite"
    sx={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 2,
      bgcolor: 'background.default',
    }}
  >
    <CircularProgress size={32} />
    <Typography color="text.secondary">로그인 상태를 확인하고 있습니다.</Typography>
  </Box>
);

const PrivateRoute = ({ children }) => {
  const { user, loading, isGuest } = useAuth();
  if (loading) return <RouteLoading />;
  return (user || isGuest) ? children : <Navigate to="/login" replace />;
};

const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <RouteLoading />;
  return !user ? children : <Navigate to="/" replace />;
};

const AppRoutes = () => (
  <Routes>
    <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
    <Route path="/signup" element={<PublicRoute><SignupPage /></PublicRoute>} />
    <Route path="/" element={<PostListPage />} />
    <Route path="/posts/:id" element={<PostDetailPage />} />
    <Route path="/write" element={<PrivateRoute><PostWritePage /></PrivateRoute>} />
    <Route path="/posts/:id/edit" element={<PrivateRoute><PostEditPage /></PrivateRoute>} />
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
);

const App = () => (
  <BrowserRouter>
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  </BrowserRouter>
);

export default App;
