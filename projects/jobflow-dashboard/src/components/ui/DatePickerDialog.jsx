import { useEffect, useId, useRef, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material';
import ChevronLeft from '@mui/icons-material/ChevronLeft';
import ChevronRight from '@mui/icons-material/ChevronRight';
import Close from '@mui/icons-material/Close';
import { keyboardDate, monthCells, shiftMonth, validDate, WEEKDAYS } from '../../utils/calendar';

export default function DatePickerDialog({ open, value, referenceDate, label, onSelect, onClose }) {
  const titleId = useId();
  const initial = validDate(value) ? value : referenceDate;
  const [focused, setFocused] = useState(initial);
  const [month, setMonth] = useState(initial.slice(0, 7));
  const dayButtons = useRef(new Map());
  const pendingFocus = useRef(false);
  useEffect(() => {
    if (!open) return;
    const date = validDate(value) ? value : referenceDate;
    setFocused(date);
    setMonth(date.slice(0, 7));
  }, [open, value, referenceDate]);
  useEffect(() => {
    if (!pendingFocus.current) return;
    pendingFocus.current = false;
    dayButtons.current.get(focused)?.focus();
  }, [focused, month]);
  const year = Number(month.slice(0, 4));
  const years = [...new Set([...Array.from({ length: 201 }, (_, index) => 1900 + index), year])].sort((a, b) => a - b);
  const cells = monthCells(month);
  function changeMonth(next) {
    if (!/^\d{4}-\d{2}$/.test(next) || !validDate(`${next}-01`)) return;
    setMonth(next);
    setFocused(validDate(value) && value.startsWith(next) ? value : `${next}-01`);
  }
  function moveDate(event, date) {
    const next = keyboardDate(date, event.key);
    if (!next || next < '0001-01-01') return;
    event.preventDefault();
    pendingFocus.current = true;
    setFocused(next);
    setMonth(next.slice(0, 7));
  }
  function choose(date) {
    onSelect(date);
    onClose();
  }
  return <Dialog open={open} onClose={onClose} aria-labelledby={titleId} className="date-choice-dialog"
    fullWidth maxWidth="xs" slotProps={{ transition: { onEntered: () => dayButtons.current.get(focused)?.focus() } }}>
    <DialogTitle id={titleId}>{label}<IconButton aria-label="달력 닫기" onClick={onClose}><Close /></IconButton></DialogTitle>
    <DialogContent>
      <div className="date-choice-month">
        <IconButton aria-label="이전 달" disabled={month === '0001-01'} onClick={() => changeMonth(shiftMonth(month, -1))}><ChevronLeft /></IconButton>
        <label><span className="sr-only">연도</span><select aria-label="연도" value={year} onChange={event => changeMonth(`${String(event.target.value).padStart(4, '0')}-${month.slice(5)}`)}>
          {years.map(option => <option key={option} value={option}>{option}년</option>)}
        </select></label>
        <label><span className="sr-only">월</span><select aria-label="월" value={Number(month.slice(5))} onChange={event => changeMonth(`${month.slice(0, 4)}-${String(event.target.value).padStart(2, '0')}`)}>
          {Array.from({ length: 12 }, (_, index) => <option key={index + 1} value={index + 1}>{index + 1}월</option>)}
        </select></label>
        <IconButton aria-label="다음 달" disabled={month === '9999-12'} onClick={() => changeMonth(shiftMonth(month, 1))}><ChevronRight /></IconButton>
      </div>
      <span className="sr-only" aria-live="polite">{year}년 {Number(month.slice(5))}월</span>
      <table className="date-choice-grid" role="grid" aria-label={`${year}년 ${Number(month.slice(5))}월 날짜 선택`}>
        <thead><tr>{WEEKDAYS.map(day => <th key={day} scope="col" abbr={`${day}요일`}>{day}</th>)}</tr></thead>
        <tbody>{Array.from({ length: 6 }, (_, row) => <tr key={row}>{cells.slice(row * 7, row * 7 + 7).map((date, column) => !validDate(date) || date < '0001-01-01' ? <td key={`blank-${column}`} /> :
          <td key={date} aria-selected={date === value}>
            <button type="button" ref={node => { if (node) dayButtons.current.set(date, node); else dayButtons.current.delete(date); }}
              tabIndex={date === focused ? 0 : -1} aria-label={`${Number(date.slice(0, 4))}년 ${Number(date.slice(5, 7))}월 ${Number(date.slice(8))}일`}
              data-outside={!date.startsWith(month) || undefined} data-selected={date === value || undefined}
              onFocus={() => setFocused(date)} onKeyDown={event => moveDate(event, date)} onClick={() => choose(date)}>{Number(date.slice(8))}</button>
          </td>)}</tr>)}</tbody>
      </table>
    </DialogContent>
    <DialogActions><Button onClick={() => choose('')}>날짜 비우기</Button><Button variant="outlined" onClick={onClose}>취소</Button></DialogActions>
  </Dialog>;
}
