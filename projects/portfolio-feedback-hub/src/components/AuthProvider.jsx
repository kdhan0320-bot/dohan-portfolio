import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { isUsernameFormatValid, normalizeUsername } from '../utils/usernamePolicy';
import { AuthContext } from '../hooks/useAuth';

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isActive = true;
    let authEventVersion = 0;

    const applySession = (session) => {
      if (!isActive) return;
      setUser(session?.user ?? null);
      setLoading(false);
    };

    const initialAuthVersion = authEventVersion;
    supabase.auth.getSession()
      .then(({ data: { session }, error }) => {
        if (error) throw error;
        if (authEventVersion === initialAuthVersion) applySession(session);
      })
      .catch(() => {
        if (!isActive || authEventVersion !== initialAuthVersion) return;
        setUser(null);
        setLoading(false);
      });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      authEventVersion += 1;
      applySession(session);
    });

    return () => {
      isActive = false;
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async ({ username, password }) => {
    const normalizedUsername = normalizeUsername(username);
    if (!isUsernameFormatValid(normalizedUsername) || !password) {
      throw new Error('아이디와 비밀번호를 확인해주세요.');
    }

    const email = `${normalizedUsername}@gamehub.com`;
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data;
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
