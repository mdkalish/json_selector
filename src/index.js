import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// ReactDOM.render(<App />, document.getElementById('root'));

export function render(domElement){
  ReactDOM.render(App, domElement)
};
