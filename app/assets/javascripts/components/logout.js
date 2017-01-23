
/* React Component */
import React from 'react';
import ReactDOM from 'react-dom';
import { render } from 'react-dom'
import { IndexRoute, Router, Route,  Link, withRouter} from 'react-router';
import BrowserHistory from 'react-router/lib/BrowserHistory';
import injectTapEventPlugin from 'react-tap-event-plugin';

import session from './session';
import storage from './local_storage';
import { app_config}  from './app_config';
import { endpoint } from './endpoint';

const Logout = withRouter(class Logout extends React.Component {
  constructor(props) {
    super(props);
  }
  handleLogout(event){
    //ログイン＆ポータル画面へ
    event.preventDefault();
    session.destroy(this.props.session,
    // success callback
    (data) => {
      this.props.router.replace('/login');
    },
    // fail callback
    (data) => {
      this.props.router.replace('/login');
    });
  }
  render () {
    return (
      <div>
        {this.props.session ? (
            <a href='#' onClick={this.handleLogout.bind(this)} >ログアウト</a>
         ) : (<p></p>) }
      </div>
    )
  }
}
)

Logout.defaultProps = {session: ''}
export default Logout

