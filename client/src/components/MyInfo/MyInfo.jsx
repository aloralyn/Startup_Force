import React, { Component } from 'react';
import ProfilePic from '../ProfilePic.jsx';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addEmployee } from '../../actions/onboardingActions.js';

import {
  Button,
  Container,
  Header,
  Grid,
  Table
} from 'semantic-ui-react';


 class MyInfo extends Component {
   constructor(props) {
     super(props);

     this.state = {
       profilePicURL: ''
     }

     this.handleUploadImage = this.handleUploadImage.bind(this);
   }

  handleUploadImage(e) {
    e.preventDefault();

    const data = new FormData();
    data.append('file', this.uploadInput.files[0]);
   // data.append('filename', this.fileName.value);

    console.log(data)
    // data.append('file', this.u)
  } 

  render() {
    return (
      <Container style={{ padding: '8em 0em' }}>
        <Grid container stackable>
          <Grid.Row>
             <Grid.Column width={6}>
               <ProfilePic />
               <input ref={(ref) => { this.uploadInput = ref; }}type="file" />
               <button onClick={this.handleUploadImage}>Submit</button>
             </Grid.Column>
             <Grid.Column width={8}>
               <Header size='small'>Employee Profile</Header>
               
            <Table attached='bottom' celled>
              <Table.Header>
                <Table.HeaderCell>First Name</Table.HeaderCell>
                <Table.HeaderCell>Last Name</Table.HeaderCell>
                <Table.HeaderCell>Prefered Name</Table.HeaderCell>
              </Table.Header>
              <Table.Body>
                <Table.Row>
                  <Table.Cell>{this.props.users[0].first_name}</Table.Cell>
                  <Table.Cell>{this.props.users[0].last_name}</Table.Cell>
                  <Table.Cell>{this.props.users[0].preferred_name}</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>

            <Table  celled>
              <Table.Header>
                <Table.HeaderCell>Street 1</Table.HeaderCell>
                <Table.HeaderCell>Street 2</Table.HeaderCell>
                <Table.HeaderCell>City</Table.HeaderCell>
                <Table.HeaderCell>Zip Code</Table.HeaderCell>
                <Table.HeaderCell>State</Table.HeaderCell>
              </Table.Header>
              <Table.Body>
                <Table.Row>
                  <Table.Cell>369 Lexington Street</Table.Cell>
                  <Table.Cell>Floor 11</Table.Cell>
                  <Table.Cell>10017</Table.Cell>
                  <Table.Cell>New York</Table.Cell>
                  <Table.Cell>NY</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>

            <Table  celled>
              <Table.Header>
                <Table.HeaderCell>Email Address</Table.HeaderCell>
                <Table.HeaderCell>Phone Number</Table.HeaderCell>
                <Table.HeaderCell>LinkedIn Profile</Table.HeaderCell>
              </Table.Header>
              <Table.Body>
                <Table.Row>
                  <Table.Cell>{this.props.users[0].email}</Table.Cell>
                  <Table.Cell>{this.props.users[0].phone_number}</Table.Cell>
                  <Table.Cell>{this.props.users[0].linkedin_url}</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
            <Button icon="edit">Edit Info</Button>
            </Grid.Column>
          </Grid.Row>
          </Grid>
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  users: state.users.users
})

export default withRouter(connect(mapStateToProps, {})(MyInfo));
