import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import { DEMO_INTERVIEW_NOTES } from '../constants';

const useInterviewNotes = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user, isGuest } = useAuth();

  const fetch = useCallback(async () => {
    setLoading(true);
    setError('');
    if (isGuest) { setNotes(DEMO_INTERVIEW_NOTES); setLoading(false); return; }
    if (!user) { setNotes([]); setLoading(false); return; }
    const { data, error: queryError } = await supabase
      .from('interview_notes')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });
    if (queryError) {
      setError(queryError.message);
      setNotes([]);
    } else {
      setNotes(data ?? []);
    }
    setLoading(false);
  }, [user, isGuest]);

  useEffect(() => { fetch(); }, [fetch]);

  const add = async (payload) => {
    if (isGuest || !user) throw new Error('로그인 후 면접 메모를 추가할 수 있습니다.');
    const { data, error: mutationError } = await supabase
      .from('interview_notes')
      .insert([{ ...payload, user_id: user.id }])
      .select()
      .single();
    if (mutationError) throw mutationError;
    setNotes((prev) => [data, ...prev]);
    return data;
  };

  const toggleReview = async (id, val) => {
    if (isGuest || !user) throw new Error('로그인 후 복습 상태를 변경할 수 있습니다.');
    const { data, error: mutationError } = await supabase
      .from('interview_notes')
      .update({ is_reviewed: val })
      .eq('id', id)
      .eq('user_id', user.id)
      .select('id, is_reviewed')
      .maybeSingle();
    if (mutationError) throw mutationError;
    if (!data) throw new Error('변경할 면접 메모를 찾지 못했거나 권한이 없습니다.');
    setNotes((prev) => prev.map((n) => n.id === id ? { ...n, is_reviewed: data.is_reviewed } : n));
  };

  const remove = async (id) => {
    if (isGuest || !user) throw new Error('로그인 후 면접 메모를 삭제할 수 있습니다.');
    const { data, error: mutationError } = await supabase
      .from('interview_notes')
      .delete()
      .eq('id', id)
      .eq('user_id', user.id)
      .select('id')
      .maybeSingle();
    if (mutationError) throw mutationError;
    if (!data) throw new Error('삭제할 면접 메모를 찾지 못했거나 권한이 없습니다.');
    setNotes((prev) => prev.filter((n) => n.id !== id));
  };

  return { notes, loading, error, refresh: fetch, add, toggleReview, remove };
};

export default useInterviewNotes;
