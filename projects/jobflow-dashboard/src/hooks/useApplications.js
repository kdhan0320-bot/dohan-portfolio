import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import { DEMO_APPLICATIONS } from '../constants';
import { buildApplicationPayload } from '../utils/applicationPayload';
import { createSafeDataError, getSafeDataErrorMessage } from '../utils/dataErrors';

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
    try {
      const { data, error: queryError } = await supabase
        .from('applications')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      if (queryError) {
        setError(getSafeDataErrorMessage(queryError));
        setApplications([]);
      } else {
        setApplications(data ?? []);
      }
    } catch (requestError) {
      setError(getSafeDataErrorMessage(requestError));
      setApplications([]);
    } finally {
      setLoading(false);
    }
  }, [user, isGuest]);

  useEffect(() => { fetch(); }, [fetch]);

  const add = async (payload) => {
    if (isGuest || !user) throw new Error('로그인 후 지원 회사를 등록할 수 있습니다.');
    const insertPayload = { ...buildApplicationPayload(payload), user_id: user.id };
    let response;
    try {
      response = await supabase
        .from('applications')
        .insert([insertPayload])
        .select()
        .single();
    } catch (requestError) {
      throw createSafeDataError(requestError);
    }
    const { data, error: mutationError } = response;
    if (mutationError) throw createSafeDataError(mutationError);
    setApplications((prev) => [data, ...prev]);
    return data;
  };

  const update = async (id, payload) => {
    if (isGuest || !user) throw new Error('로그인 후 지원 정보를 수정할 수 있습니다.');
    const updatePayload = buildApplicationPayload(payload);
    updatePayload.updated_at = new Date().toISOString();
    let response;
    try {
      response = await supabase
        .from('applications')
        .update(updatePayload)
        .eq('id', id)
        .eq('user_id', user.id)
        .select()
        .maybeSingle();
    } catch (requestError) {
      throw createSafeDataError(requestError);
    }
    const { data, error: mutationError } = response;
    if (mutationError) throw createSafeDataError(mutationError);
    if (!data) throw new Error('수정할 지원 정보를 찾지 못했거나 권한이 없습니다.');
    setApplications((prev) => prev.map((a) => (a.id === id ? data : a)));
    return data;
  };

  const remove = async (id) => {
    if (isGuest || !user) throw new Error('로그인 후 지원 정보를 삭제할 수 있습니다.');
    let response;
    try {
      response = await supabase
        .from('applications')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id)
        .select('id')
        .maybeSingle();
    } catch (requestError) {
      throw createSafeDataError(requestError);
    }
    const { data, error: mutationError } = response;
    if (mutationError) throw createSafeDataError(mutationError);
    if (!data) throw new Error('삭제할 지원 정보를 찾지 못했거나 권한이 없습니다.');
    setApplications((prev) => prev.filter((a) => a.id !== id));
  };

  return { applications, loading, error, refresh: fetch, add, update, remove };
};

export default useApplications;
