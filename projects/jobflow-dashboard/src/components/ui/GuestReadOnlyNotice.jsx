import { Alert, AlertTitle, Box, Button } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import { useNavigate } from 'react-router-dom';
const GuestReadOnlyNotice = ({
  title = '샘플 체험',
  description = '샘플을 자유롭게 변경해보세요. 변경 내용은 새로고침하면 초기화됩니다.'
}) => {
  const navigate = useNavigate();
  return <Alert severity="info" sx={{
    mb: 3,
    alignItems: 'flex-start',
    '& .MuiAlert-message': {
      width: '100%',
      minWidth: 0
    }
  }}>
  <Box sx={{
      display: 'flex',
      flexDirection: {
        xs: 'column',
        sm: 'row'
      },
      alignItems: {
        xs: 'flex-start',
        sm: 'center'
      },
      gap: {
        xs: 1.5,
        sm: 2
      },
      width: '100%'
    }}>
    <Box sx={{
        flex: 1,
        minWidth: 0
      }}>
      <AlertTitle sx={{
          fontWeight: 700
        }}>
        {title}
      </AlertTitle>
      <Box sx={{
          wordBreak: 'keep-all',
          overflowWrap: 'break-word'
        }}>
        {description}
      </Box>
      <Box sx={{
          mt: 0.5,
          fontSize: '0.8125rem',
          wordBreak: 'keep-all',
          overflowWrap: 'break-word'
        }}>
            게스트 체험 상태만 현재 탭에 유지되며, 샘플 데이터 자체는 브라우저에 저장되지 않습니다.
          </Box>
    </Box>
    <Button variant="contained" size="small" startIcon={<LoginIcon />} onClick={() => navigate('/login')} sx={{
        whiteSpace: 'nowrap',
        flexShrink: 0
      }}>
          로그인하기
        </Button>
  </Box>
</Alert>;
};
export default GuestReadOnlyNotice;
