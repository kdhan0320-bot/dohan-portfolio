import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import { DEMO_CHECKLISTS } from '../constants';
import { createSafeDataError, getSafeDataErrorMessage } from '../utils/dataErrors';

const useChecklist = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user, isGuest } = useAuth();

  const fetch = useCallback(async () => {
    setLoading(true);
    setError('');
    if (isGuest) {
      setItems(DEMO_CHECKLISTS);
      setLoading(false);
      return;
    }
    if (!user) { setItems([]); setLoading(false); return; }
    try {
      const { data, error: queryError } = await supabase
        .from('portfolio_checklists')
        .select('*')
        .eq('user_id', user.id)
        .order('sort_order');
      if (queryError) {
        setError(getSafeDataErrorMessage(queryError));
        setItems([]);
      } else {
        setItems(data ?? []);
      }
    } catch (requestError) {
      setError(getSafeDataErrorMessage(requestError));
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, [user, isGuest]);

  useEffect(() => { fetch(); }, [fetch]);

  const toggle = async (id, isDone) => {
    if (isGuest || !user) throw new Error('로그인 후 체크리스트를 변경할 수 있습니다.');
    let response;
    try {
      response = await supabase
        .from('portfolio_checklists')
        .update({ is_done: isDone, updated_at: new Date().toISOString() })
        .eq('id', id)
        .eq('user_id', user.id)
        .select('id, is_done')
        .maybeSingle();
    } catch (requestError) {
      throw createSafeDataError(requestError);
    }
    const { data, error: mutationError } = response;
    if (mutationError) throw createSafeDataError(mutationError);
    if (!data) throw new Error('변경할 체크리스트 항목을 찾지 못했거나 권한이 없습니다.');
    setItems((prev) => prev.map((item) => item.id === id ? { ...item, is_done: data.is_done } : item));
  };

  const add = async (title, category) => {
    if (isGuest || !user) throw new Error('로그인 후 체크리스트 항목을 추가할 수 있습니다.');
    const maxOrder = items.length > 0 ? Math.max(...items.map((i) => i.sort_order)) + 1 : 1;
    let response;
    try {
      response = await supabase
        .from('portfolio_checklists')
        .insert([{ title, category, is_done: false, sort_order: maxOrder, user_id: user.id }])
        .select()
        .single();
    } catch (requestError) {
      throw createSafeDataError(requestError);
    }
    const { data, error: mutationError } = response;
    if (mutationError) throw createSafeDataError(mutationError);
    setItems((prev) => [...prev, data]);
    return data;
  };

  const remove = async (id) => {
    if (isGuest || !user) throw new Error('로그인 후 체크리스트 항목을 삭제할 수 있습니다.');
    let response;
    try {
      response = await supabase
        .from('portfolio_checklists')
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
    if (!data) throw new Error('삭제할 체크리스트 항목을 찾지 못했거나 권한이 없습니다.');
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  return { items, loading, error, refresh: fetch, toggle, add, remove };
};

export default useChecklist;
