import { Link, useParams } from "react-router-dom";
import ArrowBackRounded from "@mui/icons-material/ArrowBackRounded";
import MainLayout from "../components/layout/MainLayout";
import PostCard from "../components/ui/PostCard";
import { useDemoData } from "../hooks/useDemoData";
export default function PostDetail() {
  const { id } = useParams();
  const { getPost } = useDemoData();
  const post = getPost(id);
  return (
    <MainLayout>
      <div className="detail-heading">
        <Link to="/" className="back-link">
          <ArrowBackRounded />
          피드로
        </Link>
        <h1>작업 기록</h1>
      </div>
      {post ? (
        <PostCard post={post} />
      ) : (
        <div className="empty-state">
          <h2>찾을 수 없는 기록이에요</h2>
          <p>기록이 삭제되었거나 주소가 달라졌을 수 있어요.</p>
          <Link to="/" className="button primary">
            피드로 돌아가기
          </Link>
        </div>
      )}
    </MainLayout>
  );
}
