import React, { Component } from 'react';
import ProfilePic from '../ProfilePic.jsx';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addEmployee } from '../../actions/onboardingActions.js';

import {
  Container,
  Header,
  Grid
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
               <ProfilePic />
             </Grid.Column>
             <Grid.Column width={8}>
               <Header size='small'>Employee Profile</Header>
            </Grid.Column>
          </Grid.Row>
          </Grid>
      </Container>
    )
  }
}

MyInfo.propTypes = {
  addEmployee: PropTypes.func.isRequired
}

export default withRouter(connect(null, { addEmployee })(MyInfo));
