import { NavLink, Link } from "react-router-dom";
import HomeRounded from "@mui/icons-material/HomeRounded";
import GroupsOutlined from "@mui/icons-material/GroupsOutlined";
import ChatBubbleOutlineRounded from "@mui/icons-material/ChatBubbleOutlineRounded";
import PersonOutlineRounded from "@mui/icons-material/PersonOutlineRounded";
import AddRounded from "@mui/icons-material/AddRounded";
const items = [
  { to: "/", label: "피드", Icon: HomeRounded },
  { to: "/meetup", label: "모임", Icon: GroupsOutlined },
  { to: "/chat", label: "대화", Icon: ChatBubbleOutlineRounded },
  { to: "/profile", label: "내 기록", Icon: PersonOutlineRounded },
];
export function NavItems({ desktop = false }) {
  return (
    <>
      {items.map(({ to, label, Icon }) => (
        <NavLink
          key={to}
          to={to}
          end={to === "/"}
          className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
        >
          <Icon />
          <span>{label}</span>
        </NavLink>
      ))}
      {desktop && (
        <Link to="/create" className="button primary nav-compose">
          <AddRounded />
          기록 남기기
        </Link>
      )}
    </>
  );
}
export default function BottomNav() {
  return (
    <nav className="bottom-nav" aria-label="주요 메뉴">
      <NavItems />
      <Link to="/create" className="nav-create" aria-label="새 기록 작성">
        <AddRounded />
      </Link>
    </nav>
  );
}
