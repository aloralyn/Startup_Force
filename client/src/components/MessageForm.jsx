import React from 'react';
import { connect } from 'react-redux'; 
import { sendMessage } from '../actions/messageActions.js';

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
    event.preventDefault()
    // dispatch send message action with payload this.state.input
    this.props.sendMessage(this.state.input, this.props.username);
    this.setState({ input: '' });
  }

  render() {
  	return(
     <form>
        <input 
          type="text" 
          placeholder="Chat with yourself!" 
          value={this.state.input} 
          onChange={this.handleChange} />
        <button onClick={this.handleSubmit}>Send</button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  username: state.users.user.username
});

export default connect(mapStateToProps, { sendMessage })(MessageForm);