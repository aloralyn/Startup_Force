import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { messageUser, getMessages } from '../actions/messageActions.js';
import MessageForm from './MessageForm.jsx';

export const nameFromId = (id, users) => {
  for (var i = 0; i < users.length; i++) {
  	if (users[i].id === id) { return users[i].name; }
  }
}

const timeFromDate = date => {
  //const now = new Date();
  let hours = parseInt(date.slice(16, 18));
  let period = 'am'
  if (hours >= 12) {
  	period = 'pm';
  }
  if (hours > 12) {
  	hours = hours % 12;
  }
  if (hours === 0) {
  	hours = 12;
  }
  let minutes = date.slice(18, 21);
  return (hours + minutes + period);
};

class Messages extends Component {
  constructor(props) {
  	super(props);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.messageUserId !== this.props.messageUserId) {
      this.props.getMessages(this.props.userId, nextProps.messageUserId);
    }
  }

  componentWillMount() {
  	//this.props.getMessages(this.props.userId, this.props.messageUserId);
  }

  render() {
  	if (this.props.messageUserId) {
	  	return ( <div>
	  	  <h2>Employees</h2>
	  	  <ul>
	        {this.props.users.map((user) => {
	          if (user.id !== this.props.userId) {
		          return (<li 
		          	key={user.id}
		          	value={user.id}
		          	onClick={(e) => {this.props.messageUser(e.target.value)}}
		          	>{user.name}</li>)
		      }
	        })}
	      </ul>
	      <h2>{nameFromId(this.props.userId, this.props.users)}'s messages with {nameFromId(this.props.messageUserId, this.props.users)}</h2>
	      <ul>
	        {this.props.messages.map((message, index) => {
	          if (message.name) {
	            return (<li key={index}>{message.name + ', ' + timeFromDate(message.time)}<br />{message.message}</li>)
	          } else {
	          	return (<li key={index}>{message}</li>)
	          }
	        })}
	      </ul>
	      <MessageForm />
	  	</div>)
	} else {
	  	return ( <div>
	  	  <h2>Employees</h2>
	  	  <ul>
	        {this.props.users.map((user) => {
	          if (user.id !== this.props.userId) {
		          return (<li 
		          	key={user.id}
		          	value={user.id}
		          	onClick={(e) => {this.props.messageUser(e.target.value)}}
		          	>{user.name}</li>)
		      }
	        })}
	      </ul>
	  	</div>)	
	}
  }
}

const mapStateToProps = state => ({
  users: state.users.users,
  username: state.users.user.username,
  userId: state.users.user.id,
  messages: state.messages.messages,
  messageUserId: state.messages.messageUserId
});

export default withRouter(connect(mapStateToProps, { messageUser, getMessages })(Messages));