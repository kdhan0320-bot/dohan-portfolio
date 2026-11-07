import sampleCardUi from "../assets/samples/sample-card-ui.svg";
import sampleStudy from "../assets/samples/sample-study.svg";
import sampleChatUx from "../assets/samples/sample-chat-ux.svg";
import sampleProfileUi from "../assets/samples/sample-profile-ui.svg";
import sampleFlowUi from "../assets/samples/sample-flow-ui.svg";

const SAMPLE_IMAGES = [
  sampleCardUi,
  sampleStudy,
  sampleChatUx,
  sampleProfileUi,
  sampleFlowUi,
];

export const getRandomSampleImage = () =>
  SAMPLE_IMAGES[Math.floor(Math.random() * SAMPLE_IMAGES.length)];
