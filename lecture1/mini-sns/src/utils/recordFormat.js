export const recordLabels = (category) => ({
  attempt:
    category === "질문"
      ? "고민 중인 것"
      : category === "스터디"
        ? "함께 해볼 것"
        : "시도한 것",
  reason: category === "작업기록" ? "바꾼 이유" : "이야기의 배경",
});
export const validReflection = (value) =>
  value === undefined ||
  Boolean(
    value &&
    typeof value.reason === "string" &&
    typeof value.question === "string",
  );
// Only enrich untouched sample content; keep personal edits, reactions and deletions.
export const enrichSampleRecords = (data, samples) => ({
  ...data,
  posts: data.posts.map((post) => {
    const sample = samples.find((item) => item.id === post.id);
    return sample &&
      post.reflection === undefined &&
      post.title === sample.title &&
      post.caption === sample.caption
      ? { ...post, reflection: sample.reflection }
      : post;
  }),
});
