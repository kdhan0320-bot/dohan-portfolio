import { Box, Button, Card, CardContent, Stack, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import WorkIcon from '@mui/icons-material/Work';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import { Link } from 'react-router-dom';
const NotFoundPage = () => {
  return <Box sx={{
    maxWidth: 640,
    mx: 'auto',
    pt: {
      xs: 3,
      sm: 8
    }
  }}>
  <Card>
    <CardContent sx={{
        textAlign: 'center',
        py: {
          xs: 5,
          sm: 7
        }
      }}>
      <SearchOffIcon color="primary" sx={{
          fontSize: 56,
          mb: 2
        }} />
      <Typography variant="h5" component="h1" fontWeight={550} gutterBottom>
            페이지를 찾을 수 없습니다
          </Typography>
      <Typography variant="body2" color="text.secondary" sx={{
          mb: 3
        }}>
            주소가 변경되었거나 존재하지 않는 페이지입니다. 아래 메뉴에서 다시 시작하세요.
          </Typography>
      <Stack direction={{
          xs: 'column',
          sm: 'row'
        }} spacing={1.5} sx={{
          justifyContent: 'center'
        }}>
        <Button component={Link} to="/overview" variant="contained" startIcon={<HomeIcon />}>
              오늘의 지원
            </Button>
        <Button component={Link} to="/" variant="outlined" startIcon={<WorkIcon />}>
              지원 현황
            </Button>
      </Stack>
    </CardContent>
  </Card>
</Box>;
};
export default NotFoundPage;
