import { useId, useReducer, useRef, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import Header from './Header';
import SiteFooter from './SiteFooter';
import WorkArtwork from './WorkArtwork';
import { createReviewDemoState, reviewDemoReducer } from '../utils/reviewDemo';

export function ReviewBoard({ post, view: controlledView, onViewChange, standalone = false }) {
  const [localView, setLocalView] = useState('before');
  const [{ active, drafts, replies, error, status }, dispatch] = useReducer(reviewDemoReducer, post.notes.length, createReviewDemoState);
  const id = useId();
  const dialogRef = useRef(null);
  const noteRefs = useRef([]);
  const inputRef = useRef(null);
  const view = controlledView ?? localView;
  const after = view === 'after';
  const activeNote = post.notes[active];
  const draft = drafts[active] || '';
  const Heading = standalone ? 'h1' : 'h2';
  const selectNote = (index, moveFocus = false) => {
    dispatch({ type: 'select', index });
    if (moveFocus) requestAnimationFrame(() => noteRefs.current[index]?.focus());
  };
  const setView = value => {
    if (onViewChange) onViewChange(value);
    else setLocalView(value);
  };
  const addReply = event => {
    event.preventDefault();
    dispatch({ type: 'add' });
    inputRef.current?.focus();
  };
  const removeReply = replyId => {
    dispatch({ type: 'remove', id: replyId });
    inputRef.current?.focus();
  };

  return <section className="feedback-board" aria-labelledby={`${id}-title`} aria-describedby={`${id}-question`}>
    <div className="board-heading">
      <div className="board-project"><span className="sample-tag">샘플</span><div><Heading id={`${id}-title`}>{post.title}</Heading><p>{post.subtitle}</p></div></div>
      <div className="board-tools">
        <div className="version-switch" role="group" aria-label="디자인 버전">{[['before', '수정 전'], ['after', '수정안']].map(([value, label]) => <button key={value} aria-pressed={view === value} onClick={() => setView(value)}>{label}</button>)}</div>
        <button className="zoom-button" onClick={() => dialogRef.current?.showModal()} aria-label="디자인 크게 보기"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M9 4H4v5m11-5h5v5M4 15v5h5m11-5v5h-5" stroke="currentColor" strokeWidth="1.6" /></svg><span>확대</span></button>
      </div>
    </div>
    <div className="review-brief"><span className="review-brief-label">함께 볼 점</span><p id={`${id}-question`}>{post.question}</p></div>
    <div className="board-body">
      <div className="board-canvas">
        <div className="board-art">
          <WorkArtwork kind={post.kind} before={!after} title={`${post.title} · ${after ? '수정안' : '수정 전'} 디자인 예시`} />
          {post.notes.map((note, index) => <button className="feedback-pin" key={note.title} aria-label={`${index + 1}번 위치: ${note.title}`} aria-pressed={active === index} aria-controls={`${id}-note-${index}`} style={{ left: `${note.x}%`, top: `${note.y}%` }} onClick={() => selectNote(index, true)}>{index + 1}</button>)}
        </div>
        <p className="canvas-caption">번호를 누르면 해당 의견으로 이동합니다.<span>그림 속 버튼과 입력창은 디자인 예시입니다.</span></p>
        {after && <div className="review-decision" aria-live="polite" aria-atomic="true">
          <p className="decision-label">{active + 1}번 위치의 수정 방향</p>
          <dl><div><dt>바꾼 점</dt><dd>{activeNote.change}</dd></div><div><dt>확인할 점</dt><dd>{activeNote.check}</dd></div></dl>
        </div>}
      </div>
      <aside className="board-feedback" aria-labelledby={`${id}-feedback-title`}>
        <div className="feedback-heading"><h3 id={`${id}-feedback-title`}>의견 <span>{post.notes.length + replies.length}</span></h3><span>번호로 연결된 위치</span></div>
        <ol className="feedback-list">
          {post.notes.map((note, index) => <li key={note.title} className={active === index ? 'is-selected' : ''}>
            <button id={`${id}-note-${index}`} ref={node => { noteRefs.current[index] = node; }} className="feedback-comment" aria-pressed={active === index} onClick={() => selectNote(index)}>
              <span className="comment-title"><span className="note-number">{index + 1}</span><strong>{note.title}</strong></span>
              <span className="comment-text">{note.text}</span>
            </button>
            {replies.filter(reply => reply.note === index).map(reply => <div className="demo-reply" key={reply.id}><div><strong>내 체험 의견</strong><button aria-label={`${index + 1}번 위치의 내 체험 의견 삭제`} onClick={() => removeReply(reply.id)}>삭제</button></div><p>{reply.text}</p></div>)}
          </li>)}
        </ol>
        <form className="demo-comment-form" onSubmit={addReply} noValidate>
          <label htmlFor={`${id}-comment`}><span className="note-number">{active + 1}</span>이 부분에 의견 남기기</label>
          <textarea id={`${id}-comment`} ref={inputRef} rows={3} maxLength={280} value={draft} onChange={event => dispatch({ type: 'draft', value: event.target.value })} placeholder="어떻게 바꾸면 좋을지 적어주세요." aria-invalid={Boolean(error)} aria-describedby={`${id}-demo-hint${error ? ` ${id}-error` : ''}`} />
          {error && <p id={`${id}-error`} className="comment-error" role="alert">{error}</p>}
          <div className="comment-submit"><span>{draft.length}/280</span><button className="primary-link" type="submit">의견 추가</button></div>
          <p id={`${id}-demo-hint`} className="demo-hint">화면을 나가거나 새로고침하면 의견이 사라집니다.</p>
          <p className={status ? 'comment-status' : 'sr-only'} role="status">{status}</p>
        </form>
      </aside>
    </div>
    <dialog className="artwork-dialog" ref={dialogRef} aria-labelledby={`${id}-zoom-title`}>
      <div className="dialog-heading"><h2 id={`${id}-zoom-title`}>{post.title} · {after ? '수정안' : '수정 전'}</h2><button className="text-button" autoFocus onClick={() => dialogRef.current?.close()}>닫기 <span aria-hidden="true">×</span></button></div>
      <div className="zoom-scroll"><div className="zoom-art"><WorkArtwork kind={post.kind} before={!after} title={`${post.title} · 확대된 ${after ? '수정안' : '수정 전'}`} /></div></div>
      <p className="zoom-hint">좌우로 움직여 살펴보세요. Esc로 닫을 수 있습니다.</p>
    </dialog>
  </section>;
}

export default function SampleReviewPage({ post }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [params, setParams] = useSearchParams();
  const view = ['after', 'compare'].includes(params.get('view')) ? 'after' : 'before';
  const changeView = value => setParams({ view: value }, { replace: true, state: location.state });
  return <div className="app-surface review-surface"><Header />
    <div className="shell review-page">
      <button className="back-link" onClick={() => location.state?.routeReturn ? navigate(-1) : navigate('/works')}>리뷰 예제 목록</button>
      <ReviewBoard key={post.id} post={post} view={view} onViewChange={changeView} standalone />
    </div>
    <SiteFooter />
  </div>;
}
