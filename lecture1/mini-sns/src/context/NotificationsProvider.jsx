import { useEffect, useState } from "react";
import { MOCK_NOTIFICATIONS } from "../constants/notifications";
import { readStored, writeStored } from "../utils/storage";
import NotificationsContext from "./NotificationsContext";
export const NotificationsProvider = ({ children }) => {
  const [readIds, setReadIds] = useState(() =>
    readStored(
      "read-notifications",
      [],
      (v) => Array.isArray(v) && v.every((id) => typeof id === "string"),
    ),
  );
  useEffect(() => {
    writeStored("read-notifications", readIds);
  }, [readIds]);
  const notifications = MOCK_NOTIFICATIONS.map((n) => ({
    ...n,
    read: n.read || readIds.includes(n.id),
  }));
  const markRead = (id) =>
    setReadIds((ids) => (ids.includes(id) ? ids : [...ids, id]));
  const markAllRead = () => setReadIds(MOCK_NOTIFICATIONS.map((n) => n.id));
  return (
    <NotificationsContext.Provider
      value={{
        notifications,
        unreadCount: notifications.filter((n) => !n.read).length,
        markRead,
        markAllRead,
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
};
export default NotificationsProvider;
