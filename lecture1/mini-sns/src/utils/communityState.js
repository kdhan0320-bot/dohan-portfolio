import { validReflection } from "./recordFormat.js";
const categories = ["작업기록", "질문", "스터디"];
const profileIsValid = (p) =>
  p &&
  typeof p.nickname === "string" &&
  typeof p.profile_image_url === "string";
const commentIsValid = (c) =>
  c &&
  typeof c.id === "string" &&
  typeof c.content === "string" &&
  typeof c.user_id === "string" &&
  profileIsValid(c.profiles) &&
  typeof c.created_at === "string";
const postIsValid = (p) =>
  p &&
  typeof p.id === "string" &&
  typeof p.user_id === "string" &&
  typeof p.title === "string" &&
  typeof p.caption === "string" &&
  categories.includes(p.category) &&
  validReflection(p.reflection) &&
  profileIsValid(p.profiles) &&
  typeof p.created_at === "string" &&
  Number.isFinite(p.likes_count) &&
  Array.isArray(p.comments) &&
  p.comments.every(commentIsValid);
export const validCommunityData = (value) =>
  Boolean(
    value &&
    Array.isArray(value.posts) &&
    value.posts.every(postIsValid) &&
    Array.isArray(value.joined) &&
    value.joined.every((id) => typeof id === "string") &&
    value.messages &&
    typeof value.messages === "object" &&
    Object.values(value.messages).every(
      (rows) =>
        Array.isArray(rows) &&
        rows.every(
          (m) =>
            m &&
            typeof m.id === "string" &&
            typeof m.content === "string" &&
            typeof m.sender === "string" &&
            typeof m.mine === "boolean",
        ),
    ) &&
    profileIsValid(value.profile) &&
    typeof value.profile.bio === "string" &&
    Array.isArray(value.readRooms),
  );
