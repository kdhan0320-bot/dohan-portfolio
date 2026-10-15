import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase, isAuthConfigured, initialAuthCallback } from '../lib/supabase';
import { createAuthError, getAuthErrorMessage } from '../utils/authErrors';
import { authRedirectUrl, cleanAuthCallbackUrl, forgetRecovery, readRecovery, rememberRecovery, sendAccountEmail, updateRecoveryPassword } from '../utils/authRecovery';
import { DEMO_APPLICATIONS, DEMO_CHECKLISTS, DEMO_INTERVIEW_NOTES } from '../constants';
const AuthContext = createContext(null);
const GUEST_MODE_KEY = 'jobflow-guest-mode';
const recoveryStorage = () => {
  try { return window.sessionStorage; } catch { return null; }
};
const readGuestMode = () => {
  try {
    return window.sessionStorage.getItem(GUEST_MODE_KEY) === 'true';
  } catch {
    return false;
  }
};
const persistGuestMode = enabled => {
  try {
    if (enabled) {
      window.sessionStorage.setItem(GUEST_MODE_KEY, 'true');
    } else {
      window.sessionStorage.removeItem(GUEST_MODE_KEY);
    }
  } catch {
    // 저장소 접근이 제한된 환경에서는 현재 탭의 React 상태만 사용합니다.
  }
};
export const AuthProvider = ({
  children
}) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isGuest, setIsGuest] = useState(false);
  const [authError, setAuthError] = useState('');
  const [recoveryUserId, setRecoveryUserId] = useState(null);
  const navigate = useNavigate();
  const navigateRef = useRef(navigate);
  useEffect(() => { navigateRef.current = navigate; }, [navigate]);
  const [demoApplications, setDemoApplications] = useState(() => structuredClone(DEMO_APPLICATIONS));
  const [demoItems, setDemoItems] = useState(() => structuredClone(DEMO_CHECKLISTS));
  const [demoNotes, setDemoNotes] = useState(() => structuredClone(DEMO_INTERVIEW_NOTES));
  const resetDemo = () => {
    setDemoApplications(structuredClone(DEMO_APPLICATIONS));
    setDemoItems(structuredClone(DEMO_CHECKLISTS));
    setDemoNotes(structuredClone(DEMO_INTERVIEW_NOTES));
  };
  useEffect(() => {
    if (!isAuthConfigured) {
      setIsGuest(readGuestMode());
      setLoading(false);
      if (initialAuthCallback.isCallback) {
        window.history.replaceState(window.history.state, '', cleanAuthCallbackUrl(window.location.href));
        setAuthError('이 미리보기에서는 이메일 링크를 확인할 수 없습니다. 실제 서비스에서 다시 열어주세요.');
        navigateRef.current('/login', { replace: true });
      }
      return;
    }
    let active = true;
    const goAfterCallback = route => {
      // Let the SDK consume the callback first, then discard any remaining URL credentials/errors.
      if (initialAuthCallback.isCallback) {
        window.history.replaceState(window.history.state, '', cleanAuthCallbackUrl(window.location.href));
      }
      navigateRef.current(route, { replace: true });
    };
    const initialize = async () => {
      const initialization = await supabase.auth.initialize();
      const { data: { session }, error } = await supabase.auth.getSession();
      if (!active) return;
      if (initialAuthCallback.isCallback && (initialization.error || initialAuthCallback.hasError || !session?.user)) {
        forgetRecovery(recoveryStorage());
        setRecoveryUserId(null);
        setUser(session?.user ?? null);
        setAuthError('이메일 링크가 만료되었거나 유효하지 않습니다. 새 링크를 요청해주세요.');
        setIsGuest(false);
        goAfterCallback('/login');
      } else if (error) {
        setAuthError(getAuthErrorMessage(error, '로그인 상태를 확인하지 못했습니다. 다시 로그인해주세요.'));
        setUser(null);
        setIsGuest(readGuestMode());
      } else {
        setUser(session?.user ?? null);
        if (session?.user) {
          persistGuestMode(false);
          setIsGuest(false);
          const isRecovery = (initialAuthCallback.isCallback && initialAuthCallback.isRecovery)
            || readRecovery(recoveryStorage(), session.user.id);
          if (isRecovery) {
            if (initialAuthCallback.isRecovery) rememberRecovery(recoveryStorage(), session.user.id);
            setRecoveryUserId(session.user.id);
            goAfterCallback('/reset-password');
          } else if (initialAuthCallback.isCallback) goAfterCallback('/overview');
        } else {
          forgetRecovery(recoveryStorage());
          setIsGuest(readGuestMode());
        }
      }
    };
    initialize().catch(error => {
      if (active) {
        setAuthError(getAuthErrorMessage(error, '로그인 상태를 확인하지 못했습니다. 다시 로그인해주세요.'));
        setUser(null);
        setIsGuest(readGuestMode());
        if (initialAuthCallback.isCallback) goAfterCallback('/login');
      }
    }).finally(() => {
      if (active) setLoading(false);
    });
    const {
      data: {
        subscription
      }
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (!active) return;
      setUser(session?.user ?? null);
      if (session?.user) {
        persistGuestMode(false);
        setIsGuest(false);
        if (event === 'SIGNED_IN' || event === 'PASSWORD_RECOVERY') setAuthError('');
      }
      if (event === 'PASSWORD_RECOVERY' && session?.user) {
        rememberRecovery(recoveryStorage(), session.user.id);
        setRecoveryUserId(session.user.id);
        goAfterCallback('/reset-password');
      } else if (event === 'SIGNED_OUT') {
        forgetRecovery(recoveryStorage());
        setRecoveryUserId(null);
      }
    });
    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);
  const signUp = async (email, password, displayName) => {
    setAuthError('');
    if (!isAuthConfigured) throw new Error('이 미리보기는 샘플 체험만 가능합니다. 계정 기능은 연결된 서비스에서 이용해주세요.');
    const normalizedEmail = email.trim();
    const normalizedDisplayName = displayName?.trim() || normalizedEmail.split('@')[0];
    const {
      data,
      error
    } = await supabase.auth.signUp({
      email: normalizedEmail,
      password,
      options: {
        emailRedirectTo: authRedirectUrl(import.meta.env.BASE_URL, window.location.origin),
        data: {
          app_id: 'jobflow-dashboard',
          display_name: normalizedDisplayName
        }
      }
    });
    if (error) throw createAuthError(error);
    forgetRecovery(recoveryStorage());
    setRecoveryUserId(null);
    persistGuestMode(false);
    setIsGuest(false);
    return {
      data,
      requiresEmailConfirmation: Boolean(data.user && !data.session)
    };
  };
  const signIn = async (email, password) => {
    setAuthError('');
    if (!isAuthConfigured) throw new Error('이 미리보기는 샘플 체험만 가능합니다. 계정 기능은 연결된 서비스에서 이용해주세요.');
    const {
      data,
      error
    } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    if (error) throw createAuthError(error);
    forgetRecovery(recoveryStorage());
    setRecoveryUserId(null);
    persistGuestMode(false);
    setIsGuest(false);
    return data;
  };
  const signOut = async () => {
    if (user) {
      const {
        error
      } = await supabase.auth.signOut();
      if (error) throw createAuthError(error, '로그아웃하지 못했습니다. 다시 시도해주세요.');
    }
    persistGuestMode(false);
    setUser(null);
    setIsGuest(false);
    setAuthError('');
    forgetRecovery(recoveryStorage());
    setRecoveryUserId(null);
  };
  const requestAccountEmail = async (kind, email) => {
    setAuthError('');
    if (!isAuthConfigured) throw createAuthError(null, '미리보기에서는 이메일을 보낼 수 없습니다. 실제 서비스에서 이용해주세요.');
    try {
      await sendAccountEmail(supabase.auth, kind, email, authRedirectUrl(import.meta.env.BASE_URL, window.location.origin));
    } catch (error) {
      throw createAuthError(error);
    }
  };
  const resetPassword = async password => {
    if (!isAuthConfigured || !recoveryUserId) throw createAuthError(null, '비밀번호 변경 링크를 다시 요청해주세요.');
    try {
      const updatedUser = await updateRecoveryPassword(supabase.auth, recoveryUserId, password);
      forgetRecovery(recoveryStorage());
      setRecoveryUserId(null);
      setUser(updatedUser);
      setAuthError('');
    } catch (error) {
      throw createAuthError(error, '비밀번호를 변경하지 못했습니다. 새 링크를 요청하거나 다시 시도해주세요.');
    }
  };
  const cancelRecovery = async () => {
    if (recoveryUserId && isAuthConfigured) {
      const { error } = await supabase.auth.signOut({ scope: 'local' });
      if (error) throw createAuthError(error, '이 기기에서 로그아웃하지 못했습니다. 다시 시도해주세요.');
      setUser(null);
    }
    forgetRecovery(recoveryStorage());
    setRecoveryUserId(null);
    setAuthError('');
    persistGuestMode(false);
    setIsGuest(false);
  };
  const enterGuestMode = async () => {
    setAuthError('');
    if (user) {
      const {
        error
      } = await supabase.auth.signOut();
      if (error) throw createAuthError(error, '게스트 모드로 전환하지 못했습니다. 다시 시도해주세요.');
    }
    persistGuestMode(true);
    setUser(null);
    setIsGuest(true);
    forgetRecovery(recoveryStorage());
    setRecoveryUserId(null);
  };
  return <AuthContext.Provider value={{
    user,
    loading,
    isGuest,
    authError,
    recoveryReady: Boolean(recoveryUserId && user?.id === recoveryUserId),
    requestPasswordReset: email => requestAccountEmail('recovery', email),
    resendConfirmation: email => requestAccountEmail('signup', email),
    resetPassword,
    cancelRecovery,
    signUp,
    signIn,
    signOut,
    enterGuestMode,
    demoApplications,
    setDemoApplications,
    demoItems,
    setDemoItems,
    demoNotes,
    setDemoNotes,
    resetDemo
  }}>
  {children}
</AuthContext.Provider>;
};
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
