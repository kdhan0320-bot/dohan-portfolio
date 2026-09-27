// This demo has no API or persistent storage. State disappears on unmount.
export function validateReviewText(text) {
  const value = typeof text === 'string' ? text.trim() : '';
  if (!value) return { value: '', error: '의견을 입력해 주세요.' };
  if (value.length > 280) return { value, error: '의견은 280자 이내로 입력해 주세요.' };
  return { value, error: '' };
}

export function createReviewDemoState(noteCount) {
  return { noteCount, active: 0, drafts: {}, replies: [], nextId: 1, error: '', status: '' };
}

export function reviewDemoReducer(state, action) {
  switch (action.type) {
    case 'select':
      if (!Number.isInteger(action.index) || action.index < 0 || action.index >= state.noteCount) return state;
      return { ...state, active: action.index, error: '', status: '' };
    case 'draft':
      return { ...state, drafts: { ...state.drafts, [state.active]: action.value }, error: '', status: '' };
    case 'add': {
      const result = validateReviewText(state.drafts[state.active]);
      if (result.error) return { ...state, error: result.error, status: '' };
      return {
        ...state,
        drafts: { ...state.drafts, [state.active]: '' },
        replies: [...state.replies, { id: state.nextId, note: state.active, text: result.value }],
        nextId: state.nextId + 1,
        error: '',
        status: `${state.active + 1}번 위치에 체험 의견을 추가했어요. 화면을 나가면 사라집니다.`,
      };
    }
    case 'remove':
      if (!state.replies.some(reply => reply.id === action.id)) return state;
      return { ...state, replies: state.replies.filter(reply => reply.id !== action.id), status: '체험 의견을 지웠어요.' };
    default:
      return state;
  }
}
