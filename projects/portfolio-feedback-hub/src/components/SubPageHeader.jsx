import { useLocation, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Container, Button, Typography, Box } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';

const SubPageHeader = ({ title, rightActions, fallbackTo = '/', backLabel = '목록으로' }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const handleBack = () => {
    if (location.key !== 'default') {
      navigate(-1);
      return;
    }
    navigate(fallbackTo, { replace: true });
  };

  return (
    <AppBar position="sticky">
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ gap: 0.5 }}>
          <Button
            type="button"
            color="inherit"
            onClick={handleBack}
            startIcon={<ArrowBack aria-hidden="true" />}
            aria-label={`${backLabel} 돌아가기`}
            sx={{ minHeight: 44, px: 1, flexShrink: 0 }}
          >
            {backLabel}
          </Button>
          <Typography
            component="h1"
            variant="h6"
            sx={{
              flexGrow: 1, ml: 0.5, minWidth: 0,
              overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
            }}
          >
            {title}
          </Typography>
          {rightActions && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, flexShrink: 0 }}>
              {rightActions}
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default SubPageHeader;
