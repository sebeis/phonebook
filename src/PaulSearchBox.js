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
      matches: []
    };
  },
  componentDidMount: function() {
    LookupService.setData(this.props.data);
  },
  handleSearchInput: function(text) {
    this.setState({matches: LookupService.getMatches(text)});
  },
  render: function() {
    return (
      <div className="PaulSearchBox">
        <PaulSearchBar
          handleSearchInput={this.handleSearchInput}/>
        <PaulSearchResults matches={this.state.matches}/>
      </div>
    );
  }
});
export default PaulSearchBox
