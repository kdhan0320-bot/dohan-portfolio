import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Avatar, IconButton } from "@mui/material";
import ArrowBackRounded from "@mui/icons-material/ArrowBackRounded";
import SendRounded from "@mui/icons-material/SendRounded";
import ChatBubbleOutlineRounded from "@mui/icons-material/ChatBubbleOutlineRounded";
import AddRounded from "@mui/icons-material/AddRounded";
import MainLayout from "../components/layout/MainLayout";
import BottomNav from "../components/layout/BottomNav";
import { useDemoData } from "../hooks/useDemoData";
import { getRandomProfileAvatar } from "../constants/demoUser";
function Conversation({ room }) {
  const { messages, sendMessage, markRoomRead } = useDemoData();
  const [text, setText] = useState("");
  const scroll = useRef(null);
  const rows = messages[room.id] || [];
  useEffect(() => {
    markRoomRead(room.id);
  }, [room.id, markRoomRead]);
  useEffect(() => {
    if (scroll.current) scroll.current.scrollTop = scroll.current.scrollHeight;
  }, [rows.length, room.id]);
  const submit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      sendMessage(room.id, text);
      setText("");
    }
  };
  return (
    <section className="conversation" aria-label={`${room.name} 대화방`}>
      <div className="conversation-header">
        <IconButton
          component={Link}
          to="/chat"
          aria-label="대화 목록으로"
          className="chat-back"
        >
          <ArrowBackRounded />
        </IconButton>
        <span className={`group-symbol ${room.color}`}>{room.letter}</span>
        <div>
          <h1>{room.name}</h1>
          <p>
            {room.current}명 참여 중 · {room.category}
          </p>
        </div>
      </div>
      <div
        className="conversation-body"
        ref={scroll}
        role="log"
        aria-label="대화 내용"
        aria-live="polite"
      >
        <p className="chat-date">작은 기록으로 시작하는 대화</p>
        {rows.map((msg) => (
          <div className={`message ${msg.mine ? "mine" : ""}`} key={msg.id}>
            {!msg.mine && (
              <Avatar
                src={getRandomProfileAvatar(msg.sender)}
                sx={{ width: 29, height: 29 }}
              />
            )}
            <div className="message-content">
              {!msg.mine && <strong>{msg.sender}</strong>}
              <p>{msg.content}</p>
              <time>{msg.time}</time>
            </div>
          </div>
        ))}
      </div>
      <p className="chat-demo-note">
        체험용 대화방 · 입력한 메시지는 다른 사람에게 전송되지 않아요.
      </p>
      <form className="chat-form" onSubmit={submit}>
        <textarea
          aria-label="메시지 입력"
          placeholder="작업 이야기를 이어가세요"
          rows={1}
          maxLength={1000}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (
              e.key === "Enter" &&
              !e.shiftKey &&
              !e.nativeEvent.isComposing
            ) {
              e.preventDefault();
              submit(e);
            }
          }}
        />
        <button
          type="submit"
          disabled={!text.trim()}
          aria-label="메시지 보내기"
        >
          <SendRounded />
        </button>
      </form>
    </section>
  );
}
export default function Chat() {
  const { roomId } = useParams();
  const { meetups, messages, readRooms } = useDemoData();
  const rooms = meetups.filter((m) => m.joined);
  const room = rooms.find((m) => m.id === roomId);
  const known = meetups.find((m) => m.id === roomId);
  return (
    <MainLayout wide chat>
      <div className={`chat-panel ${roomId ? "has-room" : ""}`}>
        <aside className="chat-list-panel">
          {roomId ? <h2>대화</h2> : <h1>대화</h1>}
          <p className="muted">함께하는 작업의 다음 이야기</p>
          {rooms.map((r) => (
            <Link
              className={`room-link ${r.id === roomId ? "active" : ""}`}
              to={`/chat/${r.id}`}
              key={r.id}
            >
              <span className={`group-symbol ${r.color}`}>{r.letter}</span>
              <div>
                <strong>{r.name}</strong>
                <p>
                  {messages[r.id]?.at(-1)?.content || "첫 인사를 남겨보세요"}
                </p>
                <small>{r.current}명 참여 중</small>
              </div>
              {!readRooms.includes(r.id) && (
                <span className="unread-dot" aria-label="읽지 않은 대화" />
              )}
            </Link>
          ))}
          <Link to="/meetup" className="chat-discover">
            <AddRounded fontSize="small" />
            새로운 모임 찾아보기
          </Link>
          {!rooms.length && (
            <p className="muted" style={{ padding: 20, fontSize: 12 }}>
              모임에 참여하면 대화방이 여기에 나타나요.
            </p>
          )}
        </aside>
        {room ? (
          <Conversation key={room.id} room={room} />
        ) : (
          <div className="conversation-empty">
            <ChatBubbleOutlineRounded />
            <h2>
              {roomId
                ? known
                  ? "먼저 모임에 참여해 주세요"
                  : "대화방을 찾을 수 없어요"
                : "작업의 다음 이야기를 이어가요"}
            </h2>
            <p>
              {roomId
                ? "모임을 살펴보고 함께할 대화를 선택해요."
                : "왼쪽에서 참여 중인 모임을 선택해 주세요."}
            </p>
            {roomId && (
              <>
                <Link
                  to={known ? `/meetup?group=${known.id}` : "/meetup"}
                  className="button primary"
                >
                  모임 살펴보기
                </Link>
                <Link to="/chat" className="back-link">
                  대화 목록으로
                </Link>
              </>
            )}
          </div>
        )}
      </div>
      {!roomId && (
        <div className="mobile-only">
          <BottomNav />
        </div>
      )}
    </MainLayout>
  );
}
