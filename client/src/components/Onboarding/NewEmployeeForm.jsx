import React, { Component } from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addEmployee } from '../../actions/onboardingActions.js';
import { handleChange, clearEmployeeForm } from '../../actions/formChangeActions.js';
import { _ } from 'underscore';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import {
  Button,
  Form,
  Grid,
  Header,
  Input,
  Message,
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

const ErrorMessage = () => (
  <Message
    style={{fontFamily: 'Titillium Web'}}
    negative
    header='There were some errors with your submission'
    list={[
      'Please be sure to complete all required fields'
    ]}
  />
)

 class NewEmployeeForm extends Component {
   constructor(props) {
     super(props);

  
     this.state = {
       start: null,
       dob: null,
       showError: false
     }

   }

   handleStartDateChange = (e) => {
     this.setState({
       start: e
     });
   }

   handleDobChange = (e) => {
     this.setState({
       dob: e
     });
   }

   handleSubmit = (e) => {
     e.preventDefault();
     let newEmployee = {
      company_id: this.props.company.id,
      first_name: this.props.first_name,
      last_name: this.props.last_name,
      dob: moment(this.state.dob).format('MM/DD/YYYY'),
      ssn: this.props.ssn,
      gender: this.props.gender,
      street_1: this.props.street_1,
      city: this.props.city,
      zip_code: this.props.zip_code,
      state: this.props.state,
      email: this.props.email,
      phone_number: this.props.phone_number,
      position: this.props.position,
      employee_status: this.props.employee_status,
      start_date: moment(this.state.start).format('MM/DD/YYYY'),
      department: this.props.department,
      reports_to: this.props.reports_to,
      wage: this.props.wage,
      pay_per: this.props.pay_per,
      pay_type: this.props.pay_type,
      is_manager: this.props.is_manager,
      pw: this.props.pw,
      personal_email: this.props.personal_email
     }
     console.log(Object.values(newEmployee).indexOf('') === -1);
     console.log(newEmployee)

     if (Object.values(newEmployee).indexOf('') === -1 && Object.values(newEmployee).indexOf('Invalid date') === -1) {
      newEmployee['preferred_name'] = this.props.preferred_name;
      newEmployee['street_2'] = this.props.street_2;
      newEmployee['linkedin_url'] = this.props.linkedin_url;
      newEmployee['division'] = this.props.division;
      this.props.addEmployee(newEmployee);
      this.setState({
        showError: false
      })
      this.props.clearEmployeeForm()
     } else {
       this.setState({
         showError: true,
         start: null,
         dob: null,
       })
     }
   }

   handleFrequency = (value) => {
    this.setState({
      frequency: value
    });
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

    const workEmail = this.props.company.company_name + ' Email';

    return (
      <Grid.Column width={8} >
      <div>
        <Header style={{fontFamily: 'Titillium Web'}} size='large'>Add an Employee</Header>
        <Form>
          <Form.Group widths='equal'>
            <Form.Field control={Input} required label='First name' name='first_name' placeholder='First name' value={this.props.first_name} onChange={(e) => {this.props.handleChange(e.target.name, e.target.value)}} />
            <Form.Field control={Input} required label='Last name' name='last_name' placeholder='Last name'  value={this.props.last_name} onChange={(e) => {this.props.handleChange(e.target.name, e.target.value)}} />
            <Form.Field control={Input} label='Preferred name' name='preferred_name' placeholder='Preferred name'  value={this.props.preferred_name} onChange={(e) => {this.props.handleChange(e.target.name, e.target.value)}}  />
          </Form.Group>
          <Form.Group widths='equal'>
            <Form.Field required>
              <label>DOB</label>
              <DatePicker
              selected={this.state.dob}
              onChange={this.handleDobChange}
              showYearDropdown
              dateFormatCalendar="MMMM"
              scrollableYearDropdown
              yearDropdownItemNumber={45}
              placeholderText="DOB"
              />
            </Form.Field>
            <Form.Field control={Input} required label='SSN' name='ssn' placeholder='SSN#'  value={this.props.ssn} onChange={(e) => {this.props.handleChange(e.target.name, e.target.value)}}  />
            <Form.Field control={Select} required label='Gender' options={genderOptions} name='gender' placeholder='Gender'  value={this.props.gender} onChange={(e, {value, name}) => {this.props.handleChange(name, value)}}/>
          </Form.Group>
        <Header style={{fontFamily: 'Titillium Web'}} size='small'>Home Address</Header>
          <Form.Group widths='equal'>
            <Form.Field control={Input} required label='Street 1' name='street_1' placeholder='Street 1'  value={this.props.street_1} onChange={(e) => {this.props.handleChange(e.target.name, e.target.value)}}  />
            <Form.Field control={Input} label='Street 2' name='street_2' placeholder='Street 2' value={this.props.street_2} onChange={(e) => {this.props.handleChange(e.target.name, e.target.value)}}  />
          </Form.Group>
          <Form.Group widths='equal'>
            <Form.Field control={Input} required label='City' name='city' placeholder='City' value={this.props.city} onChange={(e) => {this.props.handleChange(e.target.name, e.target.value)}} />
            <Form.Field control={Input} required label='Zip Code' name='zip_code' placeholder='Zip Code' value={this.props.zip_code} onChange={(e) => {this.props.handleChange(e.target.name, e.target.value)}}  />
            <Form.Field control={Input} required label='State' name='state' placeholder='State' value={this.props.state} onChange={(e) => {this.props.handleChange(e.target.name, e.target.value)}}  />
          </Form.Group>
        <Header style={{fontFamily: 'Titillium Web'}} size='small'>Contact Info</Header>
          <Form.Group widths='equal'>
            <Form.Field control={Input} required label='Personal Email Address' name='personal_email' value={this.props.personal_email} placeholder='Personal Email Address' onChange={(e) => {this.props.handleChange(e.target.name, e.target.value)}} />
            <Form.Field control={Input} required label='Phone Number' name='phone_number' placeholder='Phone Number' value={this.props.phone_number} onChange={(e) => {this.props.handleChange(e.target.name, e.target.value)}} />
            <Form.Field control={Input} label='LinkedIn Profile URL' name='linkedin_url' placeholder='LinkedIn Profile URL' value={this.props.linkedin_url} onChange={(e) => {this.props.handleChange(e.target.name, e.target.value)}} />
          </Form.Group>
        <Header style={{fontFamily: 'Titillium Web'}} size='small'>Employee Status</Header>
          <Form.Group widths='equal'>
            <Form.Field control={Input} required label='Position/Title' name='position' placeholder='Position/Title' value={this.props.position} onChange={(e) => {this.props.handleChange(e.target.name, e.target.value)}}  />
            <Form.Field control={Select} required label='Employee Status' options={ employStatOptions } name='employee_status' placeholder='Full-time' value={this.props.employee_status} onChange={(e, {value, name}) => {this.props.handleChange(name, value)}} />
          </Form.Group>
          <Form.Group widths='equal'>
            <Form.Field control={Select} required label='Reports to' options={managerOptions} name='reports_to' placeholder='Reports' value={this.props.reports_to} onChange={(e, {value, name}) => {this.props.handleChange(name, value)}}/>
            <Form.Field required>
              <label>Start Date</label>
            <DatePicker selected={this.state.start} onChange={this.handleStartDateChange}  placeholderText="Start Date"/>
            </Form.Field>
          </Form.Group>
          <Form.Group widths='equal'>
            <Form.Field control={Select} label='Department' required options={ departmentOptions } name='department' placeholder='Department' value={this.props.department} onChange={(e, {value, name}) => {this.props.handleChange(name, value)}} />
            <Form.Field control={Select} label='Division' options={ divisionOptions } name='division' placeholder='Division' value={this.props.division} onChange={(e, {value, name}) => {this.props.handleChange(name, value)}} />
          </Form.Group>
          <Header style={{fontFamily: 'Titillium Web'}} size='small'>Compensation</Header>
          <Form.Group widths='equal'>
            <Form.Field control={Input} required label='Compensation' name='wage' placeholder='Compensation' value={this.props.compensation} onChange={(e) => {this.props.handleChange(e.target.name, e.target.value)}}  />
            <Form.Field control={Select} required label='Pay Per' options={ payScheduleOptions } name='pay_per' placeholder='Every other week' value={this.props.pay_per} onChange={(e, {value, name}) => {this.props.handleChange(name, value)}}/>  
          </Form.Group>
          <Form.Group>
            <Form.Field control={Select} required label='Pay Type' options={ payTypeOptions } name='pay_type' placeholder='Salary' value={this.props.salary} onChange={(e, {value, name}) => {this.props.handleChange(name, value)}}/>
          </Form.Group>
          <Header style={{fontFamily: 'Titillium Web'}} size='small'>Profile Credentials</Header>
          <Form.Group widths='equal'>
            <Form.Field control={Input} required label={workEmail} name='email' placeholder='Email Address' value={this.props.email} onChange={(e) => {this.props.handleChange(e.target.name, e.target.value)}} />
            <Form.Field control={Select} required label='Manager Role' options={ managerCred } name='is_manager' placeholder='false' value={this.props.is_manager} onChange={(e, {value, name}) => {this.props.handleChange(name, value)}} />
            <Form.Field control={Input} required label='Temporary Password' name='pw' placeholder='temporary password' value={this.props.pw} onChange={(e) => {this.props.handleChange(e.target.name, e.target.value)}} />
            </Form.Group>
          <Form.Field style={{fontFamily: 'Titillium Web'}} control={Button} type='submit' fluid onClick={this.handleSubmit}>Add New {this.props.company.company_name} Employee!</Form.Field>
        </Form>
        </div>
        {this.state.showError ? <ErrorMessage /> : null }
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
  personal_email: state.newEmployeeReducer.personal_email,
  departments: state.users.departments,
  divisions: state.users.divisions,
  managers: state.users.managers,
  company: state.users.company
})

NewEmployeeForm.propTypes = {
  addEmployee: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  clearEmployeeForm: PropTypes.func.isRequired 
}

export default withRouter(connect(mapStateToProps, { handleChange, addEmployee, clearEmployeeForm })(NewEmployeeForm));
