import React from 'react';
import Box from '@material-ui/core/Box';
import {withStyles, createStyles} from '@material-ui/styles';
import Navigation from './Navigation';
const Home = (props) => {
    const classes = props.classes;
   
    return (
        <Box className={classes.backgroundContainer}>
            <Navigation/>
        </Box>
    );
}

const useStyles = (theme) => createStyles({
   backgroundContainer: {
       backgroundSize: 'cover',
       background: theme.palette.primary.main,
       overflowX: 'hidden',
    },
   section: {
       display: 'flex',
    },
   logo: {
       padding: '1rem',
    }
});

export default withStyles(useStyles)(Home);