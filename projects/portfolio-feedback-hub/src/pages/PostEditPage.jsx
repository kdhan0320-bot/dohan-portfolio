import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box, Container, Typography, TextField, Button, Chip,
  Alert, Paper, Skeleton,
} from '@mui/material';
import { Tag } from '@mui/icons-material';
import { useAuth } from '../hooks/useAuth';
import { supabase } from '../lib/supabase';
import SubPageHeader from '../components/SubPageHeader';
import { SAMPLE_POSTS } from '../constants/samplePosts';
import { validateAndNormalizeImageUrl } from '../utils/imageUrlPolicy';

const EDIT_FORM_ID = 'post-edit-form';

const PostEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const userId = user?.id;
  const postId = String(id ?? '');
  const isSamplePostId = postId.startsWith('sample');
  const isLivePostId = /^[1-9]\d*$/.test(postId);
  const isInvalidPostId = !isSamplePostId && !isLivePostId;
  const samplePost = isSamplePostId
    ? SAMPLE_POSTS.find(post => post.id === id)
    : null;
  const [form, setForm] = useState({ title: '', content: '', hashtags: [] });
  const [imageUrl, setImageUrl] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isSamplePostId) {
      setLoading(false);
      setLoadError('');
      return;
    }
    if (isInvalidPostId) {
      setLoading(false);
      setLoadError('');
      return;
    }
    if (!userId) return;
    let active = true;

    const fetchPost = async () => {
      setLoading(true);
      setLoadError('');
      const { data, error: fetchError } = await supabase
        .from('posts')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (!active) return;
      if (fetchError) {
        setLoadError('게시글을 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.');
        setLoading(false);
        return;
      }
      if (!data || data.user_id !== userId) {
        setLoadError('게시글을 찾을 수 없거나 수정 권한이 없습니다.');
        setLoading(false);
        return;
      }

      setForm({ title: data.title, content: data.content, hashtags: data.hashtags || [] });
      setImageUrl(data.image_url || '');
      setLoading(false);
    };
    fetchPost();
    return () => { active = false; };
  }, [id, isInvalidPostId, isSamplePostId, userId]);

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleAddTag = (e) => {
    if ((e.key === 'Enter' || e.key === ',') && tagInput.trim()) {
      e.preventDefault();
      const tag = tagInput.trim().replace(/^#/, '');
      if (tag && !form.hashtags.includes(tag) && form.hashtags.length < 5) {
        setForm(prev => ({ ...prev, hashtags: [...prev.hashtags, tag] }));
      }
      setTagInput('');
    }
  };

  const removeTag = (tag) => setForm(prev => ({ ...prev, hashtags: prev.hashtags.filter(t => t !== tag) }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (saving) return;

    setError('');
    if (!form.title.trim()) {
      setError('제목을 입력해주세요.');
      return;
    }
    if (!form.content.trim()) {
      setError('내용을 입력해주세요.');
      return;
    }
    const imageValidation = validateAndNormalizeImageUrl(imageUrl);
    if (imageValidation.error) {
      setError(imageValidation.error);
      return;
    }
    setSaving(true);
    try {
      const { data, error: err } = await supabase.from('posts').update({
        title: form.title.trim(),
        content: form.content.trim(),
        image_url: imageValidation.imageUrl,
        hashtags: form.hashtags,
      })
        .eq('id', id)
        .eq('user_id', userId)
        .select('id')
        .maybeSingle();
      if (err || !data?.id) throw err || new Error('Updated post is missing.');
      navigate(`/posts/${id}`, { replace: true });
    } catch {
      setError('게시글을 수정하지 못했습니다.');
    } finally {
      setSaving(false);
    }
  };

  const titleValidationError = error === '제목을 입력해주세요.';
  const contentValidationError = error === '내용을 입력해주세요.';
  const imageValidationError = Boolean(error) && (
    error.includes('이미지 주소') || error.startsWith('Picsum 이미지')
  );
  const submitError = error && !titleValidationError && !contentValidationError && !imageValidationError;

  if (isSamplePostId) {
    const sampleDetailPath = samplePost ? `/posts/${id}` : null;
    return (
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
        <SubPageHeader
          title="게시글 수정"
          fallbackTo={sampleDetailPath || '/'}
          backLabel={sampleDetailPath ? '상세로' : '목록으로'}
        />
        <Container maxWidth="md" sx={{ py: 6 }}>
          <Alert severity="info" sx={{ mb: 3 }}>
            <Typography sx={{ fontWeight: 700, mb: 0.5 }}>
              샘플 게시글은 데모 데이터이므로 수정할 수 없습니다.
            </Typography>
            <Typography variant="body2">
              실제 게시글을 작성한 뒤 수정 기능을 이용해 주세요.
            </Typography>
          </Alert>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
            {sampleDetailPath && (
              <Button variant="contained" onClick={() => navigate(sampleDetailPath)}>
                샘플 상세 보기
              </Button>
            )}
            <Button variant={sampleDetailPath ? 'outlined' : 'contained'} onClick={() => navigate('/')}>
              게시글 목록으로
            </Button>
            {user && (
              <Button variant="outlined" onClick={() => navigate('/write')}>
                새 게시글 작성
              </Button>
            )}
          </Box>
        </Container>
      </Box>
    );
  }

  if (isInvalidPostId) {
    return (
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
        <SubPageHeader title="게시글 수정" fallbackTo="/" />
        <Container maxWidth="md" sx={{ py: 6 }}>
          <Alert severity="warning" sx={{ mb: 3 }}>
            올바르지 않은 게시글 주소입니다.
          </Alert>
          <Button variant="contained" onClick={() => navigate('/')}>
            게시글 목록으로
          </Button>
        </Container>
      </Box>
    );
  }

  if (!user) return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <SubPageHeader title="게시글 수정" fallbackTo="/" />
      <Container maxWidth="md" sx={{ py: 6 }}>
        <Alert severity="info" sx={{ mb: 3 }}>
          게시글 편집은 로그인 후 이용할 수 있습니다.
        </Alert>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
          <Button variant="contained" onClick={() => navigate('/login')}>로그인하기</Button>
          <Button variant="outlined" onClick={() => navigate('/')}>게시글 목록으로</Button>
        </Box>
      </Container>
    </Box>
  );

  if (loading) return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <SubPageHeader title="게시글 수정" fallbackTo="/" />
      <Container maxWidth="md" sx={{ py: 6 }}>
        <Skeleton variant="rectangular" height={400} sx={{ borderRadius: 2 }} />
      </Container>
    </Box>
  );

  if (loadError) return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <SubPageHeader title="게시글 수정" fallbackTo="/" />
      <Container maxWidth="md" sx={{ py: 6 }}>
        <Alert severity="warning" sx={{ mb: 3 }}>{loadError}</Alert>
        <Button variant="contained" onClick={() => navigate('/')}>게시글 목록으로</Button>
      </Container>
    </Box>
  );

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <SubPageHeader
        title="게시글 수정"
        fallbackTo={`/posts/${id}`}
        backLabel="상세로"
        rightActions={(
          <>
            <Button
              type="button"
              variant="outlined"
              onClick={() => navigate(`/posts/${id}`, { replace: true })}
              disabled={saving}
            >
              취소
            </Button>
            <Button
              type="submit"
              form={EDIT_FORM_ID}
              variant="contained"
              disabled={saving}
              sx={{ px: 3 }}
            >
              {saving ? '저장 중...' : '수정 완료'}
            </Button>
          </>
        )}
      />

      <Box component="form" id={EDIT_FORM_ID} onSubmit={handleSubmit} noValidate>
        <Container maxWidth="md" sx={{ py: 4 }}>
          {submitError && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

          <Paper sx={{ p: 4, borderRadius: 3 }}>
          <TextField
            label="제목"
            name="title"
            value={form.title}
            onChange={handleChange}
            fullWidth
            required
            error={titleValidationError}
            helperText={titleValidationError ? error : undefined}
            sx={{ mb: 3 }}
            slotProps={{ htmlInput: { maxLength: 100 } }}
          />

          <TextField
            label="내용"
            name="content"
            value={form.content}
            onChange={handleChange}
            fullWidth
            required
            multiline
            rows={10}
            error={contentValidationError}
            helperText={contentValidationError ? error : undefined}
            sx={{ mb: 3 }}
          />

          {/* 이미지 영역 */}
          <Box sx={{ mb: 3 }}>
            <TextField
              label="작업 이미지 URL (선택)"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://example.com/my-work.png"
              helperText={imageValidationError
                ? error
                : '본인이 제작했거나 사용 권한이 있는 HTTPS 이미지 주소만 입력해주세요. 파일 업로드는 현재 지원하지 않습니다.'}
              type="url"
              fullWidth
              error={imageValidationError}
            />
          </Box>

          {/* 해시태그 */}
          <Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              해시태그 (최대 5개, Enter 또는 쉼표로 추가)
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 1 }}>
              {form.hashtags.map(tag => (
                <Chip
                  key={tag}
                  label={`#${tag}`}
                  onDelete={() => removeTag(tag)}
                  size="small"
                  sx={{ bgcolor: 'secondary.light', color: 'primary.dark' }}
                />
              ))}
            </Box>
            <TextField
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleAddTag}
              placeholder="#태그입력"
              size="small"
              disabled={form.hashtags.length >= 5}
              slotProps={{ input: { startAdornment: <Tag sx={{ color: 'text.disabled', mr: 0.5, fontSize: 18 }} /> } }}
            />
          </Box>
          </Paper>
        </Container>
      </Box>
    </Box>
  );
};

export default PostEditPage;
