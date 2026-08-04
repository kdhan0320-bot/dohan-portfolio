import { Alert, AlertTitle, Box, Button } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import { useNavigate } from 'react-router-dom';

const GuestReadOnlyNotice = ({
  title = '게스트 읽기 전용',
  description = '샘플 데이터는 조회만 할 수 있습니다. 로그인하면 내 데이터를 추가하고 관리할 수 있습니다.',
}) => {
  const navigate = useNavigate();

  return (
    <Alert
      severity="info"
      sx={{
        mb: 3,
        alignItems: 'flex-start',
        '& .MuiAlert-message': { width: '100%', minWidth: 0 },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: { xs: 'flex-start', sm: 'center' },
          gap: { xs: 1.5, sm: 2 },
          width: '100%',
        }}
      >
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <AlertTitle sx={{ fontWeight: 700 }}>{title}</AlertTitle>
          <Box sx={{ wordBreak: 'keep-all', overflowWrap: 'break-word' }}>
            {description}
          </Box>
          <Box sx={{ mt: 0.5, fontSize: '0.8125rem', wordBreak: 'keep-all', overflowWrap: 'break-word' }}>
            현재 탭에서 새로고침해도 체험 상태가 유지됩니다.
          </Box>
        </Box>
        <Button
          variant="contained"
          size="small"
          startIcon={<LoginIcon />}
          onClick={() => navigate('/login')}
          sx={{ whiteSpace: 'nowrap', flexShrink: 0 }}
        >
          로그인하기
        </Button>
      </Box>
    </Alert>
  );
};

export default GuestReadOnlyNotice;
