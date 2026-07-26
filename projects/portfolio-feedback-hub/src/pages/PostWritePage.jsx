import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box, Container, Typography, TextField, Button, Chip, Alert, Paper,
} from '@mui/material';
import { Tag } from '@mui/icons-material';
import { useAuth } from '../hooks/useAuth';
import { supabase } from '../lib/supabase';
import SubPageHeader from '../components/SubPageHeader';
import { validateAndNormalizeImageUrl } from '../utils/imageUrlPolicy';

const WRITE_FORM_ID = 'post-write-form';

const FEEDBACK_FOCUS_OPTIONS = ['색상', '여백', '정보구조', '기능 흐름', '취업용 문구', '반응형', '접근성', '코드 구조'];

const PostWritePage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [form, setForm] = useState({ title: '', content: '', hashtags: [] });
  const [imageUrl, setImageUrl] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [feedbackFocus, setFeedbackFocus] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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

  const toggleFeedbackFocus = (item) => {
    setFeedbackFocus(prev => prev.includes(item) ? prev.filter(f => f !== item) : [...prev, item]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

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
    setLoading(true);
    try {
      const contentWithFocus = feedbackFocus.length > 0
        ? `[피드백 요청 항목]\n${feedbackFocus.map(f => `- ${f}`).join('\n')}\n\n${form.content.trim()}`
        : form.content.trim();

      const { data, error: err } = await supabase.from('posts').insert({
        user_id: user.id,
        title: form.title.trim(),
        content: contentWithFocus,
        image_url: imageValidation.imageUrl,
        hashtags: form.hashtags,
      }).select('id').single();
      if (err || !data?.id) throw err || new Error('Created post ID is missing.');
      navigate(`/posts/${data.id}`, { replace: true });
    } catch {
      setError('게시글을 등록하지 못했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const titleValidationError = error === '제목을 입력해주세요.';
  const contentValidationError = error === '내용을 입력해주세요.';
  const imageValidationError = Boolean(error) && (
    error.includes('이미지 주소') || error.startsWith('Picsum 이미지')
  );
  const submitError = error && !titleValidationError && !contentValidationError && !imageValidationError;

  if (!user) {
    return (
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
        <SubPageHeader title="게시글 작성" />
        <Container maxWidth="md" sx={{ py: 4 }}>
          <Alert severity="info" sx={{ mb: 2 }}>글쓰기는 로그인 또는 테스트 계정으로 이용할 수 있습니다.</Alert>
          <Button variant="contained" onClick={() => navigate('/login')}>
            로그인하러 가기
          </Button>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <SubPageHeader
        title="게시글 작성"
        rightActions={(
          <>
            <Button
              type="button"
              variant="outlined"
              onClick={() => navigate('/', { replace: true })}
              disabled={loading}
            >
              취소
            </Button>
            <Button
              type="submit"
              form={WRITE_FORM_ID}
              variant="contained"
              disabled={loading}
              sx={{ px: 3 }}
            >
              {loading ? '등록 중...' : '게시글 등록'}
            </Button>
          </>
        )}
      />

      <Box component="form" id={WRITE_FORM_ID} onSubmit={handleSubmit} noValidate>
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

          {/* 피드백 받고 싶은 부분 */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              피드백 받고 싶은 부분 (선택)
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
              {FEEDBACK_FOCUS_OPTIONS.map(item => (
                <Chip
                  key={item}
                  label={item}
                  clickable
                  onClick={() => toggleFeedbackFocus(item)}
                  variant={feedbackFocus.includes(item) ? 'filled' : 'outlined'}
                  sx={{
                    bgcolor: feedbackFocus.includes(item) ? 'primary.main' : 'transparent',
                    color: feedbackFocus.includes(item) ? '#fff' : 'text.secondary',
                    borderColor: feedbackFocus.includes(item) ? 'primary.main' : 'divider',
                  }}
                />
              ))}
            </Box>
          </Box>

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

export default PostWritePage;
