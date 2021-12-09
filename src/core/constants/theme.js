import { createTheme } from '@material-ui/core/styles';


const theme = createTheme({
  palette: {
    primary: {
      main: '#272c34'
    },
    secondary: {
      main: '#1b6ae5'
    }
  },
  typography: {
    fontFamily: [
      'Urbanist',
      'Roboto',
      'sans-serif'
    ].join(','),
    h6: {
      fontWeight: 700
    },
    h2: {
      fontWeight: 700
    },
    subtitle2: {
      color: '#9eaac0',
      fontWeight: 900,
      textTransform: 'uppercase'
    }
  },
  overrides: {
    MuiPaper: {
      rounded: {
        borderRadius: 15
      }
    }
  }
});

export default theme;
