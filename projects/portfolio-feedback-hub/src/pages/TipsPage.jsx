import TipsLayout from '../components/TipsLayout';
import TipList from '../components/TipList';
import { usePageTitle } from '../utils/pageMeta';

export default function TipsPage() {
  usePageTitle('팁 모음 | 고른시선');
  return <TipsLayout><header className="tips-page-heading"><p className="tips-eyebrow">6가지 기초 UI 팁</p><h1>내 화면에서 찾고 싶은 팁</h1><p className="tips-lead">지금 어색하게 느껴지는 부분부터 살펴보세요.</p></header><section className="tips-index" aria-label="UI 팁 목록"><TipList /></section></TipsLayout>;
}
