import React from 'react';

var SocialProfilePair = React.createClass({
  backgroundColor: function(value) {
    if (typeof value === "undefined") { return "grey" }
  },

  render: function() {
    // console.log('this.props')
    // console.log(this.props)
    return (
      <div>
        <table className="socialProfilePair" style={{border: '1px solid black'}}>
          <tbody>
            <tr>
              <td>{this.props.key_part.toUpperCase()}</td>
              <td style={{"backgroundColor": this.backgroundColor(this.props.value_part[0])}}>{typeof this.props.value_part[0] === "undefined" ? "undefined" : this.props.value_part[0]}</td>
              <td style={{"backgroundColor": this.backgroundColor(this.props.value_part[1])}}>{typeof this.props.value_part[1] === "undefined" ? "undefined" : this.props.value_part[1]}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
});

var SocialProfile = React.createClass({
  render: function() {
    var SocialProfileNodes = [];
    for (var key in this.props) {
      if (this.props.hasOwnProperty(key) && this.props[key][0] !== this.props[key][1] && key !== "typeName") {
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
        <h3>{this.props.typeName.filter(Boolean)[0]}</h3>
        {SocialProfileNodes}
      </div>
    );
  }
});

module.exports = SocialProfile;
