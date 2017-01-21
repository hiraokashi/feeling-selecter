/* React Component */
import React from 'react';
import ReactDOM from 'react-dom';
import { render } from 'react-dom'
import Feelings from './feelings';
import { endpoint } from './endpoint';

export default class Mypage extends React.Component {
  constructor(props) {
    super(props)
  }
  render () {
    return (
        <Feelings url={endpoint.feelings_path}/>
    )
  }
}
