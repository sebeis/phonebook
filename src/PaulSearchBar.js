import * as React from 'react';

var PaulSearchBar = React.createClass({
  getInitialState: function() {
    return {
    };
  },
  render: function() {
    return (
      <div className="PaulSearchBar">
        <input type="text" placeholder="Name oder Telefonnummer..."/>
      </div>
    );
  }
});
export default PaulSearchBar
