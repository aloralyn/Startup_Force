import React, { Component } from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addEmployee } from '../../actions/onboardingActions.js';

import {
  Button,
  Container,
  Form,
  Grid,
  Header,
  Input,
  Select,
  Segment
} from 'semantic-ui-react';

const style = {
  h1: {
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

 class SignUpForm extends Component {
   constructor(props) {
     super(props);

     this.state = {
      company_id: 1,
      first_name: '',
      last_name: '',
      preferred_name: '',
      dob: '',
      ssn: '',
      gender: '',
      street_1: '',
      street_2: '',
      city: '',
      zip_code: '',
      state: '',
      email: '',
      phone_number: '',
      linkedin_url: '',
      position: '',
      employee_status: '',
      start_date: '',
      department: '',
      division: '',
      reports_to: '',
      wage: '',
      pay_per: '',
      pay_type: '',
      is_manager: '',
      pw: ''
     }
     
     this.handleChange = this.handleChange.bind(this);
     this.handleSubmit = this.handleSubmit.bind(this);
     this.handleFrequency = this.handleFrequency.bind(this); 
   }

   handleChange(e, name) {
     if (e.target !== undefined) {
      this.setState({
      [e.target.name]: e.target.value
      });
     } else {
       this.setState({
         [name]: e
       });
     }
   }
   
   handleSubmit(e) {
     e.preventDefault();
    // console.log(this.state)
     this.props.addEmployee(this.state)
   }

   handleFrequency(value) {
    this.setState({
      frequency: value
    });
  }

  render() {
    return (
      <Container style={{ padding: '8em 0em' }}>
        <Header
          as='h3'
          content='Sign up for your free Startup Force account!'
          textAlign='center'
          style={style.h3}
        />
        <Grid columns={2} stackable>
        <Form>
          <Form.Group widths='equal' maxLength="2">
            <Form.Field control={Input} label='Department' name='name' onChange={this.handleChange} />
            <Form.Field control={Input} label='Division' name='division' onChange={this.handleChange} />
          </Form.Group>
          <Form.Field control={Button} type='submit' onClick={this.handleSubmit}>Add</Form.Field>
        </Form>
          <Grid.Column>
            <Segment>Content</Segment>
          </Grid.Column>
          <Grid.Row columns={3}>
            <Grid.Column>
              <Segment>Content</Segment>
            </Grid.Column>
            <Grid.Column>
              <Segment>Content</Segment>
            </Grid.Column>
            <Grid.Column>
              <Segment>Content</Segment>
            </Grid.Column>
          </Grid.Row>
          <Grid.Column width={10}>
            <Segment>Content</Segment>
          </Grid.Column>
          <Grid.Column width={6}>
            <Segment>Content</Segment>
          </Grid.Column>
        </Grid>
      </Container> 
    )
  }
}

SignUpForm.propTypes = {
  addEmployee: PropTypes.func.isRequired
}

export default withRouter(connect(null, { addEmployee })(SignUpForm));
