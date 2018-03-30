import React, { Component } from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login } from '../../actions/dashboardActions.js';
import axios from 'axios';

import {
  Button,
  Container,
  Grid,
  Header,
  Icon,
  Input,
  Image,
  List,
  Menu,
  Modal,
  Responsive,
  Segment,
  Visibility,
  Form
} from 'semantic-ui-react';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      pw: ''
    };
    this.changeEmail = this.changeEmail.bind(this);
    this.changePw = this.changePw.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.secret = this.secret.bind(this);
  }

  changeEmail(event) {
    this.setState({ email: event.target.value });
  }

  changePw(event) {
    this.setState({ pw: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.login(this.state);
    this.setState({ email: '', pw: '' });
  }

  secret() {
    // axios.defaults.headers.common['Authorization'] = 'JWT ' + localStorage.getItem('jwtToken');
    let token = localStorage.getItem('authToken');
    let config = {
      headers: {
        Authorization: 'JWT ' + token
      }
    }
    axios.get('/secret', config)
      .then((response) => {
        console.log('shhhh')
        console.log(response)
      })
      .catch((err) => {
        console.log('There was an error', err)
      });
  }

  render() {
    return(
      <Modal trigger={<Button>Login</Button>} basic size='small' closeIcon>
      <div className='login-form'>
      <style>{`
      body > div,
      body > div > div,
      body > div > div > div.login-form {
        height: 100%;
      }
    `}</style>

      <Grid
      textAlign='center'
      style={{ height: '100%' }}
      verticalAlign='middle'
     >
      <Grid.Column style={{ maxWidth: 450 }}>
        <Form size="large">
        
          <Segment stacked>
          <Header>Log into your account</Header>
            <Form.Input
              fluid
              icon='user'
              label='Email' 
              name='email' 
              placeholder='Email'
              onChange={this.changeEmail} />
            <Form.Input 
              fluid
              icon='lock'
              type='password'
              label='Password' 
              name='pw'
              placeholder='Password' 
              onChange={this.changePw} />
          <Button
            type='submit' 
            onClick={this.handleSubmit}>Login</Button>
            </Segment>
        </Form>
     
      </Grid.Column>
      </Grid>
      </div>
      </Modal>
      );
  }
}

const mapStateToProps = state => ({
  
});

export default withRouter(connect(mapStateToProps, { login })(Login));