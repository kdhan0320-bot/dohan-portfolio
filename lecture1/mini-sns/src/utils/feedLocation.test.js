import test from "node:test";
import assert from "node:assert/strict";
import { feedPath, withFeedReturn } from "./feedLocation.js";
test("검색과 분류를 복귀 주소에 함께 보존한다", () => {
  const path = feedPath("/?q=여행 &category=작업기록");
  const params = new URL(path, "https://mini-sns.local").searchParams;
  assert.equal(params.get("category"), "작업기록");
  assert.equal(params.get("q"), "여행 ");
  const detail = withFeedReturn("/post/guest-1", path);
  assert.equal(
    new URL(detail, "https://mini-sns.local").searchParams.get("from"),
    path,
  );
});
test("외부 주소나 다른 페이지를 피드 복귀 주소로 사용하지 않는다", () => {
  for (const input of [
    "https://other.example/",
    "//other.example/",
    "/\\other.example/",
    "/profile",
    "javascript:alert(1)",
    null,
  ])
    assert.equal(feedPath(input), "/");
  assert.equal(feedPath("/?category=unknown&from=https://other.example"), "/");
});
test("공유 주소의 검색어는 입력 한도에 맞추고 불필요한 조건은 제거한다", () => {
  assert.equal(
    new URL(
      feedPath("/?q=" + "a".repeat(150)),
      "https://mini-sns.local",
    ).searchParams.get("q").length,
    120,
  );
  assert.equal(withFeedReturn("/post/guest-1", "/"), "/post/guest-1");
});
