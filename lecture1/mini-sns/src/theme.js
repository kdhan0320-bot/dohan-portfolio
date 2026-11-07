import { createTheme } from "@mui/material/styles";
export default createTheme({
  palette: {
    primary: { main: "#505EC2", dark: "#3B469C", light: "#EAEDFA" },
    background: { default: "#F7F8FA", paper: "#FFFFFF" },
    text: { primary: "#242A38", secondary: "#717887" },
    divider: "#E9EBF0",
    error: { main: "#B64D5A" },
    success: { main: "#417357" },
  },
  typography: {
    fontFamily: '"Pretendard", "Noto Sans KR", sans-serif',
    button: { textTransform: "none", fontWeight: 600 },
    body1: { fontSize: "0.9375rem", lineHeight: 1.7 },
    body2: { fontSize: "0.875rem", lineHeight: 1.65 },
  },
  shape: { borderRadius: 12 },
  components: {
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: { borderRadius: 10, minHeight: 42, paddingInline: 18 },
      },
    },
    MuiIconButton: {
      styleOverrides: { root: { minWidth: 40, minHeight: 40 } },
    },
    MuiDialog: {
      defaultProps: { fullWidth: true, maxWidth: "sm" },
      styleOverrides: { paper: { borderRadius: 18, backgroundImage: "none" } },
    },
    MuiTextField: {
      defaultProps: { variant: "outlined" },
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": { borderRadius: 10, background: "#fff" },
        },
      },
    },
    MuiChip: { styleOverrides: { root: { borderRadius: 7 } } },
    MuiTooltip: { defaultProps: { arrow: true } },
  },
});
