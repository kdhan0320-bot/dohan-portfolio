import { DEMO_USER, getRandomProfileAvatar } from "./demoUser";
export const buildInitialPosts = () => {
  const ago = (minutes) => new Date(Date.now() - minutes * 60000).toISOString();
  const comment = (id, name, content, mins) => ({
    id,
    user_id: name,
    profiles: {
      nickname: name,
      profile_image_url: getRandomProfileAvatar(name),
    },
    content,
    created_at: ago(mins),
  });
  return [
    {
      id: "guest-1",
      reflection: {
        reason:
          "처음 화면에 목적지가 한꺼번에 보여 선택이 어려웠어요. 추천 수를 줄이고, 장소 이름과 저장 행동을 가까이 묶었습니다.",
        question:
          "저장 버튼이 충분히 눈에 들어오나요? 위치와 크기에 대한 의견이 궁금해요.",
      },
      user_id: DEMO_USER.id,
      profiles: DEMO_USER,
      title: "여행의 시작은, 조금 더 가볍게",
      caption:
        "여행 앱의 탐색 화면을 정리했어요. 선택지는 줄이고, 지금 떠나고 싶은 장소에 시선이 머물도록 여백을 넉넉하게 두었습니다.",
      category: "작업기록",
      imageKey: "card",
      image_url: "",
      hashtag: "#UI디자인 #모바일UI",
      created_at: ago(32),
      liked: false,
      saved: false,
      likes_count: 24,
      comments: [
        comment(
          "c1",
          "민준",
          "장소 이름과 사진의 간격이 편안해요. 저장 버튼 위치도 자연스럽네요.",
          22,
        ),
        comment("c2", "서연", "여백을 넓힌 이유가 화면에서 잘 느껴져요.", 15),
      ],
    },
    {
      id: "guest-2",
      reflection: {
        reason:
          "혼자 보면 익숙해서 지나치는 부분이 많아요. 같은 화면을 서로 다른 시선으로 읽어보고 싶었습니다.",
        question:
          "평소 쓰면서 편했던 앱 화면이 있나요? 첫 모임에서 함께 살펴봐요.",
      },
      user_id: "seoyeon",
      profiles: {
        nickname: "서연",
        profile_image_url: getRandomProfileAvatar("서연"),
        role: "UX 디자이너",
      },
      title: "좋은 화면을 함께 읽어볼 사람?",
      caption:
        "수요일 저녁, 하나의 앱을 골라 사용 흐름을 같이 살펴봐요. 이번 주는 ‘쓰고 싶은 피드’가 주제예요. 작은 의견도 환영합니다.",
      category: "스터디",
      imageKey: "study",
      image_url: "",
      hashtag: "#스터디 #피드백",
      meetupId: "mobile-ui-study",
      created_at: ago(80),
      liked: false,
      saved: false,
      likes_count: 18,
      comments: [comment("c3", "유진", "작업 중인 화면도 가져가 볼게요!", 63)],
    },
    {
      id: "guest-3",
      reflection: {
        reason:
          "대화가 길어질수록 입력창까지 함께 밀려났어요. 읽는 영역과 쓰는 영역을 나눠 대화를 이어가기 쉽게 했습니다.",
        question:
          "입력 중인 메시지가 길어지면, 입력창을 몇 줄까지 늘리는 게 편할까요?",
      },
      user_id: "minjun",
      profiles: {
        nickname: "민준",
        profile_image_url: getRandomProfileAvatar("민준"),
        role: "프론트엔드 개발자",
      },
      title: "대화가 길어져도, 입력창은 제자리에",
      caption:
        "메시지 목록만 스크롤되도록 바꿨어요. 긴 문장과 한글 입력까지 확인하니 작은 채팅창에도 챙길 부분이 많네요.",
      category: "작업기록",
      imageKey: "chat",
      image_url: "",
      hashtag: "#React #인터랙션",
      created_at: ago(160),
      liked: false,
      saved: false,
      likes_count: 31,
      comments: [
        comment(
          "c4",
          "지우",
          "한글 조합 중 Enter 처리도 중요하더라고요. 공감해요.",
          140,
        ),
      ],
    },
    {
      id: "guest-4",
      reflection: {
        reason:
          "식물의 생기와 종이의 편안함을 함께 담고 싶었어요. 선명한 초록 대신 깊은 녹색과 따뜻한 바탕을 골랐습니다.",
        question:
          "작은 가격표에도 이 분위기가 남을까요? 글자와 여백의 균형이 고민이에요.",
      },
      user_id: "yujin",
      profiles: {
        nickname: "유진",
        profile_image_url: getRandomProfileAvatar("유진"),
        role: "브랜드 디자이너",
      },
      title: "초록 하나로 시작한 작은 브랜드",
      caption:
        "동네 식물 가게를 상상하며 만든 ‘mori’의 첫 번째 시안. 차분한 초록과 종이의 따뜻한 색을 함께 써봤어요.",
      category: "작업기록",
      imageKey: "profile",
      image_url: "",
      hashtag: "#브랜딩 #타이포그래피",
      created_at: ago(240),
      liked: false,
      saved: true,
      likes_count: 42,
      comments: [
        comment("c5", "서연", "포장지에 적용한 모습도 보고 싶어요.", 190),
      ],
    },
    {
      id: "guest-5",
      reflection: {
        reason:
          "완성 화면만 모으니 당시의 판단을 설명하기 어려웠어요. 다음 작업에서 다시 꺼내 쓸 수 있는 기록을 찾고 있습니다.",
        question:
          "여러분은 작업 중 무엇을 꼭 남기나요? 부담 없이 이어가는 방법을 나눠주세요.",
      },
      user_id: "jiwoo",
      profiles: {
        nickname: "지우",
        profile_image_url: getRandomProfileAvatar("지우"),
        role: "UI 디자이너",
      },
      title: "작업 기록, 어디까지 남기고 있나요?",
      caption:
        "최종 화면만 남기면 왜 바꿨는지 잊어버리더라고요. 저는 이번 주부터 ‘시도한 것 / 바꾼 이유 / 다음 할 일’ 세 줄로 기록하고 있어요. 여러분만의 방법도 궁금해요.",
      category: "질문",
      imageKey: "",
      image_url: "",
      hashtag: "#작업기록 #회고",
      created_at: ago(340),
      liked: false,
      saved: false,
      likes_count: 12,
      comments: [
        comment(
          "c6",
          "민준",
          "저는 수정 전 화면을 꼭 한 장 남겨요. 비교할 때 도움이 됩니다.",
          280,
        ),
      ],
    },
  ];
};
