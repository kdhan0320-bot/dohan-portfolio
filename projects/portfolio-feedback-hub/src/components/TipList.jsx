import TipLink from './TipLink';
import { TIPS } from '../constants/tips';
import { TipPreview } from './TipComparison';
import TipsIcon from './TipsIcon';

export default function TipList() {
  return <div className="tips-list">{TIPS.map((tip, index) => <TipLink
    key={tip.id} to={`/tips/${tip.id}`} className={`tips-list-item tips-tone-${tip.tone}`} focusId={`tip-${tip.id}`}
    aria-label={`${String(index + 1).padStart(2, '0')} ${tip.topic} ${tip.title}`}
  ><div className="tips-list-caption"><div className="tips-card-meta"><span className="tips-list-number">{String(index + 1).padStart(2, '0')}</span><span className="tips-topic">{tip.topic}</span></div><h3 className="tips-list-title">{tip.title}</h3></div><TipPreview tip={tip} /><div className="tips-card-rule"><span>고른 기준</span><p>{tip.cardRule}</p><TipsIcon /></div>
  </TipLink>)}</div>;
}
