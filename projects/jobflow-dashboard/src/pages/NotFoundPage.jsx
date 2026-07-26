import { Box, Button, Card, CardContent, Stack, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import WorkIcon from '@mui/icons-material/Work';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ maxWidth: 640, mx: 'auto', pt: { xs: 3, sm: 8 } }}>
      <Card>
        <CardContent sx={{ textAlign: 'center', py: { xs: 5, sm: 7 } }}>
          <SearchOffIcon color="primary" sx={{ fontSize: 56, mb: 2 }} />
          <Typography variant="h5" component="h2" fontWeight={700} gutterBottom>
            페이지를 찾을 수 없습니다
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            주소가 변경되었거나 존재하지 않는 페이지입니다. 아래 메뉴에서 다시 시작하세요.
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} sx={{ justifyContent: 'center' }}>
            <Button variant="contained" startIcon={<HomeIcon />} onClick={() => navigate('/')}>
              대시보드로
            </Button>
            <Button variant="outlined" startIcon={<WorkIcon />} onClick={() => navigate('/applications')}>
              지원 현황으로
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

export default NotFoundPage;
