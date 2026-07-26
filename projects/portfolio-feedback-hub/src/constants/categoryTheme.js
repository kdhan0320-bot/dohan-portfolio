import FactCheckOutlined from '@mui/icons-material/FactCheckOutlined';
import DesignServicesOutlined from '@mui/icons-material/DesignServicesOutlined';
import ViewQuiltOutlined from '@mui/icons-material/ViewQuiltOutlined';
import WorkOutlineOutlined from '@mui/icons-material/WorkOutlineOutlined';
import AutoAwesomeOutlined from '@mui/icons-material/AutoAwesomeOutlined';
import ChatBubbleOutlineOutlined from '@mui/icons-material/ChatBubbleOutlineOutlined';
import ForumOutlined from '@mui/icons-material/ForumOutlined';
import GridViewOutlined from '@mui/icons-material/GridViewOutlined';

/* 필터 아이콘과 코드 기반 미니 리뷰 보드가 같은 카테고리 색상 체계를 공유한다. */
export const CATEGORY_THEME = {
  '전체': {
    icon: GridViewOutlined,
    label: '전체',
    accent: '#64748B',
    surface: '#F8FAFC',
    soft: '#DDE4EC',
    preview: 'portfolio',
  },
  '포트폴리오 피드백': {
    icon: FactCheckOutlined,
    label: '포트폴리오 피드백',
    accent: '#2563EB',
    surface: '#EFF5FF',
    soft: '#CFE0FF',
    preview: 'portfolio',
  },
  'Figma': {
    icon: DesignServicesOutlined,
    label: 'Figma',
    accent: '#7C3AED',
    surface: '#F6F2FF',
    soft: '#E3D8FF',
    preview: 'figma',
  },
  'UX/UI': {
    icon: ViewQuiltOutlined,
    label: 'UX/UI',
    accent: '#0284C7',
    surface: '#EFF8FC',
    soft: '#CFEAF5',
    preview: 'ux',
  },
  '취업 준비': {
    icon: WorkOutlineOutlined,
    label: '취업 준비',
    accent: '#0F766E',
    surface: '#EFF8F5',
    soft: '#CEEAE2',
    preview: 'job',
  },
  'AI Coding': {
    icon: AutoAwesomeOutlined,
    label: 'AI Coding',
    accent: '#4F46E5',
    surface: '#F2F3FF',
    soft: '#D9DCFF',
    preview: 'code',
  },
  '자유게시판': {
    icon: ChatBubbleOutlineOutlined,
    label: '자유게시판',
    accent: '#475569',
    surface: '#F7F9FC',
    soft: '#DCE3EC',
    preview: 'community',
  },
};

export const DEFAULT_CATEGORY_THEME = {
  icon: ForumOutlined,
  label: '피드백',
  accent: '#64748B',
  surface: '#F8FAFC',
  soft: '#DDE4EC',
  preview: 'portfolio',
};

export const getCategoryTheme = (category) => CATEGORY_THEME[category] || DEFAULT_CATEGORY_THEME;
