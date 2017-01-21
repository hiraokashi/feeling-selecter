/* React Component */
import React from 'react';
import ReactDOM from 'react-dom';
import { render } from 'react-dom'
import { IndexRoute, Router, Route,  Link, withRouter} from 'react-router';
import BrowserHistory from 'react-router/lib/BrowserHistory';
import injectTapEventPlugin from 'react-tap-event-plugin';

import auth from './auth';
import storage from './local_storage';
import { app_config}  from './app_config';
import { endpoint } from './endpoint';

class LoginForm extends React.Component {
  constructor(props) {
    super(props)
  }
  render () {
    return (
        <div className="main">
          <h1>ログイン</h1>
          <form onSubmit={this.props.onSubmit.bind(this)}>
            <input type='text' name="email" value={this.props.email} placeholder="メールアドレス" onChange={this.props.onChange.bind(this)}/>
            <input type='password' name="password" value={this.props.password} placeholder="password" onChange={this.props.onChange.bind(this)}/>
            <div style={{textAlign:"center"}}>
              <button type="submit">ログイン</button>
            </div>
          </form>
        </div>
    )
  }
}
LoginForm.defaultProps = {email: '', password: ''}

const Login = withRouter(class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {email: '', password: ''};
  }
  handleSubmit(event){
    //ログイン＆ポータル画面へ
    event.preventDefault();
    auth.login(this.state.email, this.state.password,
    // success callback
    (data) => {
      storage.set(app_config.session_key, data.access_token);
      this.props.router.replace('/mypage');
    },
    // fail callback
    (data) => {
      alert('ログインに失敗しました')
      this.props.router.replace('/login');
    });
  }

  handleChange(event) {
    this.setState({ [`${event.target.name}`]: event.target.value });
  }
  render () {
    return (
      <div>
        <ul>
          <li><Link to="feelings">Feelings</Link></li>
        </ul>
        < LoginForm onSubmit={this.handleSubmit.bind(this)}  onChange={this.handleChange.bind(this)} email={this.state.email} password={this.state.password}/>
      </div>
    )
  }
}
)

export default Login

