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
      hasLoginFailed: false,
      errorMessage: ''
    }
  },
  componentWillMount: function() {
    let canUseStorage = CredentialStorageService.canStoreCredentials;
    if(canUseStorage && CredentialStorageService.hasStoredCredentials()) {
      this.tryLogin(CredentialStorageService.getStoredCredentials(), true);
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
        <p className="alert alert-danger">{this.state.errorMessage}</p>
      );
    }
    return (
      <form role="form" ng-submit="login()" onSubmit={this.handleSubmit}>
        {warning}
        <div className="form-group">
          <label htmlFor="username">Benutzername</label>
          <input
            className="form-control"
            type="text" ref="username"
            name="username"
            defaultValue={CredentialStorageService.getStoredCredentials().username}/>
        </div>
        <div className="form-group">
          <label htmlFor="password">Passwort</label>
          <input
            className="form-control"
            type="password"
            ref="password"
            name="password"
            defaultValue={CredentialStorageService.getStoredCredentials().password}/>
        </div>
        <button className="btn btn-default" type="submit">Anmelden</button>
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
  tryLogin: function(credentials, useHash) {
    return DataRetrievalService.sendCredentialsAsync(credentials.username, credentials.password, useHash)
      .then((response) => {
        CredentialStorageService.storeCredentials({
          username: credentials.username,
          password: response['pw-hash'],
        });
        this.props.handleSuccessfullLoginAndData(response);
      }, (response) => {
        let unAuthorized = response.status == 401;
        if(unAuthorized) {
          this.setState({
            isVisible: true,
            hasLoginFailed: true,
            errorMessage: 'Unbekannter Benutzername oder falsches Passwort!'
          });
        } else {
          this.setState({
            isVisible: true,
            hasLoginFailed: true,
            errorMessage: 'Unbekannter Fehler, bitte melde dich beim Ressort IT'
          });
        }

      }
    );
  }
});

export default PaulLoginForm
