import SiteHeader from './SiteHeader';

export default function Header({ diaryMode = false }) {
  return <SiteHeader diaryMode={diaryMode} />;
}
