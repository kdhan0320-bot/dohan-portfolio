import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#252525',
      light: '#a0a0a0',
      dark: '#111111',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#61615b',
      light: '#f2f2f2',
      dark: '#61615b',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#f6f6f2',
      paper:   '#FFFFFF',
    },
    text: {
      primary:   '#252525',
      secondary: '#61615b',
      disabled:  '#6d6d6d',
    },
    divider: '#e2e2e2',
    error:   { main: '#B42F3B' },
    success: { main: '#2E7D32' },
    warning: { main: '#8D641A' },
  },
  typography: {
    fontFamily: '"Pretendard", "Noto Sans KR", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontSize: '1.625rem', fontWeight: 800, letterSpacing: '-0.01em' },
    h2: { fontSize: '1.375rem', fontWeight: 700 },
    h3: { fontSize: '1.125rem', fontWeight: 700 },
    h4: { fontSize: '1rem',     fontWeight: 700 },
    h5: { fontSize: '0.9375rem', fontWeight: 600 },
    h6: { fontSize: '0.875rem', fontWeight: 600 },
    body1: { fontSize: '1rem', lineHeight: 1.65 },
    body2: { fontSize: '0.875rem',  lineHeight: 1.6 },
    caption: { fontSize: '0.8125rem', color: '#61615b' },
    button: { fontSize: '0.875rem', fontWeight: 600, textTransform: 'none' },
  },
  spacing: 8,
  shape: { borderRadius: 6 },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: { backgroundColor: '#f6f6f2' },
        'button:focus-visible, a:focus-visible, input:focus-visible, textarea:focus-visible, [role="button"]:focus-visible, [role="combobox"]:focus-visible': {
          outline: '3px solid #252525',
          outlineOffset: 3,
          scrollMarginTop: 72,
        },
      },
    },
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: {
          borderRadius: 10,
          textTransform: 'none',
          minHeight: 44,
          fontWeight: 600,
          fontSize: '0.875rem',
        },
        containedPrimary: {
          backgroundColor: '#252525',
          '&:hover': { backgroundColor: '#111111' },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 1px 8px rgba(26,26,46,0.06)',
          border: '1px solid #e2e2e2',
          backgroundImage: 'none',
        },
      },
    },
    MuiAppBar: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: {
          backgroundColor: '#FFFFFF',
          color: '#252525',
          borderBottom: '1px solid #e2e2e2',
          boxShadow: 'none',
        },
      },
    },
    MuiTextField: {
      defaultProps: { variant: 'outlined' },
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 10,
            backgroundColor: '#FFFFFF',
            '&:hover fieldset': { borderColor: '#252525' },
            '&.Mui-focused fieldset': { borderColor: '#252525', borderWidth: 2 },
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: { borderColor: '#828279' }, input: { '&::placeholder': { color: '#61615b', opacity: 1 } },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: { color: '#61615b' },
      },
    },
    MuiChip: {
      styleOverrides: { root: { borderRadius: 8, fontWeight: 500 } },
    },
    MuiDivider: {
      styleOverrides: { root: { borderColor: '#e2e2e2' } },
    },
  },
});

export default theme;
