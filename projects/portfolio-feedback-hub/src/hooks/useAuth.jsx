import { useState, useEffect, useCallback, useRef, createContext, useContext } from 'react';
import { supabase } from '../lib/supabase';
import { isUsernameFormatValid, normalizeUsername, validateUsername } from '../utils/usernamePolicy';

const AuthContext = createContext(null);
const PROFILE_FIELDS = 'id, username';
const PROFILE_LOAD_ERROR = '프로필 정보를 불러오지 못했습니다. 잠시 후 다시 시도해주세요.';
const USERNAME_CHECK_ERROR = '아이디 중복확인을 완료하지 못했습니다. 잠시 후 다시 시도해주세요.';
const SIGNUP_ERROR = '회원가입을 완료하지 못했습니다. 아이디를 다시 확인한 뒤 잠시 후 다시 시도해주세요.';

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isGuest, setIsGuest] = useState(false);
  const mountedRef = useRef(false);
  const profileRequestRef = useRef(0);
  const activeUserIdRef = useRef(null);

  const fetchProfile = useCallback(async (userId) => {
    const requestId = ++profileRequestRef.current;
    const { data, error } = await supabase
      .from('profiles')
      .select(PROFILE_FIELDS)
      .eq('id', userId)
      .maybeSingle();

    if (error || !data) {
      if (mountedRef.current && requestId === profileRequestRef.current) {
        setProfile(null);
      }
      throw new Error(PROFILE_LOAD_ERROR);
    }

    if (mountedRef.current && requestId === profileRequestRef.current) {
      setProfile(data);
    }
    return data;
  }, []);

  useEffect(() => {
    mountedRef.current = true;
    let authEventVersion = 0;

    const applySession = (session) => {
      if (!mountedRef.current) return;

      const nextUser = session?.user ?? null;
      const nextUserId = nextUser?.id ?? null;
      const userChanged = activeUserIdRef.current !== nextUserId;

      activeUserIdRef.current = nextUserId;
      setUser(nextUser);
      setLoading(false);

      if (!nextUser) {
        profileRequestRef.current += 1;
        setProfile(null);
        return;
      }

      setIsGuest(false);
      if (userChanged) setProfile(null);
      void fetchProfile(nextUser.id).catch(() => {});
    };

    const initialAuthVersion = authEventVersion;
    supabase.auth.getSession()
      .then(({ data: { session }, error }) => {
        if (error) throw error;
        if (authEventVersion === initialAuthVersion) applySession(session);
      })
      .catch(() => {
        if (!mountedRef.current || authEventVersion !== initialAuthVersion) return;
        activeUserIdRef.current = null;
        profileRequestRef.current += 1;
        setUser(null);
        setProfile(null);
        setLoading(false);
      });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      authEventVersion += 1;
      applySession(session);
    });

    return () => {
      mountedRef.current = false;
      profileRequestRef.current += 1;
      subscription.unsubscribe();
    };
  }, [fetchProfile]);

  const signUp = async ({ username, password }) => {
    const usernameValidation = validateUsername(username);
    if (!usernameValidation.isValid) throw new Error(usernameValidation.message);

    const { normalizedUsername } = usernameValidation;
    const email = `${normalizedUsername}@gamehub.com`;
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          app_id: 'portfolio-feedback-hub',
          username: normalizedUsername,
        },
      },
    });
    if (error || !data?.user) throw new Error(SIGNUP_ERROR);

    setIsGuest(false);
    return data;
  };

  const signIn = async ({ username, password }) => {
    const normalizedUsername = normalizeUsername(username);
    if (!isUsernameFormatValid(normalizedUsername) || !password) {
      throw new Error('아이디와 비밀번호를 확인해주세요.');
    }

    const email = `${normalizedUsername}@gamehub.com`;
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    setIsGuest(false);
    return data;
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    setIsGuest(false);
  };

  const checkUsernameAvailable = async (username) => {
    const usernameValidation = validateUsername(username);
    if (!usernameValidation.isValid) throw new Error(usernameValidation.message);

    const { normalizedUsername } = usernameValidation;
    const { data, error } = await supabase
      .from('profiles')
      .select('id')
      .eq('username', normalizedUsername)
      .maybeSingle();

    if (error) throw new Error(USERNAME_CHECK_ERROR);
    return !data;
  };

  const enterGuestMode = () => setIsGuest(true);
  const exitGuestMode = () => setIsGuest(false);

  return (
    <AuthContext.Provider value={{ user, profile, loading, isGuest, signUp, signIn, signOut, checkUsernameAvailable, enterGuestMode, exitGuestMode }}>
      {children}
    </AuthContext.Provider>
  );
};
