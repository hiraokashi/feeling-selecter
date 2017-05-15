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
class Feeling extends React.Component {
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

class MyFeeling extends React.Component {
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
export default class Feelings extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      feelings: [],
      my_feelings: []
    };
    this.handleFeelingSubmit = this.handleFeelingSubmit.bind(this)
  }

  load_my_feelings(){
    rw.ajax({
      url: endpoint.my_feelings_path,
      dataType: 'json',
      type: 'GET',
      session: this.props.session
    }).done((data) => {
      this.setState({my_feelings: data.my_feelings});
      if (data.message) {
        alert(data.message)
      }
    }).fail((data) => {
      console.error(this.props.url, status, err.toString());
    });
  }

  componentWillMount(){
    rw.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'GET',
      session: this.props.session
    }).done((data) => {
      this.setState({feelings: data});
      this.load_my_feelings()
    }).fail((data) => {
      console.error(this.props.url, status, err.toString());
    });
  }
  handleFeelingSubmit(feeling_id){
    rw.ajax({
      url: endpoint.my_feelings_path,
      type: 'POST',
      dataType: 'json',
      session: this.props.session,
      data: { my_feeling: {feeling_id: feeling_id} }
    }).done((data) => {
      this.setState({my_feelings: data.my_feelings})
      if (data.message) {
        alert(data.message)
      }
    }).fail((data) => {
      this.setState({error_message: data.responseText})
    });
  }
  render () {
    return (
      <div className='all'>
      <div className='messages'>
      {this.state.feelings.map((feeling, i) => {
        return <Feeling key={i} id={feeling.id} name={feeling.name} onButtonClick={this.handleFeelingSubmit}/>
      })}
      </div>
      <div className='logs'>
      {this.state.my_feelings.map((my_feeling, i) => {
        return <MyFeeling key={i} id={my_feeling.id} name={my_feeling.name} create_time={my_feeling.create_time}/>
      })}
      </div>
      </div>
    )
  }
}
