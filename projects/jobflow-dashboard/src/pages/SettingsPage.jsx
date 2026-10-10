import Field from '../components/ui/Field';
import { useState, useEffect } from 'react';
import { Box, Card, CardContent, Typography, Button, Alert, Avatar, Stack, Skeleton } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import { PageHeading } from '../components/ui/PageUI';
import PaperGraphic from '../components/ui/PaperGraphic';
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
    return <Box className="settings-page">
      <PageHeading art="settings" title="설정" description="기록장과 계정을 관리해요." />
      <div className="settings-grid">
        <section className="panel settings-card" aria-labelledby="sample-settings-title">
          <div className="settings-summary">
            <PaperGraphic kind="folder" className="settings-mark" />
            <div>
              <span className="settings-status">샘플 체험 중</span>
              <h2 id="sample-settings-title">샘플 기록장</h2>
              <p>가상 회사와 질문으로 기능을 체험하고 있어요.</p>
            </div>
          </div>
          <div className="settings-control">
            <div className="settings-control-copy">
              <h3>처음 상태로 돌아가기</h3>
              <p>수정한 샘플을 되돌려요. 새로고침해도 초기화돼요.</p>
            </div>
            <Button className="settings-control-action" variant="outlined" onClick={() => {
              resetDemo();
              setSaved(true);
            }}>샘플 초기화</Button>
          </div>
        </section>
        <section className="panel settings-card settings-account" aria-labelledby="start-record-title">
          <div className="settings-control-copy">
            <h2 id="start-record-title">나만의 기록장</h2>
            <p>로그인하고 내 지원 기록을 저장하세요.</p>
            <p className="settings-note">체험 중 수정한 샘플은 옮겨지지 않아요.</p>
          </div>
          <Button variant="contained" onClick={handleLogout}>내 기록 시작하기</Button>
        </section>
      </div>
      {saved && <Alert severity="success" sx={{ mt: 2 }}>샘플 기록을 초기화했어요.</Alert>}
      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
    </Box>;
  }
  return <Box className="settings-page">
    <PageHeading art="settings" title="설정" description="기록장과 계정을 관리해요." />
    {profileLoading ? <Card className="settings-card" aria-busy="true">
      <CardContent>
        <Typography component="h2" variant="h6" sx={{ mb: 2 }}>프로필 불러오는 중</Typography>
        <Stack spacing={2} aria-label="프로필 불러오는 중">
          <Skeleton variant="rounded" height={56} />
          <Skeleton variant="rounded" height={56} />
          <Skeleton variant="rounded" height={44} width={96} />
        </Stack>
      </CardContent>
    </Card> : <div className="settings-grid">
      <Card className="settings-card">
        <CardContent>
          <div className="settings-profile-heading">
            <Avatar sx={{ width: 48, height: 48, bgcolor: 'primary.main', fontSize: 22 }}>
              {(displayName || user?.email || '?')[0].toUpperCase()}
            </Avatar>
            <div>
              <Typography component="h2" variant="h6" fontWeight={550}>{displayName || '이름 미설정'}</Typography>
              <Typography variant="body2" color="text.secondary">{user?.email}</Typography>
            </div>
          </div>
          {saved && <Alert severity="success" sx={{ mb: 2 }}>프로필을 저장했어요.</Alert>}
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          <Stack spacing={2}>
            <Field label="이름" fullWidth value={displayName} onChange={e => setDisplayName(e.target.value)} disabled={saving} placeholder="홍길동" />
            <Field label="목표 직무" fullWidth value={targetRole} onChange={e => setTargetRole(e.target.value)} disabled={saving} placeholder="예: UX/UI 디자이너" />
            <Field label="이메일" fullWidth value={user?.email ?? ''} disabled helperText="이메일은 변경할 수 없습니다" />
            <Button variant="contained" onClick={handleSave} disabled={saving} sx={{ alignSelf: 'flex-start' }}>
              {saving ? '저장 중…' : '프로필 저장'}
            </Button>
          </Stack>
        </CardContent>
      </Card>
      <section className="panel settings-card settings-account" aria-labelledby="account-settings-title">
        <div className="settings-control-copy">
          <h2 id="account-settings-title">계정 관리</h2>
          <p>저장한 기록은 다시 로그인하면 볼 수 있어요.</p>
        </div>
        <Button variant="outlined" color="error" startIcon={<LogoutIcon />} onClick={handleLogout}>로그아웃</Button>
      </section>
    </div>}
  </Box>;
};
export default SettingsPage;
