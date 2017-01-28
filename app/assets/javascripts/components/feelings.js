/* React Component */
import React from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import RaisedButton from 'material-ui/RaisedButton';
import {pinkA100} from 'material-ui/styles/colors';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import rw from './request_wrapper';

const style = {
  margin: 12,
};
class Feeling extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(){
    this.props.onButtonClick(this.props.name)
  }
  render () {
    return (
        <RaisedButton onClick={this.handleClick} key={this.props.id} style={style} secondary={true} label={this.props.name} />
    )
  }
}

export default class Feelings extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      feelings: []
    };
    this.handleFeelingSubmit = this.handleFeelingSubmit.bind(this)
  }
  componentWillMount(){
    rw.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'GET',
      session: this.props.session
    }).done((data) => {
      this.setState({feelings: data});
    }).fail((data) => {
      console.error(this.props.url, status, err.toString());
    });
  }
  handleFeelingSubmit(feeling_id){
    alert(feeling_id);
  }
  render () {
    return (
      <div className='messages'>
        {this.state.feelings.map((feeling, i) => {
           return <Feeling key={i} id={feeling.id} name={feeling.name} onButtonClick={this.handleFeelingSubmit}/>
        })}
      </div>
    )
  }
}
