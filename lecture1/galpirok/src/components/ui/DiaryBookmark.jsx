// A page marker, not another navigation control. The page heading remains its label.
export default function DiaryBookmark({ label, tone = 'blue' }) {
  return <span className="diary-page-tab" data-tone={tone} aria-hidden="true"><span>{label}</span></span>;
}
