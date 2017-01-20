
import React from 'react';
import ReactDOM from 'react-dom';
import { render } from 'react-dom'
import Feelings from './components/feelings';
import auth from './components/auth';
import { IndexRoute, Router, Route,  Link, withRouter} from 'react-router';
import BrowserHistory from 'react-router/lib/BrowserHistory';
import injectTapEventPlugin from 'react-tap-event-plugin';
// Needed for React Developer Tools
window.React = React;
injectTapEventPlugin();

const Index = withRouter(class Index extends React.Component {
  constructor(props) {
    super(props)
  }
  componentWillMount() {
    //console.log(Object.keys(this.props.router));
    //console.log(this.props.router.params)
    // ログイン済かを確認する
      if (!window.localStorage) {
        console.log("localstrate not supported require login");
        this.props.router.replace('/top')
      } else {
        console.log("session from local strage=" + window.localStorage.getItem('thinklog/session'))
        $.ajax({
          url: '/api/sessions/',
          type: 'GET',
          dataType: 'json',
          beforeSend: function(request) {
            // localstrageに設定されたトークンを設定して
            request.setRequestHeader('ACCESS_TOKEN', window.localStorage.getItem('thinklog/session'));
          },
        }).done((data) => {
          console.log('redirect to my page');
          this.props.router.replace('/feelings')
        }).fail((data) => {
          console.log("しぱい");
          console.log(data) ;
          window.localStorage.removeItem('thinklog/session');
          this.props.router.replace('/top')
        });
      }
    //this.props.router.replace('/feelings')
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
class FeelingApp extends React.Component {
  constructor(props) {
    super(props)
  }
  render () {
    return (
        <Feelings url={"/api/feelings"}/>
    )
  }
}
const Top = withRouter(class Top extends React.Component {
  constructor(props) {
    super(props)
  }
  handleSubmit(event){
    //ログイン＆ポータル画面へ
    event.preventDefault()
      alert('フォーム送るデー')
    $.ajax({
      url: '/api/sessions/',
      type: 'POST',
      dataType: 'json',
      data: {user: {email: this.state.email, password: this.state.password }},
    }).done((data) => {
      console.log('redirect to my page');
      console.log(data.access_token)
      window.localStorage.setItem('thinklog/session', data.access_token);
      console.log("session from login=" + window.localStorage.getItem('thinklog/session'))
      this.props.router.replace('/feelings')
    }).fail((data) => {
      console.log(data) ;
      alert('ログインに失敗しました')
      this.props.router.replace('/top')
    });
  }

  handleChange(event) {
    this.setState({ [`${event.target.name}`]: event.target.value })
  }
  render () {
    return (
      <div>
        <ul>
          <li><Link to="feelings">Feelings</Link></li>
        </ul>
        <div className="main">
          <h1>ログイン</h1>
          <form onSubmit={this.handleSubmit.bind(this)}>
            <input type='text' name="email" placeholder="メールアドレス" onChange={this.handleChange.bind(this)}/>
            <input type='password' name="password" placeholder="password" onChange={this.handleChange.bind(this)}/>
            <div style={{textAlign:"center"}}>
              <button type="submit">ログイン</button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}
)
class Header extends React.Component {
  constructor(props) {
    super(props)
  }
  render () {
    return (
      <header>
        <div style={{position:"absolute", margin: "-15px 0px"}}>
          <h1>ヘッダです</h1>
        </div>
        <div style={{position:"relative", textAlign:"right", paddingTop: "30px"}}>
          <Link to="/portal" style={{paddingRight: "5px"}}>ポータル</Link>
          <Link to="/userbox" style={{paddingRight: "5px"}}>ユーザーリスト</Link>
          <button onClick={this.handleClick}>ログアウト</button>
        </div>
        <hr/>
      </header>
    )
  }
}
class Footer extends React.Component {
  constructor(props) {
    super(props)
  }
  render () {
    return (
      <div>
        Footer
      </div>
    )
  }
}
// Finally, we render a <Router> with some <Route>s.
// It does all the fancy routing stuff for us.
//
const routes = (
    <Route path="/" component={Index}>
      <IndexRoute component={Top} />
      <Route path="/top" component={Top} />
      <Route path="/feelings" component={FeelingApp}/>
    </Route>
);
render((
      <Router history={BrowserHistory} >
      {routes}
      </Router>
) , document.getElementById('feelings'))

//ReactDOM.render(<Feelings url="/api/feelings"/>, document.getElementById('feelings'));
//ReactDOM.render(<Index/>, document.getElementById('feelings'));
