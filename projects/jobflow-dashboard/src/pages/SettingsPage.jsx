import Field from '../components/ui/Field';
import { useState, useEffect, useRef, useSyncExternalStore } from 'react';
import { Box, Card, CardContent, Typography, Button, Alert, Avatar, Stack, Skeleton } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import DownloadOutlined from '@mui/icons-material/DownloadOutlined';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import { PageHeading } from '../components/ui/PageUI';
import { getAuthErrorMessage } from '../utils/authErrors';
import { createRecordExport, loadRecordExport, downloadRecordExport } from '../utils/recordExport';
import { getSafeDataErrorMessage } from '../utils/dataErrors';
import { applicationDraftStore } from '../utils/applicationDraftStore';
import { recordDraftStore, recordDraftValues } from '../utils/recordDraftStore';
const SettingsPage = () => {
  const {
    user,
    isGuest,
    signOut,
    resetDemo,
    demoApplications,
    demoItems,
    demoNotes
  } = useAuth();
  const navigate = useNavigate();
  const userId = user?.id;
  const profileScope = userId && !isGuest ? `user:${userId}` : null;
  const profileAccountRef = useRef(user);
  const profileBaseline = useRef(null);
  const profileForm = useRef({ display_name: '', target_role: '' });
  const profileMounted = useRef(true);
  useEffect(() => {
    profileMounted.current = true;
    return () => { profileMounted.current = false; };
  }, []);
  useSyncExternalStore(recordDraftStore.subscribe, recordDraftStore.getRevision);
  useEffect(() => { profileAccountRef.current = user; }, [user]);
  const [displayName, setDisplayName] = useState('');
  const [targetRole, setTargetRole] = useState('');
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const [restoringProfile, setRestoringProfile] = useState(false);
  const [profileLoading, setProfileLoading] = useState(true);
  const [loadedProfileId, setLoadedProfileId] = useState(null);
  const [profileLoadError, setProfileLoadError] = useState('');
  const [profileAttempt, setProfileAttempt] = useState(0);
  const [exporting, setExporting] = useState(false);
  const [exportError, setExportError] = useState('');
  const [exported, setExported] = useState(false);
  const profileReady = Boolean(user?.id && !isGuest && !profileLoading && loadedProfileId === user.id);
  const profileBusy = saving || restoringProfile;
  const hasProfileDraft = profileReady && Boolean(recordDraftStore.read(profileScope, 'profile', 'profile'));
  const changeProfile = (field, value) => {
    if (!profileReady || profileBusy) return;
    const next = { ...profileForm.current, [field]: value };
    profileForm.current = next;
    // A previous visit's save can finish after this baseline was read.
    // Keep explicit input until a save or an explicit restore confirms it.
    recordDraftStore.write(profileScope, 'profile', 'profile', next, profileBaseline.current, { preserveWhenUnchanged: true });
    setDisplayName(next.display_name); setTargetRole(next.target_role);
    setSaved(false); setError('');
  };
  const discardProfileDraft = async () => {
    if (!profileReady || profileBusy) return;
    const restoringUserId = userId;
    const expectedValues = { ...profileForm.current };
    setRestoringProfile(true);
    setSaved(false); setError('');
    try {
      // A save from a previous visit may have finished after this page loaded.
      // Re-read before discarding so the restore target is actually saved data.
      const { data, error: readError } = await supabase.from('jobflow_profiles').select('display_name, target_role').eq('id', restoringUserId).maybeSingle();
      if (readError) throw readError;
      if (!profileMounted.current || profileAccountRef.current?.id !== restoringUserId) return;
      const values = recordDraftValues('profile', {
        display_name: data ? data.display_name ?? '' : profileAccountRef.current?.user_metadata?.display_name ?? '',
        target_role: data?.target_role ?? '',
      });
      if (!recordDraftStore.clear(profileScope, 'profile', 'profile', expectedValues)) return;
      profileBaseline.current = values;
      profileForm.current = values;
      setDisplayName(values.display_name); setTargetRole(values.target_role);
    } catch {
      if (profileMounted.current && profileAccountRef.current?.id === restoringUserId) setError('저장된 프로필을 불러오지 못했어요. 작성 중인 입력은 유지했어요.');
    } finally {
      if (profileMounted.current) setRestoringProfile(false);
    }
  };
  const handleExport = async () => {
    if (exporting) return;
    setExporting(true); setExportError(''); setExported(false);
    try {
      const records = isGuest
        ? createRecordExport({ applications: demoApplications, checklist: demoItems, interviews: demoNotes, sample: true })
        : await loadRecordExport(supabase, user?.id);
      downloadRecordExport(records);
      setExported(true);
    } catch (exportFailure) {
      setExportError(getSafeDataErrorMessage(exportFailure));
    } finally { setExporting(false); }
  };
  const exportControl = <div className="settings-export">
    <h3>{isGuest ? '샘플 기록 내려받기' : '내 기록 내려받기'}</h3>
    <p>회사·준비 체크·면접 질문을 JSON 파일로 보관해요.{isGuest ? ' 가상 샘플임을 파일에 표시합니다.' : ' 저장된 프로필도 함께 포함됩니다.'}</p>
    <Button variant="outlined" startIcon={<DownloadOutlined />} onClick={handleExport} disabled={exporting}>{exporting ? '기록 불러오는 중…' : '지원 기록 내려받기'}</Button>
    {exportError && <Alert severity="error">{exportError} 파일은 생성하지 않았어요.</Alert>}
    {exported && <Alert severity="success">파일 다운로드를 요청했어요. 브라우저의 다운로드 목록을 확인해주세요.</Alert>}
  </div>;
  useEffect(() => {
    if (!userId || isGuest) return undefined;
    let cancelled = false;
    // Session refreshes can replace the user object without changing accounts.
    // Capture its fallback name only for this load, never over an in-progress edit.
    const fallbackName = profileAccountRef.current?.user_metadata?.display_name ?? '';
    const loadProfile = async () => {
      setProfileLoading(true);
      setLoadedProfileId(null);
      setProfileLoadError('');
      setError('');
      setSaved(false);
      setDisplayName('');
      setTargetRole('');
      try {
        const {
          data,
          error: loadError
        } = await supabase.from('jobflow_profiles').select('display_name, target_role').eq('id', userId).maybeSingle();
        if (cancelled) return;
        if (loadError) {
          setProfileLoadError('프로필 정보를 불러오지 못했어요. 기존 정보를 보호하기 위해 편집을 잠시 멈췄어요.');
          return;
        }
        const baseline = recordDraftValues('profile', {
          display_name: data ? data.display_name ?? '' : fallbackName,
          target_role: data?.target_role ?? '',
        });
        const scope = `user:${userId}`;
        const recovered = recordDraftStore.read(scope, 'profile', 'profile');
        const values = recovered?.values || baseline;
        profileBaseline.current = baseline;
        profileForm.current = values;
        // Read the server first; a failed read must never enable saving a stale draft.
        if (recovered) recordDraftStore.write(scope, 'profile', 'profile', values, baseline, { preserveWhenUnchanged: true });
        setDisplayName(values.display_name);
        setTargetRole(values.target_role);
        setLoadedProfileId(userId);
      } catch {
        if (!cancelled) {
          setProfileLoadError('프로필 정보를 불러오지 못했어요. 기존 정보를 보호하기 위해 편집을 잠시 멈췄어요.');
        }
      } finally {
        if (!cancelled) setProfileLoading(false);
      }
    };
    loadProfile();
    return () => {
      cancelled = true;
    };
  }, [userId, isGuest, profileAttempt]);
  const handleSave = async () => {
    if (!profileReady || profileBusy) return;
    setError('');
    setSaved(false);
    setSaving(true);
    const values = { ...profileForm.current };
    const savingUserId = user.id;
    try {
      await recordDraftStore.save(profileScope, 'profile', 'profile', values, async () => {
        const { data, error: saveError } = await supabase.from('jobflow_profiles').upsert({
          id: savingUserId,
          email: user.email,
          ...values,
          updated_at: new Date().toISOString()
        }).select('id').maybeSingle();
        if (saveError) throw saveError;
        if (!data) throw new Error('저장할 프로필을 찾지 못했거나 권한이 없습니다.');
      });
      if (profileAccountRef.current?.id !== savingUserId) return;
      profileBaseline.current = values;
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
            <span className="settings-record-marker" aria-hidden="true" />
            <div>
              <span className="settings-status">가상 샘플 체험 중</span>
              <h2 id="sample-settings-title">샘플 기록장</h2>
            </div>
          </div>
          <div className="settings-control">
            <div className="settings-control-copy">
              <p>초기화하면 수정한 샘플 기록이 처음 상태로 돌아가요. 현재 화면은 유지됩니다.</p>
            </div>
            <Button className="settings-control-action" variant="outlined" onClick={() => {
              applicationDraftStore.clearSample();
              resetDemo();
              setSaved(true);
            }}>샘플 초기화</Button>
          </div>
          <p className="settings-reset-result" role="status">{saved ? '샘플 기록을 초기화했어요.' : ''}</p>
          {exportControl}
        </section>
        <section className="panel settings-card settings-account" aria-labelledby="start-record-title">
          <div className="settings-control-copy">
            <h2 id="start-record-title">나만의 기록장</h2>
            <p>로그인하고 내 지원 기록을 저장하세요.</p>
            <p className="settings-note">체험 중 수정한 샘플은 옮겨지지 않아요.</p>
          </div>
          <Button variant="contained" onClick={() => navigate('/login?returnTo=%2Fsettings')}>내 기록 시작하기</Button>
        </section>
      </div>
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
            </div>
          </div>
          {saved && <Alert severity="success" sx={{ mb: 2 }}>프로필을 저장했어요.</Alert>}
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          {profileLoadError && <Alert severity="error" sx={{ mb: 2 }} action={<Button color="inherit" onClick={() => { setProfileLoading(true); setProfileAttempt(attempt => attempt + 1); }}>다시 불러오기</Button>}>{profileLoadError}</Alert>}
          {hasProfileDraft && <Alert severity="info" sx={{ mb: 2 }}>저장 전 입력은 이 탭에서 유지돼요. 새로고침·로그아웃하면 사라져요.</Alert>}
          <Stack spacing={2}>
            <Field label="이름" fullWidth value={displayName} onChange={e => changeProfile('display_name', e.target.value)} disabled={!profileReady || profileBusy} placeholder="홍길동" />
            <Field label="목표 직무" fullWidth value={targetRole} onChange={e => changeProfile('target_role', e.target.value)} disabled={!profileReady || profileBusy} placeholder="예: UX/UI 디자이너" />
            <Field label="이메일" fullWidth value={user?.email ?? ''} disabled helperText="이메일은 변경할 수 없습니다" />
            <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
              <Button variant="contained" onClick={handleSave} disabled={!profileReady || profileBusy}>
                {saving ? '저장 중…' : '프로필 저장'}
              </Button>
              {hasProfileDraft && <Button onClick={discardProfileDraft} disabled={profileBusy}>{restoringProfile ? '저장된 값 불러오는 중…' : '저장된 값으로 되돌리기'}</Button>}
            </Stack>
          </Stack>
        </CardContent>
      </Card>
      <section className="panel settings-card settings-account" aria-labelledby="account-settings-title">
        <div className="settings-control-copy">
          <h2 id="account-settings-title">계정 관리</h2>
          <p>저장한 기록은 다시 로그인하면 볼 수 있어요.</p>
        </div>
        <Button variant="outlined" color="error" startIcon={<LogoutIcon />} onClick={handleLogout}>로그아웃</Button>
        {exportControl}
      </section>
    </div>}
  </Box>;
};
export default SettingsPage;
