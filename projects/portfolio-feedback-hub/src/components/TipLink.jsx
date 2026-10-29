import { Link, useLocation, useNavigate } from 'react-router-dom';

// Capture the outgoing position when the link is used, not when its list renders.
export default function TipLink({ to, focusId, children, ...props }) {
  const location = useLocation();
  const navigate = useNavigate();
  const openTip = event => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    navigate(to, { state: { routeReturn: { entryKey: location.key, focusId, scrollY: window.scrollY } } });
  };
  return <Link {...props} to={to} data-route-focus-id={focusId} onClick={openTip}>{children}</Link>;
}
