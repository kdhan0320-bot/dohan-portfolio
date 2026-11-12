import { createTheme } from '@mui/material/styles';

// 사용자 요청에 따른 밝은 편집형 디자인. 이전 Human Signal 컴포넌트의
// export 계약은 유지하지만, 현재 화면은 SUIT와 중성 배경·블루 팔레트로 구성한다.
export const FONT_SANS = '"SUIT Variable", "SUIT", sans-serif';
export const FONT_MONO = FONT_SANS;
export const HUMAN_SIGNAL = {
  inkNavy: '#1b1d22', deepHarbor: '#202e55', warmPaper: '#f5f4ee',
  paperDeep: '#d1d2d1', softWhite: '#FFFFFF', inkText: '#1b1d22',
  burntOrange: '#304fc6', brightOrange: '#304fc6', brightOrangeOnDark: '#e9ebef',
  mutedSage: '#b8c7d0', steelMist: '#e9ebef', deepSage: '#585b63', mutedInk: '#585b63',
};
export const ULTRAWIDE_CONTENT_MAX_WIDTH = 1280;
export const HOME_WIDE_MAX_WIDTH = 1376;
export const HOME_PROJECT_MAX_WIDTH = 1280;
export const HOME_READING_MAX_WIDTH = 680;
export const QHD_DECORATION_MIN_WIDTH = 2480;
export const SECTION_SIGNAL_TONES = {
  light: { indexColor: '#1b1d22', indexOpacity: .18, labelColor: '#304fc6', circleStroke: '#d1d2d1', lineStroke: '#d1d2d1', fragmentBg: '#e9ebef', fragmentBorder: '#d1d2d1' },
  dark: { indexColor: '#FFFFFF', indexOpacity: .24, labelColor: '#e9ebef', circleStroke: '#585b63', lineStroke: '#585b63', fragmentBg: '#202e55', fragmentBorder: '#585b63' },
};
export const getDesignTokens = () => ({
  palette: {
    mode: 'light',
    primary: { main: '#304fc6', contrastText: '#FFFFFF' },
    secondary: { main: '#1b1d22', contrastText: '#FFFFFF' },
    background: { default: '#f5f4ee', paper: '#FFFFFF' },
    text: { primary: '#1b1d22', secondary: '#585b63' },
    divider: '#d1d2d1',
  },
  typography: {
    fontFamily: FONT_SANS,
    h1: { fontSize: '3.5rem', fontWeight: 650, lineHeight: 1.2, letterSpacing: '-.04em' },
    h2: { fontSize: '2.25rem', fontWeight: 650, lineHeight: 1.3, letterSpacing: '-.035em' },
    h3: { fontSize: '1.5rem', fontWeight: 650, lineHeight: 1.4 },
    body1: { fontSize: '1rem', lineHeight: 1.7 },
    body2: { fontSize: '.875rem', lineHeight: 1.7 },
    button: { textTransform: 'none', fontWeight: 600 },
  },
  shape: { borderRadius: 12 },
  components: {
    MuiButton: { defaultProps: { disableElevation: true }, styleOverrides: { root: { minHeight: 44 } } },
    MuiPaper: { styleOverrides: { root: { backgroundImage: 'none', boxShadow: 'none' } } },
    MuiCssBaseline: { styleOverrides: { body: { wordBreak: 'keep-all', overflowWrap: 'break-word' } } },
  },
});
export default createTheme(getDesignTokens());
