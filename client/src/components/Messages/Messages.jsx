import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { messageUser, getMessages, clearNotification, eraseNotification, countNotifications } from '../../actions/messageActions.js';
import MessageForm from './MessageForm.jsx';
import {
  Label,
  Button,
  Container,
  Grid,
  Header,
  Icon,
  Input,
  List,
  Menu,
  Responsive,
  Segment,
  Visibility,
} from 'semantic-ui-react';

export const nameFromId = (id, users) => {
  for (var i = 0; i < users.length; i++) {
  	if (users[i].id === id) { return users[i].preferred_name; }
  }
}

const timeFromDate = date => {
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
  return (hours + minutes + ' ' + period);
};

class Messages extends Component {
  constructor(props) {
  	super(props);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.messageUserId !== this.props.messageUserId) {
      this.props.getMessages(this.props.userId, this.props.messageUserId, nextProps.messageUserId, this.props.company_id);
    }
  }

  componentDidUpdate() {
  var messageDiv = document.getElementById('messages');
    if (messageDiv) {
      messageDiv.scrollTop = messageDiv.scrollHeight;
    }
  }

  render() {
    if (this.props.messageUserId) {
      return (<Container style={{ padding: '8em 0em' }}>
        <Grid container stackable divided>
          <Grid.Row>
            <Grid.Column width={6} style={{fontFamily: 'Titillium Web'}}>
              <Header style={{fontFamily: 'Titillium Web'}} as='h2'>{this.props.company.company_name} Employees</Header>
              <List style={{height: '400px', overflowY: 'scroll'}}>
                {this.props.users.map((user) => {
                  var notifications;
                  if (this.props.notifications && this.props.notifications[user.id]) {
                    notifications = countNotifications(this.props.notifications[user.id]);
                  } else { notifications = ''; }
                  if (user.id !== this.props.userId) {
                    return (
                      <List.Item key={user.id}>
                        <Button toggle
                          style={{fontFamily: 'Titillium Web'}}
                          active={user.id === this.props.messageUserId}
                          value={user.id.toString()}
                          onClick={(e) => {
                            let userToMessage = parseInt(e.target.value, 10)
                            this.props.messageUser(this.props.userId, userToMessage, notifications, this.props.company_id);
                          }}
                          >
                          {' ' + user.first_name + ' ' + user.last_name}
                        </Button>
                        {notifications ? 
                          <Label
                            circular={true}
                            color={user.id === this.props.user.reports_to ? 'red' : 'blue'}>
                            {notifications}
                          </Label>
                          :
                          <div></div>
                        }
                      </List.Item>)
                }
                })}
              </List>
            </Grid.Column>
            <Grid.Column width={8}>
              <Header style={{fontFamily: 'Titillium Web'}} as='h2'>Direct Messages with {nameFromId(this.props.messageUserId, this.props.users)}</Header>
              <div id='messages' style={{height: '400px', overflowY: 'scroll'}}>
              <List divided relaxed>
                {
                  this.props.messages.map((message, index) => {
                  if (message.name) {
                    return (<List.Item key={index}>
                      <b>{message.name + ' '}</b>
                      <em style={{fontSize: '10px'}}>{' ' + timeFromDate(message.time) + ', ' + message.time.slice(0, 10)}</em>
                      <br />{message.message}</List.Item>)
                  } else {
                    return (<List.Item key={index}>{message}</List.Item>)
                  }
                })}
              </List>
              </div>
              <Grid.Row>
                <MessageForm />
              </Grid.Row>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>)
    } else {
      return (<Container style={{ padding: '8em 0em' }}>
        <Grid container stackable>
          <Grid.Row>
            <Grid.Column width={6}>
              <Header style={{fontFamily: 'Titillium Web'}} as='h2'>{this.props.company.company_name} Employees</Header>
              <List style={{height: '400px', overflowY: 'scroll'}}>
                {this.props.users.map((user) => {
                  var notifications;
                  if (this.props.notifications && this.props.notifications[user.id]) {
                    notifications = countNotifications(this.props.notifications[user.id]);
                  } else { notifications = ''; } 
                  if (user.id !== this.props.userId) {
                    return (
                      <List.Item key={user.id}>
                        <Button 
                          style={{fontFamily: 'Titillium Web'}}
                          value={user.id.toString()}
                          onClick={(e) => {
                            let userToMessage = parseInt(e.target.value, 10)
                            this.props.messageUser(this.props.userId, userToMessage, notifications, this.props.company_id);
                          }}
                          >
                          {' ' + user.first_name + ' ' + user.last_name}
                        </Button>
                        {notifications ? 
                          <Label
                            circular={true}
                            color={user.id === this.props.user.reports_to ? 'red' : 'blue'}>
                            {notifications}
                          </Label>
                          :
                          <div></div>
                        }
                      </List.Item>)
                }
                })}
              </List>
            </Grid.Column>
            <Grid.Column width={8}>
            <div>
              {this.props.notificationCount ?
              <Icon.Group style={{display: 'block', margin: 'auto'}} size='huge'>
                <Icon style={{display: 'block', margin: 'auto'}} size='huge' loading name='sun' color='green' />
                <Icon style={{display: 'block', margin: 'auto'}} size='large' name='mail outline' />   
              </Icon.Group>
              :
              <Icon.Group style={{display: 'block', margin: 'auto'}} size='huge'>
                <Icon style={{display: 'block', margin: 'auto'}} size='large' name='mail outline' color='black' />   
              </Icon.Group>
              }
              <h1 style={{textAlign: 'center', fontFamily: 'Titillium Web'}}>You have {this.props.notificationCount} {this.props.notificationCount === 1 ? 'Message' : 'Messages'}
              {this.props.notificationCount === 0 ? <Icon name='frown' /> : '!'}
              </h1>
            </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>) 
    }
  }

}

const mapStateToProps = state => ({
  company: state.users.company,
  users: state.users.users,
  user: state.users.user,
  username: state.users.user.username,
  userId: state.users.user.id,
  messages: state.messages.messages,
  messageUserId: state.messages.messageUserId,
  company_id: state.users.user.company_id,
  notifications: state.messages.notifications,
  notificationCount: state.messages.notificationCount
});

export default withRouter(connect(mapStateToProps, { messageUser, getMessages, clearNotification, eraseNotification })(Messages));
