import * as React from 'react';
import PaulSearchBar from './PaulSearchBar'
import PaulSearchResults from './PaulSearchResults'
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
    this.refs.results.updateMatches(matches);
  },
  render: function() {
    return (
      <div className="PaulSearchBox">
        <PaulSearchBar
          handleSearchInput={this.handleSearchInput}/>
        <PaulSearchResults ref="results"/>
      </div>
    );
  }
});
export default PaulSearchBox
