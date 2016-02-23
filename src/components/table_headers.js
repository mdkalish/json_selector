import React from 'react';

var SocialMediumHeaderRow = React.createClass({
  render: function() {
    return (
      <tr style={{backgroundColor: '#fa6900'}}>
        <th colSpan="4">
          {this.props.type}
        </th>
      </tr>
    );
  }
});

var ColumnHeadersRow = React.createClass({
  getInitialState: function() {
    return {picked: false}
  },
  updatePicked: function() {
    var picked = {picked: !this.state.picked}
    this.setState(picked)
    this.props.updatePicked(picked)
  },
  render: function() {
    var k = Math.random()
    return (
      <tr colSpan="4" style={{backgroundColor: '#f38630'}}>
        <th>Key Name</th>
        <th>sObject Value</th>
        <th>Fullcontact Value</th>
        <th>
          <label htmlFor={"updateAll_" + k}>Update sObject?</label>
          <input type="checkbox" checked={this.state.picked} onChange={this.updatePicked} id={"updateAll_" + k} />
        </th>
      </tr>
    );
  }
});

module.exports = {SocialMediumHeaderRow, ColumnHeadersRow}
