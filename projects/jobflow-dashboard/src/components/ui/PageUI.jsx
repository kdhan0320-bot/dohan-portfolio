import { Alert, Button, CircularProgress, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { Link } from 'react-router-dom';
import PaperGraphic from './PaperGraphic';
export function PageHeading({
  title,
  children,
  description,
  art
}) {
  return <header className={`page-heading ${art ? 'page-heading-illustrated' : ''}`} data-art={art}>
  {art && <PaperGraphic kind={art} className="heading-graphic" />}
  <div className="page-heading-copy">

    <h1>
      {title}
    </h1>
    {description && <p className="muted">
      {description}
    </p>}
  </div>
  <div className="heading-actions">
    {children}
  </div>
</header>;
}
export function Panel({
  title,
  to,
  label = '전체 보기',
  children,
  className = ''
}) {
  return <section className={`panel ${className}`}>
  <div className="panel-heading">
    <h2>
      {title}
    </h2>
    {to && <Button component={Link} to={to} size="small">{label}</Button>}
  </div>
  {children}
</section>;
}
export function CompanyMark({
  name
}) {
  const tones = ['mauve', 'sage', 'sand'];
  const index = [...(name || '가')].reduce((a, c) => a + c.charCodeAt(0), 0) % 3;
  return <span className={`company-mark ${tones[index]}`} aria-hidden="true">
  {name?.slice(0, 1) || '회'}
</span>;
}
export function LoadState({
  loading,
  error,
  retry
}) {
  if (loading) return <div className="loading-state" role="status">
  <CircularProgress size={28} />
  <p>기록을 불러오고 있어요.</p>
</div>;
  if (error) return <Alert severity="error" action={retry && <Button color="inherit" onClick={retry}>다시 시도</Button>}>
  {error}
</Alert>;
  return null;
}
export function Empty({
  title,
  children
}) {
  return <div className="empty-state">
  <svg className="empty-mark" width="54" height="62" viewBox="0 0 54 62" fill="none" aria-hidden="true"><path d="M10 4h23l11 11v43H10Z" fill="#EFEBE7" stroke="#BEA8AB" strokeWidth="1.5"/><path d="M33 4v12h11M18 29h18M18 37h18M18 45h11" stroke="#A2878B" strokeWidth="1.5" strokeLinecap="round"/></svg>
  <h2>
    {title}
  </h2>
  {children}
</div>;
}
export function ConfirmDelete({
  open,
  title,
  busy,
  onClose,
  onConfirm
}) {
  return <Dialog open={open} aria-labelledby="delete-dialog-title" onClose={busy ? undefined : onClose} fullWidth maxWidth="xs">
  <DialogTitle id="delete-dialog-title">기록을 삭제할까요?</DialogTitle>
  <DialogContent>
    <p>‘{title}’ 기록이 삭제됩니다. 이 작업은 되돌릴 수 없습니다.</p>
  </DialogContent>
  <DialogActions>
    <Button onClick={onClose} disabled={busy}>취소</Button>
    <Button color="error" variant="contained" onClick={onConfirm} disabled={busy}>삭제</Button>
  </DialogActions>
</Dialog>;
}
