import * as React from 'react';

var PaulSearchResultItemBody = React.createClass({
  propTypes: {
    person: React.PropTypes.object.isRequired
  },
  render: function() {
    var phones;
    var mails;
    if(this.props.person.hasPhone) {
      phones = (
        <div>
        <h2>Telefon</h2>
        <ul>
          {this.props.person.phone.map((phone) =>
            <li key={phone}><a href={"tel: " + phone}>{phone}</a></li>
          )}
        </ul>
        </div>
      );
    }
    if(this.props.person.hasMail) {
      mails = (
        <div>
        <h2>E-Mail</h2>
        <ul>
          {this.props.person.mail.map((mail) =>
            <li key={mail}><a href={"mailto: " + mail}>{mail}</a></li>
          )}
        </ul>
        </div>
      );
    }
    return (
      <div className="panel-body">
        <img className="media-object img-thumbnail" src={this.props.person.imageUrl} />
        {phones}
        {mails}
      </div>
    );
  }
});
export default PaulSearchResultItemBody
