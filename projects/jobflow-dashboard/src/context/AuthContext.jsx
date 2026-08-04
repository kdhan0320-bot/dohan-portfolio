import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { createAuthError, getAuthErrorMessage } from '../utils/authErrors';

const AuthContext = createContext(null);
const GUEST_MODE_KEY = 'jobflow-guest-mode';

const readGuestMode = () => {
  try {
    return window.sessionStorage.getItem(GUEST_MODE_KEY) === 'true';
  } catch {
    return false;
  }
};

const persistGuestMode = (enabled) => {
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

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isGuest, setIsGuest] = useState(false);
  const [authError, setAuthError] = useState('');

  useEffect(() => {
    let active = true;

    supabase.auth.getSession()
      .then(({ data: { session }, error }) => {
        if (!active) return;
        if (error) {
          setAuthError(getAuthErrorMessage(error, '로그인 상태를 확인하지 못했습니다. 다시 로그인해주세요.'));
          setUser(null);
          setIsGuest(readGuestMode());
        } else {
          setUser(session?.user ?? null);
          if (session?.user) {
            persistGuestMode(false);
            setIsGuest(false);
          } else {
            setIsGuest(readGuestMode());
          }
        }
      })
      .catch((error) => {
        if (active) {
          setAuthError(getAuthErrorMessage(error, '로그인 상태를 확인하지 못했습니다. 다시 로그인해주세요.'));
          setUser(null);
          setIsGuest(readGuestMode());
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        persistGuestMode(false);
        setIsGuest(false);
        setAuthError('');
      }
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);

  const signUp = async (email, password, displayName) => {
    setAuthError('');
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) throw createAuthError(error);
    persistGuestMode(false);
    setIsGuest(false);

    let profileError = null;

    if (data.session?.user) {
      const result = await supabase
        .from('jobflow_profiles')
        .upsert({
          id: data.session.user.id,
          email,
          display_name: displayName || email.split('@')[0],
        });
      profileError = result.error;
    }

    return { data, profileError, requiresEmailConfirmation: Boolean(data.user && !data.session) };
  };

  const signIn = async (email, password) => {
    setAuthError('');
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw createAuthError(error);
    persistGuestMode(false);
    setIsGuest(false);
    return data;
  };

  const signOut = async () => {
    if (user) {
      const { error } = await supabase.auth.signOut();
      if (error) throw createAuthError(error, '로그아웃하지 못했습니다. 다시 시도해주세요.');
    }
    persistGuestMode(false);
    setUser(null);
    setIsGuest(false);
    setAuthError('');
  };

  const enterGuestMode = async () => {
    setAuthError('');
    if (user) {
      const { error } = await supabase.auth.signOut();
      if (error) throw createAuthError(error, '게스트 모드로 전환하지 못했습니다. 다시 시도해주세요.');
    }
    persistGuestMode(true);
    setUser(null);
    setIsGuest(true);
  };

  return (
    <AuthContext.Provider value={{ user, loading, isGuest, authError, signUp, signIn, signOut, enterGuestMode }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
