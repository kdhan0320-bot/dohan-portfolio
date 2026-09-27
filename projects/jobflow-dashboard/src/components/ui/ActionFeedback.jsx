import { Alert, Snackbar } from '@mui/material';

const ActionFeedback = ({ feedback, onClose }) => {
  const handleClose = (_event, reason) => {
    if (reason === 'clickaway') return;
    onClose?.();
  };

  return (
    <Snackbar
      open={Boolean(feedback)}
      autoHideDuration={4000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      sx={{
        top: { xs: 64, sm: 72 },
        pointerEvents: 'none',
        '& .MuiAlert-action': { pointerEvents: 'auto' }
      }}
    >
      <Alert
        onClose={handleClose}
        closeText="알림 닫기"
        severity={feedback?.severity ?? 'success'}
        variant="filled"
        sx={{ width: '100%' }}
      >
        {feedback?.message}
      </Alert>
    </Snackbar>
  );
};

export default ActionFeedback;
