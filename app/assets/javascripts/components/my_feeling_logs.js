/* React Component */
import React from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import RaisedButton from 'material-ui/RaisedButton';
import {pinkA100} from 'material-ui/styles/colors';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import rw from './request_wrapper';
import { endpoint } from './endpoint';

class MyFeelingLog extends React.Component {
  constructor(props) {
    super(props);
  }
  render () {
    return (
      <div>
      <span>{this.props.name}</span>
      &nbsp;
      &nbsp;
      &nbsp;
      <span>{this.props.create_time}</span>
      <hr />
      </div>
    )
  }
}

export default class MyFeelingLogs extends React.Component {
  constructor(props) {
    super(props);
  }
  render () {
    return (
      <div className='logs'>
      {this.props.my_feelings.map((my_feeling, i) => {
        return <MyFeelingLog key={i} id={my_feeling.id} name={my_feeling.name} create_time={my_feeling.create_time}/>
      })}
      </div>
    )
  }
}
