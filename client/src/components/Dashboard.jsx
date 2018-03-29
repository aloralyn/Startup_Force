import React, { Component } from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';

import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

import ProfilePic from './ProfilePic.jsx'

import HomepageLayout from './Homepage/HomepageLayout.jsx';
import MyInfo from './MyInfo/MyInfo.jsx';
import Schedules from './Schedules/Schedules.jsx';
import Onboarding from './Onboarding/Onboarding.jsx'
import Reports from './Reports/Reports.jsx';
import Messages from './Messages/Messages.jsx';
import SignUpForm from './SignUp/SignUp.jsx';
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


class DesktopContainer extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    fixed: undefined
  }
  
  hideFixedMenu = () => this.setState({ fixed: false })
  showFixedMenu = () => this.setState({ fixed: true })

  render() {

    const { fixed } = this.state

    return (
      <Responsive {...Responsive.onlyComputer}>
        <div>
          <Container style={{ padding: '1.5em 0em' }}>
            <Image src='http://www.hipsterpig.com/wp-content/uploads/2014/05/fc550x550orange17.jpg' style={{height: '100px', width: '100px'}}/>
          </Container>
          <Router>
          <Visibility once={false} onBottomPassed={this.showFixedMenu} onBottomPassedReverse={this.hideFixedMenu}>
            <Segment inverted textAlign='center'  vertical>

              <Menu
                fixed={fixed ? 'top' : null}
                inverted={!fixed}
                pointing={!fixed}
                secondary={!fixed}
                size='small'
              >

                <Container>
                  <Menu.Item><Link to="/">Home</Link></Menu.Item>
                  <Menu.Item><Link to="/my_info">My Info</Link></Menu.Item>
                  <Menu.Item><Link to="/job_openings">Schedules</Link></Menu.Item>
                  <Menu.Item><Link to="/onboarding">Onboarding</Link></Menu.Item>
                  <Menu.Item><Link to="/reports">Reports</Link></Menu.Item>
                  <Menu.Item><Link to="/messages">Messages</Link></Menu.Item>
                  <Menu.Item><Link to="/contracts">Contracts</Link></Menu.Item>
                  <Menu.Item><Link to="/sign-up">Sign Up</Link></Menu.Item>
                  <Menu.Menu position='right'>
                    <Menu.Item>
                      <Menu.Item name='logout' onClick={() => logout()}  />
                    </Menu.Item>
                  </Menu.Menu>
                </Container>

              </Menu>

            </Segment>
           <Switch>
              <Route exact path="/" component={HomepageLayout} />
              <Route path="/my_info" component={MyInfo} />
              <Route path="/job_openings" component={Schedules} />
              <Route path="/onboarding" component={Onboarding} />
              <Route path="/reports" component={Reports} />
              <Route path="/messages" component={Messages} />
              <Route path="/contracts" component={Contracts} />
              <Route path="/sign-up" component={SignUpForm} />
            </Switch>

          </Visibility>

          </Router>
          </div>
      </Responsive>
    )
  }
}

DesktopContainer.propTypes = {
  children: PropTypes.node,
}

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
