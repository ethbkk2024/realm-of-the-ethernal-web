import { createTheme } from '@mui/material/styles';

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    warning: true;
    white: true;
    blueGrey: true;
  }
}
export const theme = createTheme({
  palette: {
    primary: {
      main: '#7A6AF4',
      // light: '',
      // dark: '',
      // contrastText: '#fff',
    },
    secondary: {
      main: '#FF87B3',
      // light: '',
      // dark: '',
      contrastText: '#fff',
    },
    error: {
      main: '#DE5532',
      // light: '',
      // dark: '',
      // contrastText: '#fff',
    },
    success: {
      main: '#A2ED4A',
      // light: '',
      // dark: '',
      // contrastText: '#fff',
    },
    warning: {
      main: '#FCE159',
      // light: '',
      // dark: '',
      // contrastText: '#fff',
    },
    white: {
      main: '#FFF',
      // light: '',
      // dark: '',
      // contrastText: '#fff',
    },
    blueGrey: {
      main: '#999',
      // light: '',
      // dark: '',
      // contrastText: '#fff',
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        style: {
          height: 40,
        },
      },
      styleOverrides: {
        root: {
          fontFamily: 'LINESeedSansTH-Bold, sans-serif',
          boxShadow: 'none',
          borderRadius: '24px',
          textTransform: 'none',
          fontWeight: 400,
          transition: '.3s ease-in',
          fontSize: '12px',
          '&:active': {
            boxShadow: 'none',
          },
        },
      },
      variants: [
        {
          props: { size: 'small' },
          style: {
            height: '24px !important',
          },
        },
        {
          props: { variant: 'contained' },
          style: {
            '&:hover': {
              boxShadow: 'none',
              filter: 'brightness(0.9)',
            },
          },
        },
      ],
    },
    MuiTextField: {
      defaultProps: {
        size: 'small',
        fullWidth: true,
        height: '40px',
      },
      styleOverrides: {
        root: {
          '>div': {
            boxShadow: '0 0 0 1px #DBE2E5',
            transition: '0.3s ease-out',
            '&.Mui-focused': {
              boxShadow: '0 0 0 1px #5149F2 !important',
            },
            '&:hover': {
              boxShadow: '0 0 0 1px #5149F2 !important',
            },
          },
          fieldset: {
            border: 'none',
          },
        },
        input: {
          fontSize: '12px',
          outline: 'none',
          width: '100%',
          height: '100%',
        },
      },
    },
  },
} as any);
