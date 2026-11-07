import FavoriteIcon from "@mui/icons-material/Favorite";
import ForumIcon from "@mui/icons-material/Forum";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import EventIcon from "@mui/icons-material/Event";
import { getRandomProfileAvatar } from "./demoUser";
import sampleCardUi from "../assets/samples/sample-card-ui.svg";
import sampleStudy from "../assets/samples/sample-study.svg";
import sampleChatUx from "../assets/samples/sample-chat-ux.svg";
import sampleProfileUi from "../assets/samples/sample-profile-ui.svg";

export const MOCK_NOTIFICATIONS = [
  {
    id: 1,
    type: "comment",
    read: false,
    avatar: getRandomProfileAvatar("프론트러너"),
    user: "프론트러너",
    content: '"카드 그림자 톤이 훨씬 차분해졌네요!"',
    time: "방금 전",
    postImage: sampleCardUi,
  },
  {
    id: 2,
    type: "meetup",
    read: false,
    avatar: getRandomProfileAvatar("모바일 UI 스터디"),
    user: "모바일 UI 스터디",
    content: "모임이 시작되었습니다. 채팅방을 확인하세요.",
    time: "5분 전",
    postImage: null,
  },
  {
    id: 3,
    type: "like",
    read: false,
    avatar: getRandomProfileAvatar("스터디메이트"),
    user: "스터디메이트",
    content: "회원님의 게시물을 좋아합니다.",
    time: "30분 전",
    postImage: sampleStudy,
  },
  {
    id: 4,
    type: "comment",
    read: true,
    avatar: getRandomProfileAvatar("디자인메이트"),
    user: "디자인메이트",
    content: '"아바타 톤이 잘 어울려요."',
    time: "2시간 전",
    postImage: sampleProfileUi,
  },
  {
    id: 5,
    type: "follow",
    read: true,
    avatar: getRandomProfileAvatar("모바일UX"),
    user: "모바일UX",
    content: "회원님을 팔로우하기 시작했습니다.",
    time: "5시간 전",
    postImage: null,
  },
  {
    id: 6,
    type: "like",
    read: true,
    avatar: getRandomProfileAvatar("UX러너"),
    user: "UX러너",
    content: "회원님의 채팅 UI 게시물을 좋아합니다.",
    time: "어제",
    postImage: sampleChatUx,
  },
];

export const NOTIFICATION_TYPE_CONFIG = {
  like: {
    icon: <FavoriteIcon sx={{ fontSize: 12 }} />,
    color: "#e53935",
    bg: "#fce4e4",
  },
  comment: {
    icon: <ForumIcon sx={{ fontSize: 12 }} />,
    color: "#4F46E5",
    bg: "#EEF2FF",
  },
  follow: {
    icon: <PersonAddIcon sx={{ fontSize: 12 }} />,
    color: "#2e7d32",
    bg: "#e8f5e9",
  },
  meetup: {
    icon: <EventIcon sx={{ fontSize: 12 }} />,
    color: "#0891B2",
    bg: "#ECFEFF",
  },
};
