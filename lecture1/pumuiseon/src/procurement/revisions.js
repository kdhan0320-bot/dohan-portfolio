import { amount, money } from './model.js';

const text = value => String(value ?? '').trim();
const fields = [['title', '요청 제목'], ['department', '요청 부서'], ['needBy', '희망 납기일'], ['supplier', '거래처'], ['purpose', '구매 사유']];
const itemFields = [['spec', '규격'], ['quantity', '수량'], ['price', '단가']];
const itemValue = (item, key) => key === 'quantity' || key === 'price' ? Number(item[key] || 0) : text(item[key]);
const itemSummary = item => `${item.name || '품목 미입력'} · ${item.spec || '규격 미입력'} · ${item.quantity || '—'}${item.unit ? ` ${item.unit}` : '개'} · 단가 ${money(item.price)}`;

// Compare with the last earlier submission, never with this revision's own snapshot.
// Saved records are read only; item names changing are represented as removal/addition.
export function revisionChanges(request) {
  const previous = (request.submissions || []).reduce((found, snapshot) =>
    snapshot.revision < request.revision && (!found || snapshot.revision >= found.revision) ? snapshot : found, null);
  if (!previous) return { previous: null, changes: [] };
  const changes = [];
  fields.forEach(([key, label]) => {
    if (text(previous[key]) !== text(request[key])) changes.push({ label, before: previous[key] == null ? '기록 없음' : text(previous[key]) || '미입력', after: text(request[key]) || '미입력' });
  });

  const beforeItems = previous.items || [], afterItems = request.items || [];
  const pairs = new Map(), used = new Set();
  // Match unchanged rows first so removing or reordering items creates no false edits.
  const match = predicate => afterItems.forEach((item, index) => {
    if (pairs.has(index)) return;
    const oldIndex = beforeItems.findIndex((old, i) => !used.has(i) && predicate(old, item));
    if (oldIndex !== -1) { pairs.set(index, oldIndex); used.add(oldIndex); }
  });
  match((a, b) => ['name', 'spec', 'quantity', 'price'].every(key => itemValue(a, key) === itemValue(b, key)));
  match((a, b) => text(a.name) === text(b.name) && text(a.spec) === text(b.spec));
  match((a, b) => text(a.name) === text(b.name));
  afterItems.forEach((item, index) => {
    const oldIndex = pairs.get(index);
    if (oldIndex == null) { changes.push({ label: '품목 추가', before: '—', after: itemSummary(item) }); return; }
    const old = beforeItems[oldIndex];
    const duplicateName = afterItems.filter(other => text(other.name) === text(item.name)).length > 1;
    const name = `${item.name || '품목 미입력'}${duplicateName ? ` (${index + 1}번)` : ''}`;
    itemFields.forEach(([key, label]) => {
      if (itemValue(old, key) === itemValue(item, key)) return;
      const format = value => key === 'price' ? money(value) : key === 'quantity' ? `${value || '—'}${item.unit ? ` ${item.unit}` : '개'}` : text(value) || '미입력';
      changes.push({ label: `${name} · ${label}`, before: format(old[key]), after: format(item[key]) });
    });
  });
  beforeItems.forEach((item, index) => {
    if (!used.has(index)) changes.push({ label: '품목 제외', before: itemSummary(item), after: '—' });
  });
  if (amount(previous) !== amount(request)) changes.push({ label: '품의 합계', before: money(amount(previous)), after: money(amount(request)) });
  return { previous, changes };
}
