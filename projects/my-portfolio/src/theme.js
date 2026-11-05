import { createTheme } from '@mui/material/styles';

// 사용자 요청에 따른 밝은 편집형 디자인. 이전 Human Signal 컴포넌트의
// export 계약은 유지하지만, 현재 화면은 SUIT와 중성 배경·블루 팔레트로 구성한다.
export const FONT_SANS = '"SUIT Variable", "SUIT", sans-serif';
export const FONT_MONO = FONT_SANS;
export const HUMAN_SIGNAL = {
  inkNavy: '#252826', deepHarbor: '#233746', warmPaper: '#f7f7f4',
  paperDeep: '#d4d9d7', softWhite: '#FFFFFF', inkText: '#252826',
  burntOrange: '#45657b', brightOrange: '#45657b', brightOrangeOnDark: '#e7ecef',
  mutedSage: '#b8c7d0', steelMist: '#e7ecef', deepSage: '#535d60', mutedInk: '#535d60',
};
export const ULTRAWIDE_CONTENT_MAX_WIDTH = 1280;
export const HOME_WIDE_MAX_WIDTH = 1376;
export const HOME_PROJECT_MAX_WIDTH = 1280;
export const HOME_READING_MAX_WIDTH = 680;
export const QHD_DECORATION_MIN_WIDTH = 2480;
export const SECTION_SIGNAL_TONES = {
  light: { indexColor: '#252826', indexOpacity: .18, labelColor: '#45657b', circleStroke: '#d4d9d7', lineStroke: '#d4d9d7', fragmentBg: '#e7ecef', fragmentBorder: '#d4d9d7' },
  dark: { indexColor: '#FFFFFF', indexOpacity: .24, labelColor: '#e7ecef', circleStroke: '#535d60', lineStroke: '#535d60', fragmentBg: '#233746', fragmentBorder: '#535d60' },
};
export const getDesignTokens = () => ({
  palette: {
    mode: 'light',
    primary: { main: '#45657b', contrastText: '#FFFFFF' },
    secondary: { main: '#252826', contrastText: '#FFFFFF' },
    background: { default: '#f7f7f4', paper: '#FFFFFF' },
    text: { primary: '#252826', secondary: '#535d60' },
    divider: '#d4d9d7',
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
