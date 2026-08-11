import { useMemo, useState } from 'react';
import {
  Box, Card, CardContent, Typography, Stack, Chip, Select,
  MenuItem, FormControl, Skeleton, Alert, Button, Link,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import useApplications from '../hooks/useApplications';
import { useAuth } from '../context/AuthContext';
import { APPLICATION_STATUSES, PRIORITY_OPTIONS } from '../constants';
import ActionFeedback from '../components/ui/ActionFeedback';
import GuestReadOnlyNotice from '../components/ui/GuestReadOnlyNotice';

const KANBAN_STATUSES = APPLICATION_STATUSES.map((status) => status.value);

const PRIORITY_COLOR = {
  ...Object.fromEntries(PRIORITY_OPTIONS.map((option) => [option.value, option.color])),
};

const KanbanCard = ({ app, onStatusChange, isGuest, pending }) => {
  return (
    <Card>
      <CardContent sx={{ pb: '12px !important', pt: 1.5, px: 1.5 }}>
        {/* 회사명 */}
        <Link
          component={RouterLink}
          to={`/applications/${app.id}`}
          underline="hover"
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            minHeight: 44,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            mb: 0.5,
          }}
          aria-label={`${app.company_name} 지원 상세 보기`}
        >
          {app.company_name}
        </Link>

        {/* 직무 */}
        {app.position && (
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', mb: 0.5 }}
          >
            {app.position}
          </Typography>
        )}

        {/* 지원일 */}
        {app.applied_date && (
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ display: 'block', mb: 1 }}
          >
            📅 {app.applied_date}
          </Typography>
        )}

        {/* 우선순위 + 상태변경 */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 0.5 }}>
          {app.priority ? (
            <Chip
              label={app.priority}
              size="small"
              variant="outlined"
              sx={{
                fontSize: '0.75rem',
                height: 22,
                color: PRIORITY_COLOR[app.priority] ?? '#475569',
                borderColor: PRIORITY_COLOR[app.priority] ?? '#475569',
                '& .MuiChip-label': { px: 0.8 },
              }}
            />
          ) : <Box />}

          {!isGuest && (
            <FormControl size="small">
              <Select
                value={app.status}
                onChange={(e) => onStatusChange(app.id, e.target.value)}
                disabled={pending}
                inputProps={{ 'aria-label': `${app.company_name} 지원 상태 변경` }}
                variant="standard"
                disableUnderline
                sx={{ fontSize: '0.75rem', color: 'text.secondary', minWidth: 60 }}
              >
                {APPLICATION_STATUSES.map((s) => (
                  <MenuItem key={s.value} value={s.value} sx={{ fontSize: '0.8rem' }}>{s.label}</MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

const KanbanPage = () => {
  const { applications, loading, error, refresh, update } = useApplications();
  const { isGuest } = useAuth();
  const [feedback, setFeedback] = useState(null);
  const [pendingIds, setPendingIds] = useState(() => new Set());

  const columns = useMemo(() => {
    const map = {};
    KANBAN_STATUSES.forEach((s) => { map[s] = []; });
    applications.forEach((a) => {
      if (map[a.status]) map[a.status].push(a);
    });
    return map;
  }, [applications]);

  const handleStatusChange = async (id, status) => {
    if (pendingIds.has(id)) return;
    setPendingIds((prev) => new Set(prev).add(id));
    try {
      await update(id, { status });
      setFeedback({ severity: 'success', message: `지원 상태를 "${status}"(으)로 변경했습니다.` });
    } catch (updateError) {
      setFeedback({
        severity: 'error',
        message: updateError.message || '지원 상태를 변경하지 못했습니다.',
      });
    } finally {
      setPendingIds((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }
  };

  return (
    <Box>
      <Typography component="h1" variant="h5" fontWeight={700} sx={{ mb: 3 }}>전형 보드</Typography>
      {isGuest && (
        <GuestReadOnlyNotice description="샘플 전형 보드는 조회만 할 수 있습니다. 로그인하면 각 카드의 상태를 변경하고 저장할 수 있습니다." />
      )}
      {error && (
        <Alert
          severity="error"
          sx={{ mb: 2 }}
          action={<Button color="inherit" size="small" onClick={refresh}>다시 시도</Button>}
        >
          전형 보드를 불러오지 못했습니다. {error}
        </Alert>
      )}

      {!error && (
        <>
          {/* 안내 문구 */}
          <Typography variant="caption" color="text.secondary" sx={{ mb: 2, display: 'block' }}>
            좌우로 스크롤하면 전체 컬럼을 볼 수 있습니다.
          </Typography>

          <Box
            sx={{
              display: 'flex',
              gap: 1.5,
              overflowX: 'auto',
              pb: 2,
              minHeight: 500,
              /* 스크롤바 스타일 */
              '&::-webkit-scrollbar': { height: 6 },
              '&::-webkit-scrollbar-track': { bgcolor: 'background.default' },
              '&::-webkit-scrollbar-thumb': { bgcolor: 'divider', borderRadius: 3 },
            }}
          >
            {KANBAN_STATUSES.map((status) => {
              const found = APPLICATION_STATUSES.find((s) => s.value === status);
              const items = columns[status] ?? [];
              return (
                <Box
                  key={status}
                  sx={{
                    minWidth: 195,
                    flex: '0 0 195px',
                    bgcolor: found?.bg ?? 'background.default',
                    borderRadius: 2,
                    border: '1px solid',
                    borderColor: `${found?.color ?? '#ccc'}30`,
                    p: 1.5,
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
              {/* 컬럼 헤더 */}
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
                <Typography
                  component="h2"
                  variant="h6"
                  fontWeight={700}
                  sx={{ color: found?.color ?? 'text.secondary', letterSpacing: 0.3 }}
                >
                  {status}
                </Typography>
                <Chip
                  label={items.length}
                  size="small"
                  sx={{
                    height: 20,
                    minWidth: 24,
                    fontSize: '0.68rem',
                    fontWeight: 700,
                    bgcolor: `${found?.color ?? '#ccc'}15`,
                    color: found?.color ?? 'text.secondary',
                    '& .MuiChip-label': { px: 0.8 },
                  }}
                />
              </Box>

              {/* 카드 목록 */}
              {loading ? (
                <Stack spacing={1}>
                  {[...Array(2)].map((_, i) => <Skeleton key={i} height={90} variant="rounded" />)}
                </Stack>
              ) : (
                <Stack spacing={1} sx={{ flex: 1 }}>
                  {items.map((app) => (
                    <KanbanCard
                      key={app.id}
                      app={app}
                      onStatusChange={handleStatusChange}
                      isGuest={isGuest}
                      pending={pendingIds.has(app.id)}
                    />
                  ))}
                  {items.length === 0 && (
                    <Box
                      sx={{
                        flex: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minHeight: 80,
                        border: '1px dashed',
                        borderColor: `${found?.color ?? '#ccc'}40`,
                        borderRadius: 1.5,
                      }}
                    >
                      <Typography variant="caption" color="text.disabled">비어있음</Typography>
                    </Box>
                  )}
                </Stack>
              )}
                </Box>
              );
            })}
          </Box>
        </>
      )}
      <ActionFeedback feedback={feedback} onClose={() => setFeedback(null)} />
    </Box>
  );
};

export default KanbanPage;
