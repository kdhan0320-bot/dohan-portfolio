import { useState } from 'react';
import {
  Box, Card, CardContent, Typography, Button, Stack, Chip,
  TextField, Select, MenuItem, FormControl, InputLabel,
  Checkbox, IconButton, Divider, Skeleton, Dialog,
  DialogTitle, DialogContent, DialogActions, Alert,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import useInterviewNotes from '../hooks/useInterviewNotes';
import { useAuth } from '../context/AuthContext';
import { IMPORTANCE_OPTIONS } from '../constants';
import ActionFeedback from '../components/ui/ActionFeedback';
import EmptyState from '../components/ui/EmptyState';
import GuestReadOnlyNotice from '../components/ui/GuestReadOnlyNotice';

const importanceColor = (importance) =>
  IMPORTANCE_OPTIONS.find((option) => option.value === importance)?.color ?? '#475569';

const NoteCard = ({ note, onToggle, onDelete, isGuest, togglePending, deletePending }) => (
  <Card sx={{ opacity: note.is_reviewed ? 0.7 : 1 }}>
    <CardContent>
      <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 1 }}>
        <Box sx={{ flex: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap', mb: 1 }}>
            <Chip
              label={note.importance || '보통'}
              size="small"
              sx={{
                color: importanceColor(note.importance),
                borderColor: importanceColor(note.importance),
                fontWeight: 700,
                height: 22,
              }}
              variant="outlined"
            />
            {note.related_project && (
              <Chip label={note.related_project} size="small" sx={{ height: 22 }} />
            )}
            {note.is_reviewed && (
              <Chip label="복습 완료" size="small" color="success" sx={{ height: 22 }} />
            )}
          </Box>
          <Typography variant="body2" fontWeight={700} sx={{ mb: 1 }}>Q. {note.question}</Typography>
          {note.answer && (
            <Typography variant="body2" color="text.secondary" sx={{ whiteSpace: 'pre-wrap', lineHeight: 1.7 }}>
              A. {note.answer}
            </Typography>
          )}
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5 }}>
          <Checkbox
            checked={note.is_reviewed}
            onChange={(e) => onToggle(note.id, e.target.checked)}
            disabled={isGuest || togglePending || deletePending}
            size="small"
            color="success"
            slotProps={{
              input: {
                'aria-label': `${note.question} 복습 완료${isGuest ? ' (게스트 읽기 전용)' : ''}`,
              },
            }}
          />
          {!isGuest && (
            <IconButton
              size="small"
              onClick={() => onDelete(note.id)}
              disabled={togglePending || deletePending}
              aria-label="삭제"
              color="error"
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          )}
        </Box>
      </Box>
    </CardContent>
  </Card>
);

const InterviewPage = () => {
  const { notes, loading, error, refresh, add, toggleReview, remove } = useInterviewNotes();
  const { isGuest } = useAuth();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ question: '', answer: '', related_project: '', importance: '보통' });
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

  const handleChange = (field) => (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async () => {
    if (!form.question.trim() || adding) return;
    setAdding(true);
    try {
      await add({ ...form, is_reviewed: false });
      setForm({ question: '', answer: '', related_project: '', importance: '보통' });
      setOpen(false);
      setFeedback({ severity: 'success', message: '면접 질문을 저장했습니다.' });
    } catch (addError) {
      setFeedback({
        severity: 'error',
        message: addError.message || '면접 질문을 저장하지 못했습니다.',
      });
    } finally {
      setAdding(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('삭제하시겠습니까?')) return;
    if (!startPending('remove', id)) return;
    try {
      await remove(id);
      setFeedback({ severity: 'success', message: '면접 메모를 삭제했습니다.' });
    } catch (removeError) {
      setFeedback({
        severity: 'error',
        message: removeError.message || '면접 메모를 삭제하지 못했습니다.',
      });
    } finally {
      finishPending('remove', id);
    }
  };

  const handleToggleReview = async (id, reviewedValue) => {
    if (!startPending('toggle', id)) return;
    try {
      await toggleReview(id, reviewedValue);
      setFeedback({
        severity: 'success',
        message: reviewedValue ? '복습 완료로 표시했습니다.' : '미복습으로 되돌렸습니다.',
      });
    } catch (toggleError) {
      setFeedback({
        severity: 'error',
        message: toggleError.message || '복습 상태를 변경하지 못했습니다.',
      });
    } finally {
      finishPending('toggle', id);
    }
  };

  const reviewed = notes.filter((n) => n.is_reviewed);
  const unreviewed = notes.filter((n) => !n.is_reviewed);

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
        <Box>
          <Typography variant="h5" fontWeight={700}>면접 메모</Typography>
          {!error && (
            <Typography variant="caption" color="text.secondary">
              {notes.length}개 질문 • {reviewed.length}개 복습 완료
            </Typography>
          )}
        </Box>
        {!isGuest && (
          <Button variant="contained" startIcon={<AddIcon />} onClick={() => setOpen(true)}>
            질문 추가
          </Button>
        )}
      </Box>
      {isGuest && (
        <GuestReadOnlyNotice description="샘플 면접 메모는 조회만 할 수 있습니다. 로그인하면 질문을 추가하고 복습 상태를 저장할 수 있습니다." />
      )}
      {error && (
        <Alert
          severity="error"
          sx={{ mb: 2 }}
          action={<Button color="inherit" size="small" onClick={refresh}>다시 시도</Button>}
        >
          면접 메모를 불러오지 못했습니다. {error}
        </Alert>
      )}

      {!error && (
        loading ? (
          <Stack spacing={2}>{[...Array(3)].map((_, i) => <Skeleton key={i} height={120} variant="rounded" />)}</Stack>
        ) : notes.length === 0 ? (
          <EmptyState
            title="면접 메모가 없습니다"
            description={isGuest
              ? '게스트 샘플 질문이 없습니다. 로그인하면 내 면접 질문을 만들 수 있습니다.'
              : '자주 받는 질문과 답변을 기록하고 복습 상태를 관리해보세요.'}
            action={!isGuest ? () => setOpen(true) : undefined}
            actionLabel="첫 질문 추가"
          />
        ) : (
          <>
          {unreviewed.length > 0 && (
            <>
              <Typography variant="body2" fontWeight={600} color="text.secondary" sx={{ mb: 1.5 }}>
                미복습 ({unreviewed.length})
              </Typography>
              <Stack spacing={1.5} sx={{ mb: 3 }}>
                {unreviewed.map((n) => (
                  <NoteCard
                    key={n.id}
                    note={n}
                    onToggle={handleToggleReview}
                    onDelete={handleDelete}
                    isGuest={isGuest}
                    togglePending={isPending('toggle', n.id)}
                    deletePending={isPending('remove', n.id)}
                  />
                ))}
              </Stack>
            </>
          )}
          {reviewed.length > 0 && (
            <>
              <Divider sx={{ my: 2 }} />
              <Typography variant="body2" fontWeight={600} color="text.secondary" sx={{ mb: 1.5 }}>
                복습 완료 ({reviewed.length})
              </Typography>
              <Stack spacing={1.5}>
                {reviewed.map((n) => (
                  <NoteCard
                    key={n.id}
                    note={n}
                    onToggle={handleToggleReview}
                    onDelete={handleDelete}
                    isGuest={isGuest}
                    togglePending={isPending('toggle', n.id)}
                    deletePending={isPending('remove', n.id)}
                  />
                ))}
              </Stack>
            </>
          )}
          </>
        )
      )}

      <Dialog open={open} onClose={() => { if (!adding) setOpen(false); }} fullWidth maxWidth="sm">
        <DialogTitle>면접 질문 추가</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              label="면접 질문 *"
              fullWidth
              value={form.question}
              onChange={handleChange('question')}
              disabled={adding}
              placeholder="예: 자기소개를 해주세요."
              multiline
              rows={2}
            />
            <TextField
              label="예상 답변"
              fullWidth
              value={form.answer}
              onChange={handleChange('answer')}
              disabled={adding}
              multiline
              rows={4}
              placeholder="답변을 미리 작성해보세요."
            />
            <TextField
              label="관련 프로젝트"
              fullWidth
              value={form.related_project}
              onChange={handleChange('related_project')}
              disabled={adding}
              placeholder="예: JobFlow Dashboard"
            />
            <FormControl fullWidth>
              <InputLabel id="interview-importance-label">중요도</InputLabel>
              <Select
                labelId="interview-importance-label"
                value={form.importance}
                label="중요도"
                onChange={handleChange('importance')}
                disabled={adding}
              >
                {IMPORTANCE_OPTIONS.map((o) => <MenuItem key={o.value} value={o.value}>{o.label}</MenuItem>)}
              </Select>
            </FormControl>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={() => setOpen(false)} disabled={adding}>취소</Button>
          <Button variant="contained" onClick={handleSubmit} disabled={adding || !form.question.trim()}>
            {adding ? '저장 중...' : '저장'}
          </Button>
        </DialogActions>
      </Dialog>
      <ActionFeedback feedback={feedback} onClose={() => setFeedback(null)} />
    </Box>
  );
};

export default InterviewPage;
