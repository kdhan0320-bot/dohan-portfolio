import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import {
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import ScheduleRounded from "@mui/icons-material/ScheduleRounded";
import VideocamOutlined from "@mui/icons-material/VideocamOutlined";
import ActivityTabs from "../components/ui/ActivityTabs";
import MainLayout from "../components/layout/MainLayout";
import { useDemoData } from "../hooks/useDemoData";
import { getRandomProfileAvatar } from "../constants/demoUser";
export default function Meetup() {
  const { meetups, joinMeetup, leaveMeetup, profile } = useDemoData();
  const [filter, setFilter] = useState("전체 모임");
  const [target, setTarget] = useState(null);
  const [leave, setLeave] = useState(null);
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const selectedGroup = params.get("group");
  useEffect(() => {
    if (selectedGroup)
      document
        .getElementById(`group-${selectedGroup}`)
        ?.scrollIntoView({ block: "start" });
  }, [selectedGroup]);
  return (
    <MainLayout>
      <div className="page-heading">
        <div>
          <p className="eyebrow">기록에서 이어지는 만남</p>
          <h1>함께하면 조금 더 멀리</h1>
          <p>같은 관심사를 가진 사람들과 작업을 이어가요.</p>
        </div>
      </div>
      <ActivityTabs
        id="meetups"
        label="모임 분류"
        items={[
          "전체 모임",
          {
            value: "참여 중",
            label: `참여 중 ${meetups.filter((m) => m.joined).length}`,
          },
        ]}
        value={filter}
        onChange={setFilter}
        className="meetup-filters"
      >
        <div className="meetup-list">
          {meetups
            .filter((m) => filter === "전체 모임" || m.joined)
            .map((m) => (
              <article
                key={m.id}
                id={`group-${m.id}`}
                className={`meetup-card ${params.get("group") === m.id ? "highlight" : ""}`}
                aria-label={m.name}
              >
                <div className="meetup-card-top">
                  <span className={`group-symbol ${m.color}`}>{m.letter}</span>
                  <div>
                    <small>
                      {m.category} · {m.host}의 모임
                    </small>
                    <h2>{m.name}</h2>
                  </div>
                  <span className={`state-label ${m.joined ? "joined" : ""}`}>
                    {m.joined
                      ? "참여 중"
                      : m.current >= m.capacity
                        ? "모집 마감"
                        : "모집 중"}
                  </span>
                </div>
                <p className="meetup-description">{m.description}</p>
                <div className="meetup-details">
                  <span>
                    <ScheduleRounded />
                    {m.schedule} · {m.duration}
                  </span>
                  <span>
                    <VideocamOutlined />
                    {m.location}
                  </span>
                </div>
                <div className="meetup-topic">{m.prompt}</div>
                <div className="meetup-card-footer">
                  <div className="member-summary">
                    <span className="member-faces">
                      {[...m.people, ...(m.joined ? [profile.nickname] : [])]
                        .slice(0, 4)
                        .map((name, i) => (
                          <Avatar key={i} src={getRandomProfileAvatar(name)} />
                        ))}
                    </span>
                    <span>
                      <b>{m.current}</b> / {m.capacity}명
                    </span>
                  </div>
                  {m.joined ? (
                    <Link to={`/chat/${m.id}`} className="button secondary">
                      대화 이어가기
                    </Link>
                  ) : (
                    <button
                      className="button primary"
                      disabled={m.current >= m.capacity}
                      onClick={() => setTarget(m)}
                    >
                      {m.current >= m.capacity ? "모집이 끝났어요" : "함께하기"}
                    </button>
                  )}
                </div>
                {filter === "참여 중" && (
                  <button className="meetup-exit" onClick={() => setLeave(m)}>
                    모임 나가기
                  </button>
                )}
              </article>
            ))}
        </div>
        {filter === "참여 중" && !meetups.some((m) => m.joined) && (
          <div className="empty-state">
            <h2>함께할 모임을 찾아보세요</h2>
            <p>관심 있는 모임에 참여하면 대화를 이어갈 수 있어요.</p>
            <button
              className="button secondary"
              onClick={() => setFilter("전체 모임")}
            >
              전체 모임 보기
            </button>
          </div>
        )}
      </ActivityTabs>
      <Dialog
        open={Boolean(target)}
        onClose={() => setTarget(null)}
        aria-labelledby="join-title"
      >
        <DialogTitle id="join-title">이 모임에 함께할까요?</DialogTitle>
        <DialogContent>
          {target && (
            <div className="join-summary">
              <strong>{target.name}</strong>
              <p>
                {target.schedule}
                <br />
                {target.location}
                <br />
                {target.current} / {target.capacity}명 참여 중
              </p>
            </div>
          )}
          <p className="muted" style={{ fontSize: 13, lineHeight: 1.8 }}>
            참여하면 모임 대화방으로 이어져요. 이 체험에서는 실제 신청이나
            메시지 전송 없이 내 브라우저에만 반영됩니다.
          </p>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setTarget(null)}>다음에 할게요</Button>
          <Button
            variant="contained"
            onClick={() => {
              if (joinMeetup(target.id)) {
                navigate(`/chat/${target.id}`);
              }
              setTarget(null);
            }}
          >
            참여하고 대화방 열기
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={Boolean(leave)}
        onClose={() => setLeave(null)}
        aria-labelledby="leave-title"
      >
        <DialogTitle id="leave-title">모임에서 나갈까요?</DialogTitle>
        <DialogContent>
          참여 모임에서 제외됩니다. 다시 참여하면 이 브라우저에 남아 있는 대화를
          이어갈 수 있어요.
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setLeave(null)}>유지하기</Button>
          <Button
            color="error"
            onClick={() => {
              leaveMeetup(leave.id);
              setLeave(null);
            }}
          >
            나가기
          </Button>
        </DialogActions>
      </Dialog>
    </MainLayout>
  );
}
