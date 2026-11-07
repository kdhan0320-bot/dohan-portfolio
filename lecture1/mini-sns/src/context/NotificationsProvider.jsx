import { useState } from "react";
import { MOCK_NOTIFICATIONS } from "../constants/notifications";
import NotificationsContext from "./NotificationsContext";

export const NotificationsProvider = ({ children }) => {
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const markRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
    );
  };

  return (
    <NotificationsContext.Provider
      value={{ notifications, unreadCount, markAllRead, markRead }}
    >
      {children}
    </NotificationsContext.Provider>
  );
};

export default NotificationsProvider;
