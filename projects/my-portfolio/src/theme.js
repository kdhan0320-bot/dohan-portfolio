import { createTheme } from '@mui/material/styles';

// 사용자 요청에 따른 밝은 편집형 디자인. 이전 Human Signal 컴포넌트의
// export 계약은 유지하지만, 현재 화면은 SUIT와 회청색 팔레트로 구성한다.
export const FONT_SANS = '"SUIT Variable", "SUIT", sans-serif';
export const FONT_MONO = FONT_SANS;
export const HUMAN_SIGNAL = {
  inkNavy: '#202B36', deepHarbor: '#2B4052', warmPaper: '#F7F8FA',
  paperDeep: '#D7E0E7', softWhite: '#FFFFFF', inkText: '#202B36',
  burntOrange: '#36566E', brightOrange: '#52738D', brightOrangeOnDark: '#DFE7EF',
  mutedSage: '#A8BAC6', steelMist: '#DFE7EF', deepSage: '#536371', mutedInk: '#536371',
};
export const ULTRAWIDE_CONTENT_MAX_WIDTH = 1280;
export const HOME_WIDE_MAX_WIDTH = 1376;
export const HOME_PROJECT_MAX_WIDTH = 1280;
export const HOME_READING_MAX_WIDTH = 680;
export const QHD_DECORATION_MIN_WIDTH = 2480;
export const SECTION_SIGNAL_TONES = {
  light: { indexColor: '#202B36', indexOpacity: .18, labelColor: '#36566E', circleStroke: '#D7E0E7', lineStroke: '#D7E0E7', fragmentBg: '#EDF1F5', fragmentBorder: '#D7E0E7' },
  dark: { indexColor: '#FFFFFF', indexOpacity: .24, labelColor: '#DFE7EF', circleStroke: '#536371', lineStroke: '#536371', fragmentBg: '#2B4052', fragmentBorder: '#536371' },
};
export const getDesignTokens = () => ({
  palette: {
    mode: 'light',
    primary: { main: '#36566E', contrastText: '#FFFFFF' },
    secondary: { main: '#202B36', contrastText: '#FFFFFF' },
    background: { default: '#F7F8FA', paper: '#FFFFFF' },
    text: { primary: '#202B36', secondary: '#536371' },
    divider: '#D7E0E7',
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
  shape: { borderRadius: 4 },
  components: {
    MuiButton: { defaultProps: { disableElevation: true }, styleOverrides: { root: { minHeight: 44 } } },
    MuiPaper: { styleOverrides: { root: { backgroundImage: 'none', boxShadow: 'none' } } },
    MuiCssBaseline: { styleOverrides: { body: { wordBreak: 'keep-all', overflowWrap: 'break-word' } } },
  },
});
export default createTheme(getDesignTokens());
