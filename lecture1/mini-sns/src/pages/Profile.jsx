import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import LogoutRounded from "@mui/icons-material/LogoutRounded";
import MainLayout from "../components/layout/MainLayout";
import PostCard from "../components/ui/PostCard";
import { useDemoData } from "../hooks/useDemoData";
import { useAuth } from "../hooks/useAuth";
import { DEMO_USER } from "../constants/demoUser";
export default function Profile() {
  const { profile, updateProfile, posts, meetups } = useDemoData();
  const { exitGuestMode } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState("내 기록");
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState(profile.nickname);
  const [bio, setBio] = useState(profile.bio);
  const [exit, setExit] = useState(false);
  const mine = posts.filter((p) => p.user_id === DEMO_USER.id),
    saved = posts.filter((p) => p.saved),
    joined = meetups.filter((m) => m.joined);
  const list = tab === "내 기록" ? mine : saved;
  return (
    <MainLayout>
      <section className="profile-panel">
        <div className="profile-cover">
          <span>MY LITTLE WORKSPACE</span>
        </div>
        <div className="profile-identity">
          <Avatar src={profile.profile_image_url} />
          <div>
            <h1>{profile.nickname}</h1>
            <p>{profile.handle}</p>
          </div>
          <button
            className="button secondary"
            onClick={() => {
              setName(profile.nickname);
              setBio(profile.bio);
              setEdit(true);
            }}
          >
            프로필 수정
          </button>
        </div>
        <p className="profile-bio">
          {profile.bio || "나를 소개하는 한 줄을 남겨보세요."}
        </p>
        <div className="profile-stats">
          {[
            ["내 기록", mine.length],
            ["저장한 기록", saved.length],
            ["참여 모임", joined.length],
          ].map(([label, count]) => (
            <button key={label} onClick={() => setTab(label)}>
              <strong>{count}</strong>
              <span>{label}</span>
            </button>
          ))}
        </div>
      </section>
      <div
        className="filter-tabs profile-tabs"
        role="tablist"
        aria-label="내 활동"
      >
        {["내 기록", "저장한 기록", "참여 모임"].map((t) => (
          <button
            role="tab"
            aria-selected={t === tab}
            className={t === tab ? "selected" : ""}
            key={t}
            onClick={() => setTab(t)}
          >
            {t}
          </button>
        ))}
      </div>
      {tab === "참여 모임" ? (
        <div className="meetup-list">
          {joined.map((m) => (
            <Link
              key={m.id}
              to={`/chat/${m.id}`}
              className="meetup-card mini-meetup"
            >
              <span className={`group-symbol ${m.color}`}>{m.letter}</span>
              <div>
                <strong>{m.name}</strong>
                <span>
                  {m.current} / {m.capacity}명 · 대화 이어가기 →
                </span>
              </div>
            </Link>
          ))}
          {!joined.length && (
            <div className="empty-state">
              <h2>아직 함께하는 모임이 없어요</h2>
              <Link to="/meetup" className="button secondary">
                모임 찾아보기
              </Link>
            </div>
          )}
        </div>
      ) : (
        <div className="profile-post-list">
          {list.map((p) => (
            <PostCard key={p.id} post={p} />
          ))}
          {!list.length && (
            <div className="empty-state">
              <h2>
                {tab === "내 기록"
                  ? "나의 첫 기록을 남겨보세요"
                  : "다시 보고 싶은 기록을 모아보세요"}
              </h2>
              <p>
                {tab === "내 기록"
                  ? "오늘의 작은 시도로 충분해요."
                  : "피드에서 북마크를 누르면 여기에 모입니다."}
              </p>
              <Link
                to={tab === "내 기록" ? "/create" : "/"}
                className="button secondary"
              >
                {tab === "내 기록" ? "기록 남기기" : "피드 둘러보기"}
              </Link>
            </div>
          )}
        </div>
      )}
      <div className="profile-footer">
        <Button startIcon={<LogoutRounded />} onClick={() => setExit(true)}>
          시작 화면으로
        </Button>
      </div>
      <Dialog
        open={edit}
        onClose={() => setEdit(false)}
        aria-labelledby="profile-edit-title"
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (name.trim()) {
              updateProfile({ nickname: name.trim(), bio: bio.trim() });
              setEdit(false);
            }
          }}
        >
          <DialogTitle id="profile-edit-title">
            나를 소개하는 작은 기록
          </DialogTitle>
          <DialogContent sx={{ pt: "12px!important", display: "grid", gap: 3 }}>
            <TextField
              label="이름"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              fullWidth
              slotProps={{ htmlInput: { maxLength: 16 } }}
              helperText="16자 이내"
            />
            <TextField
              label="한 줄 소개"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              multiline
              rows={3}
              fullWidth
              slotProps={{ htmlInput: { maxLength: 120 } }}
              helperText={`${bio.length} / 120`}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setEdit(false)}>취소</Button>
            <Button type="submit" variant="contained" disabled={!name.trim()}>
              저장하기
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      <Dialog
        open={exit}
        onClose={() => setExit(false)}
        aria-labelledby="exit-title"
      >
        <DialogTitle id="exit-title">시작 화면으로 돌아갈까요?</DialogTitle>
        <DialogContent>
          작성한 기록과 참여 상태는 이 브라우저에 그대로 남아 있어요.
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setExit(false)}>계속 둘러보기</Button>
          <Button
            onClick={() => {
              exitGuestMode();
              navigate("/login");
            }}
          >
            돌아가기
          </Button>
        </DialogActions>
      </Dialog>
    </MainLayout>
  );
}
