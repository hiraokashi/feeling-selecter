/* React Component */
import React from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import RaisedButton from 'material-ui/RaisedButton';
import {pinkA100} from 'material-ui/styles/colors';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import rw from './request_wrapper';
import { endpoint } from './endpoint';
import FeelingButtons from './feeling_buttons'
import MyFeelingLogs from './my_feeling_logs'

export default class FeelingApp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      feelings: [],
      my_feelings: [],
      view_type: 'log'
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
        <FeelingButtons feelings={this.state.feelings} handleFeelingSubmit={this.handleFeelingSubmit}/>
          {(() => {
            if (this.state.view_type == 'log')
              return (
                <MyFeelingLogs my_feelings={this.state.my_feelings} />
              )
            else
              return null
          })()}
      </div>
    )
  }
}
