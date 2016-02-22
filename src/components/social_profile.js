import React from 'react';

var SocialProfilePairRow = React.createClass({
  backgroundColor: function(value) {
    if (typeof value === "undefined") { return "grey" }
  },

  render: function() {
    // console.log('this.props')
    // console.log(this.props)
    return (
      <tr>
        <td>{this.props.key_part.toUpperCase()}</td>
        <td style={{"backgroundColor": this.backgroundColor(this.props.value_part[0])}}>{typeof this.props.value_part[0] === "undefined" ? "undefined" : this.props.value_part[0]}</td>
        <td style={{"backgroundColor": this.backgroundColor(this.props.value_part[1])}}>{typeof this.props.value_part[1] === "undefined" ? "undefined" : this.props.value_part[1]}</td>
      </tr>
    );
  }
});

var SocialProfileRows = React.createClass({
  render: function() {
    var SocialProfileNodes = [];
    for (var key in this.props) {
      if (this.props.hasOwnProperty(key) && this.props[key][0] !== this.props[key][1] && key !== "typeName") {
        SocialProfileNodes.push(
          <SocialProfilePairRow
            key={'socialProfilePair_' + key + this.props[key]}
            type={this.props.typeName}
            key_part={key}
            value_part={this.props[key]}
          />
        )
      }
    };
    return (
      <table className="socialProfilePair" style={tableStyle}>
        <thead>
          <SocialMediumNameRow typeName={this.props.typeName} />
          <ColumnHeadersRow />
        </thead>
        <tbody>
          {SocialProfileNodes}
        </tbody>
      </table>
    );
  }
});

var SocialMediumNameRow = React.createClass({
  render: function() {
    return (
      <tr>
        <th colSpan="3" style={headerStyle}>
          {this.props.typeName.filter(Boolean)[0]}
        </th>
      </tr>
    );
  }
});

var ColumnHeadersRow = React.createClass({
  render: function() {
    return (
      <tr colSpan="3">
        <th>Key Name</th>
        <th>sObject Value</th>
        <th>Fullcontact Value</th>
      </tr>
    );
  }
});

var tableStyle = {
  width: '90%',
  tableLayout: 'fixed',
  margin: '5px',
  padding: '5px',
  border: '1px solid black',
  textAlign: 'center'
};

var headerStyle = {
  backgroundColor: 'rgba(120, 150, 70, 0.5)'
};

module.exports = SocialProfileRows;
