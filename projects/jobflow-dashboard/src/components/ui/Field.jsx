import { useId } from 'react';
import { Box, TextField } from '@mui/material';

/** A persistent external label keeps Korean text clear of the input outline. */
export default function Field({
  id, label, required, helperText, className = '', sx, fullWidth,
  slotProps = {}, select = false, error, ...props
}) {
  const generatedId = useId();
  const inputId = id || `field-${generatedId}`;
  const labelId = `${inputId}-label`;
  return (
    <Box className={`form-field ${className}`} sx={{ minWidth: 0, ...(fullWidth ? { width: '100%' } : {}), ...sx }}>
      <label id={labelId} htmlFor={inputId} className={`field-label ${error ? 'field-label-error' : ''}`}>
        {label}{required && <span aria-hidden="true" className="field-required"> *</span>}
      </label>
      <TextField
        {...props}
        id={inputId}
        fullWidth
        required={required}
        error={error}
        select={select}
        helperText={helperText}
        slotProps={{
          ...slotProps,
          input: { ...slotProps.input, notched: false },
          htmlInput: { ...slotProps.htmlInput, ...(!select ? { 'aria-labelledby': labelId } : {}) },
          select: { ...slotProps.select, labelId },
          formHelperText: { ...slotProps.formHelperText, sx: { mx: 0, mt: 0.75, lineHeight: 1.6 } },
        }}
      />
    </Box>
  );
}
