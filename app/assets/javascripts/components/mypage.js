/* React Component */
import React from 'react';
import ReactDOM from 'react-dom';
import { render } from 'react-dom'
import FeelingApp from './feeling_app';
import Logout from './logout';
import { endpoint } from './endpoint';

import session from './session';
import storage from './local_storage';
import { app_config}  from './app_config';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {pinkA100} from 'material-ui/styles/colors';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
export default class Mypage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {session: ''};
  }
  componentWillMount(){
    if (storage.valid()) {
      this.setState({session: storage.get(app_config.session_key)})
    } else {
    }
  }
  render () {
    return (
        <MuiThemeProvider muiTheme={getMuiTheme()}>
          {(() => {
            if (this.state.session)
              return (
                <div className='messages'>
                  <Logout session={this.state.session} />
                  <FeelingApp session={this.state.session} url={endpoint.feelings_path}/>
                </div>
              )
            else
              return null
          })()}
        </MuiThemeProvider>
    )
  }
}
