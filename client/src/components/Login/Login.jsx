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
  Responsive,
  Segment,
  Visibility,
  Form
} from 'semantic-ui-react';

const style = {
  h1: {
    fontFamily: 'Titillium Web',
    marginTop: '3em',
  },
  h2: {
    margin: '4em 0em 2em',
  },
  h3: {
    marginTop: '2em',
    padding: '2em 0em',
  },
  last: {
    marginBottom: '300px',
  }
};

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
    return(<Container style={{ padding: '8em 0em' }}>
      <Header
        as='h1'
        content='StartupForce'
        textAlign='center'
        style={style.h1}
      />
      <Header
        as='h3'
        content='Login to your account!'
        textAlign='center'
        style={style.h3}
      />
      <Grid columns={2} stackable textAlign='center' verticalAlign='middle'>
      <Form>
        <Form.Group widths='equal' maxLength="2">
          <Form.Field 
            control={Input} 
            label='Email' 
            name='email' 
            placeholder='Email'
            onChange={this.changeEmail} />
          <Form.Field 
            control={Input} 
            type='password'
            label='Password' 
            name='pw'
            placeholder='Password' 
            onChange={this.changePw} />
        </Form.Group>
        <Form.Field 
          control={Button} 
          type='submit' 
          onClick={this.handleSubmit}>Login</Form.Field>
      </Form>
      </Grid>
        {/*<button onClick={this.secret}>Secret</button>*/}
    </Container>);
  }
}

const mapStateToProps = state => ({
  
});

export default withRouter(connect(mapStateToProps, { login })(Login));