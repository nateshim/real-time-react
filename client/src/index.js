import React, {useState} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { BrowserRouter as Router } from 'react-router-dom'
import { render } from 'react-dom';
import * as serviceWorker from './serviceWorker';
import {ThemeProvider} from '@material-ui/core/styles';
import ScrollToTop from './ScrollToTop';
import theme from './Theme';
import {AuthContext} from './context/AuthContext';
import Main from './Main';

function App() {
  const [user, setUser] = useState(null);
  const setuser = (input) => {
    setUser(input);
  }
  return(
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <AuthContext.Provider value={{user: user, setUser: setuser}}>
          <CssBaseline/>
          <Router>
            <ScrollToTop/>
            <Main/>
          </Router>
        </AuthContext.Provider>
      </ThemeProvider>
    </React.StrictMode>
  )
};
render(<App/>, document.getElementById('root'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
