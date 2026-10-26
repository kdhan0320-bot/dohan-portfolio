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
      disableWindowBlurListener
      onClose={handleClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      sx={{
        bottom: { xs: 'calc(16px + env(safe-area-inset-bottom, 0px))', sm: 24 },
        pointerEvents: 'none',
        // Only the dismiss button receives clicks; the action wrapper must not
        // intercept links behind the temporary notification.
        '& .MuiAlert-action': { pointerEvents: 'none' },
        '& .MuiAlert-action button': { pointerEvents: 'auto' }
      }}
    >
      <Alert
        onClose={handleClose}
        closeText="알림 닫기"
        severity={feedback?.severity ?? 'success'}
        variant="filled"
        sx={{
          width: '100%', alignItems: 'center', paddingBlock: '6px',
          '& .MuiAlert-icon': { alignItems: 'center', padding: 0, marginRight: '10px' },
          '& .MuiAlert-message': { padding: '6px 0', minWidth: 0, overflowWrap: 'anywhere' },
          '& .MuiAlert-action': { alignItems: 'center', padding: '0 0 0 8px', marginRight: '-8px', alignSelf: 'center' },
          '& .MuiAlert-action button': { width: 44, height: 44, padding: '10px' }
        }}
      >
        {feedback?.message}
      </Alert>
    </Snackbar>
  );
};

export default ActionFeedback;
