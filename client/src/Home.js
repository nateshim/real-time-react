import React from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import {withStyles, createStyles} from '@material-ui/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
const Home = (props) => {
    const classes = props.classes;
    return (
        <Box>
            <Typography>
            The quick brown fox jumps over the lazy dog
            </Typography>
        </Box>
    );
}

const useStyles = (theme) => createStyles({
   
});

export default withStyles(useStyles)(Home);