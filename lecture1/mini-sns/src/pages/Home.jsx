import { useLayoutEffect, useRef } from "react";
import {
  FEED_CATEGORIES,
  feedPath,
  withFeedReturn,
} from "../utils/feedLocation";
import { Link, useSearchParams } from "react-router-dom";
import { Avatar } from "@mui/material";
import SearchRounded from "@mui/icons-material/SearchRounded";
import ImageOutlined from "@mui/icons-material/ImageOutlined";
import MainLayout from "../components/layout/MainLayout";
import ActivityTabs from "../components/ui/ActivityTabs";
import PostCard from "../components/ui/PostCard";
import { useDemoData } from "../hooks/useDemoData";
export default function Home() {
  const { posts, profile } = useDemoData();
  const [params, setParams] = useSearchParams();
  const pendingParams = useRef(params);
  useLayoutEffect(() => {
    pendingParams.current = params;
  }, [params]);
  const category = FEED_CATEGORIES.includes(params.get("category"))
    ? params.get("category")
    : "전체";
  const query = (params.get("q") || "").slice(0, 120);
  const currentFeed = feedPath(`/?${params}`);
  const updateFilter = (key, value, replace = false) => {
    const next = new URLSearchParams(pendingParams.current);
    if (!value || (key === "category" && value === "전체")) next.delete(key);
    else next.set(key, value);
    pendingParams.current = next;
    setParams(next, { replace });
  };
  const visible = posts.filter(
    (p) =>
      (category === "전체" || p.category === category) &&
      `${p.title} ${p.caption} ${p.reflection?.reason || ""} ${p.reflection?.question || ""} ${p.hashtag} ${p.profiles.nickname}`
        .toLowerCase()
        .includes(query.toLowerCase().trim()),
  );
  return (
    <MainLayout>
      <div className="page-heading feed-heading">
        <div>
          <p className="eyebrow">기록이 겹쳐, 다음 시도로</p>
          <h1>작은 기록, 새로운 영감</h1>
          <p>시도한 것과 그 이유. 서로의 질문에 한 줄을 보태요.</p>
        </div>
      </div>
      <Link to={withFeedReturn("/create", currentFeed)} className="composer">
        <Avatar src={profile.profile_image_url} />
        <span>오늘의 시도 한 줄, 남겨볼까요?</span>
        <ImageOutlined />
      </Link>
      <ActivityTabs
        id="feed"
        label="피드 분류"
        items={FEED_CATEGORIES}
        value={category}
        onChange={(c) => updateFilter("category", c)}
        className="feed-controls"
        tools={
          <label className="search-box">
            <SearchRounded />
            <input
              type="search"
              aria-label="작업 검색"
              placeholder="작업 검색"
              value={query}
              maxLength={120}
              onChange={(e) => updateFilter("q", e.target.value, true)}
            />
          </label>
        }
      >
        <div className="feed-list">
          {visible.map((post) => (
            <PostCard key={post.id} post={post} feedPreview />
          ))}
        </div>
        {!visible.length && (
          <div className="empty-state">
            <SearchRounded />
            <h2>아직 찾는 기록이 없어요</h2>
            <p>다른 검색어나 분류로 찾아보세요.</p>
            <button
              className="button secondary"
              onClick={() => {
                setParams({});
              }}
            >
              전체 기록 보기
            </button>
          </div>
        )}
      </ActivityTabs>
      {visible.length > 0 && (
        <div className="feed-end">
          <span>여기까지, 오늘의 작은 발견들.</span>
          <Link to={withFeedReturn("/create", currentFeed)}>
            나의 기록도 남겨볼까요?
          </Link>
        </div>
      )}
    </MainLayout>
  );
}
