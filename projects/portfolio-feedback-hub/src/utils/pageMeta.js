import { useEffect } from 'react';

export const PAGE_TITLES = {
  list: 'Portfolio Feedback Hub | 공개 피드백 데모',
  login: '비공개 로그인 | Feedback Hub',
  write: '게시글 작성 | Feedback Hub',
  edit: '게시글 수정 | Feedback Hub',
  postLoading: '게시글 상세 | Feedback Hub',
  postMissing: '게시글을 찾을 수 없음 | Feedback Hub',
  postError: '게시글을 불러올 수 없음 | Feedback Hub',
  notFound: '페이지를 찾을 수 없음 | Feedback Hub',
};

export const getPostPageTitle = (title, isSample) => (
  `${title} | ${isSample ? '샘플 | ' : ''}Feedback Hub`
);

export const usePageTitle = (title) => {
  useEffect(() => {
    document.title = title;
  }, [title]);
};
