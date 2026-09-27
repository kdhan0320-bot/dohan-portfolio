import { createTheme } from '@mui/material/styles';
export default createTheme({
  palette: {
    primary: {
      main: '#94394B',
      dark: '#512E36',
      light: '#CE9AA4',
      contrastText: '#FFFFFF'
    },
    secondary: {
      main: '#5D776A'
    },
    background: {
      default: '#F7F5F1',
      paper: '#FFFFFF'
    },
    text: {
      primary: '#302B2C',
      secondary: '#6A6161'
    },
    divider: '#E3DDD7',
    success: {
      main: '#37644E'
    },
    error: {
      main: '#A73E2B'
    },
    warning: {
      main: '#8A5C23'
    },
    info: {
      main: '#94394B'
    }
  },
  typography: {
    fontFamily: '"Pretendard Variable", -apple-system, BlinkMacSystemFont, "Apple SD Gothic Neo", "Malgun Gothic", "Segoe UI", sans-serif',
    h1: {
      fontSize: '2rem',
      fontWeight: 700,
      letterSpacing: '-.045em'
    },
    h2: {
      fontSize: '1.25rem',
      fontWeight: 700
    },
    h3: {
      fontSize: '1.125rem',
      fontWeight: 700
    },
    h5: {
      fontSize: '1.6rem',
      fontWeight: 700
    },
    h6: {
      fontSize: '1.05rem',
      fontWeight: 700
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.65
    },
    body2: {
      fontSize: '.875rem',
      lineHeight: 1.65
    },
    caption: {
      fontSize: '.8125rem',
      lineHeight: 1.5
    },
    button: {
      textTransform: 'none',
      fontWeight: 600
    }
  },
  shape: {
    borderRadius: 12
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true
      },
      styleOverrides: {
        root: {
          minHeight: 44,
          borderRadius: 9,
          paddingInline: 16
        }
      }
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          minWidth: 44,
          minHeight: 44
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          border: '1px solid #E3DDD7'
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFFFFF'
        },
        notchedOutline: {
          borderColor: '#A1858A'
        }
      }
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderColor: '#E3DDD7',
          padding: '18px 20px'
        },
        head: {
          fontSize: 13,
          color: '#6A6161',
          backgroundColor: '#F7F6F5',
          fontWeight: 600
        }
      }
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          minHeight: 48,
          fontWeight: 600
        }
      }
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: '#927177'
        }
      }
    }
  }
});
