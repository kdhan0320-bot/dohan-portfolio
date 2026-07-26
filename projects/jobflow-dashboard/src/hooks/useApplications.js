import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import { DEMO_APPLICATIONS } from '../constants';

const normalizeApplicationPayload = (payload) => {
  const normalized = { ...payload };
  if ('applied_date' in payload) normalized.applied_date = payload.applied_date || null;
  if ('deadline' in payload) normalized.deadline = payload.deadline || null;
  return normalized;
};

const useApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user, isGuest } = useAuth();

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    if (isGuest) {
      setApplications(DEMO_APPLICATIONS);
      setLoading(false);
      return;
    }
    if (!user) {
      setApplications([]);
      setLoading(false);
      return;
    }
    const { data, error: err } = await supabase
      .from('applications')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });
    if (err) setError(err.message);
    else setApplications(data ?? []);
    setLoading(false);
  }, [user, isGuest]);

  useEffect(() => { fetch(); }, [fetch]);

  const add = async (payload) => {
    if (isGuest || !user) throw new Error('로그인 후 지원 회사를 등록할 수 있습니다.');
    const normalizedPayload = normalizeApplicationPayload(payload);
    const { data, error: err } = await supabase
      .from('applications')
      .insert([{ ...normalizedPayload, user_id: user.id }])
      .select()
      .single();
    if (err) throw err;
    setApplications((prev) => [data, ...prev]);
    return data;
  };

  const update = async (id, payload) => {
    if (isGuest || !user) throw new Error('로그인 후 지원 정보를 수정할 수 있습니다.');
    const normalizedPayload = normalizeApplicationPayload(payload);
    const { data, error: err } = await supabase
      .from('applications')
      .update({ ...normalizedPayload, updated_at: new Date().toISOString() })
      .eq('id', id)
      .eq('user_id', user.id)
      .select()
      .maybeSingle();
    if (err) throw err;
    if (!data) throw new Error('수정할 지원 정보를 찾지 못했거나 권한이 없습니다.');
    setApplications((prev) => prev.map((a) => (a.id === id ? data : a)));
    return data;
  };

  const remove = async (id) => {
    if (isGuest || !user) throw new Error('로그인 후 지원 정보를 삭제할 수 있습니다.');
    const { data, error: err } = await supabase
      .from('applications')
      .delete()
      .eq('id', id)
      .eq('user_id', user.id)
      .select('id')
      .maybeSingle();
    if (err) throw err;
    if (!data) throw new Error('삭제할 지원 정보를 찾지 못했거나 권한이 없습니다.');
    setApplications((prev) => prev.filter((a) => a.id !== id));
  };

  return { applications, loading, error, refresh: fetch, add, update, remove };
};

export default useApplications;
