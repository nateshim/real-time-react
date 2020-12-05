import {createMuiTheme} from '@material-ui/core';
 

const theme = createMuiTheme({
    palette: {
        text: {
            primary: '#545863',
        },
        primary: {
          main: '#fff2f2',
        },
        secondary: {
          main: '#f96e46',
        },
    },
    typography: {
        fontFamily: 'HardPixel',
        fontSize: 25,
    },
});

export default theme;