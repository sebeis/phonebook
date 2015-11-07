import * as React from 'react';
import PaulSearchResultItemBody from './PaulSearchResultItemBody'

var PaulSearchResultItem = React.createClass({
  propTypes: {
    person: React.PropTypes.object.isRequired,
    open: React.PropTypes.bool.isRequired,
    onOpen: React.PropTypes.func.isRequired
  },
  handleHeaderClick: function(e) {
    this.props.onOpen(this.props.person.id);
  },
  render: function() {
    var body;
    if(this.props.open) {
      body = (
        <PaulSearchResultItemBody person={this.props.person}/>
      );
    }
    return (
      <li className="PaulSearchResultItem" className="panel person">
        <div className="panel-heading">
          <div className="btn-toolbar pull-right">
            <a className="btn btn-primary"
              href={"tel: " + this.props.person.primaryPhone}
              title="Anrufen" target="_blank">
              <i className="glyphicon glyphicon-phone-alt"></i>
            </a>
            <a className="btn btn-primary"
              href={"mailto: " + this.props.person.primaryMail}
              title="E-Mail schreiben" target="_blank">
              <i className="glyphicon glyphicon-envelope"></i>
            </a>
          </div>
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
export default PaulSearchResultItem
