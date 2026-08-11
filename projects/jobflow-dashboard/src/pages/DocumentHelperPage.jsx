import { useEffect, useRef, useState } from 'react';
import {
  Box, Card, CardContent, Typography, TextField, Button,
  Select, MenuItem, FormControl, InputLabel, Alert, Stack,
} from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';
import { PROMPT_TYPES } from '../constants';
import { generatePrompt } from '../utils/documentTemplateHelpers';
import ActionFeedback from '../components/ui/ActionFeedback';

const DocumentHelperPage = () => {
  const [role, setRole] = useState('UX/UI 디자이너');
  const [company, setCompany] = useState('');
  const [project, setProject] = useState('');
  const [promptType, setPromptType] = useState('자기소개서');
  const [generated, setGenerated] = useState('');
  const [copied, setCopied] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const copyTimerRef = useRef(null);

  useEffect(() => () => {
    if (copyTimerRef.current) window.clearTimeout(copyTimerRef.current);
  }, []);

  const handleGenerate = () => {
    const text = generatePrompt(promptType, role, company, project);
    setGenerated(text);
  };

  const handleCopy = async () => {
    if (!generated) return;
    let copySucceeded = false;

    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard API unavailable');
      await navigator.clipboard.writeText(generated);
      copySucceeded = true;
    } catch {
      const el = document.createElement('textarea');
      el.value = generated;
      el.setAttribute('readonly', '');
      el.style.position = 'fixed';
      el.style.opacity = '0';
      document.body.appendChild(el);
      el.select();
      try {
        copySucceeded = document.execCommand('copy');
      } catch {
        copySucceeded = false;
      } finally {
        document.body.removeChild(el);
      }
    }

    if (!copySucceeded) {
      setCopied(false);
      setFeedback({ severity: 'error', message: '복사하지 못했습니다. 브라우저 권한을 확인한 뒤 다시 시도해주세요.' });
      return;
    }

    setCopied(true);
    setFeedback({ severity: 'success', message: '프롬프트를 클립보드에 복사했습니다.' });
    if (copyTimerRef.current) window.clearTimeout(copyTimerRef.current);
    copyTimerRef.current = window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
        <AutoAwesomeIcon color="primary" />
        <Typography component="h1" variant="h5" fontWeight={700}>문서 작성 도우미</Typography>
      </Box>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        입력 내용을 정리해 외부 생성형 AI에 붙여넣을 수 있는 문서 작성용 프롬프트를 만듭니다.
      </Typography>

      <Alert severity="info" sx={{ mb: 3 }}>
        이 기능은 외부 LLM이나 AI API를 호출하지 않습니다. 브라우저에서 만든 템플릿을 복사해 원하는 생성형 AI에 붙여넣으세요.
      </Alert>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography component="h2" variant="h6" fontWeight={600} sx={{ mb: 2 }}>입력 정보</Typography>
          <Stack spacing={2}>
            <FormControl fullWidth>
              <InputLabel id="prompt-type-label">프롬프트 유형</InputLabel>
              <Select
                labelId="prompt-type-label"
                value={promptType}
                label="프롬프트 유형"
                onChange={(e) => setPromptType(e.target.value)}
              >
                {PROMPT_TYPES.map((t) => <MenuItem key={t} value={t}>{t}</MenuItem>)}
              </Select>
            </FormControl>
            <TextField
              label="지원 직무"
              fullWidth
              required
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="예: UX/UI 디자이너, 웹 퍼블리셔"
              slotProps={{ htmlInput: { 'aria-label': '지원 직무 입력' } }}
            />
            <TextField
              label="회사명 (선택)"
              fullWidth
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="예: 테크기업 A"
              slotProps={{ htmlInput: { 'aria-label': '회사명 입력' } }}
            />
            <TextField
              label="강조할 프로젝트 (선택)"
              fullWidth
              value={project}
              onChange={(e) => setProject(e.target.value)}
              placeholder="예: 공정봄, JobFlow, 설비잇"
              slotProps={{ htmlInput: { 'aria-label': '강조할 프로젝트 입력' } }}
            />
            <Button
              variant="contained"
              size="large"
              startIcon={<AutoAwesomeIcon />}
              onClick={handleGenerate}
              disabled={!role.trim()}
              aria-label="문서 작성용 프롬프트 생성"
            >
              문서용 프롬프트 만들기
            </Button>
          </Stack>
        </CardContent>
      </Card>

      {generated && (
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
              <Typography component="h2" variant="h6" fontWeight={600}>생성된 프롬프트</Typography>
              <Button
                variant="outlined"
                size="small"
                startIcon={copied ? <CheckIcon /> : <ContentCopyIcon />}
                onClick={handleCopy}
                color={copied ? 'success' : 'primary'}
                aria-label={copied ? '프롬프트 복사 완료' : '프롬프트 복사'}
              >
                {copied ? '복사됨' : '복사'}
              </Button>
            </Box>
            <Box
              component="pre"
              sx={{
                bgcolor: 'background.default',
                borderRadius: 2,
                p: 2,
                border: '1px solid',
                borderColor: 'divider',
                whiteSpace: 'pre-wrap',
                fontFamily: 'inherit',
                fontSize: '0.875rem',
                lineHeight: 1.8,
                color: 'text.primary',
                m: 0,
                wordBreak: 'keep-all',
                overflowWrap: 'anywhere',
              }}
            >
              {generated}
            </Box>
            <Typography variant="caption" color="text.secondary" sx={{ mt: 1.5, display: 'block' }}>
              위 텍스트를 복사해서 ChatGPT 등 생성형 AI에 붙여넣기 하세요.
            </Typography>
          </CardContent>
        </Card>
      )}
      <ActionFeedback feedback={feedback} onClose={() => setFeedback(null)} />
    </Box>
  );
};

export default DocumentHelperPage;
