import { lazy, Suspense } from "react";
import RouteEffects from "./components/layout/RouteEffects";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import { AuthProvider } from "./context/AuthProvider";
import { DemoDataProvider } from "./context/DemoDataProvider";
import { NotificationsProvider } from "./context/NotificationsProvider";
const Login = lazy(() => import("./pages/Login"));
const Home = lazy(() => import("./pages/Home"));
const CreatePost = lazy(() => import("./pages/CreatePost"));
const Profile = lazy(() => import("./pages/Profile"));
const Meetup = lazy(() => import("./pages/Meetup"));
const Chat = lazy(() => import("./pages/Chat"));
const Notifications = lazy(() => import("./pages/Notifications"));
const PostDetail = lazy(() => import("./pages/PostDetail"));
import { ROUTES } from "./constants/routes";

const ProtectedRoute = ({ children }) => {
  const { isGuest } = useAuth();
  return isGuest ? children : <Navigate to={ROUTES.LOGIN} replace />;
};

const PublicRoute = ({ children }) => {
  const { isGuest } = useAuth();
  return !isGuest ? children : <Navigate to={ROUTES.HOME} replace />;
};

const AppRoutes = () => (
  <Routes>
    <Route
      path={ROUTES.LOGIN}
      element={
        <PublicRoute>
          <Login />
        </PublicRoute>
      }
    />
    <Route path="/signup" element={<Navigate to={ROUTES.LOGIN} replace />} />
    <Route
      path={ROUTES.HOME}
      element={
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      }
    />
    <Route
      path={ROUTES.CREATE_POST}
      element={
        <ProtectedRoute>
          <CreatePost />
        </ProtectedRoute>
      }
    />
    <Route
      path="/edit/:id"
      element={
        <ProtectedRoute>
          <CreatePost />
        </ProtectedRoute>
      }
    />
    <Route
      path={ROUTES.PROFILE}
      element={
        <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
      }
    />
    <Route
      path={ROUTES.MEETUP}
      element={
        <ProtectedRoute>
          <Meetup />
        </ProtectedRoute>
      }
    />
    <Route
      path={ROUTES.CHAT}
      element={
        <ProtectedRoute>
          <Chat />
        </ProtectedRoute>
      }
    />
    <Route
      path={ROUTES.CHAT_ROOM}
      element={
        <ProtectedRoute>
          <Chat />
        </ProtectedRoute>
      }
    />
    <Route
      path={ROUTES.NOTIFICATIONS}
      element={
        <ProtectedRoute>
          <Notifications />
        </ProtectedRoute>
      }
    />
    <Route
      path="/post/:id"
      element={
        <ProtectedRoute>
          <PostDetail />
        </ProtectedRoute>
      }
    />
    <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
  </Routes>
);

const App = () => (
  <HashRouter>
    <AuthProvider>
      <DemoDataProvider>
        <NotificationsProvider>
          <RouteEffects />
          <Suspense
            fallback={
              <div className="loading-state" role="status">
                작업실을 여는 중이에요…
              </div>
            }
          >
            <AppRoutes />
          </Suspense>
        </NotificationsProvider>
      </DemoDataProvider>
    </AuthProvider>
  </HashRouter>
);

export default App;
