import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

const AuthContext = createContext(null);

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
          setAuthError(error.message);
          setUser(null);
        } else {
          setUser(session?.user ?? null);
          if (session?.user) setIsGuest(false);
        }
      })
      .catch((error) => {
        if (active) {
          setAuthError(error.message || '로그인 상태를 확인하지 못했습니다.');
          setUser(null);
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
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
    if (error) throw error;
    setIsGuest(false);

    let profileError = null;

    if (data.user) {
      const result = await supabase
        .from('jobflow_profiles')
        .upsert({
          id: data.user.id,
          email,
          display_name: displayName || email.split('@')[0],
        });
      profileError = result.error;
    }

    return { data, profileError };
  };

  const signIn = async (email, password) => {
    setAuthError('');
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    setIsGuest(false);
    return data;
  };

  const signOut = async () => {
    if (user) {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    }
    setUser(null);
    setIsGuest(false);
    setAuthError('');
  };

  const enterGuestMode = async () => {
    setAuthError('');
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
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
