import { useNavigate } from 'react-router-dom';
import ApplicationPanel from '../components/applications/ApplicationPanel';
import { PageHeading } from '../components/ui/PageUI';
import { useAuth } from '../context/AuthContext';
import useApplications from '../hooks/useApplications';
import { boardColumn } from '../utils/applicationBoard';

export default function ApplicationFormPage() {
  const navigate = useNavigate();
  const { user, isGuest } = useAuth();
  const { add } = useApplications();
  const scope = isGuest ? 'sample' : user?.id ? `user:${user.id}` : null;
  async function save(form) {
    const record = await add(form);
    const lane = boardColumn(record.status);
    const params = new URLSearchParams({ company: record.id });
    params.set(lane === 'paused' ? 'view' : 'lane', lane);
    navigate(`/?${params}`, { replace: true });
  }
  return <div className="company-registration-page">
    <PageHeading art="folder" title="회사 등록" description="회사 이름부터 기록하고, 일정과 준비를 이어서 관리해요." />
    <ApplicationPanel standalone creating draftScope={scope} onClose={() => navigate('/')} onSave={save} />
  </div>;
}
