// Keep feed filters shareable, while only allowing return links within the feed.
export const FEED_CATEGORIES = ["전체", "작업기록", "질문", "스터디"];
export const feedPath = (value = "/") => {
  if (
    typeof value !== "string" ||
    !value.startsWith("/") ||
    value.startsWith("//")
  )
    return "/";
  try {
    const url = new URL(value, "https://mini-sns.local");
    if (url.origin !== "https://mini-sns.local" || url.pathname !== "/")
      return "/";
    const params = new URLSearchParams();
    const category = url.searchParams.get("category");
    const query = (url.searchParams.get("q") || "").slice(0, 120);
    if (FEED_CATEGORIES.includes(category) && category !== "전체")
      params.set("category", category);
    if (query) params.set("q", query);
    return params.size ? `/?${params}` : "/";
  } catch {
    return "/";
  }
};
export const withFeedReturn = (path, value) => {
  const from = feedPath(value);
  return from === "/" ? path : `${path}?${new URLSearchParams({ from })}`;
};
