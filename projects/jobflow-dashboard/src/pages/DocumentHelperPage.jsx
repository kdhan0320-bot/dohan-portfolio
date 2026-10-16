import Field from '../components/ui/Field';
import { useState } from 'react';
import { MenuItem, Button } from '@mui/material';
import ContentCopy from '@mui/icons-material/ContentCopy';
import { PROMPT_TYPES } from '../constants';
import { generatePrompt } from '../utils/documentTemplateHelpers';
import { PageHeading, Empty } from '../components/ui/PageUI';
import ActionFeedback from '../components/ui/ActionFeedback';
import useRecordDraft from '../hooks/useRecordDraft';
const INITIAL = { type: PROMPT_TYPES[0], role: '', company: '', project: '', experience: '', result: '' };
export default function DocumentHelperPage() {
  const drafts = useRecordDraft('documentHelper');
  const form = drafts.read('current')?.values || INITIAL;
  const { type, role, company, project, experience, result } = form;
  const [feedback, setFeedback] = useState(null);
  function changeForm(patch) {
    // Write before navigation can unmount this page. Reading from the scoped
    // store also makes sample reset and account changes clear the visible form.
    drafts.write('current', { ...form, ...patch }, INITIAL);
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
    <form className="panel panel-body field-stack" onSubmit={e => {
        e.preventDefault();
        changeForm({ result: generatePrompt(type, role, company, project, experience) });
      }}>
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
      <Button type="submit" variant="contained">요청문 구성하기</Button>
      <p className="helper-note">AI 답변은 생성하지 않아요. 입력과 요청문은 화면을 이동해도 이 탭에서 유지되며, 새로고침·탭 종료 시 사라져요. 필요한 내용은 복사해 보관해주세요.</p>
    </form>
    <section className="panel helper-output">
      <div className="panel-heading" style={{
          padding: 0
        }}>
        <h2>2. 요청문 확인·복사</h2>
        {result && <Button startIcon={<ContentCopy />} onClick={copy}>복사</Button>}
      </div>
      {result ? <>
        <label htmlFor="prompt-result" className="muted" style={{
            display: 'block',
            marginTop: 15
          }}>복사 전에 내용을 수정할 수 있어요.</label>
        <textarea id="prompt-result" value={result} onChange={e => changeForm({ result: e.target.value })} aria-label="완성된 요청문" />
      </> : <Empty title="구성한 요청문이 여기에 표시돼요" />}
    </section>
  </div>
  <ActionFeedback feedback={feedback} onClose={() => setFeedback(null)} />
</>;
}
