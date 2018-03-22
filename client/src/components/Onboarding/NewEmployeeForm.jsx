import React, { Component } from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addEmployee } from '../../actions/onboardingActions.js';

import {
  Button,
  Form,
  Grid,
  Header,
  Input,
  Select
} from 'semantic-ui-react';

const genderOptions = [
  { key: 'm', text: 'Male', value: 'male' },
  { key: 'f', text: 'Female', value: 'female' },
];

const employStatOptions = [
  { text: 'Full-time', value: 'full-time' },
  { text: 'Part-time', value: 'part-time' },
  { text: 'Contractor', value: 'contractor' },
  { text: 'Intern', value: 'intern' },
  { text: 'Terminated', value: 'terminated' }
];

const divisionOptions = [
  //Note that this will need to be populted with divisions by department
  { text: 'West Coast', value: 'west coast' },
  { text: 'East Coast', value: 'east coast' },
];

const payTypeOptions = [
  { text: 'Salary', value: 'salary' },
  { text: 'Hourly', value: 'hourly' },
  { text: 'Commission', value: 'commission' },
  { text: 'Contract', value: 'contract' },
  { text: 'Bonus', value: 'bonus' }
];

const payScheduleOptions = [
  { text: 'Daily', value: 'daily' },
  { text: 'Weekly', value: 'weekly' },
  { text: 'Every other week', value: 'every other week' },
  { text: 'Monthly', value: 'monthly' }
];

 class NewEmployeeForm extends Component {
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
      pay_type: ''
     }
     
     this.handleChange = this.handleChange.bind(this);
     this.handleSubmit = this.handleSubmit.bind(this);
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
     this.props.addEmployee(this.state)
   }

  render() {
    return (
      <Grid.Column width={8} >
        <Header size='large'>Add an Employee</Header>
        <Form>
          <Form.Group widths='equal'>
            <Form.Field control={Input} label='First name' name='first_name' placeholder='First name' onChange={this.handleChange}/>
            <Form.Field control={Input} label='Last name' name='last_name' placeholder='Last name' onChange={this.handleChange}/>
            <Form.Field control={Input} label='Preferred name' name='preferred_name' placeholder='Preferred name' onChange={this.handleChange} />
          </Form.Group>
          <Form.Group widths='equal'>
            <Form.Field control={Input} label='DOB' name='dob' placeholder='MM/DD/YYYY' onChange={this.handleChange} />
            <Form.Field control={Input} label='SSN' name='ssn' placeholder='SSN#' onChange={this.handleChange} />
            <Form.Field control={Select} label='Gender' options={genderOptions} name='gender' placeholder='Gender' onChange={(e, {value, name}) => {this.handleChange(value, name)}}/>
          </Form.Group>
        <Header size='small'>Home Address</Header>
          <Form.Group widths='equal'>
            <Form.Field control={Input} label='Street 1' name='street_1' placeholder='Street 1' onChange={this.handleChange} />
            <Form.Field control={Input} label='Street 2' name='street_2' placeholder='Street 2'onChange={this.handleChange} />
          </Form.Group>
          <Form.Group widths='equal'>
            <Form.Field control={Input} label='City' name='city' placeholder='City' onChange={this.handleChange}/>
            <Form.Field control={Input} label='Zip Code' name='zip_code' placeholder='Zip Code' onChange={this.handleChange} />
            <Form.Field control={Input} label='State' name='state' placeholder='State' onChange={this.handleChange} />
          </Form.Group>
        <Header size='small'>Contact Info</Header>
          <Form.Group widths='equal'>
            <Form.Field control={Input} label='Email Address' name='email' placeholder='Email Address' onChange={this.handleChange}/>
            <Form.Field control={Input} label='Phone Number' name='phone_number' placeholder='Phone Number' onChange={this.handleChange}/>
            <Form.Field control={Input} label='LinkedIn Profile URL' name='linkedin_url' placeholder='LinkedIn Profile URL' onChange={this.handleChange}/>
          </Form.Group>
        <Header size='small'>Employee Status</Header>
          <Form.Group widths='equal'>
            <Form.Field control={Input} label='Position/Title' name='position' placeholder='Position/Title' onChange={this.handleChange} />
            <Form.Field control={Select} label='Employee Status' options={ employStatOptions } name='employee_status' placeholder='Full-time' onChange={(e, {value, name}) => {this.handleChange(value, name)}} />
          </Form.Group>
          <Form.Group widths='equal'>
            <Form.Field control={Input} label='Start Date' name='start_date' placeholder='Start Date' onChange={this.handleChange} />
            <Form.Field control={Input} label='Reports to' name='reports_to' placeholder='Reports to' onChange={this.handleChange}/>
          </Form.Group>
          <Form.Group widths='equal'>
            <Form.Field control={Input} label='Department' name='department' placeholder='Department' onChange={this.handleChange}/>
            <Form.Field control={Select} label='Division' options={ divisionOptions } name='division' placeholder='Placeholder Divs' onChange={(e, {value, name}) => {this.handleChange(value, name)}} />
          </Form.Group>
          <Header size='small'>Compensation</Header>
          <Form.Group widths='equal'>
            <Form.Field control={Input} label='Compensation' name='wage' placeholder='Compensation' onChange={this.handleChange} />
            <Form.Field control={Select} label='Pay Per' options={ payScheduleOptions } name='pay_per' placeholder='Every other week' onChange={(e, {value, name}) => {this.handleChange(value, name)}}/>  
          </Form.Group>
          <Form.Group>
            <Form.Field control={Select} label='Pay Type' options={ payTypeOptions } name='pay_type' placeholder='Salary' onChange={(e, {value, name}) => {this.handleChange(value, name)}}/>
          </Form.Group>
          <Form.Field control={Button} type='submit' onClick={this.handleSubmit}>Update</Form.Field>
        </Form>
      </Grid.Column> 
    )
  }
}

NewEmployeeForm.propTypes = {
  addEmployee: PropTypes.func.isRequired
}

export default withRouter(connect(null, { addEmployee })(NewEmployeeForm));
