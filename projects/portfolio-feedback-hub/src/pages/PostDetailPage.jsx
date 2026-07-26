import { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box, Container, Typography, Button, TextField, Avatar,
  IconButton, Chip, Divider, Skeleton,
  Alert, Collapse, Dialog, DialogTitle, DialogContent,
  DialogContentText, DialogActions, Snackbar, Paper, Stack,
} from '@mui/material';
import {
  Favorite, FavoriteBorder, ChatBubble,
  AccessTime, Send, Reply,
  Edit, Delete, Check, Close,
} from '@mui/icons-material';
import { useAuth } from '../hooks/useAuth';
import { supabase } from '../lib/supabase';
import { SAMPLE_POSTS, SAMPLE_COMMENTS, getCategoryLabel, getStatusBadge } from '../constants/samplePosts';
import SubPageHeader from '../components/SubPageHeader';
import CategoryThumbnail from '../components/CategoryThumbnail';
import { validateAndNormalizeImageUrl } from '../utils/imageUrlPolicy';

const formatRelativeTime = (dateStr) => {
  const diff = Date.now() - new Date(dateStr).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return '방금 전';
  if (m < 60) return `${m}분 전`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}시간 전`;
  return `${Math.floor(h / 24)}일 전`;
};

// ── 댓글/대댓글 인라인 수정 버튼 ──
const EditDeleteButtons = ({
  onEdit, onDelete, size = 'small', editDisabled = false, deleteDisabled = false, itemLabel = '댓글',
}) => (
  <Box sx={{ display: 'flex', gap: 0.5 }}>
    <IconButton
      size={size}
      onClick={onEdit}
      disabled={editDisabled}
      sx={{ width: 40, height: 40, color: 'text.secondary', '&:hover': { color: 'primary.main' } }}
      aria-label={`${itemLabel} 수정`}
    >
      <Edit sx={{ fontSize: size === 'small' ? 13 : 11 }} />
    </IconButton>
    <IconButton
      size={size}
      onClick={onDelete}
      disabled={deleteDisabled}
      sx={{ width: 40, height: 40, color: 'text.secondary', '&:hover': { color: 'error.main' } }}
      aria-label={`${itemLabel} 삭제`}
    >
      <Delete sx={{ fontSize: size === 'small' ? 13 : 11 }} />
    </IconButton>
  </Box>
);

// ── 인라인 편집 폼 ──
const InlineEditField = ({ value, onSave, onCancel, pending = false }) => {
  const [text, setText] = useState(value);
  const handleSave = async () => {
    const nextText = text.trim();
    if (!nextText || pending) return;
    await onSave(nextText);
  };
  return (
    <Box sx={{ display: 'flex', gap: 0.5, mt: 0.5 }}>
      <TextField
        size="small"
        value={text}
        onChange={(e) => setText(e.target.value)}
        fullWidth
        multiline
        maxRows={4}
        autoFocus
        disabled={pending}
        onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey && text.trim()) { e.preventDefault(); handleSave(); } }}
      />
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.3 }}>
        <IconButton size="small" color="primary" onClick={handleSave} disabled={pending || !text.trim()} sx={{ width: 40, height: 40 }} aria-label="댓글 수정 저장">
          <Check sx={{ fontSize: 16 }} />
        </IconButton>
        <IconButton size="small" onClick={onCancel} disabled={pending} sx={{ width: 40, height: 40 }} aria-label="댓글 수정 취소">
          <Close sx={{ fontSize: 16 }} />
        </IconButton>
      </Box>
    </Box>
  );
};

// ── 댓글 아이템 ──
const CommentItem = ({
  comment, currentUserId, onReply, onLike, likedCommentIds,
  onDeleteComment, onEditComment, isActionPending,
}) => {
  const [showReply, setShowReply] = useState(false);
  const [editing, setEditing] = useState(false);
  const liked = likedCommentIds.has(comment.id);
  const isOwner = comment.user_id === currentUserId;
  const likePending = isActionPending('comment-like', comment.id);
  const editPending = isActionPending('comment-edit', comment.id);
  const deletePending = isActionPending('comment-delete', comment.id);
  const replyPending = isActionPending('reply-add', comment.id);

  return (
    <Box>
      <Box sx={{ display: 'flex', gap: 1.5, py: 1.5 }}>
        <Avatar sx={{ width: 34, height: 34, fontSize: '0.8rem', bgcolor: 'secondary.dark', flexShrink: 0 }}>
          {comment.profiles?.username?.[0]?.toUpperCase()}
        </Avatar>
        <Box sx={{ flexGrow: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 0.5 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {comment.profiles?.username}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {formatRelativeTime(comment.created_at)}
              </Typography>
            </Box>
            {isOwner && !editing && (
              <EditDeleteButtons
                onEdit={() => setEditing(true)}
                onDelete={() => onDeleteComment(comment.id)}
                editDisabled={deletePending}
                deleteDisabled={deletePending || editPending}
              />
            )}
          </Box>

          {editing ? (
            <InlineEditField
              value={comment.content}
              pending={editPending}
              onSave={async (text) => {
                const success = await onEditComment(comment.id, text);
                if (success) setEditing(false);
                return success;
              }}
              onCancel={() => setEditing(false)}
            />
          ) : (
            <Typography variant="body2" sx={{ mb: 0.5, whiteSpace: 'pre-wrap' }}>
              {comment.content}
            </Typography>
          )}

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton
              size="small"
              onClick={() => onLike(comment.id, liked)}
              disabled={likePending}
              aria-label={liked ? '댓글 좋아요 취소' : '댓글 좋아요'}
              sx={{ width: 44, height: 44 }}
            >
              {liked
                ? <Favorite sx={{ fontSize: 14, color: 'error.main' }} />
                : <FavoriteBorder sx={{ fontSize: 14, color: 'text.secondary' }} />}
            </IconButton>
            <Typography variant="caption" color="text.secondary">
              {comment.comment_likes?.length ?? 0}
            </Typography>
            <Button
              size="small"
              startIcon={<Reply sx={{ fontSize: 14 }} />}
              onClick={() => setShowReply(p => !p)}
              sx={{ fontSize: '0.72rem', px: 1, color: 'text.secondary', minWidth: 64, minHeight: 44 }}
            >
              답글
            </Button>
          </Box>

          <Collapse in={showReply}>
            <ReplyInput
              pending={replyPending}
              onSubmit={async (content) => {
                const success = await onReply(comment.id, content);
                if (success) setShowReply(false);
                return success;
              }}
            />
          </Collapse>

          {/* 대댓글 목록 */}
          {comment.replies?.map(reply => (
            <ReplyItem
              key={reply.id}
              reply={reply}
              currentUserId={currentUserId}
              onLike={onLike}
              likedCommentIds={likedCommentIds}
              onDeleteComment={onDeleteComment}
              onEditComment={onEditComment}
              isActionPending={isActionPending}
            />
          ))}
        </Box>
      </Box>
      <Divider />
    </Box>
  );
};

// ── 대댓글 아이템 ──
const ReplyItem = ({
  reply, currentUserId, onLike, likedCommentIds,
  onDeleteComment, onEditComment, isActionPending,
}) => {
  const [editing, setEditing] = useState(false);
  const isOwner = reply.user_id === currentUserId;
  const liked = likedCommentIds.has(reply.id);
  const likePending = isActionPending('comment-like', reply.id);
  const editPending = isActionPending('comment-edit', reply.id);
  const deletePending = isActionPending('comment-delete', reply.id);

  return (
    <Box sx={{ display: 'flex', gap: 1.5, mt: 1.5, pl: 1, borderLeft: '2px solid', borderColor: 'divider' }}>
      <Avatar sx={{ width: 26, height: 26, fontSize: '0.7rem', bgcolor: 'primary.dark', flexShrink: 0 }}>
        {reply.profiles?.username?.[0]?.toUpperCase()}
      </Avatar>
      <Box sx={{ flexGrow: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 0.3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="caption" sx={{ fontWeight: 600 }}>{reply.profiles?.username}</Typography>
            <Typography variant="caption" color="text.secondary">{formatRelativeTime(reply.created_at)}</Typography>
          </Box>
          {isOwner && !editing && (
            <EditDeleteButtons
                onEdit={() => setEditing(true)}
                onDelete={() => onDeleteComment(reply.id)}
                size="small"
                editDisabled={deletePending}
                deleteDisabled={deletePending || editPending}
                itemLabel="답글"
            />
          )}
        </Box>

        {editing ? (
          <InlineEditField
            value={reply.content}
            pending={editPending}
            onSave={async (text) => {
              const success = await onEditComment(reply.id, text);
              if (success) setEditing(false);
              return success;
            }}
            onCancel={() => setEditing(false)}
          />
        ) : (
          <Typography variant="body2" sx={{ fontSize: '0.85rem', whiteSpace: 'pre-wrap' }}>
            {reply.content}
          </Typography>
        )}

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.3 }}>
          <IconButton
            size="small"
            onClick={() => onLike(reply.id, liked)}
            disabled={likePending}
            aria-label={liked ? '답글 좋아요 취소' : '답글 좋아요'}
            sx={{ width: 44, height: 44 }}
          >
            {liked
              ? <Favorite sx={{ fontSize: 12, color: 'error.main' }} />
              : <FavoriteBorder sx={{ fontSize: 12, color: 'text.secondary' }} />}
          </IconButton>
          <Typography variant="caption" color="text.secondary">
            {reply.comment_likes?.length ?? 0}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

// ── 대댓글 입력 ──
const ReplyInput = ({ onSubmit, pending = false }) => {
  const [content, setContent] = useState('');
  const handleSubmit = async () => {
    const nextContent = content.trim();
    if (!nextContent || pending) return;
    const success = await onSubmit(nextContent);
    if (success) setContent('');
  };
  return (
    <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
      <TextField
        size="small"
        placeholder="답글을 입력하세요..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        fullWidth
        multiline
        maxRows={3}
        disabled={pending}
        onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey && content.trim()) { e.preventDefault(); handleSubmit(); } }}
      />
      <IconButton
        color="primary"
        onClick={handleSubmit}
        disabled={pending || !content.trim()}
        aria-label="답글 전송"
        sx={{ width: 44, height: 44 }}
      >
        <Send sx={{ fontSize: 18 }} />
      </IconButton>
    </Box>
  );
};

// ── 삭제 확인 다이얼로그 ──
const ConfirmDialog = ({ open, title, description, onConfirm, onClose, pending = false }) => (
  <Dialog open={open} onClose={pending ? undefined : onClose}>
    <DialogTitle>{title}</DialogTitle>
    <DialogContent>
      <DialogContentText>{description}</DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose} disabled={pending} sx={{ minHeight: 44 }}>취소</Button>
      <Button onClick={onConfirm} disabled={pending} color="error" variant="contained" sx={{ minHeight: 44 }}>
        {pending ? '삭제 중...' : '삭제'}
      </Button>
    </DialogActions>
  </Dialog>
);

// ── 메인 페이지 ──
const PostDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [likedCommentIds, setLikedCommentIds] = useState(new Set());
  const [commentInput, setCommentInput] = useState('');
  const [loadState, setLoadState] = useState('loading');
  const [reloadKey, setReloadKey] = useState(0);
  const [deletePostDialog, setDeletePostDialog] = useState(false);
  const [pendingActions, setPendingActions] = useState(new Set());
  const pendingActionsRef = useRef(new Set());
  const [feedback, setFeedback] = useState({ open: false, severity: 'info', message: '' });
  const [imageLoadFailed, setImageLoadFailed] = useState(false);
  const postId = String(id ?? '');
  const isSamplePost = postId.startsWith('sample');
  const isLivePostId = /^[1-9]\d*$/.test(postId);
  const isInvalidPostId = !isSamplePost && !isLivePostId;
  const sampleAssetUrl = isSamplePost && post?.sampleAssetPath
    ? `${import.meta.env.BASE_URL}${post.sampleAssetPath}`
    : null;
  const safePostImageUrl = validateAndNormalizeImageUrl(post?.image_url).imageUrl;
  const displayImageUrl = sampleAssetUrl || safePostImageUrl;

  useEffect(() => {
    setImageLoadFailed(false);
  }, [post?.id, post?.image_url, post?.sampleAssetPath]);

  const showFeedback = (message, severity = 'info') => {
    setFeedback({ open: true, severity, message });
  };

  const getActionKey = (type, targetId = 'post') => `${type}:${targetId}`;
  const isActionPending = (type, targetId = 'post') => pendingActions.has(getActionKey(type, targetId));
  const startAction = (type, targetId = 'post') => {
    const key = getActionKey(type, targetId);
    if (pendingActionsRef.current.has(key)) return null;
    const next = new Set(pendingActionsRef.current);
    next.add(key);
    pendingActionsRef.current = next;
    setPendingActions(next);
    return key;
  };
  const finishAction = (key) => {
    if (!key) return;
    const next = new Set(pendingActionsRef.current);
    next.delete(key);
    pendingActionsRef.current = next;
    setPendingActions(next);
  };

  const showSampleNotice = () => {
    showFeedback('샘플 게시글에서는 변경 내용을 저장할 수 없습니다.', 'info');
  };

  const fetchPost = useCallback(async () => {
    const { data, error } = await supabase
      .from('posts')
      .select('*, profiles!posts_user_id_fkey(username)')
      .eq('id', id)
      .maybeSingle();
    if (error) return { status: 'error' };
    if (!data) return { status: 'not-found' };
    return { status: 'ready', data };
  }, [id]);

  const fetchLikes = useCallback(async () => {
    const { data: likeRows, error } = await supabase.from('post_likes').select('user_id').eq('post_id', id);
    if (error) throw error;
    setLikeCount(likeRows?.length ?? 0);
    if (user) setLiked(likeRows?.some(r => r.user_id === user.id) ?? false);
  }, [id, user]);

  const fetchComments = useCallback(async () => {
    const { data, error: commentsError } = await supabase
      .from('comments')
      .select('*, profiles!comments_user_id_fkey(username), comment_likes(user_id)')
      .eq('post_id', id)
      .is('parent_id', null)
      .order('created_at', { ascending: true });
    if (commentsError) throw commentsError;

    const topLevel = data || [];
    const allIds = topLevel.map(c => c.id);

    const { data: replies, error: repliesError } = await supabase
      .from('comments')
      .select('*, profiles!comments_user_id_fkey(username), comment_likes(user_id)')
      .in('parent_id', allIds.length > 0 ? allIds : [-1])
      .order('created_at', { ascending: true });
    if (repliesError) throw repliesError;

    setComments(topLevel.map(c => ({
      ...c,
      replies: (replies || []).filter(r => r.parent_id === c.id),
    })));

    if (user) {
      const allIds2 = [...topLevel.map(c => c.id), ...(replies || []).map(r => r.id)];
      if (allIds2.length > 0) {
        const { data: myLikes, error: myLikesError } = await supabase.from('comment_likes').select('comment_id').eq('user_id', user.id).in('comment_id', allIds2);
        if (myLikesError) throw myLikesError;
        setLikedCommentIds(new Set((myLikes || []).map(l => l.comment_id)));
      }
    }
  }, [id, user]);

  useEffect(() => {
    setLoadState('loading');
    if (isInvalidPostId) {
      setPost(null);
      setComments([]);
      setLoadState('invalid');
      return;
    }
    if (isSamplePost) {
      const samplePost = SAMPLE_POSTS.find(p => p.id === id);
      if (samplePost) {
        setPost(samplePost);
        setLikeCount(samplePost.like_count);
        setComments(SAMPLE_COMMENTS[id] || []);
        setLoadState('ready');
      } else {
        setPost(null);
        setLoadState('not-found');
      }
      return;
    }
    const init = async () => {
      try {
        const result = await fetchPost();
        if (result.status !== 'ready') {
          setPost(null);
          setComments([]);
          setLoadState(result.status);
          return;
        }
        setPost(result.data);
        await Promise.all([fetchLikes(), fetchComments()]);
        setLoadState('ready');
      } catch {
        setPost(null);
        setLoadState('error');
      }
    };
    init();
  }, [fetchPost, fetchLikes, fetchComments, id, isInvalidPostId, isSamplePost, reloadKey]);

  // 게시글 삭제
  const handleDeletePost = async () => {
    if (isSamplePost) {
      showSampleNotice();
      setDeletePostDialog(false);
      return false;
    }
    const actionKey = startAction('post-delete');
    if (!actionKey) return false;
    try {
      const { error } = await supabase.from('posts').delete().eq('id', id);
      if (error) throw error;
      navigate('/', { replace: true });
      return true;
    } catch {
      showFeedback('게시글을 삭제하지 못했습니다.', 'error');
      return false;
    } finally {
      finishAction(actionKey);
    }
  };

  // 게시글 좋아요
  const handlePostLike = async () => {
    if (!user) {
      showFeedback('좋아요는 로그인 후 이용할 수 있어요.', 'info');
      return false;
    }
    if (isSamplePost) {
      showSampleNotice();
      return false;
    }
    const actionKey = startAction('post-like');
    if (!actionKey) return false;
    try {
      const query = liked
        ? supabase.from('post_likes').delete().eq('post_id', id).eq('user_id', user.id)
        : supabase.from('post_likes').insert({ post_id: Number(id), user_id: user.id });
      const { error } = await query;
      if (error) throw error;
      setLiked(!liked);
      setLikeCount(count => liked ? Math.max(0, count - 1) : count + 1);
      return true;
    } catch {
      showFeedback('좋아요를 반영하지 못했습니다.', 'error');
      return false;
    } finally {
      finishAction(actionKey);
    }
  };

  // 댓글 좋아요
  const handleCommentLike = async (commentId, isLiked) => {
    if (!user) {
      showFeedback('댓글 좋아요는 로그인 후 이용할 수 있어요.', 'info');
      return false;
    }
    if (isSamplePost) {
      showSampleNotice();
      return false;
    }
    const actionKey = startAction('comment-like', commentId);
    if (!actionKey) return false;
    try {
      const query = isLiked
        ? supabase.from('comment_likes').delete().eq('comment_id', commentId).eq('user_id', user.id)
        : supabase.from('comment_likes').insert({ comment_id: commentId, user_id: user.id });
      const { error } = await query;
      if (error) throw error;
      await fetchComments();
      return true;
    } catch {
      showFeedback('댓글 좋아요를 반영하지 못했습니다.', 'error');
      return false;
    } finally {
      finishAction(actionKey);
    }
  };

  // 댓글 추가
  const handleAddComment = async () => {
    const content = commentInput.trim();
    if (!content || !user) return false;
    if (isSamplePost) {
      showSampleNotice();
      return false;
    }
    const actionKey = startAction('comment-add');
    if (!actionKey) return false;
    try {
      const { error } = await supabase.from('comments').insert({ post_id: Number(id), user_id: user.id, content });
      if (error) throw error;
      await fetchComments();
      setCommentInput('');
      showFeedback('댓글을 등록했습니다.', 'success');
      return true;
    } catch {
      showFeedback('댓글을 등록하지 못했습니다.', 'error');
      return false;
    } finally {
      finishAction(actionKey);
    }
  };

  // 대댓글 추가
  const handleReply = async (parentId, content) => {
    const nextContent = content.trim();
    if (!nextContent || !user) return false;
    if (isSamplePost) {
      showSampleNotice();
      return false;
    }
    const actionKey = startAction('reply-add', parentId);
    if (!actionKey) return false;
    try {
      const { error } = await supabase.from('comments').insert({
        post_id: Number(id),
        user_id: user.id,
        parent_id: parentId,
        content: nextContent,
      });
      if (error) throw error;
      await fetchComments();
      showFeedback('답글을 등록했습니다.', 'success');
      return true;
    } catch {
      showFeedback('답글을 등록하지 못했습니다.', 'error');
      return false;
    } finally {
      finishAction(actionKey);
    }
  };

  // 댓글/대댓글 삭제
  const handleDeleteComment = async (commentId) => {
    if (isSamplePost) {
      showSampleNotice();
      return false;
    }
    const actionKey = startAction('comment-delete', commentId);
    if (!actionKey) return false;
    try {
      const { error } = await supabase.from('comments').delete().eq('id', commentId);
      if (error) throw error;
      await fetchComments();
      showFeedback('댓글을 삭제했습니다.', 'success');
      return true;
    } catch {
      showFeedback('댓글을 삭제하지 못했습니다.', 'error');
      return false;
    } finally {
      finishAction(actionKey);
    }
  };

  // 댓글/대댓글 수정
  const handleEditComment = async (commentId, content) => {
    const nextContent = content.trim();
    if (!nextContent) return false;
    if (isSamplePost) {
      showSampleNotice();
      return false;
    }
    const actionKey = startAction('comment-edit', commentId);
    if (!actionKey) return false;
    try {
      const { error } = await supabase.from('comments').update({ content: nextContent }).eq('id', commentId);
      if (error) throw error;
      await fetchComments();
      showFeedback('댓글을 수정했습니다.', 'success');
      return true;
    } catch {
      showFeedback('댓글을 수정하지 못했습니다.', 'error');
      return false;
    } finally {
      finishAction(actionKey);
    }
  };

  if (isInvalidPostId) return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <SubPageHeader title="게시글 상세" fallbackTo="/" />
      <Container maxWidth="md" sx={{ py: 6 }}>
        <Alert severity="warning" sx={{ mb: 3 }}>
          올바르지 않은 게시글 주소입니다.
        </Alert>
        <Button variant="contained" onClick={() => navigate('/')}>게시글 목록으로</Button>
      </Container>
    </Box>
  );

  if (loadState === 'loading') return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <SubPageHeader title="게시글 상세" fallbackTo="/" />
      <Container maxWidth="md" sx={{ py: 6 }}>
        <Skeleton variant="rectangular" height={400} sx={{ borderRadius: 2 }} />
      </Container>
    </Box>
  );

  if (loadState === 'not-found' || loadState === 'error') {
    const isNotFound = loadState === 'not-found';
    return (
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
        <SubPageHeader title="게시글 상세" fallbackTo="/" />
        <Container maxWidth="md" sx={{ py: 6 }}>
          <Paper role={isNotFound ? undefined : 'alert'} sx={{ p: { xs: 3, sm: 4 }, borderRadius: 3 }}>
            <Typography variant="h2" sx={{ mb: 1.5 }}>
              {isNotFound ? '게시글을 찾을 수 없습니다' : '게시글을 불러오지 못했습니다'}
            </Typography>
            <Typography color="text.secondary" sx={{ mb: 3 }}>
              {isNotFound
                ? '삭제되었거나 존재하지 않는 게시글입니다. 목록에서 다른 피드백 글을 확인해 주세요.'
                : '잠시 후 다시 시도하거나 게시글 목록으로 이동해 주세요.'}
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
              <Button variant="contained" onClick={() => navigate('/')}>게시글 목록으로</Button>
              {!isNotFound && (
                <Button variant="outlined" onClick={() => setReloadKey(key => key + 1)}>다시 시도</Button>
              )}
            </Stack>
          </Paper>
        </Container>
      </Box>
    );
  }

  if (!post) return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <SubPageHeader title="게시글 상세" fallbackTo="/" />
      <Container maxWidth="md" sx={{ py: 6 }}>
        <Alert severity="error">게시글 상태를 확인할 수 없습니다.</Alert>
      </Container>
    </Box>
  );

  const isPostOwner = user?.id === post.user_id;
  const postCategory = getCategoryLabel(post);
  const visibleHashtags = (post.hashtags ?? []).filter(tag => tag !== postCategory);

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <SubPageHeader
        title="게시글 상세"
        fallbackTo="/"
        rightActions={isPostOwner && (
          <Box sx={{ display: 'flex', gap: 0.5 }}>
            <Button
              size="small"
              startIcon={<Edit sx={{ fontSize: 15 }} />}
              onClick={() => navigate(`/posts/${id}/edit`)}
              sx={{ color: 'inherit', fontSize: '0.8rem' }}
            >
              수정
            </Button>
            <Button
              size="small"
              startIcon={<Delete sx={{ fontSize: 15 }} />}
              onClick={() => setDeletePostDialog(true)}
              sx={{ color: 'error.light', fontSize: '0.8rem' }}
            >
              삭제
            </Button>
          </Box>
        )}
      />

      <Snackbar
        open={feedback.open}
        autoHideDuration={3000}
        onClose={() => setFeedback(prev => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          severity={feedback.severity}
          variant="filled"
          onClose={() => setFeedback(prev => ({ ...prev, open: false }))}
          sx={{ width: '100%' }}
        >
          {feedback.message}
        </Alert>
      </Snackbar>

      {/* 게시글 삭제 확인 */}
      <ConfirmDialog
        open={deletePostDialog}
        title="게시글 삭제"
        description="이 게시글을 삭제하면 댓글과 좋아요 데이터도 모두 사라집니다. 정말 삭제할까요?"
        onConfirm={handleDeletePost}
        onClose={() => setDeletePostDialog(false)}
        pending={isActionPending('post-delete')}
      />

      <Container maxWidth="md" sx={{ py: 4 }}>
        {/* 게시글 본문 */}
        <Box sx={{ bgcolor: 'background.paper', borderRadius: 3, p: { xs: 3, sm: 4 }, mb: 3, border: '1px solid', borderColor: 'divider' }}>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 1.5 }}>
            {postCategory && (
              <Chip label={postCategory} size="small" variant="outlined"
                sx={{ fontSize: '0.7rem', borderColor: 'divider', color: 'text.secondary' }} />
            )}
            {(() => {
              const status = getStatusBadge({
                ...post,
                comment_count: comments.reduce((acc, c) => acc + 1 + (c.replies?.length ?? 0), 0),
              });
              return (
                <Chip label={status.label} size="small"
                  sx={{ fontSize: '0.7rem', bgcolor: `${status.color}1A`, color: status.color, fontWeight: 700 }} />
              );
            })()}
          </Box>

          {visibleHashtags.length > 0 && (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
              {visibleHashtags.map(tag => (
                <Chip key={tag} label={`#${tag}`} size="small" sx={{ bgcolor: 'rgba(0,180,216,0.12)', color: 'primary.dark' }} />
              ))}
            </Box>
          )}

          <Typography component="h2" variant="h2" sx={{ mb: 2 }}>{post.title}</Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Avatar sx={{ width: 36, height: 36, bgcolor: 'secondary.dark' }}>
                {post.profiles?.username?.[0]?.toUpperCase()}
              </Avatar>
              <Box>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>{post.profiles?.username}</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <AccessTime aria-hidden="true" sx={{ fontSize: 12, color: 'text.secondary' }} />
                  <Typography variant="caption" color="text.secondary">{formatRelativeTime(post.created_at)}</Typography>
                </Box>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <ChatBubble sx={{ fontSize: 14, color: 'primary.main' }} />
                <Typography variant="caption" color="text.secondary">
                  {comments.reduce((acc, c) => acc + 1 + (c.replies?.length ?? 0), 0)}
                </Typography>
              </Box>
            </Box>
          </Box>

          {displayImageUrl && !imageLoadFailed ? (
            <Box
              component="img"
              src={displayImageUrl}
              alt={sampleAssetUrl ? `${post.title} 샘플 작업 화면` : `${post.title} 작업 이미지`}
              onError={() => setImageLoadFailed(true)}
              sx={{
                width: '100%',
                maxHeight: 400,
                aspectRatio: '16 / 9',
                objectFit: 'cover',
                display: 'block',
                borderRadius: 2,
                mb: 3,
                bgcolor: '#F8FAFC',
              }}
            />
          ) : (
            <Box sx={{ mb: 3, overflow: 'hidden', borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
              <CategoryThumbnail category={postCategory} height={{ xs: 148, sm: 184 }} />
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ px: 2, py: 1.5, textAlign: 'center', bgcolor: 'background.paper' }}
              >
                등록된 작업 이미지가 없습니다.
              </Typography>
            </Box>
          )}

          <Typography variant="body1" sx={{ lineHeight: 1.8, whiteSpace: 'pre-wrap', mb: 3 }}>
            {post.content}
          </Typography>

          <Divider sx={{ mb: 2 }} />

          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              variant={liked ? 'contained' : 'outlined'}
              color="error"
              startIcon={liked ? <Favorite /> : <FavoriteBorder />}
              onClick={handlePostLike}
              disabled={isActionPending('post-like')}
              aria-label={liked ? '게시글 좋아요 취소' : '게시글 좋아요'}
              sx={{ px: 4, py: 1, minHeight: 44, borderRadius: 5 }}
            >
              좋아요 {likeCount}
            </Button>
          </Box>
        </Box>

        {/* 댓글 섹션 */}
        <Box sx={{ bgcolor: 'background.paper', borderRadius: 3, p: 3, border: '1px solid', borderColor: 'divider' }}>
          <Typography component="h2" variant="h3" sx={{ mb: 2 }}>
            댓글 {comments.reduce((acc, c) => acc + 1 + (c.replies?.length ?? 0), 0)}개
          </Typography>

          {!user ? (
            <Alert severity="info" sx={{ mb: 3 }}>
              댓글을 작성하려면 로그인이 필요합니다.
            </Alert>
          ) : (
            <Box sx={{ display: 'flex', gap: 1.5, mb: 3 }}>
              <Avatar sx={{ width: 36, height: 36, bgcolor: 'primary.main', flexShrink: 0 }}>
                {user?.email?.[0]?.toUpperCase()}
              </Avatar>
              <Box sx={{ flexGrow: 1, display: 'flex', gap: 1 }}>
                <TextField
                  placeholder="댓글을 입력하세요..."
                  value={commentInput}
                  onChange={(e) => setCommentInput(e.target.value)}
                  fullWidth
                  multiline
                  maxRows={4}
                  disabled={isActionPending('comment-add')}
                  onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleAddComment(); } }}
                />
                <IconButton
                  color="primary"
                  onClick={handleAddComment}
                  disabled={!commentInput.trim() || isActionPending('comment-add')}
                  aria-label="댓글 전송"
                  sx={{ width: 44, height: 44 }}
                >
                  <Send />
                </IconButton>
              </Box>
            </Box>
          )}

          <Divider sx={{ mb: 1 }} />

          {comments.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <ChatBubble sx={{ fontSize: 40, color: 'text.disabled', mb: 1 }} />
              <Typography variant="body2" color="text.secondary">첫 댓글을 남겨보세요!</Typography>
            </Box>
          ) : (
            comments.map(comment => (
              <CommentItem
                key={comment.id}
                comment={comment}
                currentUserId={user?.id}
                onReply={handleReply}
                onLike={handleCommentLike}
                likedCommentIds={likedCommentIds}
                onDeleteComment={handleDeleteComment}
                onEditComment={handleEditComment}
                isActionPending={isActionPending}
              />
            ))
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default PostDetailPage;
