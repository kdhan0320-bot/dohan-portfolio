import { createTheme } from '@mui/material/styles';
export default createTheme({
  palette: {
    primary: {
      main: '#303943',
      dark: '#1F2831',
      light: '#DCE4EB',
      contrastText: '#FFFFFF'
    },
    secondary: {
      main: '#3D6594'
    },
    background: {
      default: '#F6F7F8',
      paper: '#FFFFFF'
    },
    text: {
      primary: '#292F35',
      secondary: '#606973'
    },
    divider: '#DCE1E5',
    success: {
      main: '#326D61'
    },
    error: {
      main: '#A33F42'
    },
    warning: {
      main: '#805E24'
    },
    info: {
      main: '#3D6594'
    }
  },
  typography: {
    fontWeightBold: 500,
    fontWeightMedium: 500,
    fontFamily: '"Pretendard Variable", -apple-system, BlinkMacSystemFont, "Apple SD Gothic Neo", "Malgun Gothic", "Segoe UI", sans-serif',
    h1: {
      fontSize: '2rem',
      fontWeight: 500,
      letterSpacing: '-.035em'
    },
    h2: {
      fontSize: '1.25rem',
      fontWeight: 500
    },
    h3: {
      fontSize: '1.125rem',
      fontWeight: 500
    },
    h5: {
      fontSize: '1.6rem',
      fontWeight: 500
    },
    h6: {
      fontSize: '1.05rem',
      fontWeight: 500
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
      fontWeight: 500,
      lineHeight: '20px'
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
        },
        startIcon: {
          marginLeft: 0,
          marginRight: 6,
          alignItems: 'center',
          '& > *:nth-of-type(1)': { fontSize: 18 }
        },
        endIcon: {
          marginLeft: 6,
          marginRight: 0,
          alignItems: 'center',
          '& > *:nth-of-type(1)': { fontSize: 18 }
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
          border: '1px solid #DCE1E5'
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFFFFF',
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#3D6594'
          }
        },
        notchedOutline: {
          borderColor: '#A6AFB8'
        }
      }
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderColor: '#DCE1E5',
          padding: '18px 20px'
        },
        head: {
          fontSize: 13,
          color: '#606973',
          backgroundColor: '#F6F7F8',
          fontWeight: 500
        }
      }
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          minHeight: 48,
          fontWeight: 500
        }
      }
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: '#77838D'
        }
      }
    }
  }
});
