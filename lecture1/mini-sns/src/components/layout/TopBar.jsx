import { Link } from "react-router-dom";
import { Badge, IconButton } from "@mui/material";
import NotificationsNoneRounded from "@mui/icons-material/NotificationsNoneRounded";
import { useNotifications } from "../../hooks/useNotifications";
export default function TopBar() {
  const { unreadCount } = useNotifications();
  return (
    <header className="topbar">
      <div className="topbar-inner">
        <Link to="/" className="brand" aria-label="Mini SNS 홈">
          <span className="brand-mark" aria-hidden="true">
            <i />
            <i />
          </span>
          <span>
            mini<span className="brand-sns">SNS</span>
          </span>
        </Link>
        <span className="brand-tagline">작업을 나누고, 함께 자라는 곳</span>
        <div className="topbar-actions">
          <span className="demo-pill">체험 공간</span>
          <IconButton component={Link} to="/notifications" aria-label="알림">
            <Badge badgeContent={unreadCount} color="primary">
              <NotificationsNoneRounded />
            </Badge>
          </IconButton>
        </div>
      </div>
    </header>
  );
}
