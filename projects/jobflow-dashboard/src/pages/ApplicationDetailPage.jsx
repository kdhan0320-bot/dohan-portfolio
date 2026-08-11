import { useState } from 'react';
import {
  Box, Card, CardContent, Typography, Button, Chip, Grid,
  Divider, Alert, Stack, Skeleton,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { useNavigate, useParams } from 'react-router-dom';
import useApplications from '../hooks/useApplications';
import { useAuth } from '../context/AuthContext';
import StatusChip from '../components/ui/StatusChip';
import ActionFeedback from '../components/ui/ActionFeedback';

const Field = ({ label, value, fullWidth }) => (
  <Grid size={{ xs: 12, sm: fullWidth ? 12 : 6 }}>
    <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }}>
      {label}
    </Typography>
    <Typography variant="body2" sx={{ mt: 0.5, wordBreak: 'keep-all', overflowWrap: 'anywhere' }}>
      {value || '—'}
    </Typography>
  </Grid>
);

const ApplicationDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { isGuest } = useAuth();
  const { applications, loading, error, refresh, remove } = useApplications();
  const [feedback, setFeedback] = useState(null);

  const app = applications.find((a) => a.id === id);

  if (loading) {
    return (
      <Box>
        <Typography component="h1" variant="h5" fontWeight={700} sx={{ mb: 3 }}>지원 상세</Typography>
        <Skeleton variant="rounded" height={320} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box>
        <Typography component="h1" variant="h5" fontWeight={700} sx={{ mb: 3 }}>지원 상세</Typography>
        <Alert
          severity="error"
          action={<Button color="inherit" size="small" onClick={refresh}>다시 시도</Button>}
        >
          지원 정보를 불러오지 못했습니다. {error}
        </Alert>
      </Box>
    );
  }

  if (!app) {
    return (
      <Box>
        <Typography component="h1" variant="h5" fontWeight={700} sx={{ mb: 3 }}>지원 상세</Typography>
        <Alert severity="warning">해당 지원 정보를 찾을 수 없습니다.</Alert>
        <Button startIcon={<ArrowBackIcon />} sx={{ mt: 2 }} onClick={() => navigate('/applications')}>
          목록으로
        </Button>
      </Box>
    );
  }

  const handleDelete = async () => {
    if (!window.confirm('정말 삭제하시겠습니까?')) return;
    try {
      await remove(id);
      navigate('/applications', {
        state: {
          feedback: { severity: 'success', message: '지원 정보를 삭제했습니다.' },
        },
      });
    } catch (deleteError) {
      setFeedback({
        severity: 'error',
        message: deleteError.message || '지원 정보를 삭제하지 못했습니다.',
      });
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
        <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/applications')} variant="text">
          목록으로
        </Button>
        {!isGuest && (
          <Stack direction="row" spacing={1}>
            <Button
              variant="outlined"
              startIcon={<EditIcon />}
              onClick={() => navigate(`/applications/${id}/edit`)}
            >
              수정
            </Button>
            <Button
              variant="outlined"
              color="error"
              startIcon={<DeleteIcon />}
              onClick={handleDelete}
            >
              삭제
            </Button>
          </Stack>
        )}
      </Box>

      <Card>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 3 }}>
            <Box>
              <Typography component="h1" variant="h5" fontWeight={700}>{app.company_name}</Typography>
              {app.position && <Typography variant="body1" color="text.secondary">{app.position}</Typography>}
            </Box>
            <StatusChip status={app.status} size="medium" />
          </Box>

          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Field label="지역" value={app.location} />
            <Field label="회사 규모" value={app.company_size} />
            <Field label="지원일" value={app.applied_date} />
            <Field label="마감일" value={app.deadline} />
            <Field label="우선순위" value={app.priority} />
            <Grid size={{ xs: 12, sm: 6 }}>
              <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                제출 현황
              </Typography>
              <Stack direction="row" spacing={1} sx={{ mt: 0.5 }}>
                <Chip
                  icon={app.resume_submitted ? <CheckCircleIcon /> : <CancelIcon />}
                  label="이력서"
                  size="small"
                  color={app.resume_submitted ? 'success' : 'default'}
                  variant="outlined"
                />
                <Chip
                  icon={app.portfolio_submitted ? <CheckCircleIcon /> : <CancelIcon />}
                  label="포트폴리오"
                  size="small"
                  color={app.portfolio_submitted ? 'success' : 'default'}
                  variant="outlined"
                />
              </Stack>
            </Grid>
          </Grid>

          {app.job_url && (
            <>
              <Divider sx={{ my: 2 }} />
              <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                공고 링크
              </Typography>
              <Box sx={{ mt: 0.5 }}>
                <Button
                  size="small"
                  endIcon={<OpenInNewIcon />}
                  href={app.job_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="text"
                  sx={{ p: 0 }}
                >
                  공고 보기
                </Button>
              </Box>
            </>
          )}

          {app.memo && (
            <>
              <Divider sx={{ my: 2 }} />
              <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                메모
              </Typography>
              <Typography variant="body2" sx={{ mt: 0.5, whiteSpace: 'pre-wrap', lineHeight: 1.8 }}>
                {app.memo}
              </Typography>
            </>
          )}
        </CardContent>
      </Card>
      <ActionFeedback feedback={feedback} onClose={() => setFeedback(null)} />
    </Box>
  );
};

export default ApplicationDetailPage;
