import React, { Component } from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';

import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

import ProfilePic from './ProfilePic.jsx'

import HomepageLayout from './HomepageLayout.jsx';
import MyInfo from './MyInfo.jsx';
import JobOpenings from './JobOpenings.jsx';
import Onboarding from './Onboarding.jsx'
import Reports from './Reports.jsx';
import Messages from './Messages.jsx';

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
  // constructor(props) {

  // }
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
                  <Menu.Item><Link to="/job_openings">Job Openings</Link></Menu.Item>
                  <Menu.Item><Link to="/onboarding">Onboarding</Link></Menu.Item>
                  <Menu.Item><Link to="/reports">Reports</Link></Menu.Item>
                  <Menu.Item><Link to="/messages">Messages</Link></Menu.Item>
                  <Menu.Menu position='right'>
                    <Menu.Item>
                      <Input icon='search' placeholder='Search...' />
                      <Menu.Item name='logout'  />
                    </Menu.Item>
                  </Menu.Menu>
                </Container>

              </Menu>

            </Segment>
           <Switch>
              <Route exact path="/" component={HomepageLayout} />
              <Route path="/my_info" component={MyInfo} />
              <Route path="/job_openings" component={JobOpenings} />
              <Route path="/onboarding" component={Onboarding} />
              <Route path="/reports" component={Reports} />
              <Route path="/messages" component={Messages} />
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
