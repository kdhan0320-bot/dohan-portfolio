import test from 'node:test';
import assert from 'node:assert/strict';
import { interviewUpdate } from '../src/utils/recordPayload.js';

const question = { question: '지원한 이유는?', answer: '', importance: '보통', application_id: 'company-1' };

test('예상 질문만 저장해도 회사 연결을 유지한다', () => {
  const saved = interviewUpdate(question);
  assert.equal(saved.question, question.question);
  assert.equal(saved.answer, '');
  assert.equal(saved.application_id, question.application_id);
  assert.equal(saved.is_reviewed, false);
});

test('복습한 답변을 지우면 답변 준비 전 상태로 돌아간다', () => {
  const saved = interviewUpdate({ ...question, answer: '  ', is_reviewed: true });
  assert.equal(saved.answer, '');
  assert.equal(saved.is_reviewed, false);
});

test('답변을 유지한 일반 수정에서는 복습 상태를 유지한다', () => {
  const saved = interviewUpdate({ ...question, answer: ' 경험을 바탕으로 기여하고 싶습니다. ', is_reviewed: true });
  assert.equal(saved.answer, '경험을 바탕으로 기여하고 싶습니다.');
  assert.equal(saved.is_reviewed, true);
});

test('공백 질문은 답변 유무와 관계없이 거부한다', () => {
  assert.throws(() => interviewUpdate({ ...question, question: '  ', answer: '답변' }), /질문을 입력/);
});

test('유효하지 않은 중요도와 회사 연결은 저장하지 않는다', () => {
  assert.throws(() => interviewUpdate({ ...question, importance: 'invalid' }), /중요도/);
  assert.throws(() => interviewUpdate({ ...question, application_id: 42 }), /회사/);
});
