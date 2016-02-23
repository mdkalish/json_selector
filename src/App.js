import React, { Component } from 'react';
import SocialProfiles from './components/social_profiles.js'

var App = React.createClass({
  getInitialState: function() {
    return {updateJson: {}}
  },
  getState: function() {
    return this.state;
  },
  render: function() {
    return (
      <div>
        <h1>Diff between states from Fullcontact (Fc) and SalesForce Object (So)</h1>
        <SocialProfiles
          fullcontactData={this.props.fullcontactData.socialProfiles}
          sObjectData={this.props.sObjectData.socialProfiles}
          onChange={this.props.onChange}
        />
      </div>
    );
  }
});

module.exports = App;
