import * as React from 'react';
import PaulSearchBar from './PaulSearchBar'
import LookupService from './LevenshteinLookupService'

var PaulSearchBox = React.createClass({
  propTypes: {
    data: React.PropTypes.array.isRequired
  },
  getInitialState: function() {
    return {
    };
  },
  componentDidMount: function() {
    LookupService.setData(this.props.data);
  },
  handleSearchInput: function(text) {
    var matches = LookupService.getMatches(text);
    console.log(matches);
  },
  render: function() {
    return (
      <div className="PaulSearchBox">
        <PaulSearchBar
          handleSearchInput={this.handleSearchInput}/>
        <h2>Searchresults here</h2>
      </div>
    );
  }
});
export default PaulSearchBox
