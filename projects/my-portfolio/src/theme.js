import { createTheme } from '@mui/material/styles';

// 사용자 요청에 따른 밝은 편집형 디자인. 이전 Human Signal 컴포넌트의
// export 계약은 유지하지만, 현재 화면은 SUIT와 크림·주황 팔레트로 구성한다.
export const FONT_SANS = '"SUIT Variable", "SUIT", sans-serif';
export const FONT_MONO = FONT_SANS;
export const HUMAN_SIGNAL = {
  inkNavy: '#2F241F', deepHarbor: '#4A382C', warmPaper: '#F7F5EB',
  paperDeep: '#DDD5C8', softWhite: '#FFFFFF', inkText: '#2F241F',
  burntOrange: '#A84622', brightOrange: '#F46B36', brightOrangeOnDark: '#EEE8DC',
  mutedSage: '#C6B8A5', steelMist: '#EEE8DC', deepSage: '#6B625C', mutedInk: '#6B625C',
};
export const ULTRAWIDE_CONTENT_MAX_WIDTH = 1280;
export const HOME_WIDE_MAX_WIDTH = 1376;
export const HOME_PROJECT_MAX_WIDTH = 1280;
export const HOME_READING_MAX_WIDTH = 680;
export const QHD_DECORATION_MIN_WIDTH = 2480;
export const SECTION_SIGNAL_TONES = {
  light: { indexColor: '#2F241F', indexOpacity: .18, labelColor: '#A84622', circleStroke: '#DDD5C8', lineStroke: '#DDD5C8', fragmentBg: '#F4EEE4', fragmentBorder: '#DDD5C8' },
  dark: { indexColor: '#FFFFFF', indexOpacity: .24, labelColor: '#EEE8DC', circleStroke: '#6B625C', lineStroke: '#6B625C', fragmentBg: '#4A382C', fragmentBorder: '#6B625C' },
};
export const getDesignTokens = () => ({
  palette: {
    mode: 'light',
    primary: { main: '#A84622', contrastText: '#FFFFFF' },
    secondary: { main: '#2F241F', contrastText: '#FFFFFF' },
    background: { default: '#F7F5EB', paper: '#FFFFFF' },
    text: { primary: '#2F241F', secondary: '#6B625C' },
    divider: '#DDD5C8',
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
