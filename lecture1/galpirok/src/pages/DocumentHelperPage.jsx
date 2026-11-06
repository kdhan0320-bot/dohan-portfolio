import Field from '../components/ui/Field';
import { useRef, useState } from 'react';
import { MenuItem, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import ContentCopy from '@mui/icons-material/ContentCopy';
import { PROMPT_TYPES } from '../constants';
import { generatePrompt } from '../utils/documentTemplateHelpers';
import { PageHeading, Empty } from '../components/ui/PageUI';
import ActionFeedback from '../components/ui/ActionFeedback';
import useRecordDraft from '../hooks/useRecordDraft';
const INITIAL = { type: PROMPT_TYPES[0], role: '', company: '', project: '', experience: '', result: '', generatedResult: '', resultCreated: false };
export default function DocumentHelperPage() {
  const drafts = useRecordDraft('documentHelper');
  const form = drafts.read('current')?.values || INITIAL;
  const { type, role, company, project, experience, result, generatedResult, resultCreated } = form;
  const [feedback, setFeedback] = useState(null);
  const [pendingResult, setPendingResult] = useState(null);
  const resultRef = useRef(null);
  const resetResultView = useRef(false);
  function changeForm(patch) {
    // Write before navigation can unmount this page. Reading from the scoped
    // store also makes sample reset and account changes clear the visible form.
    drafts.write('current', { ...form, ...patch }, INITIAL);
  }
  function focusResult(resetPosition = false) {
    const editor = resultRef.current;
    editor?.focus();
    if (editor && resetPosition) {
      editor.setSelectionRange(0, 0);
      editor.scrollTop = 0;
    }
  }
  function focusAfterConfirmation() {
    focusResult(resetResultView.current);
    resetResultView.current = false;
  }
  function compose(event) {
    event.preventDefault();
    const nextResult = generatePrompt(type, role, company, project, experience);
    // Keep the generated baseline in the same draft so restored manual edits,
    // including an intentionally emptied result, need explicit replacement.
    if (resultCreated && result !== generatedResult && result !== nextResult) {
      setPendingResult(nextResult);
      return;
    }
    changeForm({ result: nextResult, generatedResult: nextResult, resultCreated: true });
    window.requestAnimationFrame(() => focusResult(true));
  }
  function replaceResult() {
    changeForm({ result: pendingResult, generatedResult: pendingResult, resultCreated: true });
    resetResultView.current = true;
    setPendingResult(null);
    setFeedback({ message: '입력 내용으로 요청문을 다시 구성했어요.' });
  }
  async function copy() {
    try {
      await navigator.clipboard.writeText(result);
      setFeedback({
        message: '요청문을 복사했어요.'
      });
    } catch {
      document.getElementById('prompt-result')?.select();
      setFeedback({
        severity: 'info',
        message: '자동 복사가 제한되어 있어요. 선택된 내용을 직접 복사해주세요.'
      });
    }
  }
  return <>
  <PageHeading art="write" title="작성 요청문" description="AI에 붙여넣을 요청문을 만들어요." />
  <div className="helper-grid">
    <form className="panel panel-body field-stack" onSubmit={compose}>
      <div className="helper-input-heading"><h2>1. 경험 입력</h2></div>
      <Field select label="준비할 글" value={type} onChange={e => changeForm({ type: e.target.value })}>
        {PROMPT_TYPES.map(t => <MenuItem value={t} key={t}>
          {t}
        </MenuItem>)}
      </Field>
      <div className="helper-field-pair">
        <Field label="지원 직무" value={role} onChange={e => changeForm({ role: e.target.value })} placeholder="예: UX/UI 디자이너" />
        <Field label="지원 회사" value={company} onChange={e => changeForm({ company: e.target.value })} />
      </div>
      <Field label="프로젝트 또는 주제" value={project} onChange={e => changeForm({ project: e.target.value })} />
      <Field label="실제로 한 일과 결과" value={experience} onChange={e => changeForm({ experience: e.target.value })} multiline minRows={4} placeholder="내 역할, 선택한 방법, 직접 확인한 결과를 적어주세요." />
      <Button type="submit" variant="contained">{resultCreated ? '입력 내용으로 다시 구성' : '요청문 구성하기'}</Button>
      <p className="helper-note">AI 답변은 생성하지 않아요. 새로고침·탭 종료 전 필요한 요청문을 복사해주세요.</p>
    </form>
    <section className="panel helper-output">
      <div className="panel-heading" style={{
          padding: 0
        }}>
        <h2>2. 요청문 확인·복사</h2>
        {result && <Button startIcon={<ContentCopy />} onClick={copy}>복사</Button>}
      </div>
      {resultCreated ? <>
        <label htmlFor="prompt-result" className="muted" style={{
            display: 'block',
            marginTop: 15
          }}>복사 전에 내용을 수정할 수 있어요.</label>
        <textarea ref={resultRef} id="prompt-result" value={result} onChange={e => changeForm({ result: e.target.value })} aria-label="완성된 요청문" />
      </> : <Empty title="구성한 요청문이 여기에 표시돼요" />}
    </section>
  </div>
  <Dialog open={pendingResult !== null} onClose={() => setPendingResult(null)} aria-labelledby="replace-prompt-title" aria-describedby="replace-prompt-description" fullWidth maxWidth="xs" disableRestoreFocus slotProps={{ transition: { onExited: focusAfterConfirmation } }}>
    <DialogTitle id="replace-prompt-title">현재 요청문을 바꿀까요?</DialogTitle>
    <DialogContent><p id="replace-prompt-description">입력한 경험으로 다시 구성하면 직접 수정한 내용을 포함한 현재 요청문이 바뀝니다. 기존 요청문을 유지하려면 계속 편집을 선택해주세요.</p></DialogContent>
    <DialogActions>
      <Button autoFocus onClick={() => setPendingResult(null)}>계속 편집</Button>
      <Button variant="contained" onClick={replaceResult}>바꾸고 다시 구성</Button>
    </DialogActions>
  </Dialog>
  <ActionFeedback feedback={feedback} onClose={() => setFeedback(null)} />
</>;
}
