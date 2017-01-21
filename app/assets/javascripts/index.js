/* React Component */
import React from 'react';
import ReactDOM from 'react-dom';
import { render } from 'react-dom'
import auth from './components/auth';

import storage from './components/local_storage';
import { app_config}  from './components/app_config';
import { endpoint } from './components/endpoint';
import { IndexRoute, Router, Route,  Link, withRouter} from 'react-router';
import BrowserHistory from 'react-router/lib/BrowserHistory';
import injectTapEventPlugin from 'react-tap-event-plugin';

// Components
import Root from './components/root';
import Mypage from './components/mypage';
import Login from './components/login';


// Needed for React Developer Tools
window.React = React;
injectTapEventPlugin();

// Routing Definition
const routes = (
    <Route path="/" component={Root}>
      <IndexRoute component={Login} />
      <Route path="/login" component={Login} />
      <Route path="/mypage" component={Mypage}/>
    </Route>
);
render((
      <Router history={BrowserHistory} >
      {routes}
      </Router>
) , document.getElementById('feelings'))

