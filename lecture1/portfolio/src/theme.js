import { createTheme } from '@mui/material/styles';

// 승인된 소프트 차콜 테마. CSS 토큰은 index.css에서 관리한다.
// 이전 Human Signal export 계약은 유지한다.
export const FONT_SANS = '"SUIT Variable", "SUIT", sans-serif';
export const FONT_MONO = FONT_SANS;
export const HUMAN_SIGNAL = {
  inkNavy: '#f2f1ed', deepHarbor: '#354050', warmPaper: '#25272a',
  paperDeep: '#494d54', softWhite: '#FFFFFF', inkText: '#f2f1ed',
  burntOrange: '#b6c4e5', brightOrange: '#b6c4e5', brightOrangeOnDark: '#b6c4e5',
  mutedSage: '#b8c7d0', steelMist: '#303337', deepSage: '#b4b7be', mutedInk: '#b4b7be',
};
export const ULTRAWIDE_CONTENT_MAX_WIDTH = 1280;
export const HOME_WIDE_MAX_WIDTH = 1376;
export const HOME_PROJECT_MAX_WIDTH = 1280;
export const HOME_READING_MAX_WIDTH = 680;
export const QHD_DECORATION_MIN_WIDTH = 2480;
export const SECTION_SIGNAL_TONES = {
  light: { indexColor: '#f2f1ed', indexOpacity: .18, labelColor: '#b6c4e5', circleStroke: '#494d54', lineStroke: '#494d54', fragmentBg: '#303337', fragmentBorder: '#494d54' },
  dark: { indexColor: '#FFFFFF', indexOpacity: .24, labelColor: '#b6c4e5', circleStroke: '#b4b7be', lineStroke: '#b4b7be', fragmentBg: '#354050', fragmentBorder: '#b4b7be' },
};
export const getDesignTokens = () => ({
  palette: {
    mode: 'dark',
    primary: { main: '#b6c4e5', contrastText: '#25272a' },
    secondary: { main: '#f2f1ed', contrastText: '#25272a' },
    background: { default: '#25272a', paper: '#303337' },
    text: { primary: '#f2f1ed', secondary: '#b4b7be' },
    divider: '#494d54',
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
