import { createTheme } from '@mui/material/styles';

// 사용자 요청에 따른 밝은 편집형 디자인. 이전 Human Signal 컴포넌트의
// export 계약은 유지하지만, 현재 화면은 SUIT와 중성 배경·블루 팔레트로 구성한다.
export const FONT_SANS = '"SUIT Variable", "SUIT", sans-serif';
export const FONT_MONO = FONT_SANS;
export const HUMAN_SIGNAL = {
  inkNavy: '#242b33', deepHarbor: '#202e40', warmPaper: '#f5f6f8',
  paperDeep: '#d5dde2', softWhite: '#FFFFFF', inkText: '#242b33',
  burntOrange: '#4d657c', brightOrange: '#4d657c', brightOrangeOnDark: '#e7ecef',
  mutedSage: '#b8c7d0', steelMist: '#e7ecef', deepSage: '#53616d', mutedInk: '#53616d',
};
export const ULTRAWIDE_CONTENT_MAX_WIDTH = 1280;
export const HOME_WIDE_MAX_WIDTH = 1376;
export const HOME_PROJECT_MAX_WIDTH = 1280;
export const HOME_READING_MAX_WIDTH = 680;
export const QHD_DECORATION_MIN_WIDTH = 2480;
export const SECTION_SIGNAL_TONES = {
  light: { indexColor: '#242b33', indexOpacity: .18, labelColor: '#4d657c', circleStroke: '#d5dde2', lineStroke: '#d5dde2', fragmentBg: '#e7ecef', fragmentBorder: '#d5dde2' },
  dark: { indexColor: '#FFFFFF', indexOpacity: .24, labelColor: '#e7ecef', circleStroke: '#53616d', lineStroke: '#53616d', fragmentBg: '#202e40', fragmentBorder: '#53616d' },
};
export const getDesignTokens = () => ({
  palette: {
    mode: 'light',
    primary: { main: '#4d657c', contrastText: '#FFFFFF' },
    secondary: { main: '#242b33', contrastText: '#FFFFFF' },
    background: { default: '#f5f6f8', paper: '#FFFFFF' },
    text: { primary: '#242b33', secondary: '#53616d' },
    divider: '#d5dde2',
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
