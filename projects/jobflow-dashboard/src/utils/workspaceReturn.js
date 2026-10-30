const workspacePaths = new Set(['/', '/welcome', '/overview', '/calendar', '/checklist', '/interview', '/document-helper', '/settings', '/guide']);

export function workspaceReturn(value, fallback = '/overview') {
  const safeFallback = workspacePaths.has(fallback) ? fallback : '/overview';
  if (typeof value !== 'string' || !value.startsWith('/') || value.startsWith('//') || /[\\#\r\n]/.test(value)) return safeFallback;
  const [path] = value.split('?');
  return workspacePaths.has(path) ? value : safeFallback;
}
