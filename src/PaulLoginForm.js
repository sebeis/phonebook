import * as React from 'react';
import * as DataRetrievalService from './DataRetrievalService'
import CredentialStorageService from './CredentialStorageService'

var PaulLoginForm = React.createClass({
  propTypes: {
    handleSuccessfullLoginAndData: React.PropTypes.func.isRequired
  },
  getInitialState: function() {
    return {
      isVisible: false,
      hasLoginFailed: false
    }
  },
  componentWillMount: function() {
    let canUseStorage = CredentialStorageService.canStoreCredentials;
    if(canUseStorage && CredentialStorageService.hasStoredCredentials()) {
      this.tryLogin(CredentialStorageService.getStoredCredentials);
    } else {
      this.setState({isVisible:true});
    }
  },
  render: function() {
    if(!this.state.isVisible) {
      return null;
    }
    let warning;
    if(this.state.hasLoginFailed) {
      warning = (
        <h1>Failed</h1>
      );
    }
    return (
      <form className="PaulLoginForm" onSubmit={this.handleSubmit}>
        {warning}
        <input type="text" placeholder="Dein LDAP Name" ref="username" />
        <input type="password" placeholder="Passwort" ref="password" />
        <input type="submit" value="Login" />
      </form>
    );
  },
  handleSubmit: function(e) {
    e.preventDefault();
    this.tryLogin({
      username: this.refs.username.value,
      password: this.refs.password.value
    });
  },
  tryLogin: function(credentials) {
    DataRetrievalService.sendCredentialsAsync(credentials.username, credentials.password)
      .then((response) => {
        this.props.handleSuccessfullLoginAndData(response);
      }, (response) => {
        this.setState({
          isVisible: true,
          hasLoginFailed: true
        });
      }
    );
  }
});

export default PaulLoginForm
