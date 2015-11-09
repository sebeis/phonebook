import * as React from 'react';
import PaulSearchResultItemBody from './PaulSearchResultItemBody'

var PaulSearchResultItem = React.createClass({
  propTypes: {
    person: React.PropTypes.object.isRequired,
    open: React.PropTypes.bool.isRequired,
    onToggle: React.PropTypes.func.isRequired
  },
  handleHeaderClick: function(e) {
    this.props.onToggle(this.props.person.id);
  },
  render: function() {
    var body;
    if(this.props.open) {
      body = (
        <PaulSearchResultItemBody person={this.props.person}/>
      );
    }
    var contactIcons = generateContactIcons(
      this.props.person.primaryPhone,
      this.props.person.primaryMail
    );

    return (
      <li className={'panel person ' + (this.props.open ? 'panel-primary' : '')}>
        <div className="panel-heading">
          {contactIcons}
          <h1 onClick={this.handleHeaderClick}>
            <span>{this.props.person.name}</span>
            <small>{this.props.person.primaryPhone}</small>
          </h1>
          <div className="clearfix"></div>
        </div>
        {body}
      </li>
    );
  }
});

function generateContactIcons(phone, mail) {
  return (
    <div className="btn-toolbar pull-right">
      {generatePhoneIcon(phone)}
      {generateMailIcon(mail)}
    </div>
  );
}

function generatePhoneIcon(phone) {
  var hasPhone = phone !== undefined;
  if(hasPhone) {
    return (
      <a className="btn btn-primary"
        href={"tel: " + phone}
        title="Anrufen" target="_blank">
        <i className="glyphicon glyphicon-phone-alt"></i>
      </a>
    );
  }
}
function generateMailIcon(mail) {
  var hasMail = mail !== undefined;
  if(hasMail) {
    return (
      <a className="btn btn-primary"
        href={"mailto: " + mail}
        title="E-Mail schreiben" target="_blank">
        <i className="glyphicon glyphicon-envelope"></i>
      </a>
    );
  }
}

export default PaulSearchResultItem
