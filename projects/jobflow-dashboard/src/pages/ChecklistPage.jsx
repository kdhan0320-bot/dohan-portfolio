import { useState, useMemo } from 'react';
import {
  Box, Card, CardContent, Typography, Checkbox, LinearProgress,
  Divider, Stack, TextField, Button, FormControl, InputLabel,
  Select, MenuItem, IconButton, Chip, Skeleton, Alert,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import useChecklist from '../hooks/useChecklist';
import { useAuth } from '../context/AuthContext';
import { CHECKLIST_CATEGORIES } from '../constants';
import ActionFeedback from '../components/ui/ActionFeedback';
import EmptyState from '../components/ui/EmptyState';
import GuestReadOnlyNotice from '../components/ui/GuestReadOnlyNotice';
import { calcProgress } from '../utils/statusHelpers';

const ChecklistPage = () => {
  const { items, loading, error, refresh, toggle, add, remove } = useChecklist();
  const { isGuest } = useAuth();
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('포트폴리오');
  const [feedback, setFeedback] = useState(null);
  const [adding, setAdding] = useState(false);
  const [pendingActions, setPendingActions] = useState(() => new Set());

  const isPending = (type, id) => pendingActions.has(`${type}:${id}`);

  const startPending = (type, id) => {
    const key = `${type}:${id}`;
    if (pendingActions.has(key)) return false;
    setPendingActions((prev) => new Set(prev).add(key));
    return true;
  };

  const finishPending = (type, id) => {
    const key = `${type}:${id}`;
    setPendingActions((prev) => {
      const next = new Set(prev);
      next.delete(key);
      return next;
    });
  };

  const { rate: progress, done: completedCount, total: itemCount } = useMemo(
    () => calcProgress(items),
    [items],
  );

  const grouped = useMemo(() => {
    const map = {};
    items.forEach((item) => {
      const cat = item.category || '기타';
      if (!map[cat]) map[cat] = [];
      map[cat].push(item);
    });
    return map;
  }, [items]);

  const handleAdd = async () => {
    if (!newTitle.trim() || adding) return;
    setAdding(true);
    try {
      await add(newTitle.trim(), newCategory);
      setNewTitle('');
      setFeedback({ severity: 'success', message: '체크리스트 항목을 추가했습니다.' });
    } catch (addError) {
      setFeedback({
        severity: 'error',
        message: addError.message || '체크리스트 항목을 추가하지 못했습니다.',
      });
    } finally {
      setAdding(false);
    }
  };

  const handleToggle = async (id, isDone) => {
    if (!startPending('toggle', id)) return;
    try {
      await toggle(id, isDone);
      setFeedback({
        severity: 'success',
        message: isDone ? '항목을 완료로 표시했습니다.' : '항목을 미완료로 되돌렸습니다.',
      });
    } catch (toggleError) {
      setFeedback({
        severity: 'error',
        message: toggleError.message || '체크리스트 상태를 변경하지 못했습니다.',
      });
    } finally {
      finishPending('toggle', id);
    }
  };

  const handleRemove = async (id) => {
    if (!startPending('remove', id)) return;
    try {
      await remove(id);
      setFeedback({ severity: 'success', message: '체크리스트 항목을 삭제했습니다.' });
    } catch (removeError) {
      setFeedback({
        severity: 'error',
        message: removeError.message || '체크리스트 항목을 삭제하지 못했습니다.',
      });
    } finally {
      finishPending('remove', id);
    }
  };

  return (
    <Box>
      <Typography component="h1" variant="h5" fontWeight={700} sx={{ mb: 1 }}>취업 준비 체크리스트</Typography>
      {isGuest && (
        <GuestReadOnlyNotice description="샘플 체크리스트는 조회만 할 수 있습니다. 로그인하면 항목을 추가하고 완료 상태를 저장할 수 있습니다." />
      )}
      {error && (
        <Alert
          severity="error"
          sx={{ mb: 2 }}
          action={<Button color="inherit" size="small" onClick={refresh}>다시 시도</Button>}
        >
          체크리스트를 불러오지 못했습니다. {error}
        </Alert>
      )}

      {!error && (
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
              <Typography component="h2" variant="h6" fontWeight={600}>전체 진행률</Typography>
              <Typography component="p" variant="h6" fontWeight={700} color="success.main">{progress}%</Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={progress}
              color="success"
              aria-label="체크리스트 진행률"
              aria-valuetext={`${completedCount}/${itemCount} 항목 완료, ${progress}%`}
              sx={{ height: 12, borderRadius: 6 }}
            />
            <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
              {completedCount}/{itemCount} 항목 완료
            </Typography>
          </CardContent>
        </Card>
      )}

      {!isGuest && (
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography component="h2" variant="h6" fontWeight={600} sx={{ mb: 1.5 }}>항목 추가</Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
              <TextField
                placeholder="체크리스트 항목 입력"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                disabled={adding}
                size="small"
                sx={{ flex: 1 }}
                slotProps={{ htmlInput: { 'aria-label': '새 체크리스트 항목' } }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAdd();
                  }
                }}
              />
              <FormControl size="small" sx={{ minWidth: 120 }}>
                <InputLabel id="checklist-category-label">카테고리</InputLabel>
                <Select
                  labelId="checklist-category-label"
                  value={newCategory}
                  label="카테고리"
                  onChange={(e) => setNewCategory(e.target.value)}
                  disabled={adding}
                >
                  {CHECKLIST_CATEGORIES.map((c) => <MenuItem key={c} value={c}>{c}</MenuItem>)}
                </Select>
              </FormControl>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleAdd}
                disabled={adding || !newTitle.trim()}
                sx={{ whiteSpace: 'nowrap' }}
              >
                {adding ? '추가 중...' : '추가'}
              </Button>
            </Stack>
          </CardContent>
        </Card>
      )}

      {!error && (
        loading ? (
          <Stack spacing={1}>{[...Array(5)].map((_, i) => <Skeleton key={i} height={56} variant="rounded" />)}</Stack>
        ) : items.length === 0 ? (
          <EmptyState
            title="체크리스트 항목이 없습니다"
            description={isGuest
              ? '게스트 샘플 항목이 없습니다. 로그인하면 내 체크리스트를 만들 수 있습니다.'
              : '위 입력창에서 첫 준비 항목을 추가해보세요.'}
          />
        ) : (
          Object.entries(grouped).map(([category, categoryItems]) => (
          <Card key={category} sx={{ mb: 2 }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                <Typography component="h2" variant="h6" fontWeight={700}>{category}</Typography>
                <Chip
                  label={`${categoryItems.filter((i) => i.is_done).length}/${categoryItems.length}`}
                  size="small"
                  color={categoryItems.every((i) => i.is_done) ? 'success' : 'default'}
                />
              </Box>
              <Stack divider={<Divider />}>
                {categoryItems.map((item) => {
                  const rowPending = isPending('toggle', item.id) || isPending('remove', item.id);
                  return (
                    <Box
                      key={item.id}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        py: 1,
                      }}
                    >
                      <Checkbox
                        checked={item.is_done}
                        onChange={(e) => handleToggle(item.id, e.target.checked)}
                        disabled={isGuest || rowPending}
                        size="small"
                        color="success"
                        slotProps={{ input: { 'aria-label': `${item.title}${isGuest ? ' (게스트 읽기 전용)' : ''}` } }}
                        sx={{ p: 0.5, mr: 1 }}
                      />
                      <Typography
                        variant="body2"
                        sx={{
                          flex: 1,
                          textDecoration: item.is_done ? 'line-through' : 'none',
                          color: item.is_done ? 'text.secondary' : 'text.primary',
                        }}
                      >
                        {item.title}
                      </Typography>
                      {!isGuest && (
                        <IconButton
                          size="small"
                          onClick={() => handleRemove(item.id)}
                          disabled={rowPending}
                          aria-label={`${item.title} 삭제`}
                          sx={{ color: 'text.secondary', '&:hover': { color: 'error.main' } }}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      )}
                    </Box>
                  );
                })}
              </Stack>
            </CardContent>
          </Card>
          ))
        )
      )}
      <ActionFeedback feedback={feedback} onClose={() => setFeedback(null)} />
    </Box>
  );
};

export default ChecklistPage;
