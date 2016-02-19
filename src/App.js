import React, { Component } from 'react';
import Item from './components/item.js'
import SocialProfiles from './components/social_profiles.js'

// export default class App extends Component {
var App = React.createClass({
  render: function() {
    return (
      <div>
        <h1>Diff between states from Fullcontact (Fc) and SalesForce Object (So)</h1>
        <SocialProfiles
          fullcontactData={this.props.fullcontactData.socialProfiles}
          sObjectData={this.props.sObjectData.socialProfiles}
        />
        <h1>Item</h1>
        <Item />
      </div>
    );
  }
});

module.exports = App;
// }
