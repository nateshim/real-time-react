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
    Menu,
    MenuItem,
} from '@material-ui/core';
import logo from './static/logo.png';
import {Link} from 'react-router-dom';
import {AuthContext} from './context/AuthContext';
import fox from './static/fox.png';
import racoon from './static/racoon.png';
import snake from './static/snake.png';
const UserNavigation = (props) => {
    const classes = props.classes;
    const [anchorEl, setAnchorEl] = useState(null);

    const user_id = new URLSearchParams(useLocation().search).get('id');
    const [userSprite, setUserSprite] = useState(0);
    const history = useHistory();
    const spritePaths = {
        0 : racoon,
        1 : snake,
        2 : fox,
    };
    const user = useContext(AuthContext);

    const handleLogout = async (event) => {
        event.preventDefault();
        let response;
        try {
            response = await axios.post('/auth/logout', {
                headers: {'Content-Type' : 'application/json'}
            });
            user.setUser(null);
        } catch (err) {
            console.log(err);
            user.setUser(null);
        }
        if (response?.data.path) history.push(response.data.path);
        else history.push('/');
    }
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
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
                <Button component={Link} aria-controls="simple menu" aria-haspopup="true" onClick={handleClick}>
                    <Avatar src = {spritePaths[userSprite]}/>
                </Button>
                <Menu
                    classes={{paper: classes.appBar}}
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    elevation={0}
                    getContentAnchorEl={null}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem>
                        <Button component={Link} onClick={handleLogout}>Logout</Button>
                    </MenuItem>
                </Menu>
            </Container>
        </Box>
    );
}

const useStyles = (theme) => createStyles({
    appBar: {
        backgroundColor: '#fff2f2',
    },
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