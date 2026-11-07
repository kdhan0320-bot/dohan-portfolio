import { enrichSampleRecords } from "../utils/recordFormat";
import { validCommunityData } from "../utils/communityState";
import { useEffect, useState } from "react";
import DemoDataContext from "./DemoDataContext";
import { DEMO_USER, getRandomProfileAvatar } from "../constants/demoUser";
import { buildInitialPosts } from "../constants/seedPosts";
import { MEETUPS, MOCK_MESSAGES } from "../constants/chatRooms";
import { sampleImage } from "../constants/samples";
import { makeId, readStored, writeStored } from "../utils/storage";

const initialData = () => ({
  posts: buildInitialPosts(),
  joined: ["react-worklog"],
  messages: MOCK_MESSAGES,
  profile: DEMO_USER,
  readRooms: [],
});
const validData = validCommunityData;
export const DemoDataProvider = ({ children }) => {
  const [data, setData] = useState(() =>
    enrichSampleRecords(
      readStored("community", initialData, validData),
      buildInitialPosts(),
    ),
  );
  const [storageError, setStorageError] = useState(false);
  const [notice, setNotice] = useState("");
  useEffect(() => {
    setStorageError(!writeStored("community", data));
  }, [data]);
  const posts = data.posts.map((p) => ({
    ...p,
    profiles: p.user_id === DEMO_USER.id ? data.profile : p.profiles,
    image_url: p.imageKey ? sampleImage(p.imageKey) : p.image_url,
  }));
  const meetups = MEETUPS.map((m) => ({
    ...m,
    joined: data.joined.includes(m.id),
    current: m.baseMembers + (data.joined.includes(m.id) ? 1 : 0),
  }));
  const addPost = (values) => {
    const id = makeId("post");
    setData((d) => ({
      ...d,
      posts: [
        {
          ...values,
          image_url: values.imageKey ? "" : values.image_url,
          id,
          user_id: DEMO_USER.id,
          profiles: d.profile,
          created_at: new Date().toISOString(),
          liked: false,
          saved: false,
          likes_count: 0,
          comments: [],
        },
        ...d.posts,
      ],
    }));
    setNotice("작업 기록을 남겼어요.");
    return id;
  };
  const updatePost = (id, values) => {
    if (!data.posts.some((p) => p.id === id && p.user_id === DEMO_USER.id))
      return false;
    setData((d) => ({
      ...d,
      posts: d.posts.map((p) =>
        p.id === id
          ? {
              ...p,
              ...values,
              image_url: values.imageKey ? "" : values.image_url,
            }
          : p,
      ),
    }));
    setNotice("작업 기록을 수정했어요.");
    return true;
  };
  const deletePost = (id) => {
    setData((d) => ({
      ...d,
      posts: d.posts.filter((p) => p.id !== id || p.user_id !== DEMO_USER.id),
    }));
    setNotice("작업 기록을 삭제했어요.");
  };
  const toggleLike = (id) =>
    setData((d) => ({
      ...d,
      posts: d.posts.map((p) =>
        p.id === id
          ? {
              ...p,
              liked: !p.liked,
              likes_count: Math.max(0, p.likes_count + (p.liked ? -1 : 1)),
            }
          : p,
      ),
    }));
  const toggleSave = (id) =>
    setData((d) => ({
      ...d,
      posts: d.posts.map((p) => (p.id === id ? { ...p, saved: !p.saved } : p)),
    }));
  const addComment = (id, content) => {
    if (!content.trim()) return;
    setData((d) => ({
      ...d,
      posts: d.posts.map((p) =>
        p.id === id
          ? {
              ...p,
              comments: [
                ...p.comments,
                {
                  id: makeId("comment"),
                  user_id: DEMO_USER.id,
                  profiles: d.profile,
                  content: content.trim().slice(0, 500),
                  created_at: new Date().toISOString(),
                },
              ],
            }
          : p,
      ),
    }));
  };
  const updateComment = (postId, commentId, content) => {
    if (!content.trim()) return;
    setData((d) => ({
      ...d,
      posts: d.posts.map((p) =>
        p.id === postId
          ? {
              ...p,
              comments: p.comments.map((c) =>
                c.id === commentId && c.user_id === DEMO_USER.id
                  ? { ...c, content: content.trim().slice(0, 500) }
                  : c,
              ),
            }
          : p,
      ),
    }));
  };
  const deleteComment = (postId, commentId) =>
    setData((d) => ({
      ...d,
      posts: d.posts.map((p) =>
        p.id === postId
          ? {
              ...p,
              comments: p.comments.filter(
                (c) => c.id !== commentId || c.user_id !== DEMO_USER.id,
              ),
            }
          : p,
      ),
    }));
  const joinMeetup = (id) => {
    const target = meetups.find((m) => m.id === id);
    if (!target || target.joined || target.current >= target.capacity)
      return false;
    setData((d) =>
      d.joined.includes(id) ? d : { ...d, joined: [...d.joined, id] },
    );
    setNotice("모임에 참여했어요. 첫 인사를 남겨보세요.");
    return true;
  };
  const leaveMeetup = (id) => {
    setData((d) => ({ ...d, joined: d.joined.filter((j) => j !== id) }));
    setNotice("모임에서 나왔어요. 남긴 대화는 이 브라우저에 유지됩니다.");
  };
  const sendMessage = (roomId, content) => {
    if (!content.trim() || !data.joined.includes(roomId)) return;
    setData((d) => ({
      ...d,
      messages: {
        ...d.messages,
        [roomId]: [
          ...(d.messages[roomId] || []),
          {
            id: makeId("msg"),
            sender: d.profile.nickname,
            content: content.trim().slice(0, 1000),
            time: new Date().toLocaleTimeString("ko-KR", {
              hour: "2-digit",
              minute: "2-digit",
            }),
            mine: true,
          },
        ],
      },
    }));
  };
  const markRoomRead = (id) =>
    setData((d) =>
      d.readRooms.includes(id) ? d : { ...d, readRooms: [...d.readRooms, id] },
    );
  const updateProfile = (values) => {
    setData((d) => ({
      ...d,
      profile: {
        ...d.profile,
        ...values,
        profile_image_url: getRandomProfileAvatar(values.nickname),
      },
    }));
    setNotice("프로필을 수정했어요.");
  };
  return (
    <DemoDataContext.Provider
      value={{
        posts,
        getPost: (id) => posts.find((p) => p.id === id),
        addPost,
        updatePost,
        deletePost,
        toggleLike,
        toggleSave,
        addComment,
        updateComment,
        deleteComment,
        meetups,
        joinMeetup,
        leaveMeetup,
        messages: data.messages,
        sendMessage,
        readRooms: data.readRooms,
        markRoomRead,
        profile: data.profile,
        updateProfile,
        storageError,
        notice,
        setNotice,
      }}
    >
      {children}
    </DemoDataContext.Provider>
  );
};
export default DemoDataProvider;
