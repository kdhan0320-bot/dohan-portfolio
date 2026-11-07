import { enrichSampleRecords } from "./recordFormat.js";
import test from "node:test";
import assert from "node:assert/strict";
import { readStored, writeStored, STORAGE_PREFIX } from "./storage.js";
import { validCommunityData } from "./communityState.js";

const data = () => ({
  posts: [
    {
      id: "one",
      user_id: "demo-user",
      title: "작업 기록",
      caption: "새로운 시도",
      category: "작업기록",
      profiles: {
        nickname: "도한",
        profile_image_url: "data:image/svg+xml,test",
      },
      created_at: "2026-11-08T00:00:00.000Z",
      likes_count: 0,
      comments: [],
    },
  ],
  joined: ["react-worklog"],
  messages: {
    "react-worklog": [
      { id: "message", sender: "도한", content: "안녕하세요", mine: true },
    ],
  },
  profile: { nickname: "도한", profile_image_url: "", bio: "작업을 기록해요" },
  readRooms: [],
});
test("저장된 정상 작업·대화 상태를 복원한다", () => {
  const state = data();
  assert.equal(validCommunityData(state), true);
  Object.defineProperty(globalThis, "localStorage", {
    configurable: true,
    value: {
      getItem: (key) =>
        key === STORAGE_PREFIX + "community" ? JSON.stringify(state) : null,
    },
  });
  assert.deepEqual(readStored("community", {}, validCommunityData), state);
});
test("깨진 JSON과 누락된 중첩 데이터에서 안전하게 초기화한다", () => {
  const fallback = () => ({ restored: false });
  Object.defineProperty(globalThis, "localStorage", {
    configurable: true,
    value: { getItem: () => "broken{" },
  });
  assert.deepEqual(readStored("community", fallback, validCommunityData), {
    restored: false,
  });
  const malformed = data();
  malformed.posts[0].profiles = null;
  assert.equal(validCommunityData(malformed), false);
  malformed.posts = data().posts;
  malformed.messages["react-worklog"] = [null];
  assert.equal(validCommunityData(malformed), false);
  malformed.messages = data().messages;
  malformed.posts[0].comments = [null];
  assert.equal(validCommunityData(malformed), false);
});
test("저장 공간 부족과 브라우저 저장 차단을 실패로 반환한다", () => {
  Object.defineProperty(globalThis, "localStorage", {
    configurable: true,
    value: {
      getItem: () => {
        throw new Error("Storage blocked");
      },
      setItem: () => {
        throw new Error("Quota exceeded");
      },
    },
  });
  assert.equal(writeStored("community", data()), false);
  assert.equal(readStored("entered", false), false);
});
test("정상 저장은 지정된 작품 키만 사용한다", () => {
  const writes = [];
  Object.defineProperty(globalThis, "localStorage", {
    configurable: true,
    value: { setItem: (key, value) => writes.push([key, value]) },
  });
  assert.equal(writeStored("draft-new", { title: "초안" }), true);
  assert.deepEqual(writes, [
    [STORAGE_PREFIX + "draft-new", '{"title":"초안"}'],
  ]);
});

test("이전 기록과 새 기록 형식을 모두 복원하되 잘못된 세부 필드는 거른다", () => {
  const state = data();
  assert.equal(validCommunityData(state), true);
  state.posts[0].reflection = {
    reason: "선택의 이유",
    question: "어떻게 보이나요?",
  };
  assert.equal(validCommunityData(state), true);
  state.posts[0].reflection.question = null;
  assert.equal(validCommunityData(state), false);
});

test("예시 보강은 수정한 기록·반응·삭제 상태를 보존한다", () => {
  const base = data().posts[0];
  const seed = { ...base, reflection: { reason: "이유", question: "질문" } };
  const state = {
    ...data(),
    posts: [{ ...base, liked: true, likes_count: 4 }],
  };
  const upgraded = enrichSampleRecords(state, [seed]);
  assert.deepEqual(upgraded.posts[0].reflection, seed.reflection);
  assert.equal(upgraded.posts[0].likes_count, 4);
  assert.equal(upgraded.posts[0].liked, true);
  const edited = { ...base, caption: "내가 바꾼 글" };
  assert.equal(
    enrichSampleRecords({ ...state, posts: [edited] }, [seed]).posts[0],
    edited,
  );
  const cleared = { ...base, reflection: { reason: "", question: "" } };
  assert.equal(
    enrichSampleRecords({ ...state, posts: [cleared] }, [seed]).posts[0],
    cleared,
  );
  assert.deepEqual(
    enrichSampleRecords({ ...state, posts: [] }, [seed]).posts,
    [],
  );
});
