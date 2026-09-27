import Field from '../components/ui/Field';
import { useState, useEffect } from 'react';
import { Box, Card, CardContent, Typography, Button, Alert, Avatar, Stack, Skeleton } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import { PageHeading } from '../components/ui/PageUI';
import { JournalArt } from '../components/ui/JournalArt';
import { getAuthErrorMessage } from '../utils/authErrors';
const SettingsPage = () => {
  const {
    user,
    isGuest,
    signOut,
    resetDemo
  } = useAuth();
  const navigate = useNavigate();
  const [displayName, setDisplayName] = useState('');
  const [targetRole, setTargetRole] = useState('');
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const [profileLoading, setProfileLoading] = useState(true);
  useEffect(() => {
    if (!user || isGuest) return undefined;
    let cancelled = false;
    const loadProfile = async () => {
      setProfileLoading(true);
      try {
        const {
          data,
          error: loadError
        } = await supabase.from('jobflow_profiles').select('display_name, target_role').eq('id', user.id).maybeSingle();
        if (cancelled) return;
        if (loadError) {
          setError('프로필 정보를 불러오지 못했습니다. 잠시 후 다시 시도해주세요.');
          return;
        }
        setDisplayName(data ? data.display_name ?? '' : user.user_metadata?.display_name ?? '');
        setTargetRole(data?.target_role ?? '');
      } catch {
        if (!cancelled) {
          setError('프로필 정보를 불러오지 못했습니다. 잠시 후 다시 시도해주세요.');
        }
      } finally {
        if (!cancelled) setProfileLoading(false);
      }
    };
    loadProfile();
    return () => {
      cancelled = true;
    };
  }, [user, isGuest]);
  const handleSave = async () => {
    if (!user || isGuest || saving) return;
    setError('');
    setSaved(false);
    setSaving(true);
    try {
      const {
        data,
        error: saveError
      } = await supabase.from('jobflow_profiles').upsert({
        id: user.id,
        email: user.email,
        display_name: displayName,
        target_role: targetRole,
        updated_at: new Date().toISOString()
      }).select('id').maybeSingle();
      if (saveError) throw saveError;
      if (!data) throw new Error('저장할 프로필을 찾지 못했거나 권한이 없습니다.');
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (saveError) {
      setError(saveError?.message === '저장할 프로필을 찾지 못했거나 권한이 없습니다.' ? saveError.message : '설정을 저장하지 못했습니다. 잠시 후 다시 시도해주세요.');
    } finally {
      setSaving(false);
    }
  };
  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (logoutError) {
      setError(getAuthErrorMessage(logoutError, '로그아웃하지 못했습니다. 다시 시도해주세요.'));
    }
  };
  if (isGuest) {
    return <Box>
  <PageHeading title="설정" description="나의 기록장을 관리하세요." />
  <Card sx={{
        maxWidth: 720
      }}>
    <CardContent sx={{
          textAlign: 'center',
          py: 6
        }}>
      <JournalArt className="settings-scene" />
      <Typography component="h2" variant="h6" fontWeight={700}>샘플 기록장</Typography>
      <Typography variant="body2" color="text.secondary" sx={{
            mt: 1,
            mb: 3
          }}>
              가상 데이터로 기능을 체험하고 있어요. 변경 내용은 새로고침하면 초기화돼요.
            </Typography>
      <Button variant="outlined" onClick={() => {
            resetDemo();
            setSaved(true);
          }} sx={{
            mr: 1
          }}>샘플 초기화</Button>
      <Button variant="contained" onClick={handleLogout}>
              내 기록 시작하기
            </Button>
    </CardContent>
  </Card>
  {saved && <Alert severity="success" sx={{
        mt: 2,
        maxWidth: 720
      }}>샘플 기록을 초기화했어요.</Alert>}
  {error && <Alert severity="error" sx={{
        mt: 2
      }}>
    {error}
  </Alert>}
</Box>;
  }
  return <Box>
  <PageHeading title="설정" description="나의 기록장을 관리하세요." />
  {profileLoading ? <Card aria-busy="true">
    <CardContent>
      <Typography component="h2" variant="h6" sx={{
          mb: 2
        }}>프로필 불러오는 중</Typography>
      <Stack spacing={2} aria-label="프로필 불러오는 중">
        <Skeleton variant="rounded" height={56} />
        <Skeleton variant="rounded" height={56} />
        <Skeleton variant="rounded" height={44} width={96} />
      </Stack>
    </CardContent>
  </Card> : <>
    <Card sx={{
        mb: 3,
        maxWidth: 720
      }}>
      <CardContent>
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            mb: 3
          }}>
          <Avatar sx={{
              width: 56,
              height: 56,
              bgcolor: 'primary.main',
              fontSize: 24
            }}>
            {(displayName || user?.email || '?')[0].toUpperCase()}
          </Avatar>
          <Box>
            <Typography component="h2" variant="h6" fontWeight={700}>
              {displayName || '이름 미설정'}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {user?.email}
            </Typography>
          </Box>
        </Box>
        {saved && <Alert severity="success" sx={{
            mb: 2
          }}>저장되었습니다!</Alert>}
        {error && <Alert severity="error" sx={{
            mb: 2
          }}>
          {error}
        </Alert>}
        <Stack spacing={2}>
          <Field label="이름" fullWidth value={displayName} onChange={e => setDisplayName(e.target.value)} disabled={saving} placeholder="홍길동" />
          <Field label="목표 직무" fullWidth value={targetRole} onChange={e => setTargetRole(e.target.value)} disabled={saving} placeholder="예: UX/UI 디자이너" />
          <Field label="이메일" fullWidth value={user?.email ?? ''} disabled helperText="이메일은 변경할 수 없습니다" />
          <Button variant="contained" onClick={handleSave} disabled={saving} sx={{
              alignSelf: 'flex-start'
            }}>
            {saving ? '저장 중...' : '저장'}
          </Button>
        </Stack>
      </CardContent>
    </Card>
    <Card>
      <CardContent>
        <Typography component="h2" variant="h6" fontWeight={600} sx={{
            mb: 2
          }}>계정 관리</Typography>
        <Button variant="outlined" color="error" startIcon={<LogoutIcon />} onClick={handleLogout}>
            로그아웃
          </Button>
      </CardContent>
    </Card>
  </>}
</Box>;
};
export default SettingsPage;
