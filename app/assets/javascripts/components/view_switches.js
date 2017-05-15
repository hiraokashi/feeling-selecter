
/* React Component */
import React from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import RaisedButton from 'material-ui/RaisedButton';
import {pinkA100} from 'material-ui/styles/colors';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import rw from './request_wrapper';
import { endpoint } from './endpoint';

const style = {
  margin: 12,
};
class SwitchLink extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(){
    this.props.onLinkClick(this.props.type)
  }
  render () {
    return (
      <a href='#' onClick={this.handleClick} >{this.props.name}</a>
    )
  }
}

export default class ViewSwithches extends React.Component {
  constructor(props) {
    super(props);
  }
  render () {
    return (
      <div className='switches'>
        {this.props.view_types.map((view_type, i) => {
          return <SwitchLink key={i} type={view_type.type} name={view_type.name} onLinkClick={this.props.onLinkClick} />
        })}
        <br/>
      </div>
    )
  }
}

