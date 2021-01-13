import React, {useEffect, useState, useContext} from 'react';
import {useLocation, useHistory} from 'react-router-dom';
import axios from 'axios';
import {
    Box,
    Avatar,
} from '@material-ui/core';
import {withStyles, createStyles} from '@material-ui/styles';
import {AuthContext} from './context/AuthContext';
const UserHome = (props) => {
    const classes = props.classes;
    const user_id = new URLSearchParams(useLocation().search).get('id');
    const history = useHistory();
    const user = useContext(AuthContext);
    return (
        <Box className={classes.backgroundContainer}>
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

export default withStyles(useStyles)(UserHome);