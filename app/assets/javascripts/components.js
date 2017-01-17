
import React from 'react';
import ReactDOM from 'react-dom';
import Feelings from './components/feelings';
import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for React Developer Tools
window.React = React;

injectTapEventPlugin();
ReactDOM.render(<Feelings url="/api/feelings"/>, document.getElementById('feelings'));
