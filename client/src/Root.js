
import App from './App';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from './ui/theme';
import { ThemeProvider } from '@material-ui/core/styles';

const Root = ()  => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  );
}

export default Root;
