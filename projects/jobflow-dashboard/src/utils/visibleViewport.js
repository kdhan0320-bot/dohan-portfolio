// The visual viewport shrinks with an on-screen keyboard even when 100dvh does not.
export function observeVisibleViewport(win, root) {
  const viewport = win.visualViewport;
  if (!viewport) return () => {};
  let baseline = win.innerHeight;
  let width = win.innerWidth;
  let editing = false;
  const update = () => {
    if (width !== win.innerWidth) { width = win.innerWidth; baseline = win.innerHeight; }
    baseline = Math.max(baseline, win.innerHeight);
    const mobile = width < 1000 && Math.abs(viewport.scale - 1) < 0.05;
    const reduced = mobile && baseline - viewport.height > 120;
    const active = root.ownerDocument.activeElement;
    editing = reduced && (editing || Boolean(active?.matches('input:not([readonly]):not([type="checkbox"]):not([type="radio"]), textarea:not([readonly]), [contenteditable="true"]')));
    root.style.setProperty('--visible-height', `${mobile ? viewport.height : win.innerHeight}px`);
    root.style.setProperty('--visible-top', `${mobile ? viewport.offsetTop : 0}px`);
    root.toggleAttribute('data-keyboard-open', editing);
  };
  const sources = [[viewport, 'resize'], [viewport, 'scroll'], [win, 'resize'], [root.ownerDocument, 'focusin'], [root.ownerDocument, 'focusout']];
  sources.forEach(([source, event]) => source.addEventListener(event, update));
  update();
  return () => {
    sources.forEach(([source, event]) => source.removeEventListener(event, update));
    root.style.removeProperty('--visible-height');
    root.style.removeProperty('--visible-top');
    root.removeAttribute('data-keyboard-open');
  };
}
