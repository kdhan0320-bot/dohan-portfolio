import { useRef } from 'react';
import { IconButton, InputAdornment } from '@mui/material';
import CalendarMonthOutlined from '@mui/icons-material/CalendarMonthOutlined';
import Field from './Field';
import { parseDateInput } from '../../utils/dateInput';

export default function DateField({ value, onChange, label, disabled, ...props }) {
  const picker = useRef(null);
  const input = useRef(null);
  const parsed = parseDateInput(value);
  const pickerLabel = `${label.replace(/\s*\(선택\)$/, '')} 달력 열기`;
  function openPicker() {
    try { picker.current.showPicker(); }
    catch { input.current?.focus(); }
  }
  function selectDate(event) {
    onChange({ target: { value: event.target.value } });
    input.current?.focus({ preventScroll: true });
  }
  return <Field {...props} type="text" label={label} disabled={disabled} value={value}
    inputRef={input} placeholder="YYYY-MM-DD" autoComplete="off" onChange={onChange}
    onBlur={() => { if (parsed.value && parsed.value !== value) onChange({ target: { value: parsed.value } }); }}
    slotProps={{
      htmlInput: { inputMode: 'numeric' },
      input: { endAdornment: <InputAdornment position="end">
        <span className="date-picker-control">
          <IconButton type="button" disabled={disabled} aria-label={pickerLabel} onClick={openPicker}><CalendarMonthOutlined fontSize="small" /></IconButton>
          <input ref={picker} className="date-picker-native" type="date" tabIndex={-1} aria-hidden="true"
            disabled={disabled} value={parsed.value || ''} onChange={selectDate} />
        </span>
      </InputAdornment> },
      formHelperText: { role: props.error ? 'alert' : undefined },
    }} />;
}
