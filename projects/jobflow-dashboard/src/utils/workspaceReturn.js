const workspacePaths = new Set(['/', '/overview', '/calendar', '/checklist', '/interview', '/document-helper', '/settings', '/guide']);

export function workspaceReturn(value) {
  if (typeof value !== 'string' || !value.startsWith('/') || value.startsWith('//') || /[\\#\r\n]/.test(value)) return '/overview';
  const [path] = value.split('?');
  return workspacePaths.has(path) ? value : '/overview';
}
