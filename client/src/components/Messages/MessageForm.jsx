import React from 'react';
import { connect } from 'react-redux'; 
import { sendMessage } from '../../actions/messageActions.js';
import { nameFromId } from './Messages.jsx';

class MessageForm extends React.Component {
  constructor(props) {
  	super(props);
  	this.state = {
      input: ''
  	};
  	this.handleChange = this.handleChange.bind(this);
  	this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ input: event.target.value });
  }

  handleSubmit(event) {
    const time = new Date().toString();
    event.preventDefault()
    this.props.sendMessage(this.state.input, time, nameFromId(this.props.userId, this.props.users), this.props.userId, this.props.messageUserId);
    this.setState({ input: '' });
  }

  render() {
  	return(
     <form>
        <input 
          type="text" 
          placeholder="Type a message!" 
          value={this.state.input} 
          onChange={this.handleChange} />
        <button onClick={this.handleSubmit}>Send</button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  users: state.users.users,
  username: state.users.user.username,
  userId: state.users.user.id,
  messageUserId: state.messages.messageUserId
});

export default connect(mapStateToProps, { sendMessage })(MessageForm);