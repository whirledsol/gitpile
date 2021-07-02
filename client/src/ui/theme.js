import { createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import blue  from '@material-ui/core/colors/blue';
import { OverpassMono } from './fonts';


const theme = createMuiTheme({
	palette: {
		primary: {
			main: purple[500],
		},
		secondary: {
			main: blue[500],
		},
	},
	typography: {
		fontFamily: 'OverpassMono, Arial',
	},
	overrides: {
		MuiCssBaseline: {
			'@global': {
				'@font-face': [OverpassMono],
			},
		},
	},
});

export default theme;