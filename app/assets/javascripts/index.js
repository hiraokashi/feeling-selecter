/* React Component */
import React from 'react';
import ReactDOM from 'react-dom';
import { render } from 'react-dom'
import session from './components/session';

import storage from './components/local_storage';
import { app_config}  from './components/app_config';
import { endpoint } from './components/endpoint';
import { IndexRoute, Router, Route,  Link, withRouter} from 'react-router';
import BrowserHistory from 'react-router/lib/BrowserHistory';
import injectTapEventPlugin from 'react-tap-event-plugin';

// Components
import GuestOnly from './components/guest_only';
import UserOnly from './components/user_only';
import Mypage from './components/mypage';
import Login from './components/login';
import Signup from './components/signup';


// Needed for React Developer Tools
window.React = React;
injectTapEventPlugin();



class Index extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div>{this.props.children}</div>
    );
  }
}

// Routing Definition
const routes = (
    <Route  component={Index}>
      <Route component={UserOnly}>
        <Route path="/" component={Mypage}/>
      </Route>
      <Route  component={GuestOnly}>
         <Route path="/signup" component={Signup} />
         <Route path="/login" component={Login} />
      </Route>
    </Route>
);
render((
      <Router history={BrowserHistory} >
      {routes}
      </Router>
) , document.getElementById('feelings'))

