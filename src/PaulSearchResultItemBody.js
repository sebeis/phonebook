import * as React from 'react';

var PaulSearchResultItemBody = React.createClass({
  propTypes: {
    person: React.PropTypes.object.isRequired
  },
  render: function() {
    return (
      <div className="panel-body">
        <img
          className="media-object img-thumbnail"
          src={this.props.person.imageUrl} />
        {generatePhonesBlock(this.props.person.phone)}
        {generateMailsBlock(this.props.person.mail)}
      </div>
    );
  }
});

function generatePhonesBlock(phones) {
  return generateContactBlock('Telefon', phones, (phone) =>
    <li key={phone}><a href={"tel: " + phone}>{phone}</a></li>
  );
}

function generateMailsBlock(mails) {
  return generateContactBlock('E-Mail', mails, (mail) =>
    <li key={mail}><a href={"mailto: " + mail}>{mail}</a></li>
  );
}

function generateContactBlock(name, contacts, generatorFunction) {
  if(contacts.length > 0) {
    return (
      <div>
        <h2>{name}</h2>
        <ul>
          {contacts.map(generatorFunction)}
        </ul>
      </div>
    );
  }
}

export default PaulSearchResultItemBody
