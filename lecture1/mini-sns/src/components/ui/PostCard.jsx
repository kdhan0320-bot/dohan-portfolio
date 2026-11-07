import { feedPath, withFeedReturn } from "../../utils/feedLocation";
import { recordLabels } from "../../utils/recordFormat";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Avatar,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import FavoriteBorderRounded from "@mui/icons-material/FavoriteBorderRounded";
import FavoriteRounded from "@mui/icons-material/FavoriteRounded";
import ChatBubbleOutlineRounded from "@mui/icons-material/ChatBubbleOutlineRounded";
import BookmarkBorderRounded from "@mui/icons-material/BookmarkBorderRounded";
import BookmarkRounded from "@mui/icons-material/BookmarkRounded";
import MoreHorizRounded from "@mui/icons-material/MoreHorizRounded";
import CloseRounded from "@mui/icons-material/CloseRounded";
import { useDemoData } from "../../hooks/useDemoData";
import { DEMO_USER } from "../../constants/demoUser";
import { formatDistanceToNow } from "../../utils/timeFormat";
import CommentModal from "./CommentModal";
export default function PostCard({
  post,
  openComments = false,
  feedPreview = false,
}) {
  const { toggleLike, toggleSave, deletePost, profile } = useDemoData();
  const navigate = useNavigate();
  const { pathname, search } = useLocation();
  const feedReturn = feedPath(
    pathname === "/" ? `/${search}` : new URLSearchParams(search).get("from"),
  );
  const [comments, setComments] = useState(openComments);
  const [image, setImage] = useState(false);
  const [menu, setMenu] = useState(null);
  const [confirm, setConfirm] = useState(false);
  const labels = recordLabels(post.category);
  const own = post.user_id === DEMO_USER.id;
  return (
    <article
      className={`post-card ${feedPreview ? "feed-preview" : ""}`}
      aria-label={post.title || "작업 기록"}
      data-post-id={post.id}
    >
      <div className="post-header">
        <Avatar
          src={post.profiles.profile_image_url}
          sx={{ width: 40, height: 40 }}
        />
        <div className="post-author">
          <strong>
            {post.profiles.nickname}
            {own && <span className="own-label">나</span>}
          </strong>
          <span>
            {post.profiles.role || "디자인 · 프론트엔드"}
            <i>·</i>
            <time dateTime={post.created_at}>
              {formatDistanceToNow(post.created_at)}
            </time>
          </span>
        </div>
        <span className="category-label">{post.category}</span>
        {own && (
          <IconButton
            aria-label="게시물 메뉴"
            onClick={(e) => setMenu(e.currentTarget)}
          >
            <MoreHorizRounded />
          </IconButton>
        )}
      </div>
      <div className="post-copy">
        <h2>
          <Link to={withFeedReturn(`/post/${post.id}`, feedReturn)}>
            {post.title || "오늘의 작업 기록"}
          </Link>
        </h2>
        <div className="record-attempt">
          <span className="step-index" aria-hidden="true">
            01
          </span>
          <div>
            <h3>{labels.attempt}</h3>
            <p>{post.caption}</p>
          </div>
        </div>
        {feedPreview && (
          <Link
            className="record-read-more"
            to={withFeedReturn(`/post/${post.id}`, feedReturn)}
            aria-label={`${post.title || "작업 기록"} 기록 전체 보기`}
          >
            {post.reflection?.reason && (
              <span className="step-index reason" aria-hidden="true">
                02
              </span>
            )}
            기록 전체 보기
          </Link>
        )}
        {post.reflection?.reason && (
          <details
            className="record-reason"
            open={pathname === `/post/${post.id}` ? true : undefined}
          >
            <summary>
              <span className="step-index" aria-hidden="true">
                02
              </span>
              <span>{labels.reason}</span>
              <span className="disclosure-hint" aria-hidden="true">
                +
              </span>
            </summary>
            <p>{post.reflection.reason}</p>
          </details>
        )}
        {post.hashtag && (
          <div className="hashtags">
            {post.hashtag
              .split(/\s+/)
              .filter(Boolean)
              .map((tag, i) => (
                <span key={i}>{tag.startsWith("#") ? tag : `#${tag}`}</span>
              ))}
          </div>
        )}
      </div>
      {post.image_url && (
        <button
          className="post-image-button"
          onClick={() => setImage(true)}
          aria-label={`${post.title} 이미지 확대`}
        >
          <img
            className="post-image"
            src={post.image_url}
            alt={post.title}
            loading="lazy"
          />
          <span>크게 보기</span>
        </button>
      )}
      {post.reflection?.question && (
        <section className="record-question" aria-label="이 기록의 질문">
          <div className="record-question-label">
            <span className="step-index" aria-hidden="true">
              03
            </span>
            <h3>의견을 기다려요</h3>
          </div>
          <p>{post.reflection.question}</p>
          <button className="question-reply" onClick={() => setComments(true)}>
            의견 보태기
          </button>
        </section>
      )}
      {post.meetupId && (
        <Link className="post-group-link" to={`/meetup?group=${post.meetupId}`}>
          <span>이 기록의 스터디 살펴보기</span>
        </Link>
      )}
      <div className="post-actions">
        <button
          className={`reaction ${post.liked ? "liked" : ""}`}
          aria-label={post.liked ? "좋아요 취소" : "좋아요"}
          aria-pressed={post.liked}
          onClick={() => toggleLike(post.id)}
        >
          {post.liked ? <FavoriteRounded /> : <FavoriteBorderRounded />}
          <span>{post.likes_count}</span>
        </button>
        <button
          className="reaction"
          aria-label="댓글 보기"
          onClick={() => setComments(true)}
        >
          <ChatBubbleOutlineRounded />
          <span>{post.comments.length}</span>
        </button>
        <Tooltip title={post.saved ? "저장 취소" : "나중에 다시 보기"}>
          <button
            className={`save-button ${post.saved ? "saved" : ""}`}
            aria-label={post.saved ? "저장 취소" : "게시물 저장"}
            aria-pressed={post.saved}
            onClick={() => toggleSave(post.id)}
          >
            {post.saved ? <BookmarkRounded /> : <BookmarkBorderRounded />}
          </button>
        </Tooltip>
      </div>
      {post.comments.length > 0 && (
        <button className="comment-preview" onClick={() => setComments(true)}>
          <strong>
            {post.comments.at(-1).user_id === DEMO_USER.id
              ? profile.nickname
              : post.comments.at(-1).profiles.nickname}
          </strong>
          <span>{post.comments.at(-1).content}</span>
        </button>
      )}
      <Menu anchorEl={menu} open={Boolean(menu)} onClose={() => setMenu(null)}>
        <MenuItem
          onClick={() => {
            setMenu(null);
            navigate(withFeedReturn(`/edit/${post.id}`, feedReturn));
          }}
        >
          기록 수정
        </MenuItem>
        <MenuItem
          onClick={() => {
            setMenu(null);
            setConfirm(true);
          }}
          sx={{ color: "error.main" }}
        >
          기록 삭제
        </MenuItem>
      </Menu>
      <Dialog
        open={confirm}
        onClose={() => setConfirm(false)}
        aria-labelledby={`delete-${post.id}`}
      >
        <DialogTitle id={`delete-${post.id}`}>
          이 기록을 삭제할까요?
        </DialogTitle>
        <DialogContent>
          기록과 댓글이 이 브라우저에서 삭제됩니다. 삭제 후에는 되돌릴 수
          없어요.
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirm(false)}>유지하기</Button>
          <Button
            color="error"
            onClick={() => {
              setConfirm(false);
              deletePost(post.id);
              if (pathname === `/post/${post.id}`) navigate(feedReturn);
            }}
          >
            삭제하기
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={image}
        onClose={() => setImage(false)}
        maxWidth="md"
        aria-labelledby={`image-${post.id}`}
      >
        <DialogTitle id={`image-${post.id}`} className="dialog-heading">
          {post.title}
          <IconButton aria-label="이미지 닫기" onClick={() => setImage(false)}>
            <CloseRounded />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ p: 0 }}>
          <img
            className="expanded-image"
            src={post.image_url}
            alt={post.title}
          />
        </DialogContent>
      </Dialog>
      <CommentModal
        open={comments}
        onClose={() => setComments(false)}
        postId={post.id}
        comments={post.comments}
        feedbackQuestion={post.reflection?.question}
      />
    </article>
  );
}
