import React from 'react';
import { GoogleLogin } from 'react-google-login';

const Login = (props) => {
    const classes = props.classes;
    const clientId = process.env.CLIENT_ID;

    const onSuccess = (res) => {
        console.log("Login success");

    }
    const onFailure = (res) => {
        console.log("Login failed")
    }
        
    return(
        <div>
            <GoogleLogin
            clientId={clientId}
            buttonText="Login"
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy={'single_host_origin'}
            style={{marginTop: '100px'}}
            isSignedIn={true}
            />
        </div>
    )
}

export default Login;