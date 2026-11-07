import { Link } from "react-router-dom";
import { Avatar, Button } from "@mui/material";
import DoneAllRounded from "@mui/icons-material/DoneAllRounded";
import MainLayout from "../components/layout/MainLayout";
import { useNotifications } from "../hooks/useNotifications";
export default function Notifications() {
  const { notifications, unreadCount, markRead, markAllRead } =
    useNotifications();
  return (
    <MainLayout>
      <div className="page-heading">
        <div>
          <p className="eyebrow">기록에 더해진 생각</p>
          <h1>내 작업에 닿은 이야기</h1>
          <p>
            {unreadCount
              ? `아직 읽지 않은 소식 ${unreadCount}개가 있어요.`
              : "새로운 소식을 모두 확인했어요."}
          </p>
        </div>
        <Button
          size="small"
          startIcon={<DoneAllRounded />}
          disabled={!unreadCount}
          onClick={markAllRead}
          sx={{ fontSize: 12, whiteSpace: "nowrap", px: 1 }}
        >
          모두 읽음
        </Button>
      </div>
      <div className="notifications-list">
        {notifications.map((n) => (
          <Link
            key={n.id}
            to={n.target}
            onClick={() => markRead(n.id)}
            className={`notification-link ${!n.read ? "unread" : ""}`}
          >
            <Avatar src={n.avatar} sx={{ width: 40, height: 40 }} />
            <div className="notification-copy">
              <strong>{n.user}</strong>
              <p>{n.content}</p>
              <small>
                {n.label} · {n.time}
              </small>
            </div>
            {!n.read && <span className="unread-dot" aria-label="읽지 않음" />}
          </Link>
        ))}
      </div>
    </MainLayout>
  );
}
