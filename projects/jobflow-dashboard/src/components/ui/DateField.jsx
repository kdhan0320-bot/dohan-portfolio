import { useRef, useState } from 'react';
import { IconButton, InputAdornment } from '@mui/material';
import CalendarMonthOutlined from '@mui/icons-material/CalendarMonthOutlined';
import Field from './Field';
import { parseDateInput } from '../../utils/dateInput';
import DatePickerDialog from './DatePickerDialog';
import { useToday } from '../../hooks/useToday';

export default function DateField({ value, onChange, label, disabled, ...props }) {
  const [open, setOpen] = useState(false);
  const today = useToday();
  const input = useRef(null);
  const parsed = parseDateInput(value);
  const title = label.replace(/\s*\(선택\)$/, '');
  return <><Field {...props} type="text" label={label} disabled={disabled} value={value}
    inputRef={input} placeholder="YYYY-MM-DD" autoComplete="off" onChange={onChange}
    onBlur={() => { if (parsed.value && parsed.value !== value) onChange({ target: { value: parsed.value } }); }}
    slotProps={{
      htmlInput: { inputMode: 'numeric' },
      input: { endAdornment: <InputAdornment position="end">
        <span className="date-picker-control">
          <IconButton type="button" disabled={disabled} aria-label={`${title} 달력 열기`} aria-haspopup="dialog" aria-expanded={open} onClick={() => setOpen(true)}><CalendarMonthOutlined fontSize="small" /></IconButton>
        </span>
      </InputAdornment> },
      formHelperText: { role: props.error ? 'alert' : undefined },
    }} />
    <DatePickerDialog open={open} value={parsed.value || ''} referenceDate={today} label={`${title} 선택`}
      onSelect={date => onChange({ target: { value: date } })} onClose={() => setOpen(false)} />
  </>;
}
