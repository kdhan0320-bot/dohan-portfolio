export const MEETUPS = [
  {
    id: "mobile-ui-study",
    name: "작은 화면을 깊이 읽는 시간",
    category: "UI · UX",
    description:
      "매주 하나의 앱을 함께 살펴보고, 더 나은 화면을 제안해요. 완성된 작업이 없어도 괜찮아요.",
    schedule: "매주 수요일 · 오후 8:00",
    duration: "60분",
    location: "온라인 · 앱 내 채팅",
    baseMembers: 3,
    capacity: 5,
    people: ["서연", "유진", "민준"],
    tags: ["모바일UI", "피드백"],
    color: "lavender",
    letter: "UI",
    prompt: "이번 주 주제: 쓰고 싶은 피드의 공통점",
    host: "서연",
  },
  {
    id: "react-worklog",
    name: "하루 한 조각, React",
    category: "프론트엔드",
    description:
      "작게 만들어도 꾸준히. 오늘 구현한 것과 막혔던 부분을 가볍게 나누는 작업 인증 모임이에요.",
    schedule: "평일 · 자유롭게 기록",
    duration: "상시",
    location: "온라인 · 앱 내 채팅",
    baseMembers: 7,
    capacity: 12,
    people: ["민준", "지우", "유진"],
    tags: ["React", "작업기록"],
    color: "sage",
    letter: "</>",
    prompt: "오늘 만든 컴포넌트를 공유해 주세요",
    host: "민준",
  },
  {
    id: "portfolio-club",
    name: "금요일의 디자인 회고",
    category: "디자인",
    description:
      "이번 주의 시도 하나와 아쉬움 하나. 서로의 작업을 보며 다음에 해볼 일을 찾아요.",
    schedule: "매주 금요일 · 오후 7:30",
    duration: "45분",
    location: "온라인 · 앱 내 채팅",
    baseMembers: 4,
    capacity: 6,
    people: ["유진", "서연", "지우"],
    tags: ["회고", "브랜딩"],
    color: "peach",
    letter: "FRI",
    prompt: "완성보다 과정이 궁금해요",
    host: "유진",
  },
];
export const MOCK_MESSAGES = {
  "mobile-ui-study": [
    {
      id: "ui-1",
      sender: "서연",
      content:
        "이번 주에는 피드 화면을 함께 살펴봐요. 마음에 드는 사례 하나씩 가져와 주세요.",
      time: "오후 2:20",
      mine: false,
    },
    {
      id: "ui-2",
      sender: "유진",
      content:
        "저는 이미지보다 글이 먼저 나오는 구성이 좋았어요. 읽는 순서가 자연스럽더라고요.",
      time: "오후 2:22",
      mine: false,
    },
  ],
  "react-worklog": [
    {
      id: "r-1",
      sender: "민준",
      content: "오늘은 북마크 상태를 다른 화면에서도 유지하는 작업을 했어요.",
      time: "오전 10:02",
      mine: false,
    },
    {
      id: "r-2",
      sender: "지우",
      content: "목록과 상세 화면에서 같은 상태를 쓰는 게 생각보다 중요하네요.",
      time: "오전 10:04",
      mine: false,
    },
    {
      id: "r-3",
      sender: "도한",
      content: "저도 오늘 작업 기록을 정리해서 공유할게요!",
      time: "오전 10:05",
      mine: true,
    },
  ],
  "portfolio-club": [
    {
      id: "p-1",
      sender: "유진",
      content: "이번 주에 바꾼 화면과 그 이유를 한 장으로 정리해 봐요.",
      time: "오전 9:40",
      mine: false,
    },
  ],
};
export const MOCK_ROOMS = MEETUPS.map((m) => ({
  id: m.id,
  name: m.name,
  type: "group",
  members: m.baseMembers,
}));
