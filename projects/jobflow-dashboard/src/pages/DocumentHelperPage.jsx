import Field from '../components/ui/Field';
import { useState } from 'react';
import { MenuItem, Button } from '@mui/material';
import ContentCopy from '@mui/icons-material/ContentCopy';
import { PROMPT_TYPES } from '../constants';
import { generatePrompt } from '../utils/documentTemplateHelpers';
import { PageHeading, Empty } from '../components/ui/PageUI';
import ActionFeedback from '../components/ui/ActionFeedback';
export default function DocumentHelperPage() {
  const [type, setType] = useState(PROMPT_TYPES[0]);
  const [role, setRole] = useState('');
  const [company, setCompany] = useState('');
  const [project, setProject] = useState('');
  const [experience, setExperience] = useState('');
  const [result, setResult] = useState('');
  const [feedback, setFeedback] = useState(null);
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
        setResult(generatePrompt(type, role, company, project, experience));
      }}>
      <div className="helper-input-heading"><h2>나의 경험 정리</h2><p>필요한 내용부터 채워보세요.</p></div>
      <Field select label="준비할 글" value={type} onChange={e => setType(e.target.value)}>
        {PROMPT_TYPES.map(t => <MenuItem value={t} key={t}>
          {t}
        </MenuItem>)}
      </Field>
      <Field label="지원 직무" value={role} onChange={e => setRole(e.target.value)} placeholder="예: UX/UI 디자이너" />
      <Field label="지원 회사" value={company} onChange={e => setCompany(e.target.value)} />
      <Field label="프로젝트 또는 주제" value={project} onChange={e => setProject(e.target.value)} />
      <Field label="실제로 한 일과 결과" value={experience} onChange={e => setExperience(e.target.value)} multiline minRows={4} placeholder="내 역할, 선택한 방법, 직접 확인한 결과를 적어주세요." />
      <Button type="submit" variant="contained">요청문 구성하기</Button>
      <p className="helper-note">여기서는 AI 답변을 생성하지 않아요. 입력한 내용은 저장되지 않아요.</p>
    </form>
    <section className="panel helper-output">
      <div className="panel-heading" style={{
          padding: 0
        }}>
        <h2>나의 요청문</h2>
        {result && <Button startIcon={<ContentCopy />} onClick={copy}>복사</Button>}
      </div>
      {result ? <>
        <label htmlFor="prompt-result" className="muted" style={{
            display: 'block',
            marginTop: 15
          }}>수정·복사한 뒤 사용하는 AI에 붙여넣으세요.</label>
        <textarea id="prompt-result" value={result} onChange={e => setResult(e.target.value)} aria-label="완성된 요청문" />
      </> : <Empty title="작성한 경험이 요청문으로">
        <p>경험을 입력하고 ‘요청문 구성하기’를 누르면<br />여기에서 확인하고 수정할 수 있어요.</p>
      </Empty>}
    </section>
  </div>
  <ActionFeedback feedback={feedback} onClose={() => setFeedback(null)} />
</>;
}
