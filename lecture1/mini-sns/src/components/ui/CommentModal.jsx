import { useEffect, useRef, useState } from "react";
import {
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  TextField,
} from "@mui/material";
import CloseRounded from "@mui/icons-material/CloseRounded";
import SendRounded from "@mui/icons-material/SendRounded";
import EditOutlined from "@mui/icons-material/EditOutlined";
import DeleteOutlineRounded from "@mui/icons-material/DeleteOutlineRounded";
import { useDemoData } from "../../hooks/useDemoData";
import { DEMO_USER, getRandomProfileAvatar } from "../../constants/demoUser";
import { formatDistanceToNow } from "../../utils/timeFormat";
export default function CommentModal({
  open,
  onClose,
  postId,
  comments,
  feedbackQuestion,
}) {
  const { addComment, updateComment, deleteComment, profile } = useDemoData();
  const input = useRef(null);
  const list = useRef(null);
  const previousCount = useRef(comments.length);
  useEffect(() => {
    if (open && comments.length > previousCount.current && list.current) {
      list.current.scrollTop = list.current.scrollHeight;
    }
    previousCount.current = comments.length;
  }, [comments.length, open]);
  const [text, setText] = useState("");
  const [edit, setEdit] = useState(null);
  const [draft, setDraft] = useState("");
  const submit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      addComment(postId, text);
      setText("");
      input.current?.focus();
    }
  };
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby={`comments-${postId}`}
      className="comments-dialog"
    >
      <DialogTitle id={`comments-${postId}`} className="dialog-heading">
        댓글 <span className="count-accent">{comments.length}</span>
        <IconButton aria-label="댓글 닫기" onClick={onClose}>
          <CloseRounded />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers className="comments-list" ref={list}>
        {feedbackQuestion && (
          <div className="feedback-context">
            <span className="eyebrow">이 기록의 질문</span>
            <p>{feedbackQuestion}</p>
            <span>경험이나 이유를 덧붙이면 더 좋은 피드백이 돼요.</span>
          </div>
        )}
        {!comments.length && (
          <div className="empty-state">
            <h2>첫 이야기를 건네보세요</h2>
            <p>마음에 든 부분이나 궁금한 점을 나눠요.</p>
          </div>
        )}
        {comments.map((c) => (
          <div className="comment" key={c.id}>
            <Avatar
              src={
                c.user_id === DEMO_USER.id
                  ? profile.profile_image_url
                  : c.profiles.profile_image_url ||
                    getRandomProfileAvatar(c.profiles.nickname)
              }
              sx={{ width: 34, height: 34 }}
            />
            <div className="comment-body">
              <div className="comment-meta">
                <strong>
                  {c.user_id === DEMO_USER.id
                    ? profile.nickname
                    : c.profiles.nickname}
                </strong>
                <time>{formatDistanceToNow(c.created_at)}</time>
              </div>
              {edit === c.id ? (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (draft.trim()) {
                      updateComment(postId, c.id, draft);
                      setEdit(null);
                      input.current?.focus();
                    }
                  }}
                >
                  <TextField
                    fullWidth
                    size="small"
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    slotProps={{
                      htmlInput: {
                        "aria-label": "댓글 수정 내용",
                        maxLength: 500,
                      },
                    }}
                  />
                  <Button type="submit" disabled={!draft.trim()}>
                    저장
                  </Button>
                  <Button
                    onClick={() => {
                      setEdit(null);
                      input.current?.focus();
                    }}
                  >
                    취소
                  </Button>
                </form>
              ) : (
                <p>{c.content}</p>
              )}
              {c.user_id === DEMO_USER.id && edit !== c.id && (
                <div className="comment-options">
                  <button
                    onClick={() => {
                      setEdit(c.id);
                      setDraft(c.content);
                    }}
                    aria-label="댓글 수정"
                  >
                    <EditOutlined />
                    수정
                  </button>
                  <button
                    onClick={() => {
                      deleteComment(postId, c.id);
                      input.current?.focus();
                    }}
                    aria-label="댓글 삭제"
                  >
                    <DeleteOutlineRounded />
                    삭제
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </DialogContent>
      <form className="comment-form" onSubmit={submit}>
        <Avatar
          src={profile.profile_image_url}
          sx={{ width: 34, height: 34 }}
        />
        <TextField
          size="small"
          inputRef={input}
          placeholder={
            feedbackQuestion
              ? "질문에 대한 생각을 나눠주세요"
              : "따뜻한 피드백을 남겨주세요"
          }
          value={text}
          onChange={(e) => setText(e.target.value)}
          fullWidth
          slotProps={{
            htmlInput: { "aria-label": "댓글 입력", maxLength: 500 },
          }}
          onKeyDown={(e) => {
            if (e.nativeEvent.isComposing && e.key === "Enter")
              e.preventDefault();
          }}
        />
        <IconButton
          type="submit"
          disabled={!text.trim()}
          color="primary"
          aria-label="댓글 보내기"
        >
          <SendRounded />
        </IconButton>
      </form>
    </Dialog>
  );
}
