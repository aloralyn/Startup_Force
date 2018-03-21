import React, { Component } from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addDepartment } from '../actions/onboardingActions.js';

import {
  Button,
  Form,
  Grid,
  Header,
  Input
} from 'semantic-ui-react';



class NewDepartmentForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      division: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.addDepartment(this.state);
  }


  render() {
    return (
      <Grid.Column width={8} >
        <Header size='large'>Add an Employee</Header>
        <Form>
          <Form.Group widths='equal'>
            <Form.Field control={Input} label='Department' name='name' onChange={this.handleChange} />
            <Form.Field control={Input} label='Division' name='division' onChange={this.handleChange} />
          </Form.Group>
          <Form.Field control={Button} type='submit' onClick={this.handleSubmit}>Add</Form.Field>
        </Form>
      </Grid.Column>
    )
  }
}

NewDepartmentForm.propTypes = {
  addDepartment: PropTypes.func.isRequired
}

export default withRouter(connect(null, { addDepartment })(NewDepartmentForm));
