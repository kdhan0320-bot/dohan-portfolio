import FavoriteIcon from "@mui/icons-material/Favorite";
import ForumIcon from "@mui/icons-material/Forum";
import EventIcon from "@mui/icons-material/Event";
import { getRandomProfileAvatar } from "./demoUser";
export const MOCK_NOTIFICATIONS = [
  {
    id: "n1",
    type: "comment",
    read: false,
    avatar: getRandomProfileAvatar("서연"),
    user: "서연",
    content: "여백을 넓힌 이유가 화면에서 잘 느껴져요.",
    time: "15분 전",
    target: "/post/guest-1",
    label: "작업에 댓글을 남겼어요",
  },
  {
    id: "n2",
    type: "meetup",
    read: false,
    avatar: getRandomProfileAvatar("서연"),
    user: "작은 화면을 깊이 읽는 시간",
    content: "이번 주 주제는 ‘쓰고 싶은 피드’예요. 함께 살펴볼까요?",
    time: "30분 전",
    target: "/meetup?group=mobile-ui-study",
    label: "새로운 스터디 소식",
  },
  {
    id: "n3",
    type: "like",
    read: false,
    avatar: getRandomProfileAvatar("유진"),
    user: "유진",
    content: "‘여행의 시작은, 조금 더 가볍게’에 좋아요를 남겼어요.",
    time: "1시간 전",
    target: "/post/guest-1",
    label: "작업에 공감을 보냈어요",
  },
  {
    id: "n4",
    type: "meetup",
    read: true,
    avatar: getRandomProfileAvatar("민준"),
    user: "하루 한 조각, React",
    content: "오늘 만든 컴포넌트 이야기를 이어가요.",
    time: "2시간 전",
    target: "/chat/react-worklog",
    label: "참여 중인 모임의 대화",
  },
];
export const NOTIFICATION_TYPE_CONFIG = {
  like: {
    icon: <FavoriteIcon fontSize="inherit" />,
    color: "#B85460",
    bg: "#FAEDEF",
  },
  comment: {
    icon: <ForumIcon fontSize="inherit" />,
    color: "#535FC1",
    bg: "#EDEFFC",
  },
  meetup: {
    icon: <EventIcon fontSize="inherit" />,
    color: "#4C735D",
    bg: "#EAF2ED",
  },
};
