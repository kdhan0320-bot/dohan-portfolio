import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Avatar } from "@mui/material";
import SearchRounded from "@mui/icons-material/SearchRounded";
import ImageOutlined from "@mui/icons-material/ImageOutlined";
import ArrowForwardRounded from "@mui/icons-material/ArrowForwardRounded";
import MainLayout from "../components/layout/MainLayout";
import PostCard from "../components/ui/PostCard";
import { useDemoData } from "../hooks/useDemoData";
export default function Home() {
  const { posts, profile } = useDemoData();
  const [params, setParams] = useSearchParams();
  const category = params.get("category") || "전체";
  const [query, setQuery] = useState("");
  const visible = posts.filter(
    (p) =>
      (category === "전체" || p.category === category) &&
      `${p.title} ${p.caption} ${p.hashtag} ${p.profiles.nickname}`
        .toLowerCase()
        .includes(query.toLowerCase().trim()),
  );
  return (
    <MainLayout>
      <div className="page-heading">
        <div>
          <p className="eyebrow">YOUR DAILY INSPIRATION</p>
          <h1>작은 기록, 새로운 영감</h1>
          <p>서로의 작업에서 다음 시도를 발견해요.</p>
        </div>
      </div>
      <Link to="/create" className="composer">
        <Avatar src={profile.profile_image_url} />
        <span>오늘은 어떤 작업을 했나요?</span>
        <ImageOutlined />
      </Link>
      <div className="feed-controls">
        <div className="filter-tabs" role="tablist" aria-label="피드 분류">
          {["전체", "작업기록", "질문", "스터디"].map((c) => (
            <button
              key={c}
              role="tab"
              aria-selected={category === c}
              className={category === c ? "selected" : ""}
              onClick={() => setParams(c === "전체" ? {} : { category: c })}
            >
              {c}
            </button>
          ))}
        </div>
        <label className="search-box">
          <SearchRounded />
          <input
            type="search"
            aria-label="작업 검색"
            placeholder="작업 검색"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
      </div>
      <div className="feed-list">
        {visible.map((post) => (
          <PostCard key={post.id} post={post} />
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
              setQuery("");
              setParams({});
            }}
          >
            전체 기록 보기
          </button>
        </div>
      )}
      {visible.length > 0 && (
        <div className="feed-end">
          <span>여기까지, 오늘의 작은 발견들.</span>
          <Link to="/create">
            나의 기록도 남겨볼까요? <ArrowForwardRounded fontSize="small" />
          </Link>
        </div>
      )}
    </MainLayout>
  );
}
