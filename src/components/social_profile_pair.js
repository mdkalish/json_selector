import React from 'react';

var SocialProfilePairRow = React.createClass({
  getInitialState: function() {
    return { picked: false }
  },
  componentWillReceiveProps: function(nextProps) {
    this.setState({picked: nextProps.picked});
  },
  componentWillUpdate: function(nextProps, nextState) {
    var updateJson = Object.create({writeable: true});
    var sObjectData = {sObjectValue: this.props.valuePart[0]};
    var fullContactData = {fullContactValue: this.props.valuePart[1]};
    Object.assign(updateJson, this.props, sObjectData, fullContactData, nextState);
    this.props.onChange(updateJson);
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
    var vp0 = this.props.valuePart[0]
    var vp1 = this.props.valuePart[1]
    return (
      <tr style={this.rowStyle()}>
        <td>{this.props.keyPart.toUpperCase()}</td>
        <td style={this.backgroundColor(vp0)}>{this.valueText(vp0)}</td>
        <td style={this.backgroundColor(vp1)}>{this.valueText(vp1)}</td>
        <td>
          <input type="checkbox" checked={this.state.picked} onChange={this.updatePicked} />
        </td>
      </tr>
    );
  }
});

module.exports = SocialProfilePairRow;
