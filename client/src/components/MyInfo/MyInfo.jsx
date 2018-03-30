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

  componentDidMount() {
    console.log(this.props);
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
                  <Table.Cell>{this.props.user.first_name}</Table.Cell>
                  <Table.Cell>{this.props.user.last_name}</Table.Cell>
                  <Table.Cell>{this.props.user.preferred_name}</Table.Cell>
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
                  <Table.Cell>{this.props.user.street_1}t</Table.Cell>
                  <Table.Cell>{this.props.user.street_2}</Table.Cell>
                  <Table.Cell>{this.props.user.zip_code}</Table.Cell>
                  <Table.Cell>{this.props.user.city}</Table.Cell>
                  <Table.Cell>{this.props.user.state}</Table.Cell>
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
                  <Table.Cell>{this.props.user.email}</Table.Cell>
                  <Table.Cell>{this.props.user.phone_number}</Table.Cell>
                  <Table.Cell>{this.props.user.linkedin_url}</Table.Cell>
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
  user: state.users.user,
  company: state.users.company
})

export default withRouter(connect(mapStateToProps, {})(MyInfo));
