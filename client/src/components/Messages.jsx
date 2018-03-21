import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { messageUser, getMessages } from '../actions/messageActions.js';
import MessageForm from './MessageForm.jsx';

class Messages extends Component {
  constructor(props) {
  	super(props);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.username !== this.props.username) {
      this.props.getMessages(nextProps.username);
    }
  }

  componentWillMount() {
  	this.props.getMessages(this.props.username);
  }

  render() {
  	if (this.props.messageUserId) {
	  	return ( <div>
	  	  <h2>Employees</h2>
	  	  <ul>
	        {this.props.users.map((user) => {
	          return (<li 
	          	key={user.id}
	          	value={user.id}
	          	onClick={(e) => {this.props.messageUser(e.target.value)}}
	          	>{user.name}</li>)
	        })}
	      </ul>
	      <h2>Leanne's Notes to Leanne{/* reference name? this.props.messageUser*/}</h2>
	      <ul>
	        {this.props.messages.map((message, index) => {
	          return (<li key={index}>{message}</li>)
	        })}
	      </ul>
	      <MessageForm />
	  	</div>)
	} else {
	  	return ( <div>
	  	  <h2>Employees</h2>
	  	  <ul>
	        {this.props.users.map((user) => {
	          return (<li 
	          	key={user.id}
	          	value={user.id}
	          	onClick={(e) => {this.props.messageUser(e.target.value)}}
	          	>{user.name}</li>)
	        })}
	      </ul>
	  	</div>)	
	}
  }
}

const mapStateToProps = state => ({
  users: state.users.users,
  username: state.users.user.username,
  messages: state.messages.messages,
  messageUserId: state.messages.messageUserId
});

export default withRouter(connect(mapStateToProps, { messageUser, getMessages })(Messages));