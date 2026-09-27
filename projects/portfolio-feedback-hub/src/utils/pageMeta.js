import { useEffect } from 'react';

export const PAGE_TITLES = {
  home: '고른시선 | 화면에 연결하는 디자인 피드백',
  list: '작업 갤러리 | 고른시선',
  guide: '리뷰 방법 | 고른시선',
  login: '비공개 로그인 | 고른시선',
  write: '게시글 작성 | 고른시선',
  edit: '게시글 수정 | 고른시선',
  postLoading: '게시글 상세 | 고른시선',
  postMissing: '게시글을 찾을 수 없음 | 고른시선',
  postError: '게시글을 불러올 수 없음 | 고른시선',
  notFound: '페이지를 찾을 수 없음 | 고른시선',
};

export const getPostPageTitle = (title, isSample) => (
  `${title} | ${isSample ? '샘플 | ' : ''}고른시선`
);

export const usePageTitle = (title) => {
  useEffect(() => {
    document.title = title;
  }, [title]);
};
