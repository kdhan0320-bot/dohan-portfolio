import card from "../assets/samples/sample-card-ui.svg";
import study from "../assets/samples/sample-study.svg";
import chat from "../assets/samples/sample-chat-ux.svg";
import profile from "../assets/samples/sample-profile-ui.svg";
import flow from "../assets/samples/sample-flow-ui.svg";
export const SAMPLE_ART = [
  { id: "card", src: card, name: "여행 앱 화면 연구" },
  { id: "study", src: study, name: "작은 화면 스터디 포스터" },
  { id: "chat", src: chat, name: "읽기 편한 대화 화면" },
  { id: "profile", src: profile, name: "mori 브랜드 탐색" },
  { id: "flow", src: flow, name: "금요일의 작업 노트" },
];
export const sampleImage = (id) =>
  SAMPLE_ART.find((a) => a.id === id)?.src || "";
export const getRandomSampleImage = () => SAMPLE_ART[0].src;
