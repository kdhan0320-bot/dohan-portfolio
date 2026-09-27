import desk from '../../assets/galpi-desk.webp';
import objects from '../../assets/galpi-objects.webp';

export function JournalArt({ className = '', eager = false }) {
  return <img className={`journal-art ${className}`} src={desk} width="1536" height="1024" alt="" aria-hidden="true" loading={eager ? 'eager' : 'lazy'} decoding="async" />;
}

export function StageArt({ index, className = '' }) {
  return <span className={`stage-art ${className}`} aria-hidden="true">
    <img src={objects} width="2172" height="724" alt="" loading="lazy" decoding="async" style={{ transform: `translate(-${index * 100 / 3}%, -50%)` }} />
  </span>;
}
