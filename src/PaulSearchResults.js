import * as React from 'react';
import PaulSearchResultItem from './PaulSearchResultItem';

var PaulSearchResults = React.createClass({
  propTypes: {
    matches: React.PropTypes.array.isRequired
  },
  getInitialState: function() {
    return {
      openItem: null
    }
  },
  handleToggleResultItem: function(id) {
    if(this.state.openItem == id) {
      this.setState({openItem: null});
    } else {
      this.setState({openItem: id});
    }
  },
  render: function() {
    var matches = prepareResults(this.props.matches);
    var results = matches.map(
      person => <PaulSearchResultItem
        person={person}
        key={person.id}
        open={person.id == this.state.openItem}
        onToggle={this.handleToggleResultItem}/>
    );
    let matchesExist = matches.length > 0;
    let info;
    if(!matchesExist) {
      info = (
        <div className="alert alert-info">
          <h1>Willkommen im PAUL-Telefonbuch</h1>
          <p>Hier kannst Du Telefonnummern und E-Mail-Adressen von Paulis und Kunden einfach und schnell finden.</p>
          <p>Gib dazu mindestens drei Zeichen ein! Die Suche verzeiht Dir auch kleine Fehler.</p>
          <p>Pro-Tipp: Du kannst auch Telefonnummern rückwärts suchen. (-;</p>
        </div>
      );
    }
    return (
      <div className="PaulSearchResults">
        {info}
        <ul className="results">
          {results}
        </ul>
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
