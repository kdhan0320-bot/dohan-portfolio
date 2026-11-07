import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
export default function RouteEffects() {
  const { pathname } = useLocation();
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
    const title = pathname.startsWith("/chat")
      ? "대화"
      : pathname.startsWith("/meetup")
        ? "모임"
        : pathname.startsWith("/profile")
          ? "내 기록"
          : pathname.startsWith("/create") || pathname.startsWith("/edit")
            ? "기록 남기기"
            : pathname.startsWith("/notifications")
              ? "활동 알림"
              : pathname.startsWith("/post")
                ? "작업 기록"
                : pathname.startsWith("/login")
                  ? "작은 기록의 시작"
                  : "작업 피드";
    document.title = `${title} · Mini SNS`;
  }, [pathname]);
  return null;
}
