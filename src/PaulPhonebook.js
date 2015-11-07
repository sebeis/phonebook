import * as React from 'react';
import PaulLoginForm from './PaulLoginForm';
import PaulSearchBox from './PaulSearchBox';

var PaulPhonebook = React.createClass({
  handleSuccessfullLoginAndData: function(data) {
    this.setState({
      isLoggedIn: true,
      data: data
    });
  },
  getInitialState: function() {
    return {
      isLoggedIn: false,
      data: []
    };
  },
  render: function() {
    if(this.state.isLoggedIn) {
      return (
        <PaulSearchBox data={this.state.data}/>
      );
    } else {
      return(
        <PaulLoginForm className="PaulPhonebook"
          handleSuccessfullLoginAndData={this.handleSuccessfullLoginAndData}/>
      );
    }
  }
});
export default PaulPhonebook
