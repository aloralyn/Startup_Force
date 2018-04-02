import React, { Component } from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

import DesktopContainer from './DesktopContainer.jsx';
import ProfilePic from './ProfilePic/ProfilePic.jsx';

import HomepageLayout from './Homepage/HomepageLayout.jsx';
import MyInfo from './MyInfo/MyInfo.jsx';
import Schedules from './Schedules/Schedules.jsx';
import Onboarding from './Onboarding/Onboarding.jsx'
import Reports from './Reports/Reports.jsx';
import Messages from './Messages/Messages.jsx';
import { logout } from '../actions/dashboardActions.js';
import Contracts from './Contracts/Contracts.jsx';

import {
  Container,
  Grid,
  Header,
  Icon,
  Input,
  Image,
  List,
  Menu,
  Responsive,
  Segment,
  Visibility,
} from 'semantic-ui-react'

const Footer = () => (
  <Segment inverted vertical style={{ padding: '5em 0em' }}>
    <Container>
      <Grid divided inverted stackable>
        <Grid.Row>
          <Grid.Column width={3}>
            <Header inverted as='h4' content='About' />
            <List link inverted>
              <List.Item as='a'>Placeholder</List.Item>
            </List>
          </Grid.Column>
          <Grid.Column width={3}>
            <Header inverted as='h4' content='Services' />
            <List link inverted>
              <List.Item as='a'>Placeholder</List.Item>
            </List>
          </Grid.Column>
          <Grid.Column width={7}>
            <Header as='h4' inverted>Footer Header</Header>
            <p>Placeholder</p>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  </Segment>
)

const Dashboard = () => (
  <div>
    <DesktopContainer />
    <Footer />
  </div>
);

export default withRouter(Dashboard);
