import * as React from 'react';
import PaulSearchBar from './PaulSearchBar'

var PaulSearchBox = React.createClass({
  propTypes: {
    data: React.PropTypes.array.isRequired
  },
  getInitialState: function() {
    return {
    };
  },
  handleSearchInput: function(text) {
    console.log(this.props.data, text);
  },
  render: function() {
    return (
      <div className="PaulSearchBox">
        <PaulSearchBar handleSearchInput={this.handleSearchInput}/>
        <h2>Searchresults here</h2>
      </div>
    );
  }
});
export default PaulSearchBox
