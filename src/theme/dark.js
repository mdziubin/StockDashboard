import { createMuiTheme, colors } from '@material-ui/core';
import shadows from './shadows';
import typography from './typography';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    background: {
      dark: '#121212',
      default: colors.common.dark,
      paper: '#1F1B24'
    },
    primary: {
      main: '#BB86FC'
    },
    secondary: {
      main: '#BB86FC'
    }
  },
  shadows,
  typography
});

export default theme;
