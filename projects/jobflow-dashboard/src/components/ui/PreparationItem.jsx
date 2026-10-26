import { Checkbox } from '@mui/material';

export default function PreparationItem({ item, onToggle, disabled = false, inputRef, inputId, recent = false, showCategory = false, children }) {
  return <div className={`preparation-item${item.is_done ? ' is-complete' : ''}`}>
    <label className="preparation-toggle">
      <Checkbox checked={Boolean(item.is_done)} disabled={disabled} onChange={event => onToggle(item, event.target.checked)} slotProps={{ input: { id: inputId, ref: inputRef, 'aria-label': `${item.title} ${item.is_done ? '완료 취소' : '완료'}` } }} />
      <span className="preparation-copy"><span className="preparation-title">{item.title}</span>{(item.is_done || showCategory) && <small>{item.is_done ? recent ? '방금 완료' : '완료' : item.category}</small>}</span>
    </label>
    {children}
  </div>;
}
