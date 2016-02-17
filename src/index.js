import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

export function render(domElement, fullcontactData, sObjectData){
  console.log('fullcontactData')
  console.log(fullcontactData)
  console.log('fullcontactData.socialProfiles')
  console.log(fullcontactData.socialProfiles)
  console.log('sObjectData')
  console.log(sObjectData)
  console.log('sObjectData.socialProfiles')
  console.log(sObjectData.socialProfiles)

  ReactDOM.render(<App />, domElement)
};
