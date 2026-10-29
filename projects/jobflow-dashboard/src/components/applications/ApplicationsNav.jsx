import { Link } from 'react-router-dom';

export default function ApplicationsNav({ calendar = false }) {
  return <nav className="applications-view-nav" aria-label="지원 관리 보기">
    <Link to="/" aria-current={!calendar ? 'page' : undefined}>회사 목록</Link>
    <Link to="/calendar" aria-current={calendar ? 'page' : undefined}>현황 달력</Link>
  </nav>;
}
