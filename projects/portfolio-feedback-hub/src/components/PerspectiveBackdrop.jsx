import perspectiveStudio from '../assets/perspective-studio.webp';

/* Original AI-assisted material study; decorative, never carries instructions. */
export default function PerspectiveBackdrop({ className = '' }) {
  return <img className={`perspective-backdrop ${className}`} src={perspectiveStudio} width="1536" height="1024" alt="" aria-hidden="true" decoding="async" />;
}
