import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { render } from 'react-dom';
import * as serviceWorker from './serviceWorker';
import Home from './Home';
import PixelEditor from './PixelEditor';
import Login from './auth/Login';
import Logout from './auth/Logout';
import {ThemeProvider} from '@material-ui/core/styles';
import ScrollToTop from './ScrollToTop';
import theme from './Theme';

function App() {
  return(
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
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
