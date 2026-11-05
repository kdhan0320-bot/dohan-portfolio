import { createTheme } from '@mui/material/styles';

// 사용자 요청에 따른 밝은 편집형 디자인. 이전 Human Signal 컴포넌트의
// export 계약은 유지하지만, 현재 화면은 SUIT와 중성 배경·블루 팔레트로 구성한다.
export const FONT_SANS = '"SUIT Variable", "SUIT", sans-serif';
export const FONT_MONO = FONT_SANS;
export const HUMAN_SIGNAL = {
  inkNavy: '#20242C', deepHarbor: '#202838', warmPaper: '#F6F7F9',
  paperDeep: '#DCE0E8', softWhite: '#FFFFFF', inkText: '#20242C',
  burntOrange: '#4356B8', brightOrange: '#4356B8', brightOrangeOnDark: '#EDF0F7',
  mutedSage: '#B8C5DD', steelMist: '#EDF0F7', deepSage: '#606775', mutedInk: '#606775',
};
export const ULTRAWIDE_CONTENT_MAX_WIDTH = 1280;
export const HOME_WIDE_MAX_WIDTH = 1376;
export const HOME_PROJECT_MAX_WIDTH = 1280;
export const HOME_READING_MAX_WIDTH = 680;
export const QHD_DECORATION_MIN_WIDTH = 2480;
export const SECTION_SIGNAL_TONES = {
  light: { indexColor: '#20242C', indexOpacity: .18, labelColor: '#4356B8', circleStroke: '#DCE0E8', lineStroke: '#DCE0E8', fragmentBg: '#EDF0F7', fragmentBorder: '#DCE0E8' },
  dark: { indexColor: '#FFFFFF', indexOpacity: .24, labelColor: '#EDF0F7', circleStroke: '#606775', lineStroke: '#606775', fragmentBg: '#202838', fragmentBorder: '#606775' },
};
export const getDesignTokens = () => ({
  palette: {
    mode: 'light',
    primary: { main: '#4356B8', contrastText: '#FFFFFF' },
    secondary: { main: '#20242C', contrastText: '#FFFFFF' },
    background: { default: '#F6F7F9', paper: '#FFFFFF' },
    text: { primary: '#20242C', secondary: '#606775' },
    divider: '#DCE0E8',
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
