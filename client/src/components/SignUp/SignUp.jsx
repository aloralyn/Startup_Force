import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createCompany } from '../../actions/newCompanyActions.js';
import { handleChange } from '../../actions/formChangeActions.js';

import {
  Button,
  Container,
  Form,
  Grid,
  Header,
  Input
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
     
     this.handleSubmit = this.handleSubmit.bind(this);
   }

   handleSubmit(e) {
    let company = {
      company_name: this.props.company_name,
      website: this.props.website,
      street_1: this.props.street_1,
      street_2: this.props.street_2,
      zip_code: this.props.zip_code,
      state: this.props.state
    }
    let admin = {
      first_name: this.props.first_name,
      last_name: this.props.last_name,
      email: this.props.email,
      pw: this.props.pw
    }
    e.preventDefault();;
    this.props.createCompany(company, admin)
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
        <Grid columns={2} width={30}>

        <Form>
          <Form.Group widths='equal'>
            <Form.Field control={Input} label='Company Name' name='company_name' onChange={(e) => {this.props.handleChange(e.target.name, e.target.value)}} />
            <Form.Field control={Input} label='Website URL' name='website' onChange={(e) => {this.props.handleChange(e.target.name, e.target.value)}} />
          </Form.Group>
        </Form>
  
        <Form>
          <Form.Group widths='equal'>
            <Form.Field control={Input} label='Street 1' name='street_1' onChange={(e) => {this.props.handleChange(e.target.name, e.target.value)}} />
            <Form.Field control={Input} label='Street 2' name='street_2' onChange={(e) => {this.props.handleChange(e.target.name, e.target.value)}} />
            <Form.Field control={Input} label='Zip Code' name='zip_code' onChange={(e) => {this.props.handleChange(e.target.name, e.target.value)}} />
            <Form.Field control={Input} label='State' name='state' onChange={(e) => {this.props.handleChange(e.target.name, e.target.value)}} />
          </Form.Group>
        </Form>

        <Form>
          <Form.Group widths='equal'>
            <Form.Field control={Input} label='First Name' name='first_name' onChange={(e) => {this.props.handleChange(e.target.name, e.target.value)}} />
            <Form.Field control={Input} label='Last Name' name='last_name' onChange={(e) => {this.props.handleChange(e.target.name, e.target.value)}} />
            <Form.Field control={Input} label='Email' name='email' onChange={(e) => {this.props.handleChange(e.target.name, e.target.value)}} />
            <Form.Field control={Input} label='Password' name='pw' onChange={(e) => {this.props.handleChange(e.target.name, e.target.value)}} />
          </Form.Group>
          <Form.Field control={Button} type='submit' onClick={this.handleSubmit}>Submit</Form.Field>
        </Form>
        </Grid>

      </Container> 
    )
  }
}


const mapStateToProps = state => ({
  company_name: state.newCompanyReducer.company_name,
  website: state.newCompanyReducer.website,
  street_1: state.newCompanyReducer.street_1,
  street_2: state.newCompanyReducer.street_2,
  zip_code: state.newCompanyReducer.zip_code,
  state: state.newCompanyReducer.state,
  first_name: state.newCompanyReducer.first_name,
  last_name: state.newCompanyReducer.last_name,
  email: state.newCompanyReducer.email,
  pw: state.newCompanyReducer.pw
})

SignUpForm.propTypes = {
  handleChange: PropTypes.func.isRequired,
  createCompany: PropTypes.func.isRequired,
}

export default withRouter(connect(mapStateToProps, { createCompany, handleChange })(SignUpForm));
