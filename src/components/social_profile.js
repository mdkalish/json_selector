import React from 'react';

var SocialProfilePairRow = React.createClass({
  getInitialState: function() {
    return { picked: (this.props.picked || false) }
  },
  componentWillReceiveProps: function(nextProps) {
    this.setState({picked: nextProps.picked})
    // for (var prop of Object.keys(this.props)) {
      // console.log('this.getType()')
      // console.log(prop)
      console.log(this.props)
      window.updateJson.socialMedia[this.props.type] = {}
      window.updateJson.socialMedia[this.props.type][this.props.key_part] = this.props.value_part[1]
    // }
  },
  backgroundColor: function(value) {
    if (typeof value === "undefined") {
      return { backgroundColor: "#e0e4cc" }
    }
  },
  rowStyle: function() {
    var style;
    this.state.picked ?
      style = { backgroundColor: "#69d2e7" } :
      style = { backgroundColor: "#fff" }
    return style;
  },
  valueText: function(v) {
    return (
      typeof v === "undefined" ? "undefined" : v
    );
  },
  updatePicked: function() {
    this.setState({picked: !this.state.picked});
  },
  render: function() {
    var vp0 = this.props.value_part[0]
    var vp1 = this.props.value_part[1]
    return (
      <tr style={this.rowStyle()}>
        <td>{this.props.key_part.toUpperCase()}</td>
        <td style={this.backgroundColor(vp0)}>{this.valueText(vp0)}</td>
        <td style={this.backgroundColor(vp1)}>{this.valueText(vp1)}</td>
        <td>
          <input type="checkbox" checked={this.state.picked} onChange={this.updatePicked} />
        </td>
      </tr>
    );
  }
});

var SocialProfileRows = React.createClass({
  getInitialState: function() {
    return {picked: false}
  },
  updatePicked: function(picked) {
    this.setState(picked);
  },
  getType: function() {
    return this.props.typeName.filter(Boolean)[0]
  },
  render: function() {
    var SocialProfileNodes = [];
    for (var key in this.props) {
      if (this.props.hasOwnProperty(key) && this.props[key][0] !== this.props[key][1] && key !== "typeName") {
        SocialProfileNodes.push(
          <SocialProfilePairRow
            key={'socialProfilePair_' + key + this.props[key]}
            type={this.getType()}
            picked={this.state.picked}
            key_part={key}
            value_part={this.props[key]}
          />
        )
      }
    };
    return (
      <table className="socialProfilePair" style={tableStyle}>
        <thead>
          <SocialMediumNameRow type={this.getType()} />
          <ColumnHeadersRow updatePicked={this.updatePicked} />
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

var tableStyle = {
  width: '90%',
  tableLayout: 'fixed',
  margin: '10px',
  padding: '5px',
  border: '1px solid black',
  textAlign: 'center'
};

module.exports = SocialProfileRows;
