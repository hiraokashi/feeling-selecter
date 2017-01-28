
/* React Component */
import React from 'react';
import ReactDOM from 'react-dom';
import { render } from 'react-dom'
import { IndexRoute, Router, Route,  Link, withRouter} from 'react-router';
import BrowserHistory from 'react-router/lib/BrowserHistory';
import injectTapEventPlugin from 'react-tap-event-plugin';

import session from './session';
import rw from './request_wrapper';
import storage from './local_storage';
import { app_config}  from './app_config';
import { endpoint } from './endpoint';

class SignupForm extends React.Component {
  constructor(props) {
    super(props)
  }
  render () {
    return (
        <div className="main">
          <h1>アカウント登録</h1>
          <span>{this.props.error_message}</span>
          <form onSubmit={this.props.onSubmit.bind(this)}>
            <input type='text' name="email" value={this.props.email} placeholder="メールアドレス" onChange={this.props.onChange.bind(this)}/>
            <input type='password' name="password" value={this.props.password} placeholder="パスワード" onChange={this.props.onChange.bind(this)}/>
            <input type='password' name="password_confirmation" value={this.props.password_confirmation} placeholder="パスワード確認" onChange={this.props.onChange.bind(this)}/>
            <div style={{textAlign:"center"}}>
              <button type="submit">ログイン</button>
            </div>
          </form>
        </div>
    )
  }
}
SignupForm.defaultProps = {email: '', password: '', password_confirmation: ''}

const Signup = withRouter(class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {email: '', password: '', password_confirmation: '', error_massage: ''};
  }
  handleSubmit(event){
    //アカウント登録→マイページへ
    event.preventDefault();
    rw.ajax({
      url: endpoint.user_account_path,
      type: 'POST',
      dataType: 'json',
      data: {user: {email: this.state.email, password: this.state.password , password_confirmation: this.state.password_confirmation}}
    }).done((data) => {
      //Object.keys(data).forEach(function (key) {
      //  console.log(key + " => "+ data[key])
      //});
      storage.set(app_config.session_key, data.access_token);
      this.props.router.replace('/');
    }).fail((data) => {
      this.setState({error_message: data.responseText})
    });
  }
  handleChange(event) {
    this.setState({ [`${event.target.name}`]: event.target.value });
  }
  render () {
    return (
      <div>
        <ul>
          <li><Link to="/login">ログイン</Link></li>
        </ul>
        < SignupForm error_message={this.state.error_message} onSubmit={this.handleSubmit.bind(this)}  onChange={this.handleChange.bind(this)} email={this.state.email} password={this.state.password}  password_confirmation={this.state.password_confirmation} error_message={this.state.error_message}/>
      </div>
    )
  }
}
)

export default Signup

