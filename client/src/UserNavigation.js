import React, {useEffect, useContext, useState} from 'react';
import {useLocation, useHistory} from 'react-router-dom';
import {withStyles, createStyles} from '@material-ui/styles';
import axios from 'axios';
import {
    Box,
    Button,
    Container,
    Typography,
    Avatar,
} from '@material-ui/core';
import logo from './static/logo.png';
import {Link} from 'react-router-dom';
import {AuthContext} from './context/AuthContext';
import fox from './static/fox.png';
import racoon from './static/racoon.png';
import snake from './static/snake.png';
const UserNavigation = (props) => {
    const classes = props.classes;
    const user_id = new URLSearchParams(useLocation().search).get('id');
    const [userSprite, setUserSprite] = useState(0);
    const history = useHistory();
    const spritePaths = {
        0 : racoon,
        1 : snake,
        2 : fox,
    }
    const user = useContext(AuthContext);
    useEffect(() => {
        const getUser = async() => {
            let response;
            try {
                response = await axios.post('/api/user', JSON.stringify({user_id}), {
                    headers: {'Content-Type' : 'application/json'}
                });
            } catch (err) {
                console.log(err);
            }
            if (response) { 
                setUserSprite(response.data.user.spriteid);
            }
            if (response?.data.path) window.location.href = response.data.path;
            else history.push(`/user/?id=${user_id}`)
        } 
        getUser();
    }, [])
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
                    <Avatar src = {spritePaths[userSprite]}/>
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

export default withStyles(useStyles)(UserNavigation);