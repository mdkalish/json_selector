import React, { Component } from 'react';
import Item from './components/item.js'

// export default class App extends Component {
var App = React.createClass({
  render: function() {
    return (
      <div>
        <h1>Hello, world kóp.</h1>
        <Item />
      </div>
    );
  }
});

module.exports = App;
// }
