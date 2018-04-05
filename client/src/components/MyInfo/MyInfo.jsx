import React, { Component } from 'react';
import EditableProfilePic from '../ProfilePic/EditableProfilePic.jsx';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addEmployee } from '../../actions/onboardingActions.js';
import { onDrop, handlePhotoUpload, showProfileEditor, updateProfile } from '../../actions/updateProfileActions.js';
import {handleEditProfileChange } from '../../actions/formChangeActions.js';
import Dropzone from 'react-dropzone';
import axios from 'axios';

import {
  Button,
  Card,
  Container,
  Header,
  Form,
  Icon,
  Input,
  Grid,
  Table,
  Segment
} from 'semantic-ui-react';


 class MyInfo extends Component {
   constructor(props) {
     super(props);
   }

  handleSubmit = () => {
    let userInfo = {
      id: this.props.user.id,
      preferred_name: this.props.preferred_name,
      street_1: this.props.street_1,
      street_2: this.props.street_2,
      city: this.props.city,
      zip_code: this.props.zip_code,
      state: this.props.state,
      phone_number: this.props.phone_number,
      linkedin_url: this.props.inkedin_url,
      pw: this.props.pw,
      personal_email: this.props.personal_email
    }

    this.props.updateProfile(userInfo)
  }

  render() {
    return (
      <Container style={{ padding: '8em 0em' }}>
        <Grid container stackable>
          <Grid.Row>
             <Grid.Column width={5}>
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

             : this.props.showEditProfile ? 
             <Grid.Column width={8}>
               <Header size='small'>Your Profile</Header> 
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
                      <Table.Cell><Form.Field control={Input} name='preferred_name' value={this.props.preferred_name} onChange={(e) => {this.props.handleEditProfileChange(e.target.name, e.target.value)}}></Form.Field></Table.Cell>
                    </Table.Row>
                  </Table.Body>
                </Table>
                <Table celled>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>Street 1</Table.HeaderCell>
                      <Table.HeaderCell>Street 2</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    <Table.Row>
                      <Table.Cell><Form.Field required control={Input} name='street_1' value={this.props.street_1} onChange={(e) => {this.props.handleEditProfileChange(e.target.name, e.target.value)}}></Form.Field></Table.Cell>
                      <Table.Cell><Form.Field control={Input} name='street_2' value={this.props.street_2} onChange={(e) => {this.props.handleEditProfileChange(e.target.name, e.target.value)}}></Form.Field></Table.Cell>
                    </Table.Row>
                  </Table.Body>
                </Table>
                <Table celled>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>City</Table.HeaderCell>
                      <Table.HeaderCell>Zip Code</Table.HeaderCell>
                      <Table.HeaderCell>State</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    <Table.Row>
                      <Table.Cell><Form.Field required control={Input} name='city' value={this.props.city} onChange={(e) => {this.props.handleEditProfileChange(e.target.name, e.target.value)}}></Form.Field></Table.Cell>
                      <Table.Cell><Form.Field required control={Input} name='zip_code' value={this.props.zip_code} onChange={(e) => {this.props.handleEditProfileChange(e.target.name, e.target.value)}} ></Form.Field></Table.Cell>
                      <Table.Cell><Form.Field required control={Input} name='state' value={this.props.state} onChange={(e) => {this.props.handleEditProfileChange(e.target.name, e.target.value)}}></Form.Field></Table.Cell>
                    </Table.Row>
                  </Table.Body>
                </Table>
                <Table  celled>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>Personal Email</Table.HeaderCell>
                      <Table.HeaderCell>Phone Number</Table.HeaderCell>
                      <Table.HeaderCell>LinkedIn Profile</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    <Table.Row>
                      <Table.Cell><Form.Field required control={Input} name='personal_email' value={this.props.personal_email} onChange={(e) => {this.props.handleEditProfileChange(e.target.name, e.target.value)}}></Form.Field></Table.Cell>
                      <Table.Cell><Form.Field required control={Input} name='phone_number' value={this.props.phone_number} onChange={(e) => {this.props.handleEditProfileChange(e.target.name, e.target.value)}}></Form.Field></Table.Cell>
                      <Table.Cell><Form.Field control={Input} name='linkedin_url' value={this.props.linkedin_url} onChange={(e) => {this.props.handleEditProfileChange(e.target.name, e.target.value)}}></Form.Field></Table.Cell>
                    </Table.Row>
                  </Table.Body>
                </Table>
                <Table  celled fixed singleLine>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>{this.props.company.company_name} Email</Table.HeaderCell>
                      <Table.HeaderCell>Password</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    <Table.Row>
                      <Table.Cell>{this.props.user.email}</Table.Cell>
                      <Table.Cell><Form.Field required control={Input} name='pw' type='password' value={this.props.pw} onChange={(e) => {this.props.handleEditProfileChange(e.target.name, e.target.value)}} ></Form.Field></Table.Cell>
                    </Table.Row>
                  </Table.Body>
                </Table>
                <Button onClick={this.handleSubmit}>Submit Info</Button>
             </Grid.Column>

             :

             <Grid.Column width={8}>
               <Header size='small'>Your Profile
               <Card.Content extra>
                  ( <a onClick={ (a)=> {this.props.showProfileEditor(this.props.user)}} >Edit info
                  <Icon name='edit'/></a> 
                </Card.Content>
                  )
               </Header>
                <Table attached='bottom' celled fixed singleLine>
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
                <Table celled>
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
                      <Table.Cell>{this.props.user.street_1}</Table.Cell>
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
                      <Table.HeaderCell>Personal Email</Table.HeaderCell>
                      <Table.HeaderCell>Phone Number</Table.HeaderCell>
                      <Table.HeaderCell>LinkedIn Profile</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    <Table.Row>
                      <Table.Cell>{this.props.user.personal_email}</Table.Cell>
                      <Table.Cell>{this.props.user.phone_number}</Table.Cell>
                      <Table.Cell>{this.props.user.linkedin_url}</Table.Cell>
                    </Table.Row>
                  </Table.Body>
                </Table>
                <Table  celled fixed singleLine>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>{this.props.company.company_name} Email</Table.HeaderCell>
                      <Table.HeaderCell>Password</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    <Table.Row>
                      <Table.Cell>{this.props.user.email}</Table.Cell>
                      <Table.Cell>*************</Table.Cell>
                    </Table.Row>
                  </Table.Body>
                </Table>
             </Grid.Column> 
             }
          </Grid.Row>
          </Grid>
      </Container>
    ) 
  }
}

MyInfo.propTypes = {
  onDrop: PropTypes.func.isRequired,
  handlePhotoUpload: PropTypes.func.isRequired,
  showProfileEditor: PropTypes.func.isRequired,
  handleEditProfileChange: PropTypes.func.isRequired,
  updateProfile: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  user: state.users.user,
  company: state.users.company,
  showPhotoUpload: state.updateProfileReducer.showPhotoUpload,
  showEditProfile: state.updateProfileReducer.showEditProfile,
  file: state.updateProfileReducer.file,
  fileName: state.updateProfileReducer.name,
  preferred_name: state.updateProfileReducer.preferred_name,
  street_1: state.updateProfileReducer.street_1,
  street_2: state.updateProfileReducer.street_2,
  city: state.updateProfileReducer.city,
  zip_code: state.updateProfileReducer.zip_code,
  state: state.updateProfileReducer.state,
  phone_number: state.updateProfileReducer.phone_number,
  linkedin_url: state.updateProfileReducer.linkedin_url,
  pw: state.updateProfileReducer.pw,
  personal_email: state.updateProfileReducer.personal_email
})

export default withRouter(connect(mapStateToProps, { onDrop, handlePhotoUpload, showProfileEditor , handleEditProfileChange, updateProfile})(MyInfo));
