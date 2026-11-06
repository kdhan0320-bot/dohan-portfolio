import { Chip } from '@mui/material';
import { APPLICATION_STATUSES } from '../../constants';

const StatusChip = ({ status, size = 'small' }) => {
  const found = APPLICATION_STATUSES.find((s) => s.value === status);
  if (!found) return <Chip component="span" label={status} size={size} />;

  return (
    <Chip
      component="span"
      label={found.label}
      className="application-status"
      size={size}
      sx={{
        color: found.color,
        bgcolor: found.bg,
        fontWeight: 650,
        border: '0',
        borderRadius: '6px',
        minHeight: 28,
      }}
    />
  );
};

export default StatusChip;
