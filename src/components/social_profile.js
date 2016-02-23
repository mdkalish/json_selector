import React from 'react';
import SocialProfilePairRow from './social_profile_pair.js';
import {SocialMediumHeaderRow, ColumnHeadersRow} from "./table_headers.js"

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
      if (this.props.hasOwnProperty(key) &&  key !== "onChange" && key !== "typeName") {
        if (this.props[key][0] !== this.props[key][1]) {
          SocialProfileNodes.push(
            <SocialProfilePairRow
              onChange={this.props.onChange}
              key={'socialProfilePair_' + key + this.props[key]}

              type={this.getType()}
              picked={this.state.picked}
              keyPart={key}
              valuePart={this.props[key]}
            />
          )
        }
      }
    };
    return (
      <table className="socialProfilePair" style={tableStyle}>
        <thead>
          <SocialMediumHeaderRow type={this.getType()} />
          <ColumnHeadersRow updatePicked={this.updatePicked} />
        </thead>
        <tbody>
          {SocialProfileNodes}
        </tbody>
      </table>
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
