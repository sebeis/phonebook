import * as React from 'react';
import PaulSearchResultItem from './PaulSearchResultItem';

var PaulSearchResults = React.createClass({
  getInitialState: function() {
    return {
      matches: [],
      openItem: null
    }
  },
  handleOpenResultItem: function(id) {
    this.setState({openItem: id});
  },
  updateMatches: function(matches) {
    this.setState({matches: prepareResults(matches)});
  },
  render: function() {
    var content = this.state.matches.map(
      person => <PaulSearchResultItem
        person={person}
        key={person.id}
        open={person.id == this.state.openItem}
        onOpen={this.handleOpenResultItem}/>
    );
    return (
      <div className="PaulSearchResults">
        {content}
      </div>
    );
  }
});
export default PaulSearchResults

function prepareResults (results) {
  results.forEach(preparePerson);
  return results;
}

function preparePerson (person) {
  preparePhoneNumbers(person);
  prepareMailAddresses(person);
}

function preparePhoneNumbers (person) {
  removeEmptyPhoneNumbers(person);
  setPrimaryPhoneNumber(person);
}

function removeEmptyPhoneNumbers (person) {
  person.phone = person.phone.filter(function (phone) {
    return phone.length > 0;
  });
}

function setPrimaryPhoneNumber (person) {
  if (person.phone.length > 0) {
    person.hasPhone = true;
    person.primaryPhone = person.phone[0];
  }
}

function prepareMailAddresses (person) {
  removeEmptyMailAddresses(person);
  setPrimaryMailAddress(person);
}

function removeEmptyMailAddresses (person) {
  person.mail = person.mail.filter(function (mail) {
    return mail.length > 0;
  });
}

function setPrimaryMailAddress (person) {
  if (person.mail.length > 0) {
    person.hasMail = true;
    person.primaryMail = person.mail[0];
  }
}
