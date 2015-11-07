import * as React from 'react';
import * as _ from 'lodash';

var PaulSearchBar = React.createClass({
  propTypes: {
    handleSearchInput: React.PropTypes.func.isRequired
  },
  handleInput: _.debounce(function(e) {
    this.props.handleSearchInput(this.refs.searchInput.value);
  }, 400),
  render: function() {
    return (
      <div className="PaulSearchBar">
        <input
          type="text"
          placeholder="Name oder Telefonnummer..."
          ref="searchInput"
          onChange={this.handleInput}/>
      </div>
    );
  }
});

export default PaulSearchBar
