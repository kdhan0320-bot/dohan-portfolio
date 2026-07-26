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
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert
        onClose={handleClose}
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
