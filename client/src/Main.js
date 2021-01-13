import React, {useContext, useEffect} from 'react';
import {Route, Switch } from 'react-router-dom'
import Navigation from './Navigation';
import UserNavigation from './UserNavigation';
import Home from './Home';
import PixelEditor from './PixelEditor';
import Login from './auth/Login';
import Signup from './auth/Signup';
import UserHome from './UserHome';
import {AuthContext} from './context/AuthContext';

function Main() {
    const { user, setUser } = useContext(AuthContext);
    useEffect(() => {
        console.log(user);
    });
    return (
        <div>
            {
               user ? <UserNavigation user={user}/> : <Navigation/>
            }
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route path="/user" component={UserHome}/>
                <Route path="/login" component={Login}/>
                <Route path="/signup" component={Signup}/>
                <Route path="/editor/:editorId" component={PixelEditor}/>
                <Route path="/editor" component={PixelEditor}/>
            </Switch>
        </div>
    )
}

export default Main;