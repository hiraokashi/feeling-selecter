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

const Root = withRouter(class Root extends React.Component {
  constructor(props) {
    super(props)
      this.state = {}
  }
  componentWillMount() {
    //console.log(this.props.router.params)
    // ログイン済かを確認する
      if (!storage.valid()) {
        console.log("localstrate not supported require login");
        this.props.router.replace('/login')
      } else {
        session.connect(storage.get(app_config.session_key),
        (data) => {
          console.log('redirect to my page');
          this.props.router.replace('/mypage')
        },
        (data) => {
          storage.remove('thinklog/session');
          this.props.router.replace('/login')
        });
      }
    //this.props.router.replace('/feelings')
  }
  componentDidMount(){
    if (storage.valid()) {
      this.setState({session: storage.get(app_config.session_key)})
    }
  }
  render () {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}
)

export default Root
