import { useMemo } from 'react';
import {
  Box, Grid, Card, CardContent, Typography, LinearProgress,
  Stack, Divider, Button, Skeleton, Alert, Link,
} from '@mui/material';
import WorkIcon from '@mui/icons-material/Work';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import EventIcon from '@mui/icons-material/Event';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import AddIcon from '@mui/icons-material/Add';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import useApplications from '../hooks/useApplications';
import useChecklist from '../hooks/useChecklist';
import { useAuth } from '../context/AuthContext';
import { APPLICATION_STATUSES } from '../constants';
import { calcProgress } from '../utils/statusHelpers';
import StatusChip from '../components/ui/StatusChip';
import GuestReadOnlyNotice from '../components/ui/GuestReadOnlyNotice';

const StatCard = ({ icon, title, value, subtitle, color = 'primary.main' }) => (
  <Card sx={{ height: '100%' }}>
    <CardContent>
      <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <Box>
          <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }}>
            {title}
          </Typography>
          <Typography component="p" variant="h4" fontWeight={700} color={color} sx={{ mt: 0.5 }}>
            {value}
          </Typography>
          {subtitle && (
            <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
              {subtitle}
            </Typography>
          )}
        </Box>
        <Box sx={{ p: 1, bgcolor: 'action.hover', borderRadius: 2 }}>
          {icon}
        </Box>
      </Box>
    </CardContent>
  </Card>
);

const DashboardPage = () => {
  const navigate = useNavigate();
  const { isGuest } = useAuth();
  const {
    applications,
    loading,
    error: applicationsError,
    refresh: refreshApplications,
  } = useApplications();
  const {
    items: checklistItems,
    loading: checklistLoading,
    error: checklistError,
    refresh: refreshChecklist,
  } = useChecklist();

  const stats = useMemo(() => {
    const total = applications.length;
    const active = applications.filter((a) =>
      ['서류 진행', '면접 예정', '지원 완료', '지원 예정'].includes(a.status)
    ).length;
    const interview = applications.filter((a) => a.status === '면접 예정').length;
    const closed = applications.filter((a) =>
      ['합격', '불합격', '보류'].includes(a.status)
    ).length;
    const { rate: checklistRate, done, total: checklistTotal } = calcProgress(checklistItems);
    return { total, active, interview, closed, checklistRate, done, checklistTotal };
  }, [applications, checklistItems]);

  const recentApps = applications.slice(0, 5);

  const statusSummary = useMemo(() => {
    const map = {};
    applications.forEach((a) => {
      map[a.status] = (map[a.status] || 0) + 1;
    });
    return APPLICATION_STATUSES
      .filter(({ value }) => map[value] > 0)
      .map(({ value }) => ({ status: value, count: map[value] }));
  }, [applications]);

  return (
    <Box>
      {isGuest && (
        <GuestReadOnlyNotice description="샘플 지원 현황과 할 일을 조회하고 화면 흐름을 체험할 수 있습니다. 변경과 저장은 로그인 후 사용할 수 있습니다." />
      )}
      {applicationsError && (
        <Alert
          severity="error"
          sx={{ mb: 2 }}
          action={<Button color="inherit" size="small" onClick={refreshApplications}>다시 시도</Button>}
        >
          지원 현황을 불러오지 못했습니다. {applicationsError}
        </Alert>
      )}
      {checklistError && (
        <Alert
          severity="error"
          sx={{ mb: 2 }}
          action={<Button color="inherit" size="small" onClick={refreshChecklist}>다시 시도</Button>}
        >
          체크리스트를 불러오지 못했습니다. {checklistError}
        </Alert>
      )}

      {/* 페이지 소개 */}
      <Box sx={{ mb: 3 }}>
        <Typography component="h1" variant="h5" fontWeight={700} color="text.primary">
          지원 현황과 다음 행동을 확인하세요
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          지원 회사·전형 상태·체크리스트·면접 메모를 함께 정리합니다.
        </Typography>
      </Box>

      {/* 요약 카드 4개 */}
      {!applicationsError && (
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid size={{ xs: 6, md: 3 }}>
            <StatCard
              icon={<WorkIcon sx={{ color: 'primary.main' }} />}
              title="총 지원"
              value={loading ? '-' : stats.total}
              subtitle="개 회사"
            />
          </Grid>
          <Grid size={{ xs: 6, md: 3 }}>
            <StatCard
              icon={<TrendingUpIcon sx={{ color: 'primary.main' }} />}
              title="준비·진행"
              value={loading ? '-' : stats.active}
              color="primary.main"
              subtitle="지원 예정·전형 진행"
            />
          </Grid>
          <Grid size={{ xs: 6, md: 3 }}>
            <StatCard
              icon={<EventIcon sx={{ color: 'warning.main' }} />}
              title="면접 예정"
              value={loading ? '-' : stats.interview}
              color="warning.main"
              subtitle="건"
            />
          </Grid>
          <Grid size={{ xs: 6, md: 3 }}>
            <StatCard
              icon={<DoneAllIcon sx={{ color: 'secondary.main' }} />}
              title="종료·보류"
              value={loading ? '-' : stats.closed}
              color="secondary.main"
              subtitle="합격·불합격·보류"
            />
          </Grid>
        </Grid>
      )}

      {/* 하단 섹션 */}
      <Grid container spacing={2}>
        {!applicationsError && (
          <Grid size={{ xs: 12, md: 7 }}>
            <Card sx={{ mb: 2 }}>
              <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Typography component="h2" variant="h6" fontWeight={700}>최근 지원 현황</Typography>
                <Button size="small" onClick={() => navigate('/applications')}>전체 보기</Button>
              </Box>
              {loading ? (
                [...Array(3)].map((_, i) => <Skeleton key={i} height={48} sx={{ mb: 1 }} />)
              ) : recentApps.length === 0 ? (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <Typography variant="body2" color="text.secondary">지원 내역이 없습니다</Typography>
                  <Button variant="contained" startIcon={<AddIcon />} sx={{ mt: 2 }} onClick={() => navigate('/applications/new')}>
                    첫 지원 등록
                  </Button>
                </Box>
              ) : (
                <Stack divider={<Divider />}>
                  {recentApps.map((app) => (
                    <Box
                      key={app.id}
                      sx={{
                        py: 1.5, px: 1,
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        borderRadius: 1,
                      }}
                    >
                      <Box
                        sx={{
                          minWidth: 0,
                          mr: 1,
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'flex-start',
                        }}
                      >
                        <Link
                          component={RouterLink}
                          to={`/applications/${app.id}`}
                          underline="hover"
                          fontWeight={700}
                          sx={{ display: 'inline-flex', alignItems: 'center', minHeight: 44 }}
                        >
                          {app.company_name}
                        </Link>
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          noWrap
                          sx={{ display: 'block', maxWidth: '100%' }}
                        >
                          {app.position}
                        </Typography>
                      </Box>
                      <StatusChip status={app.status} />
                    </Box>
                  ))}
                </Stack>
              )}
              </CardContent>
            </Card>
          </Grid>
        )}

        {(!applicationsError || !checklistError) && (
          <Grid size={{ xs: 12, md: applicationsError ? 12 : 5 }}>
            {!applicationsError && (
              <Card sx={{ mb: 2 }}>
                <CardContent>
              <Typography component="h2" variant="h6" fontWeight={700} sx={{ mb: 2 }}>상태별 현황</Typography>
              {statusSummary.length === 0 ? (
                <Typography variant="body2" color="text.secondary">데이터 없음</Typography>
              ) : (
                statusSummary.map(({ status, count }) => {
                  const found = APPLICATION_STATUSES.find((s) => s.value === status);
                  const pct = stats.total > 0 ? Math.round((count / stats.total) * 100) : 0;
                  return (
                    <Box key={status} sx={{ mb: 1.5 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                        <Typography variant="caption" fontWeight={600} color="text.primary">{status}</Typography>
                        <Typography variant="caption" color="text.secondary">{count}건 ({pct}%)</Typography>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={pct}
                        aria-label={`${status} 비율`}
                        aria-valuetext={`${count}건, ${pct}%`}
                        sx={{
                          height: 6, borderRadius: 1,
                          bgcolor: `${found?.color ?? '#ccc'}20`,
                          '& .MuiLinearProgress-bar': { bgcolor: found?.color ?? 'primary.main', borderRadius: 1 },
                        }}
                      />
                    </Box>
                  );
                })
              )}
                </CardContent>
              </Card>
            )}

            {!checklistError && (
              <Card>
                <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
                <Typography component="h2" variant="h6" fontWeight={700}>준비할 일</Typography>
                <Button size="small" onClick={() => navigate('/checklist')}>전체 보기</Button>
              </Box>
              {checklistLoading ? (
                <Stack spacing={1} aria-label="체크리스트 불러오는 중">
                  <Skeleton variant="rounded" height={8} />
                  <Skeleton width="45%" />
                  <Skeleton width="80%" />
                  <Skeleton width="70%" />
                </Stack>
              ) : (
                <>
                  <LinearProgress
                    variant="determinate"
                    value={stats.checklistRate}
                    aria-label="체크리스트 진행률"
                    aria-valuetext={`${stats.done}/${stats.checklistTotal} 항목 완료, ${stats.checklistRate}%`}
                    sx={{ height: 6, borderRadius: 2, mb: 1.5, bgcolor: '#E2E8F0', '& .MuiLinearProgress-bar': { bgcolor: '#2563EB' } }}
                  />
                  <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1.5 }}>
                    {stats.done}/{stats.checklistTotal} 항목 완료 ({stats.checklistRate}%)
                  </Typography>
                  <Stack spacing={0.5}>
                    {checklistItems.slice(0, 5).map((item) => (
                      <Box key={item.id} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {item.is_done ? (
                          <CheckBoxIcon titleAccess="완료" sx={{ fontSize: 18, color: '#1D4ED8' }} />
                        ) : (
                          <CheckBoxOutlineBlankIcon titleAccess="미완료" sx={{ fontSize: 18, color: '#64748B' }} />
                        )}
                        <Typography
                          variant="caption"
                          sx={{
                            textDecoration: item.is_done ? 'line-through' : 'none',
                            color: item.is_done ? 'text.secondary' : 'text.primary',
                            lineHeight: 1.4,
                          }}
                        >
                          {item.title}
                        </Typography>
                      </Box>
                    ))}
                  </Stack>
                </>
              )}
                </CardContent>
              </Card>
            )}
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default DashboardPage;
