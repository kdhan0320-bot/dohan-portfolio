import wordmark from '../../assets/galpirok-wordmark.svg';

export function Brand({
  compact = false
}) {
  return <span className={`brand brand-wordmark-lockup${compact ? ' brand-compact' : ''}`}>
  <img className="brand-wordmark" src={wordmark} width="104" height="41" alt="갈피록" />
</span>;
}
