import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import { createSafeDataError, getSafeDataErrorMessage } from '../utils/dataErrors';
import { interviewUpdate } from '../utils/recordPayload';
const useInterviewNotes = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const {
    user,
    isGuest,
    demoNotes,
    setDemoNotes
  } = useAuth();
  const fetch = useCallback(async () => {
    setLoading(true);
    setError('');
    if (isGuest) {
      setLoading(false);
      return;
    }
    if (!user) {
      setNotes([]);
      setLoading(false);
      return;
    }
    try {
      const {
        data,
        error: queryError
      } = await supabase.from('interview_notes').select('*').eq('user_id', user.id).order('created_at', {
        ascending: false
      });
      if (queryError) {
        setError(getSafeDataErrorMessage(queryError));
        setNotes([]);
      } else {
        setNotes(data ?? []);
      }
    } catch (requestError) {
      setError(getSafeDataErrorMessage(requestError));
      setNotes([]);
    } finally {
      setLoading(false);
    }
  }, [user, isGuest]);
  useEffect(() => {
    fetch();
  }, [fetch]);
  const add = async payload => {
    if (isGuest) {
      const row = {
        ...payload,
        id: crypto.randomUUID()
      };
      setDemoNotes(prev => [row, ...prev]);
      return row;
    }
    if (!user) throw new Error('로그인 후 면접 메모를 추가할 수 있습니다.');
    let response;
    try {
      response = await supabase.from('interview_notes').insert([{
        ...payload,
        user_id: user.id
      }]).select().single();
    } catch (requestError) {
      throw createSafeDataError(requestError);
    }
    const {
      data,
      error: mutationError
    } = response;
    if (mutationError) throw createSafeDataError(mutationError);
    setNotes(prev => [data, ...prev]);
    return data;
  };
  const toggleReview = async (id, val) => {
    if (isGuest) {
      setDemoNotes(prev => prev.map(n => n.id === id ? {
        ...n,
        is_reviewed: val
      } : n));
      return;
    }
    if (!user) throw new Error('로그인 후 복습 상태를 변경할 수 있습니다.');
    let response;
    try {
      response = await supabase.from('interview_notes').update({
        is_reviewed: val
      }).eq('id', id).eq('user_id', user.id).select('id, is_reviewed').maybeSingle();
    } catch (requestError) {
      throw createSafeDataError(requestError);
    }
    const {
      data,
      error: mutationError
    } = response;
    if (mutationError) throw createSafeDataError(mutationError);
    if (!data) throw new Error('변경할 면접 메모를 찾지 못했거나 권한이 없습니다.');
    setNotes(prev => prev.map(n => n.id === id ? {
      ...n,
      is_reviewed: data.is_reviewed
    } : n));
  };
  const update = async (id, payload) => {
    const values = interviewUpdate(payload);
    if (isGuest) {
      setDemoNotes(prev => prev.map(note => note.id === id ? { ...note, ...values } : note));
      return;
    }
    if (!user) throw new Error('로그인 후 면접 메모를 수정할 수 있습니다.');
    let response;
    try {
      response = await supabase.from('interview_notes').update(values).eq('id', id).eq('user_id', user.id).select('id, question, answer, related_project, importance').maybeSingle();
    } catch (requestError) { throw createSafeDataError(requestError); }
    if (response.error) throw createSafeDataError(response.error);
    if (!response.data) throw new Error('수정할 면접 메모를 찾지 못했거나 권한이 없습니다.');
    setNotes(prev => prev.map(note => note.id === id ? { ...note, ...response.data } : note));
  };
  const remove = async id => {
    if (isGuest) {
      setDemoNotes(prev => prev.filter(n => n.id !== id));
      return;
    }
    if (!user) throw new Error('로그인 후 면접 메모를 삭제할 수 있습니다.');
    let response;
    try {
      response = await supabase.from('interview_notes').delete().eq('id', id).eq('user_id', user.id).select('id').maybeSingle();
    } catch (requestError) {
      throw createSafeDataError(requestError);
    }
    const {
      data,
      error: mutationError
    } = response;
    if (mutationError) throw createSafeDataError(mutationError);
    if (!data) throw new Error('삭제할 면접 메모를 찾지 못했거나 권한이 없습니다.');
    setNotes(prev => prev.filter(n => n.id !== id));
  };
  return {
    notes: isGuest ? demoNotes : notes,
    loading,
    error,
    refresh: fetch,
    add,
    update,
    toggleReview,
    remove
  };
};
export default useInterviewNotes;
