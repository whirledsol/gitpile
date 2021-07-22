import { createTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import blue  from '@material-ui/core/colors/blue';
import { OverpassMono } from './fonts';


const theme = createTheme({
	palette: {
		type: 'dark',
		primary: {
			main: blue[300],
		},
		secondary: {
			main: purple[300],
		},
		background:{
			default: '#040d21',
			paper:'#13161f'
		}
	},
	typography: {
		fontFamily: 'OverpassMono, Arial',
	},
	overrides: {
		MuiCssBaseline: {
			'@global': {
				'@font-face': [OverpassMono],
			}
		},
		MuiCard:{
			root:{
				margin:'1rem',
				padding:'1rem'
			}
		},
		MuiIcon:{
			root:{
				width: 'auto'
			}
		},
		MuiDivider:{
			vertical:{
				margin:"0 5px"
			}
		},
		MuiPopover:{
			paper:{
				border: '1px solid #eee'
			}
		},
		MuiToggleButton:{
			root:{
				padding:0,
				textTransform:'none'
			}
		},
		MuiButton:{
			root:{
				textTransform: 'none'
			}
		}
	},
	spacing: factor => `${0.5 * factor}rem`,
});

export default theme;