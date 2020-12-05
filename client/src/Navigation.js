import React from 'react';
import Box from '@material-ui/core/Box';
import {withStyles, createStyles} from '@material-ui/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import logo from './static/logo.png';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';
const Navigation = (props) => {
    const classes = props.classes;
    return (
        <Box className={classes.backgroundContainer}>
            <Button component={Link} to={'/'}>
                <img alt="logo" className={classes.logo} src={logo}/>
            </Button>
            <Container className={classes.userAuth}>
                <Button component={Link} to={'/editor'}>
                    <Typography className={classes.text}>
                        Start Pixeling
                    </Typography>
                </Button>
                <Button component={Link} to={'/login'}>
                    <Typography className={classes.text}>
                        Sign in
                    </Typography>
                </Button>
                <Button component={Link} to={'/signup'}>
                    <Typography className={classes.text}>
                        Sign up
                    </Typography>
                </Button>
            </Container>
        </Box>
    );
}

const useStyles = (theme) => createStyles({
    backgroundContainer: {
        display: 'flex',
        [theme.breakpoints.down('xs')]: {
            display: 'grid',
        },
        backgroundSize: 'cover',
        background: theme.palette.primary.main,
        overflowX: 'hidden',
        borderBottom: `1px solid ${theme.palette.text.primary}`
    },
   logo: {
        padding: '1rem',
    },
    userAuth: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    text: {
       paddingLeft: '1rem',
       paddingRight: '1rem',
    }
});

export default withStyles(useStyles)(Navigation);