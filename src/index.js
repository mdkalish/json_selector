import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

export function render(domElement, fullcontactData, sObjectData){
  console.log('fullcontactData')
  console.log(fullcontactData)
  console.log('sObjectData')
  console.log(sObjectData)

  ReactDOM.render(<App />, domElement)
};
