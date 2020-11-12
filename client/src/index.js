import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { render } from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import Home from './Home';
import PixelEditor from './PixelEditor';
import Login from './auth/Login';
import Logout from './auth/Logout';
import {ThemeProvider, unstable_createMuiStrictModeTheme} from '@material-ui/core/styles';
import ScrollToTop from './ScrollToTop';

const theme = unstable_createMuiStrictModeTheme();
function App() {
  return(
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <Router>
          <ScrollToTop/>
          <div>
            <Switch>
              <Route exact path="/" component={Home}/>
              <Route path="/login" component={Login}/>
              <Route path="/logout" component={Logout}/>
              <Route path="/editor/:editorId" component={PixelEditor}/>
            </Switch>
          </div>
        </Router>
      </ThemeProvider>
    </React.StrictMode>
  )
};
render(<App/>, document.getElementById('root'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
