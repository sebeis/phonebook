import * as React from 'react';
import * as _ from 'lodash';

var PaulSearchBar = React.createClass({
  propTypes: {
    handleSearchInputAsync: React.PropTypes.func.isRequired,
  },
  getInitialState: function() {
    return {
      isLoading: false
    }
  },
  handleInput: _.debounce(function(e) {
    if(this.refs.searchInput.value.length > 3) {
      this.setState({isLoading: true});
      this.props.handleSearchInputAsync(this.refs.searchInput.value)
        .then(() => {
          this.setState({isLoading: false});
        });
    }
  }, 350),
  render: function() {
    let loadingIcon;
    if(this.state.isLoading) {
      loadingIcon = (
        <span className="input-group-addon loading-indicator">
          <i className="glyphicon glyphicon-refresh"></i>
        </span>
      );
    }
    return (
      <div className="input-group input-group-lg">
        <span className="input-group-addon">
          <i className="glyphicon glyphicon-search"></i>
        </span>
        <input type="text"
          className="form-control"
          placeholder="Name oder Telefonnummer..."
          ref="searchInput"
          onChange={this.handleInput} />
        {loadingIcon}
      </div>
    );
  }
});

export default PaulSearchBar
