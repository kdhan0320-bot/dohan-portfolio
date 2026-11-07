import { useNavigate } from "react-router-dom";
import { Avatar } from "@mui/material";
import { useAuth } from "../hooks/useAuth";
import { SAMPLE_ART } from "../constants/samples";
import { DEMO_USER } from "../constants/demoUser";
export default function Login() {
  const { enterGuestMode } = useAuth();
  const navigate = useNavigate();
  return (
    <div className="login-page">
      <header className="login-header">
        <span className="brand">
          <span className="brand-mark" aria-hidden="true">
            <i />
            <i />
          </span>
          <span>
            mini<span className="brand-sns">SNS</span>
          </span>
        </span>
        <span>한 장씩, 함께 쌓는 작업실</span>
      </header>
      <main className="login-layout">
        <div className="login-copy">
          <p className="eyebrow">나의 시도 + 너의 생각</p>
          <h1>
            작은 시도를 적고,
            <br />
            <em>다음 생각을 만나요.</em>
          </h1>
          <p>
            완성하지 못한 작업도 괜찮아요.
            <br />
            시도한 것, 바꾼 이유, 아직 풀리지 않은 질문.
            <br />한 장의 기록에서 서로의 작업을 이어가요.
          </p>
          <button
            className="button primary"
            onClick={() => {
              enterGuestMode();
              navigate("/");
            }}
          >
            작업실 둘러보기
          </button>
          <p className="login-note">
            가입 없이 바로 시작해요. 예시 인물과 콘텐츠로 구성된 체험 공간이며,
            직접 남긴 기록은 이 브라우저에만 저장됩니다.
          </p>
        </div>
        <div className="login-art">
          <div className="landing-sheet">
            <div className="sheet-heading">
              <span>작업 기록 / 001</span>
              <span className="sheet-stamp">완성 전도 좋아요</span>
            </div>
            <h2>
              버튼 하나를 옮겼어요.
              <br />그 이유도 남겼어요.
            </h2>
            <img
              src={SAMPLE_ART[0].src}
              alt="여행 앱의 탐색 화면을 정리한 샘플 작업"
            />
            <div className="landing-record-row">
              <b className="step-index">01</b>
              <div>
                <strong>시도</strong>
                <p>저장 버튼을 사진 아래로.</p>
              </div>
            </div>
            <div className="landing-record-row">
              <b className="step-index reason">02</b>
              <div>
                <strong>이유</strong>
                <p>풍경에 묻히지 않도록.</p>
              </div>
            </div>
            <div className="landing-question">
              <b className="step-index question">03</b>
              <div>
                <strong>너의 생각은?</strong>
                <p>이 위치, 한 손으로 누르기 편할까요?</p>
              </div>
            </div>
          </div>
          <div className="landing-reply">
            <Avatar src={DEMO_USER.profile_image_url} />
            <p>
              <strong>기록에 다른 시선을 더해요.</strong>
              <span>생각을 나누면, 다음 시도가 시작되니까.</span>
            </p>
          </div>
          <p className="sample-caption">
            미니 SNS의 기록 형식을 보여주는 예시입니다.
          </p>
        </div>
      </main>
      <p className="login-footnote">
        Mini SNS · 서로의 작은 시도를 응원합니다.
      </p>
    </div>
  );
}
