import { createTheme } from '@mui/material/styles';
export default createTheme({
  palette: {
    primary: {
      main: '#675181',
      dark: '#514064',
      light: '#F1EDF5',
      contrastText: '#FFFFFF'
    },
    secondary: {
      main: '#675181'
    },
    background: {
      default: '#FAFAFB',
      paper: '#FFFFFF'
    },
    text: {
      primary: '#302D38',
      secondary: '#716C79'
    },
    divider: '#E1DFE7',
    success: {
      main: '#37675E'
    },
    error: {
      main: '#925361'
    },
    warning: {
      main: '#805E24'
    },
    info: {
      main: '#675181'
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
          borderRadius: 8,
          paddingInline: 16
        },
        text: { '&:hover': { backgroundColor: 'transparent', fontWeight: 650 } },
        outlined: {
          '&:hover': { backgroundColor: 'transparent', fontWeight: 650 },
          '&.MuiButton-colorPrimary': {
            borderColor: '#C8C2D4'
          }
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
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          fontSize: 20,
          lineHeight: '28px',
          fontWeight: 500,
          paddingInline: 24,
          '@media (max-width: 600px)': {
            paddingInline: 20
          }
        }
      }
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          paddingInline: 24,
          '@media (max-width: 600px)': {
            paddingInline: 20
          }
        }
      }
    },
    MuiDialogActions: {
      defaultProps: {
        disableSpacing: true
      },
      styleOverrides: {
        root: {
          padding: '8px 24px 24px',
          gap: 8,
          '@media (max-width: 600px)': {
            padding: '8px 20px 20px'
          },
          '@media (max-width: 399px)': {
            flexDirection: 'column',
            alignItems: 'stretch',
            '& > .MuiButton-root': {
              width: '100%'
            }
          }
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          border: '1px solid #E1DFE7'
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFFFFF',
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#675181'
          }
        },
        notchedOutline: {
          borderColor: '#BDB7C8'
        }
      }
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderColor: '#E1DFE7',
          padding: '18px 20px'
        },
        head: {
          fontSize: 13,
          color: '#716C79',
          backgroundColor: '#FAFAFB',
          fontWeight: 500
        }
      }
    },
    MuiTab: {
      defaultProps: { disableRipple: true },
      styleOverrides: {
        root: {
          textTransform: 'none',
          minHeight: 48,
          fontWeight: 500
        }
      }
    },
    MuiCheckbox: {
      defaultProps: { disableRipple: true },
      styleOverrides: {
        root: {
          color: '#77838D',
          '&:hover': { backgroundColor: 'transparent' }
        }
      }
    }
  }
});
