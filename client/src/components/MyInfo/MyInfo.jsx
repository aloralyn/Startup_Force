import React, { Component } from 'react';
import EditableProfilePic from '../ProfilePic/EditableProfilePic.jsx';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addEmployee } from '../../actions/onboardingActions.js';
import { onDrop, handlePhotoUpload } from '../../actions/photoUploadActions';
import Dropzone from 'react-dropzone';
import axios from 'axios';

import {
  Button,
  Container,
  Header,
  Grid,
  Table,
  Segment
} from 'semantic-ui-react';


 class MyInfo extends Component {
   constructor(props) {
     super(props);

   }

  render() {
    return (
      <Container style={{ padding: '8em 0em' }}>
        <Grid container stackable>
          <Grid.Row>
             <Grid.Column width={6}>
               <EditableProfilePic />
             </Grid.Column>

             { this.props.showPhotoUpload ?

             <Grid.Column width={8}>
              <Dropzone onDrop={this.props.onDrop}>
                <p>Drop your image file in here, or click to select your image to upload.</p>
              </Dropzone>
              <Segment>Selected: {this.props.fileName}</Segment>
              <Button onClick={(a, b) => {this.props.handlePhotoUpload(this.props.file, this.props.user.id)}}>Save New Profile Pic</Button>
             </Grid.Column>

             :

             <Grid.Column width={8}>
               <Header size='small'>Employee Profile</Header>
            <Table attached='bottom' celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>First Name</Table.HeaderCell>
                  <Table.HeaderCell>Last Name</Table.HeaderCell>
                  <Table.HeaderCell>Prefered Name</Table.HeaderCell>
                </Table.Row>
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
                <Table.Row>
                  <Table.HeaderCell>Street 1</Table.HeaderCell>
                  <Table.HeaderCell>Street 2</Table.HeaderCell>
                  <Table.HeaderCell>City</Table.HeaderCell>
                  <Table.HeaderCell>Zip Code</Table.HeaderCell>
                  <Table.HeaderCell>State</Table.HeaderCell>
                </Table.Row>
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
                <Table.Row>
                  <Table.HeaderCell>Email Address</Table.HeaderCell>
                  <Table.HeaderCell>Phone Number</Table.HeaderCell>
                  <Table.HeaderCell>LinkedIn Profile</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                <Table.Row>
                  <Table.Cell>{this.props.user.email}</Table.Cell>
                  <Table.Cell>{this.props.user.phone_number}</Table.Cell>
                  <Table.Cell>{this.props.user.linkedin_url}</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
            <Button>Edit Info</Button>
             </Grid.Column> }

          </Grid.Row>
          </Grid>
      </Container>
    )
  }
}

MyInfo.propTypes = {
  onDrop: PropTypes.func.isRequired,
  handlePhotoUpload: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  user: state.users.user,
  company: state.users.company,
  showPhotoUpload: state.showPhotoUploadReducer.showPhotoUpload,
  file: state.showPhotoUploadReducer.file,
  fileName: state.showPhotoUploadReducer.name
})

export default withRouter(connect(mapStateToProps, { onDrop, handlePhotoUpload })(MyInfo));
