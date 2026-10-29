import TipLink from './TipLink';
import { TIPS } from '../constants/tips';

export default function TipList() {
  return <div className="tips-list">{TIPS.map((tip, index) => <TipLink
    key={tip.id} to={`/tips/${tip.id}`} className="tips-list-item" focusId={`tip-${tip.id}`}
  ><span className="tips-list-number">{String(index + 1).padStart(2, '0')}</span>
    <span><span className="tips-topic">{tip.topic}</span><span className="tips-list-title">{tip.title}</span></span>
    <span className="tips-arrow" aria-hidden="true">↗</span>
  </TipLink>)}</div>;
}
