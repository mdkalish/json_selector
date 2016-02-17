import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const fullcontactKeys = ["status", "requestId", "likelihood", "photos", "contactInfo", "demographics", "socialProfiles"]
const fullcontactData = require('json!./../narzedzia/fullcontact_ws.json')
const sObjectData = require('json!./../narzedzia/fullcontact_mk.json')

export function render(domElement) { //, fullcontactData, sObjectData) {
  /*
  console.log('fullcontactData')
  console.log(fullcontactData)
  console.log('fullcontactData.socialProfiles')
  console.log(fullcontactData.socialProfiles)
  console.log('sObjectData')
  console.log(sObjectData)
  console.log('sObjectData.socialProfiles')
  console.log(sObjectData.socialProfiles)
  console.log(fullcontactKeys)
  */

  ReactDOM.render(<App />, domElement)
};
