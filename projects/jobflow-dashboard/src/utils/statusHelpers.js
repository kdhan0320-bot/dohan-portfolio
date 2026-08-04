export const calcProgress = (items = []) => {
  if (items.length === 0) return { rate: 0, done: 0, total: 0 };
  const done = items.filter((i) => i.is_done).length;
  return { rate: Math.round((done / items.length) * 100), done, total: items.length };
};
