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
  handleSearchInputAsync: function(text) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.setState({matches: LookupService.getMatches(text)});
        resolve();
      },0);
    });
  },
  render: function() {
    return (
      <div className="PaulSearchBox">
        <PaulSearchBar
          handleSearchInputAsync={this.handleSearchInputAsync}/>
        <PaulSearchResults matches={this.state.matches}/>
      </div>
    );
  }
});
export default PaulSearchBox
