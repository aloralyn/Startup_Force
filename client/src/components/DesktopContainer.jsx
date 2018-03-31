import React, { Component } from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

import ProfilePic from './ProfilePic.jsx'

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


class DesktopContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fixed: undefined
    }
  }

  // hideFixedMenu() {
  //   => this.setState({ fixed: false })
  // }

  // showFixedMenu = () => this.setState({ fixed: true })

  componentDidMount() {
    console.log(this.props)
  }

  render() {

    const { fixed } = this.state

    return (
      <Responsive {...Responsive.onlyComputer}>
        <div>
          {/* <Container style={{ padding: '1.5em 0em' }}>
            <Image src='http://www.hipsterpig.com/wp-content/uploads/2014/05/fc550x550orange17.jpg' style={{height: '100px', width: '100px'}}/>
          </Container> */}
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

              { this.props.user.is_manager ? 
              <Container>
                  <Menu.Item><Link to="/">Home</Link></Menu.Item>
                  <Menu.Item><Link to="/my_info">My Info</Link></Menu.Item>      
                  <Menu.Item><Link to="/schedules">Schedules</Link></Menu.Item>
                  <Menu.Item><Link to="/onboarding">Onboarding</Link></Menu.Item>
                  <Menu.Item><Link to="/reports">Reports</Link></Menu.Item>
                  <Menu.Item><Link to="/messages">Messages</Link></Menu.Item>
                  <Menu.Item><Link to="/contracts">Contracts</Link></Menu.Item>
                  <Menu.Menu position='right'>
                    <Menu.Item>
                      <Menu.Item name='logout' onClick={() => this.props.logout()}  />
                    </Menu.Item>
                  </Menu.Menu>
                </Container> 
                :

                <Container>
                <Menu.Item><Link to="/">Home</Link></Menu.Item>
                <Menu.Item><Link to="/my_info">My Info</Link></Menu.Item>      
                <Menu.Item><Link to="/reports">Reports</Link></Menu.Item>
                <Menu.Item><Link to="/messages">Messages</Link></Menu.Item>
                <Menu.Item><Link to="/contracts">Contracts</Link></Menu.Item>
                <Menu.Menu position='right'>
                  <Menu.Item>
                    <Menu.Item name='logout' onClick={() => this.props.logout()}  />
                  </Menu.Item>
                </Menu.Menu>
                </Container>
              }

              </Menu>

            </Segment>
           <Switch>
              <Route exact path="/" component={HomepageLayout} />
              <Route path="/my_info" component={MyInfo} />
              <Route path="/schedules" component={Schedules} />
              <Route path="/onboarding" component={Onboarding} />
              <Route path="/reports" component={Reports} />
              <Route path="/messages" component={Messages} />
              <Route path="/contracts" component={Contracts} />
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
  logout: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  user: state.users.user
});



export default withRouter(connect(mapStateToProps, { logout })(DesktopContainer));
