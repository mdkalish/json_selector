import React from 'react';

var SocialProfilePair = React.createClass({
  render: function() {
    return (
      <div>
        <span className="socialProfilePair">
          {this.props.key_part}: {this.props.value_part}
        </span>
      </div>
    );
  }
});

var SocialProfile = React.createClass({
  render: function() {
    var SocialProfileNodes = [];
    /*
    {console.log(this.props)}
    {console.log('this.props.typeIdSo')}
    {console.log(this.props.typeIdSo)}
    */
    for (var key in this.props) {
      if (this.props.hasOwnProperty(key) && typeof this.props[key] !== "undefined") {
        SocialProfileNodes.push(
          <SocialProfilePair
            key={'socialProfilePair_' + key + this.props[key]}
            key_part={key}
            value_part={this.props[key]}
          />
        )
      }
    };
    return (
      <div>
        <h4>{this.props.typeNameFc}</h4>
        {SocialProfileNodes}
      </div>
    );
  }
});

module.exports = SocialProfile;
