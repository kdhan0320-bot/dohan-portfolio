import { useState, useEffect } from 'react';
import {
  Box, Card, CardContent, Typography, TextField, Button,
  Alert, Avatar, Stack, Skeleton,
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import { getAuthErrorMessage } from '../utils/authErrors';

const SettingsPage = () => {
  const { user, isGuest, signOut } = useAuth();
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
        const { data, error: loadError } = await supabase
          .from('jobflow_profiles')
          .select('display_name, target_role')
          .eq('id', user.id)
          .maybeSingle();

        if (cancelled) return;

        if (loadError) {
          setError('프로필 정보를 불러오지 못했습니다. 잠시 후 다시 시도해주세요.');
          return;
        }

        setDisplayName(data
          ? (data.display_name ?? '')
          : (user.user_metadata?.display_name ?? ''));
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
      const { data, error: saveError } = await supabase
        .from('jobflow_profiles')
        .upsert({
          id: user.id,
          email: user.email,
          display_name: displayName,
          target_role: targetRole,
          updated_at: new Date().toISOString(),
        })
        .select('id')
        .maybeSingle();
      if (saveError) throw saveError;
      if (!data) throw new Error('저장할 프로필을 찾지 못했거나 권한이 없습니다.');

      setSaved(true);

      setTimeout(() => setSaved(false), 2000);
    } catch (saveError) {
      setError(saveError?.message === '저장할 프로필을 찾지 못했거나 권한이 없습니다.'
        ? saveError.message
        : '설정을 저장하지 못했습니다. 잠시 후 다시 시도해주세요.');
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
    return (
      <Box>
        <Typography component="h1" variant="h5" fontWeight={700} sx={{ mb: 3 }}>설정</Typography>
        <Card>
          <CardContent sx={{ textAlign: 'center', py: 6 }}>
            <Avatar sx={{ width: 64, height: 64, bgcolor: 'warning.main', mx: 'auto', mb: 2, fontSize: 28 }}>G</Avatar>
            <Typography component="h2" variant="h6" fontWeight={700}>게스트 모드</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1, mb: 3 }}>
              게스트 모드에서는 개인 설정을 저장하지 않습니다. 로그인하면 이름과 목표 직무를 저장할 수 있습니다.
            </Typography>
            <Button variant="contained" onClick={handleLogout}>
              로그인 / 회원가입하기
            </Button>
          </CardContent>
        </Card>
      </Box>
    );
  }

  return (
    <Box>
      <Typography component="h1" variant="h5" fontWeight={700} sx={{ mb: 3 }}>설정</Typography>

      {profileLoading ? (
        <Card aria-busy="true">
          <CardContent>
            <Typography component="h2" variant="h6" sx={{ mb: 2 }}>프로필 불러오는 중</Typography>
            <Stack spacing={2} aria-label="프로필 불러오는 중">
              <Skeleton variant="rounded" height={56} />
              <Skeleton variant="rounded" height={56} />
              <Skeleton variant="rounded" height={44} width={96} />
            </Stack>
          </CardContent>
        </Card>
      ) : (
        <>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
            <Avatar sx={{ width: 56, height: 56, bgcolor: 'primary.main', fontSize: 24 }}>
              {(displayName || user?.email || '?')[0].toUpperCase()}
            </Avatar>
            <Box>
              <Typography component="h2" variant="h6" fontWeight={700}>{displayName || '이름 미설정'}</Typography>
              <Typography variant="body2" color="text.secondary">{user?.email}</Typography>
            </Box>
          </Box>

          {saved && <Alert severity="success" sx={{ mb: 2 }}>저장되었습니다!</Alert>}
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

          <Stack spacing={2}>
            <TextField
              label="이름"
              fullWidth
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              disabled={saving}
              placeholder="홍길동"
            />
            <TextField
              label="목표 직무"
              fullWidth
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value)}
              disabled={saving}
              placeholder="예: UX/UI 디자이너"
            />
            <TextField
              label="이메일"
              fullWidth
              value={user?.email ?? ''}
              disabled
              helperText="이메일은 변경할 수 없습니다"
            />
            <Button variant="contained" onClick={handleSave} disabled={saving} sx={{ alignSelf: 'flex-start' }}>
              {saving ? '저장 중...' : '저장'}
            </Button>
          </Stack>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography component="h2" variant="h6" fontWeight={600} sx={{ mb: 2 }}>계정 관리</Typography>
          <Button
            variant="outlined"
            color="error"
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
          >
            로그아웃
          </Button>
        </CardContent>
      </Card>
        </>
      )}
    </Box>
  );
};

export default SettingsPage;
