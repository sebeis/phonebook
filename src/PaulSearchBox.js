import * as React from 'react';
import PaulSearchBar from './PaulSearchBar'

var PaulSearchBox = React.createClass({
  getInitialState: function() {
    return {
    };
  },
  render: function() {
    return (
      <div className="PaulSearchBox">
        <PaulSearchBar />
        <h2>Searchresults here</h2>
      </div>
    );
  }
});
export default PaulSearchBox
