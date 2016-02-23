import React, { Component } from 'react';
import SocialProfiles from './components/social_profiles.js'

var App = React.createClass({
  render: function() {
    return (
      <div>
        <h1>Diff Tables</h1>
        <div className="socialProfiles">
          <SocialProfiles
            fullcontactData={this.props.fullcontactData.socialProfiles}
            sObjectData={this.props.sObjectData.socialProfiles}
            onChange={this.props.onChange}
          />
        </div>
      </div>
    );
  }
});

module.exports = App;
