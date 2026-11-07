import { recordLabels, validReflection } from "../utils/recordFormat";
import { readStored, writeStored } from "../utils/storage";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Alert,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import ArrowBackRounded from "@mui/icons-material/ArrowBackRounded";
import AddPhotoAlternateOutlined from "@mui/icons-material/AddPhotoAlternateOutlined";
import MainLayout from "../components/layout/MainLayout";
import { useDemoData } from "../hooks/useDemoData";
import { DEMO_USER } from "../constants/demoUser";
import { SAMPLE_ART, sampleImage } from "../constants/samples";
export default function CreatePost() {
  const { id } = useParams();
  return <PostEditor key={id || "new"} id={id} />;
}
function PostEditor({ id }) {
  const { getPost, addPost, updatePost } = useDemoData();
  const existing = id ? getPost(id) : null;
  const navigate = useNavigate();
  const draftKey = `draft-${id || "new"}`;
  const [storedDraft] = useState(() =>
    readStored(
      draftKey,
      null,
      (value) =>
        value &&
        [
          "title",
          "caption",
          "category",
          "hashtag",
          "imageKey",
          "image_url",
        ].every((key) => typeof value[key] === "string") &&
        validReflection(value.reflection),
    ),
  );
  const seed = storedDraft || existing;
  const draftEnabled = useRef(true);
  const [draftSaved, setDraftSaved] = useState(true);
  const [title, setTitle] = useState(seed?.title || "");
  const [caption, setCaption] = useState(seed?.caption || "");
  const [reason, setReason] = useState(seed?.reflection?.reason || "");
  const [question, setQuestion] = useState(seed?.reflection?.question || "");
  const [category, setCategory] = useState(seed?.category || "작업기록");
  const [tags, setTags] = useState(seed?.hashtag || "");
  const [imageKey, setImageKey] = useState(seed?.imageKey || "");
  const [customImage, setCustomImage] = useState(
    seed?.imageKey ? "" : seed?.image_url || "",
  );
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [cancel, setCancel] = useState(false);
  const labels = recordLabels(category);
  const image = imageKey ? sampleImage(imageKey) : customImage;
  const dirty =
    title !== (existing?.title || "") ||
    caption !== (existing?.caption || "") ||
    reason !== (existing?.reflection?.reason || "") ||
    question !== (existing?.reflection?.question || "") ||
    tags !== (existing?.hashtag || "") ||
    category !== (existing?.category || "작업기록") ||
    imageKey !== (existing?.imageKey || "") ||
    customImage !== (existing?.imageKey ? "" : existing?.image_url || "");
  useEffect(() => {
    if (!draftEnabled.current) return;
    setDraftSaved(
      writeStored(
        draftKey,
        dirty
          ? {
              title,
              caption,
              reflection: { reason, question },
              category,
              hashtag: tags,
              imageKey,
              image_url: customImage,
            }
          : null,
      ),
    );
  }, [
    draftKey,
    dirty,
    title,
    caption,
    reason,
    question,
    category,
    tags,
    imageKey,
    customImage,
  ]);
  const clearDraft = () => {
    draftEnabled.current = false;
    writeStored(draftKey, null);
  };
  const submit = (e) => {
    e.preventDefault();
    if (!title.trim() || !caption.trim()) {
      setError("제목과 첫 번째 기록을 적어주세요.");
      return;
    }
    const values = {
      title: title.trim(),
      caption: caption.trim(),
      reflection: { reason: reason.trim(), question: question.trim() },
      category,
      hashtag: [
        ...new Set(
          tags
            .split(/\s+/)
            .filter(Boolean)
            .map((t) => (t.startsWith("#") ? t : `#${t}`)),
        ),
      ]
        .slice(0, 6)
        .join(" "),
      imageKey,
      image_url: customImage,
    };
    if (existing) {
      if (!updatePost(id, values)) {
        setError("내가 작성한 기록만 수정할 수 있어요.");
        return;
      }
      clearDraft();
      navigate(`/post/${id}`);
    } else {
      clearDraft();
      const newId = addPost(values);
      navigate(`/post/${newId}`);
    }
  };
  const upload = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      setError("JPG, PNG, WebP 이미지로 선택해 주세요.");
      return;
    }
    if (file.size > 1.5 * 1024 * 1024) {
      setError(
        "이 브라우저에 저장할 수 있도록 1.5MB 이하의 이미지를 선택해 주세요.",
      );
      return;
    }
    setBusy(true);
    setError("");
    try {
      const result = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
      await new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = resolve;
        img.onerror = reject;
        img.src = result;
      });
      setCustomImage(result);
      setImageKey("");
    } catch {
      setError("이미지를 읽지 못했어요. 다른 파일을 선택해 주세요.");
    } finally {
      setBusy(false);
    }
  };
  if (id && (!existing || existing.user_id !== DEMO_USER.id))
    return (
      <MainLayout>
        <div className="empty-state">
          <h1 style={{ fontSize: 20 }}>수정할 수 없는 기록이에요</h1>
          <p>내가 작성한 기록인지 확인해 주세요.</p>
          <Link className="button primary" to="/profile">
            내 기록으로
          </Link>
        </div>
      </MainLayout>
    );
  return (
    <MainLayout>
      <div className="detail-heading">
        <button
          className="back-link text-button"
          onClick={() =>
            dirty ? setCancel(true) : navigate(existing ? `/post/${id}` : "/")
          }
        >
          <ArrowBackRounded />
          돌아가기
        </button>
        <h1>{existing ? "기록 다듬기" : "오늘의 작은 기록"}</h1>
      </div>
      <div className="record-intro">
        <p className="eyebrow">나의 시도 + 너의 생각</p>
        <h2>한 줄에서 시작하는, 기록 한 장.</h2>
        <p>시도한 것 하나면 충분해요. 이유와 질문은 천천히 덧붙여도 좋아요.</p>
        <ol className="record-map">
          <li>
            <b>01</b> 시도
          </li>
          <li>
            <b>02</b> 이유
          </li>
          <li>
            <b>03</b> 대화
          </li>
        </ol>
      </div>
      <form className="form-panel record-editor" onSubmit={submit}>
        {!draftSaved && (
          <Alert severity="warning" sx={{ mb: 3 }}>
            초안을 저장하지 못했어요. 작성한 내용을 복사해 보관하거나 이미지
            용량을 줄여주세요.
          </Alert>
        )}
        {dirty && draftSaved && (
          <p className="draft-status" role="status">
            초안을 이 브라우저에 저장했어요.
          </p>
        )}
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}
        <div className="form-field">
          <span className="field-label" id="category-label">
            어떤 이야기인가요?
          </span>
          <div
            className="category-options"
            role="group"
            aria-labelledby="category-label"
          >
            {["작업기록", "질문", "스터디"].map((c) => (
              <button
                type="button"
                aria-pressed={category === c}
                className={category === c ? "selected" : ""}
                key={c}
                onClick={() => setCategory(c)}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
        <div className="form-field">
          <label className="field-label" htmlFor="post-title">
            제목
          </label>
          <input
            id="post-title"
            className="form-input"
            placeholder="오늘의 시도를 한 문장으로"
            value={title}
            maxLength={60}
            required
            aria-describedby="title-help"
            onChange={(e) => setTitle(e.target.value)}
          />
          <div className="field-helper" id="title-help">
            <span>작은 변화 하나도 좋아요.</span>
            <span>{title.length} / 60</span>
          </div>
        </div>
        <div className="record-fields">
          <div className="form-field record-field attempt">
            <span className="step-index" aria-hidden="true">
              01
            </span>
            <label className="field-label" htmlFor="post-caption">
              {labels.attempt}
              <span aria-hidden="true">필수</span>
            </label>
            <textarea
              id="post-caption"
              className="form-input textarea"
              placeholder={
                category === "작업기록"
                  ? "예: 여행 카드의 저장 버튼을 이미지 아래로 옮겼어요."
                  : "함께 나누고 싶은 이야기를 적어주세요."
              }
              value={caption}
              maxLength={1200}
              required
              aria-describedby="attempt-help"
              onChange={(e) => setCaption(e.target.value)}
            />
            <div className="field-helper" id="attempt-help">
              <span>완성한 결과보다 오늘 해본 것 하나.</span>
              <span>{caption.length} / 1200</span>
            </div>
          </div>
          <div className="form-field record-field reason">
            <span className="step-index" aria-hidden="true">
              02
            </span>
            <label className="field-label" htmlFor="post-reason">
              {labels.reason}
              <span aria-hidden="true">선택</span>
            </label>
            <textarea
              id="post-reason"
              className="form-input"
              rows={3}
              placeholder="예: 사진 위의 버튼은 배경에 묻혀 찾기 어렵다고 느꼈어요."
              value={reason}
              maxLength={400}
              aria-describedby="reason-help"
              onChange={(e) => setReason(e.target.value)}
            />
            <div className="field-helper" id="reason-help">
              <span>어떤 고민이 이 선택으로 이어졌나요?</span>
              <span>{reason.length} / 400</span>
            </div>
          </div>
          <div className="form-field record-field question">
            <span className="step-index" aria-hidden="true">
              03
            </span>
            <label className="field-label" htmlFor="post-question">
              의견이 필요한 부분<span aria-hidden="true">선택</span>
            </label>
            <textarea
              id="post-question"
              className="form-input"
              rows={3}
              placeholder="예: 버튼의 위치와 크기가 자연스러운가요?"
              value={question}
              maxLength={240}
              aria-describedby="question-help"
              onChange={(e) => setQuestion(e.target.value)}
            />
            <div className="field-helper" id="question-help">
              <span>이 질문은 기록과 댓글 창에 함께 보여요.</span>
              <span>{question.length} / 240</span>
            </div>
          </div>
        </div>
        <div className="form-field">
          <span className="field-label">
            함께 보여줄 이미지<span>선택</span>
          </span>
          <p className="field-helper">
            직접 첨부하거나 아래의 샘플 작업 이미지를 골라보세요.
          </p>
          <div className="art-options">
            {SAMPLE_ART.slice(0, 3).map((a) => (
              <button
                key={a.id}
                type="button"
                className={imageKey === a.id ? "selected" : ""}
                aria-label={`${a.name} 선택`}
                aria-pressed={imageKey === a.id}
                onClick={() => {
                  setImageKey(a.id);
                  setCustomImage("");
                }}
              >
                <img src={a.src} alt="" />
                <span>{a.name}</span>
              </button>
            ))}
          </div>
          <div className="upload-actions">
            <label className="upload-label">
              <AddPhotoAlternateOutlined />내 이미지 첨부
              <input
                type="file"
                aria-label="내 이미지 첨부"
                accept="image/png,image/jpeg,image/webp"
                disabled={busy}
                onChange={upload}
              />
            </label>
            {image && (
              <button
                type="button"
                className="text-button"
                onClick={() => {
                  setImageKey("");
                  setCustomImage("");
                }}
              >
                이미지 빼기
              </button>
            )}
            <span className="field-helper">JPG · PNG · WebP / 1.5MB 이하</span>
          </div>
          {image && (
            <div className="image-preview">
              <img src={image} alt="선택한 이미지 미리보기" />
            </div>
          )}
        </div>
        <div className="form-field">
          <label className="field-label" htmlFor="post-tags">
            태그<span>선택 · 최대 6개</span>
          </label>
          <input
            className="form-input"
            id="post-tags"
            placeholder="#UI디자인 #React #작업기록"
            value={tags}
            maxLength={120}
            onChange={(e) => setTags(e.target.value)}
          />
          <div className="field-helper">띄어쓰기로 구분해 주세요.</div>
        </div>
        <div className="form-submit">
          <p>
            이 기록은 현재 브라우저에 저장돼요.
            <br />
            다른 사람에게 공개되지 않습니다.
          </p>
          <button
            className="button primary"
            type="submit"
            disabled={busy || !title.trim() || !caption.trim()}
          >
            {busy ? "이미지 읽는 중" : existing ? "수정 완료" : "기록 남기기"}
          </button>
        </div>
      </form>
      <Dialog
        open={cancel}
        onClose={() => setCancel(false)}
        aria-labelledby="discard-title"
      >
        <DialogTitle id="discard-title">작성 중인 기록을 닫을까요?</DialogTitle>
        <DialogContent>아직 저장하지 않은 내용은 사라집니다.</DialogContent>
        <DialogActions>
          <Button onClick={() => setCancel(false)}>계속 작성</Button>
          <Button
            color="error"
            onClick={() => {
              clearDraft();
              navigate(existing ? `/post/${id}` : "/");
            }}
          >
            닫기
          </Button>
        </DialogActions>
      </Dialog>
    </MainLayout>
  );
}
