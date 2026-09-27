import { createClient } from '@supabase/supabase-js';
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('[갈피록] 계정 연결 정보가 없어 샘플 체험 모드로 실행됩니다.');
}

// 환경변수가 없어도 앱이 크래시하지 않도록 더미 값으로 폴백합니다.
// 계정 연결 정보가 없으면 AuthProvider에서 인증 요청을 차단하고 샘플 체험만 제공합니다.
export const isAuthConfigured = Boolean(supabaseUrl && supabaseAnonKey);
export const supabase = createClient(supabaseUrl || 'https://placeholder.supabase.co', supabaseAnonKey || 'placeholder-anon-key');
