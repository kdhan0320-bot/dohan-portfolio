const colors = [
  ["#E8EAF8", "#4956A6"],
  ["#E8F0E9", "#42634D"],
  ["#F4E8DD", "#8D5D3C"],
  ["#EFE8F2", "#775283"],
  ["#E3EDF4", "#3D647D"],
];
export const getRandomProfileAvatar = (seed = "방문자") => {
  const name = String(seed);
  const [bg, fg] =
    colors[[...name].reduce((n, c) => n + c.charCodeAt(0), 0) % colors.length];
  const initials = name.slice(0, 1).replace(/[<>&"']/g, "");
  return `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80"><rect width="80" height="80" rx="28" fill="${bg}"/><text x="40" y="51" text-anchor="middle" font-family="Arial,sans-serif" font-size="30" font-weight="600" fill="${fg}">${initials}</text></svg>`)}`;
};
export const DEMO_USER = {
  id: "demo-user",
  nickname: "도한",
  handle: "@dohan",
  bio: "화면을 만들고, 작은 발견을 기록합니다. 오늘도 한 걸음씩.",
  profile_image_url: getRandomProfileAvatar("도한"),
};
