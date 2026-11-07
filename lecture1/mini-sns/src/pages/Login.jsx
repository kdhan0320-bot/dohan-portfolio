import { useNavigate } from "react-router-dom";
import { Avatar } from "@mui/material";
import ArrowForwardRounded from "@mui/icons-material/ArrowForwardRounded";
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
        <span>SMALL STEPS, SHARED.</span>
      </header>
      <main className="login-layout">
        <div className="login-copy">
          <p className="eyebrow">A LITTLE WORK. A LITTLE CONNECTION.</p>
          <h1>
            작은 기록이 모여,
            <br />
            <em>다음 작업의 영감.</em>
          </h1>
          <p>
            만드는 사람들의 작은 작업실.
            <br />
            오늘의 시도를 나누고, 함께할 모임을 만나고,
            <br />
            서로의 과정에서 한 걸음 더 나아가요.
          </p>
          <button
            className="button primary"
            onClick={() => {
              enterGuestMode();
              navigate("/");
            }}
          >
            작업실 둘러보기 <ArrowForwardRounded fontSize="small" />
          </button>
          <p className="login-note">
            가입 없이 바로 시작해요. 예시 인물과 콘텐츠로 구성된 체험 공간이며,
            직접 남긴 기록은 이 브라우저에만 저장됩니다.
          </p>
        </div>
        <div className="login-art">
          <img
            src={SAMPLE_ART[0].src}
            alt="여행 앱의 탐색 화면을 정리한 샘플 작업"
          />
          <div className="login-art-caption">
            <Avatar src={DEMO_USER.profile_image_url} />
            <div>
              <strong>완성 전의 생각도, 좋은 기록이니까.</strong>
              <p>오늘 바꾼 것 하나, 그 이유 한 줄부터.</p>
            </div>
          </div>
        </div>
      </main>
      <p className="login-footnote">
        Mini SNS · 서로의 작은 시도를 응원합니다.
      </p>
    </div>
  );
}
