import { getRandomProfileAvatar } from "./demoUser";

export const MOCK_ROOMS = [
  {
    id: "mobile-ui-study",
    name: "모바일 UI 스터디",
    type: "group",
    members: 5,
    lastMsg: "오늘 컴포넌트 정리 공유드려요",
    time: "5분 전",
    unread: 1,
    avatar: getRandomProfileAvatar("모바일 UI 스터디"),
  },
  {
    id: "react-worklog",
    name: "React 작업 인증방",
    type: "group",
    members: 12,
    lastMsg: "오늘 작업 기록 공유합니다!",
    time: "방금 전",
    unread: 3,
    avatar: getRandomProfileAvatar("React 작업 인증방"),
  },
  {
    id: "portfolio-club",
    name: "포트폴리오 정리 모임",
    type: "group",
    members: 6,
    lastMsg: "이번 주 정리한 내용 공유해요.",
    time: "1시간 전",
    unread: 0,
    avatar: getRandomProfileAvatar("포트폴리오 정리 모임"),
  },
  {
    id: "dm-frontrunner",
    name: "프론트러너",
    type: "dm",
    members: 2,
    lastMsg: "채팅 입력창 UX 어떻게 고치셨어요?",
    time: "어제",
    unread: 0,
    avatar: getRandomProfileAvatar("프론트러너"),
  },
];

export const MOCK_MESSAGES = {
  "mobile-ui-study": [
    {
      id: 1,
      sender: "UX러너",
      content: "하단 탭 아이콘 크기는 몇 px로 맞추셨어요?",
      time: "14:20",
      mine: false,
    },
    {
      id: 2,
      sender: "me",
      content: "저는 24px로 통일했어요",
      time: "14:21",
      mine: true,
    },
    {
      id: 3,
      sender: "디자인메이트",
      content: "좋네요! 저도 맞춰볼게요",
      time: "14:22",
      mine: false,
    },
    {
      id: 4,
      sender: "me",
      content: "오늘 컴포넌트 정리 공유드려요",
      time: "14:23",
      mine: true,
    },
  ],
  "react-worklog": [
    {
      id: 1,
      sender: "프론트러너",
      content: "오늘 채팅방 입력창 레이아웃 작업했어요",
      time: "10:02",
      mine: false,
    },
    {
      id: 2,
      sender: "me",
      content: "오늘 작업 기록 공유합니다!",
      time: "10:05",
      mine: true,
    },
  ],
  "portfolio-club": [
    {
      id: 1,
      sender: "스터디메이트",
      content: "이번 주 정리한 내용 공유해요.",
      time: "09:40",
      mine: false,
    },
  ],
};
