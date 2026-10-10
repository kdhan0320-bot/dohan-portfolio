import { CHECKLIST_CATEGORIES } from '../constants';

function applicationId(value) {
  if (value == null) return null;
  if (typeof value !== 'string') throw new Error('연결할 회사를 다시 선택해주세요.');
  return value.trim() || null;
}

export function checklistUpdate(payload) {
  const title = String(payload.title ?? '').trim();
  if (!title) throw new Error('준비할 일을 입력해주세요.');
  if (!CHECKLIST_CATEGORIES.includes(payload.category)) throw new Error('분류를 다시 선택해주세요.');
  return { title, category: payload.category, application_id: applicationId(payload.application_id) };
}

export function interviewUpdate(payload) {
  const question = String(payload.question ?? '').trim();
  const answer = String(payload.answer ?? '').trim();
  if (!question || !answer) throw new Error('질문과 답변을 모두 입력해주세요.');
  if (!['높음', '보통', '낮음'].includes(payload.importance)) throw new Error('중요도를 다시 선택해주세요.');
  return { question, answer, related_project: String(payload.related_project ?? '').trim(), importance: payload.importance, application_id: applicationId(payload.application_id) };
}
