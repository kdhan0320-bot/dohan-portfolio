import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Alert,
  Avatar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Snackbar,
} from "@mui/material";
import ArrowOutwardRounded from "@mui/icons-material/ArrowOutwardRounded";
import CloseRounded from "@mui/icons-material/CloseRounded";
import TopBar from "./TopBar";
import BottomNav, { NavItems } from "./BottomNav";
import { useDemoData } from "../../hooks/useDemoData";
export default function MainLayout({ children, wide = false, chat = false }) {
  const { profile, meetups, storageError, notice, setNotice } = useDemoData();
  const [about, setAbout] = useState(false);
  const { pathname } = useLocation();
  const main = useRef(null);
  useEffect(() => {
    main.current?.focus({ preventScroll: true });
  }, [pathname]);
  return (
    <div className="app">
      <a
        className="skip-link"
        href="#main-content"
        onClick={(e) => {
          e.preventDefault();
          document.getElementById("main-content")?.focus();
        }}
      >
        본문으로 건너뛰기
      </a>
      <TopBar />
      <div className={`app-grid ${wide ? "wide" : ""}`}>
        <aside className="left-rail">
          <nav className="desktop-nav" aria-label="주요 메뉴">
            <NavItems desktop />
          </nav>
          <div className="rail-bottom">
            <Link to="/profile" className="rail-profile">
              <Avatar src={profile.profile_image_url} />
              <div>
                <strong>{profile.nickname}</strong>
                <span>나의 작은 작업실</span>
              </div>
            </Link>
            <button className="text-button" onClick={() => setAbout(true)}>
              이 공간에 대하여 <ArrowOutwardRounded fontSize="inherit" />
            </button>
            <small>© Mini SNS · 작은 기록의 힘</small>
          </div>
        </aside>
        <main
          id="main-content"
          ref={main}
          data-route={pathname}
          tabIndex={-1}
          className={`main-content ${chat ? "chat-main" : ""}`}
          key={pathname}
        >
          {storageError && (
            <Alert severity="warning" sx={{ mb: 2 }}>
              브라우저 저장 공간이 부족하거나 저장이 차단됐어요. 이번 변경은
              새로고침하면 사라질 수 있어요. 첨부 이미지 용량을 줄여주세요.
            </Alert>
          )}
          {!chat && (
            <div className="demo-note">
              <span className="status-dot" />
              기록은 이 브라우저에만 저장돼요.
              <button onClick={() => setAbout(true)}>안내</button>
            </div>
          )}
          {children}
        </main>
        {!wide && (
          <aside className="right-rail">
            <section className="daily-note">
              <span className="eyebrow">한 장의 기록, 세 가지 시선</span>
              <h2>
                오늘의 시도에
                <br />
                다른 생각을 더해요.
              </h2>
              <ol className="stacked-notes">
                <li>
                  <b>01</b>
                  <span>
                    시도<small>오늘 해본 것 하나</small>
                  </span>
                </li>
                <li>
                  <b>02</b>
                  <span>
                    이유<small>그 선택을 한 까닭</small>
                  </span>
                </li>
                <li>
                  <b>03</b>
                  <span>
                    대화<small>아직 궁금한 것</small>
                  </span>
                </li>
              </ol>
              <Link to="/create">
                나의 한 장 남기기 <ArrowOutwardRounded fontSize="small" />
              </Link>
            </section>
            <section className="rail-section">
              <div className="section-label">
                <h2>함께하는 작은 모임</h2>
                <Link to="/meetup">전체</Link>
              </div>
              {meetups.slice(0, 2).map((m) => (
                <Link
                  to={`/meetup?group=${m.id}`}
                  className="mini-meetup"
                  key={m.id}
                >
                  <span className={`group-symbol ${m.color}`}>{m.letter}</span>
                  <div>
                    <strong>{m.name}</strong>
                    <span>
                      {m.current}/{m.capacity}명 ·{" "}
                      {m.joined ? "참여 중" : "모집 중"}
                    </span>
                  </div>
                </Link>
              ))}
            </section>
            <p className="rail-footnote">
              서로의 과정을 존중해요.
              <br />
              구체적인 피드백은 다음 시도의 힘이 됩니다.
            </p>
          </aside>
        )}
      </div>
      {!chat && <BottomNav />}
      <Snackbar
        open={Boolean(notice)}
        autoHideDuration={3200}
        onClose={() => setNotice("")}
        message={notice}
        action={
          <button
            className="snack-close"
            aria-label="알림 닫기"
            onClick={() => setNotice("")}
          >
            <CloseRounded fontSize="small" />
          </button>
        }
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        sx={{ bottom: { xs: 86, md: 24 } }}
      />
      <Dialog
        open={about}
        onClose={() => setAbout(false)}
        aria-labelledby="about-title"
      >
        <DialogTitle id="about-title">작은 기록을 나누는 연습</DialogTitle>
        <DialogContent className="about-content">
          <p>
            Mini SNS는 작업 기록을 공유하고, 스터디에 참여하고, 대화를 이어가는
            프론트엔드 체험 작품입니다.
          </p>
          <p>
            게시물, 인물, 모임과 기존 반응은 시연을 위한 예시입니다. 직접 작성한
            기록·댓글·대화·프로필·참여 상태는 이 브라우저에 저장됩니다.
          </p>
          <p>
            서버 전송, 실제 회원가입, 다른 사람과의 실시간 대화는 제공하지
            않습니다. 다른 기기와 동기화되지 않으며, 브라우저 데이터를 지우면
            기록도 사라집니다.
          </p>
          <a
            href="https://github.com/kdhan0320-bot/dohan-portfolio/tree/main/lecture1/mini-sns"
            target="_blank"
            rel="noreferrer"
          >
            제작 코드 보기 ↗
          </a>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAbout(false)}>알겠어요</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
