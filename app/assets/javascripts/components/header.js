import React from 'react';
import ReactDOM from 'react-dom';
import { render } from 'react-dom'

export default class Header extends React.Component {
  constructor(props) {
    super(props)
  }
  render () {
    return (
      <header>
        <div style={{position:"absolute", margin: "-15px 0px"}}>
          <h1>ヘッダです</h1>
        </div>
        <hr/>
      </header>
    )
  }
}
