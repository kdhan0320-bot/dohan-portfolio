// Scroll only the field container, preserving the selection and the page position.
export function caretScrollDelta(top, bottom, caretTop, caretHeight, margin = 12) {
  if (caretTop < top + margin) return caretTop - top - margin;
  if (caretTop + caretHeight > bottom - margin) return caretTop + caretHeight - bottom + margin;
  return 0;
}

export function revealTextareaCaret(input, container) {
  const doc = input?.ownerDocument;
  if (!container || doc?.activeElement !== input) return;
  const style = doc.defaultView.getComputedStyle(input);
  const mirror = doc.createElement('div');
  // Match wrapping, including Korean, blank lines, and a caret inside the answer.
  for (const key of ['fontFamily', 'fontSize', 'fontWeight', 'fontStyle', 'lineHeight', 'letterSpacing', 'wordSpacing', 'textIndent', 'textTransform', 'tabSize', 'wordBreak', 'overflowWrap', 'paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft', 'borderTopWidth', 'borderRightWidth', 'borderBottomWidth', 'borderLeftWidth']) mirror.style[key] = style[key];
  Object.assign(mirror.style, { position: 'fixed', left: '-10000px', top: '0', visibility: 'hidden', boxSizing: 'border-box', borderStyle: 'solid', width: `${input.clientWidth + parseFloat(style.borderLeftWidth || 0) + parseFloat(style.borderRightWidth || 0)}px`, whiteSpace: 'pre-wrap', overflowWrap: 'break-word' });
  mirror.setAttribute('aria-hidden', 'true');
  const position = input.selectionDirection === 'backward' ? input.selectionStart : input.selectionEnd;
  mirror.textContent = input.value.slice(0, position);
  const caret = doc.createElement('span');
  caret.textContent = input.value.slice(position, position + 1) || '\u200b';
  mirror.append(caret);
  doc.body.append(mirror);
  try {
    const lineHeight = parseFloat(style.lineHeight) || parseFloat(style.fontSize) * 1.5;
    const caretTop = input.getBoundingClientRect().top + caret.getBoundingClientRect().top - mirror.getBoundingClientRect().top - input.scrollTop;
    const bounds = container.getBoundingClientRect();
    const delta = caretScrollDelta(bounds.top, bounds.bottom, caretTop, lineHeight);
    if (delta) container.scrollTop += delta;
  } finally { mirror.remove(); }
}
