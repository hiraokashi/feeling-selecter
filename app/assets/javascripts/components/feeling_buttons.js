
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
class FeelingButton extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(){
    this.props.onButtonClick(this.props.id)
  }
  render () {
    return (
        <RaisedButton onClick={this.handleClick} key={this.props.id} style={style} secondary={true} label={this.props.name} />
    )
  }
}

export default class FeelingButtons extends React.Component {
  constructor(props) {
    super(props);
  }
  render () {
    return (
      <div className='messages'>
      {this.props.feelings.map((feeling, i) => {
        return <FeelingButton key={i} id={feeling.id} name={feeling.name} onButtonClick={this.props.handleFeelingSubmit}/>
      })}
      </div>
    )
  }
}
