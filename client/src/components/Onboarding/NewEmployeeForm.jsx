import React, { Component } from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addEmployee } from '../../actions/onboardingActions.js';
import { handleChange } from '../../actions/formChangeActions.js';
import { _ } from 'underscore';

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

const managerCred = [
  { text: 'true', value: true },
  { text: 'false', value: false },
]

 class NewEmployeeForm extends Component {
   constructor(props) {
     super(props);

     this.handleSubmit = this.handleSubmit.bind(this);
     this.handleFrequency = this.handleFrequency.bind(this); 
     this.testClick = this.testClick.bind(this);
   }

   componentDidMount() {
    console.log(this.props.managers)
     console.log(this.props.managers)
   }

   handleSubmit(e) {
     let newEmployee = {
      company_id: 1,
      first_name: this.props.first_name,
      last_name: this.props.last_name,
      preferred_name: this.props.preferred_name,
      dob: this.props.dob,
      ssn: this.props.ssn,
      gender: this.props.gender,
      street_1: this.props.street_1,
      street_2: this.props.street_2,
      city: this.props.city,
      zip_code: this.props.zip_code,
      state: this.props.state,
      email: this.props.email,
      phone_number: this.props.phone_number,
      linkedin_url: this.props.linkedin_url,
      position: this.props.position,
      employee_status: this.props.employee_status,
      start_date: this.props.start_date,
      department: this.props.department,
      division: this.props.division,
      reports_to: this.props.reports_to,
      wage: this.props.wage,
      pay_per: this.props.pay_per,
      pay_type: this.props.pay_type,
      is_manager: this.props.is_manager,
      pw: this.props.pw
     }
     e.preventDefault();
     this.props.addEmployee(newEmployee);
   }

   handleFrequency(value) {
    this.setState({
      frequency: value
    });
  }

  testClick(e, b) {
    console.log(e, b)
  }

  render() {

    const departmentOptions = _.uniq(this.props.departments.map(a => a.name)).reduce((a, b) => {
      a.push({'text': b, 'value': b});
      return a;
    }, []);

    const divisionOptions = _.uniq(this.props.divisions.map(a => a.division)).reduce((a, b) => {
      a.push({'text': b, 'value': b});
      return a;
    }, [{'text': 'none', 'value': ''}]);

    const managerOptions = this.props.managers.reduce((a, b) => {
      a.push({'text': b.first_name + ' ' + b.last_name, 'value': parseInt(b.id) });
      return a;
    }, []);

    return (
      <Grid.Column width={8} >
        <Header size='large'>Add an Employee</Header>
        <Form>
          <Form.Group widths='equal'>
            <Form.Field control={Input} label='First name' name='first_name' placeholder='First name' onChange={(e) => {this.props.handleChange(e.target.name, e.target.value)}} />
            <Form.Field control={Input} label='Last name' name='last_name' placeholder='Last name' onChange={(e) => {this.props.handleChange(e.target.name, e.target.value)}} />
            <Form.Field control={Input} label='Preferred name' name='preferred_name' placeholder='Preferred name' onChange={(e) => {this.props.handleChange(e.target.name, e.target.value)}}  />
          </Form.Group>
          <Form.Group widths='equal'>
            <Form.Field control={Input} label='DOB' name='dob' placeholder='MM/DD/YYYY' onChange={(e) => {this.props.handleChange(e.target.name, e.target.value)}}  />
            <Form.Field control={Input} label='SSN' name='ssn' placeholder='SSN#' onChange={(e) => {this.props.handleChange(e.target.name, e.target.value)}}  />
            <Form.Field control={Select} label='Gender' options={genderOptions} name='gender' placeholder='Gender' onChange={(e, {value, name}) => {this.props.handleChange(name, value)}}/>
          </Form.Group>
        <Header size='small'>Home Address</Header>
          <Form.Group widths='equal'>
            <Form.Field control={Input} label='Street 1' name='street_1' placeholder='Street 1' onChange={(e) => {this.props.handleChange(e.target.name, e.target.value)}}  />
            <Form.Field control={Input} label='Street 2' name='street_2' placeholder='Street 2'onChange={(e) => {this.props.handleChange(e.target.name, e.target.value)}}  />
          </Form.Group>
          <Form.Group widths='equal'>
            <Form.Field control={Input} label='City' name='city' placeholder='City' onChange={(e) => {this.props.handleChange(e.target.name, e.target.value)}} />
            <Form.Field control={Input} label='Zip Code' name='zip_code' placeholder='Zip Code' onChange={(e) => {this.props.handleChange(e.target.name, e.target.value)}}  />
            <Form.Field control={Input} label='State' name='state' placeholder='State' onChange={(e) => {this.props.handleChange(e.target.name, e.target.value)}}  />
          </Form.Group>
        <Header size='small'>Contact Info</Header>
          <Form.Group widths='equal'>
            <Form.Field control={Input} label='Email Address' name='email' placeholder='Email Address' onChange={(e) => {this.props.handleChange(e.target.name, e.target.value)}} />
            <Form.Field control={Input} label='Phone Number' name='phone_number' placeholder='Phone Number' onChange={(e) => {this.props.handleChange(e.target.name, e.target.value)}} />
            <Form.Field control={Input} label='LinkedIn Profile URL' name='linkedin_url' placeholder='LinkedIn Profile URL' onChange={(e) => {this.props.handleChange(e.target.name, e.target.value)}} />
          </Form.Group>
        <Header size='small'>Employee Status</Header>
          <Form.Group widths='equal'>
            <Form.Field control={Input} label='Position/Title' name='position' placeholder='Position/Title' onChange={(e) => {this.props.handleChange(e.target.name, e.target.value)}}  />
            <Form.Field control={Select} label='Employee Status' options={ employStatOptions } name='employee_status' placeholder='Full-time' onChange={(e, {value, name}) => {this.props.handleChange(name, value)}} />
          </Form.Group>
          <Form.Group widths='equal'>
            <Form.Field control={Input} label='Start Date' name='start_date' placeholder='Start Date' onChange={(e) => {this.props.handleChange(e.target.name, e.target.value)}}  />
            <Form.Field control={Select} label='Gender' options={managerOptions} name='reports_to' placeholder='Reports' onChange={(e, {value, name}) => {this.props.handleChange(name, value)}}/>
          </Form.Group>
          <Form.Group widths='equal'>
            {/* <Form.Field control={Input} label='Department' name='department' placeholder='Department' onChange={(e) => {this.props.handleChange(e.target.name, e.target.value)}} /> */}
            <Form.Field control={Select} label='Department' options={ departmentOptions } name='department' placeholder='Department' onChange={(e, {value, name}) => {this.props.handleChange(name, value)}} />
            <Form.Field control={Select} label='Division' options={ divisionOptions } name='division' placeholder='Division' onChange={(e, {value, name}) => {this.props.handleChange(name, value)}} />
          </Form.Group>
          <Header size='small'>Compensation</Header>
          <Form.Group widths='equal'>
            <Form.Field control={Input} label='Compensation' name='wage' placeholder='Compensation' onChange={(e) => {this.props.handleChange(e.target.name, e.target.value)}}  />
            <Form.Field control={Select} label='Pay Per' options={ payScheduleOptions } name='pay_per' placeholder='Every other week' onChange={(e, {value, name}) => {this.props.handleChange(name, value)}}/>  
          </Form.Group>
          <Form.Group>
            <Form.Field control={Select} label='Pay Type' options={ payTypeOptions } name='pay_type' placeholder='Salary' onChange={(e, {value, name}) => {this.props.handleChange(name, value)}}/>
          </Form.Group>
          <Header size='small'>Profile Credentials</Header>
          <Form.Group widths='equal'>
            <Form.Field control={Select} label='Manager Role' options={ managerCred } name='is_manager' placeholder='false' onChange={(e, {value, name}) => {this.props.handleChange(name, value)}} />
            <Form.Field control={Input} label='Temporary Password' name='pw' placeholder='password123' onChange={(e) => {this.props.handleChange(e.target.name, e.target.value)}} />
            </Form.Group>
          <Form.Field control={Button} type='submit' onClick={this.handleSubmit}>Update</Form.Field>
        </Form>
      </Grid.Column> 
    )
  }
}

const mapStateToProps = state => ({
  first_name: state.newEmployeeReducer.first_name,
  last_name: state.newEmployeeReducer.last_name,
  preferred_name: state.newEmployeeReducer.preferred_name,
  dob: state.newEmployeeReducer.dob,
  ssn: state.newEmployeeReducer.ssn,
  gender: state.newEmployeeReducer.gender,
  street_1: state.newEmployeeReducer.street_1,
  street_2: state.newEmployeeReducer.street_2,
  city: state.newEmployeeReducer.city,
  zip_code: state.newEmployeeReducer.zip_code,
  state: state.newEmployeeReducer.state,
  email: state.newEmployeeReducer.email,
  phone_number: state.newEmployeeReducer.phone_number,
  linkedin_url: state.newEmployeeReducer.linkedin_url,
  position: state.newEmployeeReducer.position,
  employee_status: state.newEmployeeReducer.employee_status,
  start_date: state.newEmployeeReducer.start_date,
  department: state.newEmployeeReducer.department,
  division: state.newEmployeeReducer.division,
  reports_to: state.newEmployeeReducer.reports_to,
  wage: state.newEmployeeReducer.wage,
  pay_per: state.newEmployeeReducer.pay_per,
  pay_type: state.newEmployeeReducer.pay_type,
  is_manager: state.newEmployeeReducer.is_manager,
  pw: state.newEmployeeReducer.pw,
  departments: state.users.departments,
  divisions: state.users.divisions,
  managers: state.users.managers
})

NewEmployeeForm.propTypes = {
  addEmployee: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired
}

export default withRouter(connect(mapStateToProps, { handleChange, addEmployee })(NewEmployeeForm));
