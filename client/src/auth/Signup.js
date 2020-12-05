import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Navigation from '../Navigation';
import {useHistory} from 'react-router-dom';
import {withStyles, createStyles} from '@material-ui/styles';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import {
    Button,
    Container,
    Box,
    Typography,
} from '@material-ui/core';

const Signup = (props) => {
    const classes = props.classes;
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [verifypassword, setVerifyPassword] = useState('');
    const [signUpSucceeded, setSignUpSucceeded] = useState(true);
    const [signUpFailedMsg, setSignUpFailedMsg] = useState('');
    const history = useHistory();

    const handleSubmit = async (event) => {
        event.preventDefault();
        let response;
        try {
            response = await axios.post('/auth/signup', JSON.stringify({username: username, email, password}), {
                headers: {'Content-Type' : 'application/json'}
            });
        } catch (err) {
            console.log(err);
        }
        if (response) {
            setSignUpSucceeded(response.data.signUpSucceeded);
            setSignUpFailedMsg(response.data.signUpFailedMsg);
        }
        if (response?.data.path) window.location.href = response.data.path;
        else history.push('/signup');
    }
    useEffect(() => {
        ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
            return value === password;
        });
        return () => {
            ValidatorForm.removeValidationRule('isPasswordMatch');
        };
    });
    const handleUsernameChange = (event) => setUsername(event.target.value);
    const handleEmailChange = (event) => setEmail(event.target.value);
    const handlePasswordChange = (event) => setPassword(event.target.value);
    const handleVerifyPasswordChange = (event) => setVerifyPassword(event.target.value);
    return(
        <Box>
            <Navigation/>
            <Container maxWidth="md">
                <ValidatorForm
                    onSubmit={handleSubmit}
                    className={classes.formWrapper}
                >
                    <TextValidator
                        id="username"
                        label="Username"
                        className={classes.textBox}
                        onChange={handleUsernameChange}
                        name="username"
                        validators={['required']}
                        errorMessages={['this field is required']}
                        variant="outlined"
                        size="small"
                        value={username}
                    />
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
                        validators={[
                            'required',
                            'minStringLength: 10',
                            'matchRegexp:.*[A-Z]',
                            'matchRegexp:.*[0-9]',
                            'matchRegexp:.*[!@#$%^&*()~`+=?{}-]',
                        ]}
                        errorMessages={[
                            'this field is required',
                            'Use a minimum of 10 characters',
                            'Password must include at least one uppercase letter',
                            'Password must include at least one number',
                            'Password must include at least one special character(!@#$%^&*()~`+=?{}-)',
                        ]}
                        variant="outlined"
                        size="small"
                        value={password}
                    />
                    <TextValidator
                        id="verifypassword"
                        label="Verify Password"
                        className={classes.textBox}
                        onChange={handleVerifyPasswordChange}
                        name="verifypassword"
                        type="password"
                        validators={['isPasswordMatch', 'required']}
                        errorMessages={['Passwords do not match','this field is required']}
                        variant="outlined"
                        size="small"
                        value={verifypassword}
                    />
                    <Button type="submit">Create account</Button>
                    {signUpSucceeded === false && (
                        <Typography>
                            {signUpFailedMsg}
                        </Typography>
                    )}
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

export default withStyles(useStyles)(Signup);