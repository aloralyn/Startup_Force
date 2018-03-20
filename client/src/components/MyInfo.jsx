import React, { Component } from 'react';
import ProfilePic from './ProfilePic.jsx'
import {
  Container,
  Button,
  Form,
  Header,
  Grid,
  Input,
  Select,
  TextArea
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

 class MyInfo extends Component {
  render() {
    return (
      <Container style={{ padding: '8em 0em' }}>
        <Grid container stackable>
          <Grid.Row>
             <Grid.Column width={6}>
               <ProfilePic />
             </Grid.Column>
             <Grid.Column width={8}>
               <Header size='small'>Employee Profile</Header>
                <Form>
                  <Form.Group widths='equal'>
                    <Form.Field control={Input} label='First name' placeholder='First name' />
                    <Form.Field control={Input} label='Last name' placeholder='Last name' />
                    <Form.Field control={Input} label='Preferred name' placeholder='Preferred name' />
                  </Form.Group>
                  <Form.Group widths='equal'>
                    <Form.Field control={Input} label='DOB' placeholder='DOB' />
                    <Form.Field control={Input} label='SSN' placeholder='SSN' />
                    <Form.Field control={Select} label='Gender' options={genderOptions} placeholder='Gender' />
                  </Form.Group>
                <Header size='small'>Home Address</Header>
                  <Form.Group widths='equal'>
                    <Form.Field control={Input} label='Street 1' placeholder='Street 1' />
                    <Form.Field control={Input} label='Street 2' placeholder='Street 2' />
                  </Form.Group>
                  <Form.Group widths='equal'>
                    <Form.Field control={Input} label='City' placeholder='City' />
                    <Form.Field control={Input} label='Zip Code' placeholder='Zip Code' />
                    <Form.Field control={Input} label='State' placeholder='State' />
                  </Form.Group>
                <Header size='small'>Contact Info</Header>
                  <Form.Group widths='equal'>
                    <Form.Field control={Input} label='Email Address' placeholder='Email Address' />
                    <Form.Field control={Input} label='Phone Number' placeholder='Phone Number' />
                    <Form.Field control={Input} label='LinkedIn Profile URL' placeholder='LinkedIn Profile URL' />
                  </Form.Group>
                <Header size='small'>Employee Status</Header>
                  <Form.Group widths='equal'>
                    <Form.Field control={Input} label='Position/Title' placeholder='Position/Title' />
                    <Form.Field control={Select} label='Employee Status' options={ employStatOptions } placeholder='Full-time' />
                  </Form.Group>
                  <Form.Group widths='equal'>
                    <Form.Field control={Input} label='Start Date' placeholder='Start Date' />
                    <Form.Field control={Input} label='Reports to' placeholder='Reports to' />
                  </Form.Group>
                  <Form.Group widths='equal'>
                    <Form.Field control={Input} label='Department' placeholder='Department' />
                    <Form.Field control={Select} label='Division' options={ divisionOptions } placeholder='Placeholder Divs' />
                  </Form.Group>
                  <Header size='small'>Compensation</Header>
                  <Form.Group widths='equal'>
                    <Form.Field control={Input} label='Compensation' placeholder='Compensation' />
                    <Form.Field control={Select} label='Pay Per' options={ payScheduleOptions } placeholder='Every other week' />  
                  </Form.Group>
                  <Form.Group>
                    <Form.Field control={Select} label='Pay Type' options={ payTypeOptions } placeholder='Salary' />
                  </Form.Group>
                  <Form.Field control={Button}>Update</Form.Field>
                </Form>
            </Grid.Column>
          </Grid.Row>
          </Grid>
      </Container>
    )
  }
}

export default MyInfo;
