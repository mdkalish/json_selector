import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const fullcontactKeys = ["status", "requestId", "likelihood", "photos", "contactInfo", "demographics", "socialProfiles"]

// ONLY FOR LOCAL DEVELOPMENT
const sObjectData = require('json!./../narzedzia/fullcontact_ms.json')
const fullcontactData = require('json!./../narzedzia/fullcontact_mk.json')

window.sObjectData = sObjectData;
window.fullcontactData = fullcontactData;
/// ONLY FOR LOCAL DEVELOPMENT
window.updateJson = {};

export function render(domElement, sObjectData, fullcontactData, callback) {
  ReactDOM.render(
    <App
      sObjectData={sObjectData}
      fullcontactData={fullcontactData}
      onChange={callback}
    />,
    domElement
  )
};
