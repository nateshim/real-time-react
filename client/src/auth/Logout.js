import React from 'react';
import { GoogleLogout } from 'react-google-login';

const Logout = (props) => {
    const classes = props.classes;
    const clientId = process.env.CLIENT_ID;
    const onSuccess = (res) => {
        console.log("Logout was successful");
    }
    return(
        <div>
            <GoogleLogout
            clientId={clientId}
            buttonText="Logout"
            onLogoutSuccess={onSuccess}
            />
        </div>
    )
}

export default Logout;