import React, { Component } from 'react';
const test_json = require('json!../../narzedzia/fullcontact_ws.json')

var Item = React.createClass({
  getInitialState: function() {
    return {
      fullcontact: test_json,
    }
  },

  render: function() {
    return (
      <div>
        <h3>Fullcontact</h3>
      </div>
    );
  },

  formatJson: function(keys) {
    return (
      this.state.fullcontact
    )
  }
});

// ReactDOM.render(
//   <Item />,
//   document.getElementById('item')
// );

module.exports = Item;
/*
var CommentBox = React.createClass({
  render: function() {
    return (
      <div className="commentBox">
        Hello, world! I am a CommentBox.
      </div>
    );
  }
});
ReactDOM.render(
  <CommentBox />,
  document.getElementById('content')
);
*/
