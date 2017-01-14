import React from 'react';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import RaisedButton from 'material-ui/RaisedButton';
import {deepOrange500} from 'material-ui/styles/colors';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500,
  },
});
export default class Feelings extends React.Component {
  constructor(props) {
    super(props)
    this.state = {feelings: [{id: 1, name: '基'}, {id: 1, name: '怒'}]}
  }
  render () {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
      <div className='messages'>
        {this.state.feelings.map(function (feeling, i) {
           return <RaisedButton key={i} label={feeling.name} />
        })}
      </div>
      </MuiThemeProvider>
    )
  }
}
//window.Feelings =  Feelings
