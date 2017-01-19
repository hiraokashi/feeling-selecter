
import React from 'react';
import ReactDOM from 'react-dom';
import { render } from 'react-dom'
import Feelings from './components/feelings';
import auth from './components/auth';
import { IndexRoute, Router, Route,  Link} from 'react-router';
import BrowserHistory from 'react-router/lib/BrowserHistory';
import injectTapEventPlugin from 'react-tap-event-plugin';
// Needed for React Developer Tools
window.React = React;
injectTapEventPlugin();

class Index extends React.Component {
  constructor(props) {
    super(props)
  }
  render () {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}
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
class Top extends React.Component {
  constructor(props) {
    super(props)
  }
  handleSubmit(){
    //ログイン＆ポータル画面へ
  }
  render () {
    return (
      <div>
        <ul>
          <li><Link to="feelings">Feelings</Link></li>
        </ul>
        <div className="main">
          <h1>ログイン</h1>
          <form onSubmit={this.handleSubmit}>
            <input placeholder="userid"/>
            <input placeholder="password"/>
            <div style={{textAlign:"center"}}>
              <button type="submit">ログイン</button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}
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
      <IndexRoute component={Top}/>
      <Route path="/top" component={Top}/>
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
