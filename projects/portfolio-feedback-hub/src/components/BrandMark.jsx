export default function BrandMark({
  size = 36,
  className = ''
}) {
  return <svg className={className} width={size} height={size} viewBox="0 0 40 40" fill="none" aria-hidden="true">
    <rect width="40" height="40" rx="10" fill="#292832" />
    <path d="M9 12h13v13H9z" stroke="#fff" strokeWidth="2.4" />
    <path d="M18 17h13v13H18z" fill="#B8A8F0" stroke="#B8A8F0" strokeWidth="2.4" />
    <path d="M18 17h4v8h-4z" fill="#fff" />
    <circle cx="30" cy="10" r="3" fill="#B8A8F0" />
  </svg>;
}
