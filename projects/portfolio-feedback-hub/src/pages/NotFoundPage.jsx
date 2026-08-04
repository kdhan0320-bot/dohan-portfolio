import { Box, Button, Container, Paper, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { PAGE_TITLES, usePageTitle } from '../utils/pageMeta';

const NotFoundPage = () => {
  const navigate = useNavigate();

  usePageTitle(PAGE_TITLES.notFound);

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Header />
      <Container maxWidth="sm" sx={{ py: { xs: 8, sm: 12 } }}>
        <Paper sx={{ p: { xs: 3, sm: 5 }, borderRadius: 3, textAlign: 'center' }}>
          <Typography component="h1" variant="h1" sx={{ mb: 2 }}>페이지를 찾을 수 없습니다</Typography>
          <Typography color="text.secondary" sx={{ mb: 3 }}>
            주소가 잘못되었거나 이동된 페이지입니다. 게시글 목록에서 다시 시작해주세요.
          </Typography>
          <Button variant="contained" onClick={() => navigate('/', { replace: true })}>
            게시글 목록으로
          </Button>
        </Paper>
      </Container>
    </Box>
  );
};

export default NotFoundPage;
