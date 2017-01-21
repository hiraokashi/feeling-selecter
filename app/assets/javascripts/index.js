
import React from 'react';
import ReactDOM from 'react-dom';
import { render } from 'react-dom'
import Feelings from './components/feelings';
import auth from './components/auth';

import storage from './components/local_storage';
import { app_config}  from './components/app_config';
import { endpoint } from './components/endpoint';
import { IndexRoute, Router, Route,  Link, withRouter} from 'react-router';
import BrowserHistory from 'react-router/lib/BrowserHistory';
import injectTapEventPlugin from 'react-tap-event-plugin';
// Needed for React Developer Tools
window.React = React;
injectTapEventPlugin();

const Index = withRouter(class Index extends React.Component {
  constructor(props) {
    super(props)
      this.state = {}
  }
  componentWillMount() {
    //console.log(this.props.router.params)
    // ログイン済かを確認する
      if (storage.valid()) {
        console.log("localstrate not supported require login");
        this.props.router.replace('/top')
      } else {
        auth.connect(storage.get(app_config.session_key),
        (data) => {
          console.log('redirect to my page');
          this.props.router.replace('/feelings')
        },
        (data) => {
          storage.remove('thinklog/session');
          this.props.router.replace('/top')
        });
      }
    //this.props.router.replace('/feelings')
  }
  componentDidMount(){
    if (storage.valid()) {
      console.log('unko')
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
class FeelingApp extends React.Component {
  constructor(props) {
    super(props)
  }
  render () {
    return (
        <Feelings url={endpoint.feelings_path}/>
    )
  }
}
const Top = withRouter(class Top extends React.Component {
  constructor(props) {
    super(props)
  }
  handleSubmit(event){
    //ログイン＆ポータル画面へ
    event.preventDefault();
    auth.login(this.state.email, this.state.password,
    (data) => {
      storage.set(app_config.session_key, data.access_token);
      this.props.router.replace('/feelings')
    },
    (data) => {
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
          <button onClick={this.handleClick.bind(this)}>ログアウト</button>
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
