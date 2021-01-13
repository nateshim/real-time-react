import React, {useState, useContext} from 'react';
import axios from 'axios';
import {useHistory} from 'react-router-dom';
import {withStyles, createStyles} from '@material-ui/styles';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import {
    Button,
    Container,
    Box,
    Typography,
} from '@material-ui/core';
import {AuthContext} from '../context/AuthContext';

const Login = (props) => {
    const classes = props.classes;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [authSuccessful, setAuthSuccessful] = useState(true);
    const history = useHistory();
    const authContext = useContext(AuthContext);

    const handleSubmit = async (event) => {
        event.preventDefault();
        let response;
        try {
            response = await axios.post('/auth/login', JSON.stringify({email, password}), {
                headers: {'Content-Type' : 'application/json'}
            });
            authContext.setUser(response.data.user);
        } catch (err) {
            setAuthSuccessful(false);
            console.log(err);
            authContext.setUser(null);
        }
        if (response) {
            setAuthSuccessful(response.data.authSuccessful);
        }
        if (response?.data.path) history.push(response.data.path);
        else history.push('/login');
    }
    
    const handleEmailChange = (event) => setEmail(event.target.value);
    const handlePasswordChange = (event) => setPassword(event.target.value);
    
    return(
            <Box>
            <Container maxWidth="md">
                <ValidatorForm
                    onSubmit={handleSubmit}
                    className={classes.formWrapper}
                >
                    <TextValidator
                        id="email"
                        label="Email address"
                        className={classes.textBox}
                        onChange={handleEmailChange}
                        name="email"
                        type="email"
                        validators={['required', 'isEmail']}
                        errorMessages={['this field is required', 'email is not valid']}
                        variant="outlined"
                        size="small"
                        value={email}
                    />
                    <TextValidator
                        id="password"
                        label="Password"
                        className={classes.textBox}
                        onChange={handlePasswordChange}
                        name="password"
                        type="password"
                            validators={['required']}
                            errorMessages={['this field is required']}
                            variant="outlined"
                            size="small"
                            value={password}
                        />
                        {authSuccessful === false && (
                            <Typography>Sign in failed</Typography>
                        )}
                        <Button type="submit">Sign in</Button>
                    </ValidatorForm>
                </Container>
            </Box>
    )
}

const useStyles = (theme) => createStyles({
    formWrapper: {
        width: '350px',
        display: 'flex',
        flexDirection: 'column',
        '& > *': {
            marginBottom: '1rem',
        },
    },
    textBox: {
        display: 'flex',
    }
});

export default withStyles(useStyles)(Login);