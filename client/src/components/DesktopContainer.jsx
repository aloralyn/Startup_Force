import React, { Component } from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

import ProfilePic from './ProfilePic/ProfilePic.jsx'

import HomepageLayout from './Homepage/HomepageLayout.jsx';
import MyInfo from './MyInfo/MyInfo.jsx';
import Schedules from './Schedules/Schedules.jsx';
import Onboarding from './Onboarding/Onboarding.jsx'
// import Reports from './Reports/Reports.jsx';
import Metrics from './Reports/Metrics.jsx';
import Messages from './Messages/Messages.jsx';
import { logout } from '../actions/dashboardActions.js';
import Contracts from './Contracts/Contracts.jsx';
import { getNotifications, countTotalNotifications } from '../actions/messageActions.js';

import {
  Label,
  Container,
  Grid,
  Header,
  Icon,
  Input,
  Image,
  List,
  Dropdown,
  Menu,
  Responsive,
  Segment,
  Visibility,
} from 'semantic-ui-react'


class DesktopContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fixed: undefined,
      activeItem: 'home',
    };
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.user !== this.props.user) {
      this.props.getNotifications(nextProps.user.id, nextProps.user.company_id);
    }
    if (nextProps.notifications !== this.props.notifications) {
      this.props.countTotalNotifications(nextProps.notifications);
    }
  }

  componentDidMount = () => {
    this.props.getNotifications(this.props.user.id, this.props.user.company_id);
  }

  handleTabClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { fixed } = this.state;
    const { user: { id, company_id }, messageUserId } = this.props;
    return (
      <Responsive {...Responsive.onlyComputer}>
        <div>
          {/* <Container style={{ padding: '1.5em 0em' }}>
            <Image src='http://www.hipsterpig.com/wp-content/uploads/2014/05/fc550x550orange17.jpg' style={{height: '100px', width: '100px'}}/>
          </Container> */}
          { this.props.user.is_manager ?

          <Router>
          <Visibility once={false} onBottomPassed={this.showFixedMenu} onBottomPassedReverse={this.hideFixedMenu}>
            <Segment style={{background: '#1c3448'}} inverted textAlign='center'  vertical>
              <Menu
                fixed={fixed ? 'top' : null}
                inverted={!fixed}
                pointing={!fixed}
                secondary={!fixed}
                size='small'
                style={{background: '#1c3448', borderStyle: 'none'}}
              >

              <Container>
                <Menu.Item style={{fontFamily: 'Titillium Web'}} name="home" active={this.state.activeItem === 'home'} onClick={this.handleTabClick}><Link to="/">Home</Link></Menu.Item>
                <Menu.Item style={{fontFamily: 'Titillium Web'}} name="info" active={this.state.activeItem === 'info'} onClick={this.handleTabClick}><Link to="/my_info">My Info</Link></Menu.Item>
                <Menu.Item style={{fontFamily: 'Titillium Web'}} name="schedules" active={this.state.activeItem === 'schedules'} onClick={this.handleTabClick}><Link to="/schedules">Schedules</Link></Menu.Item>
                <Menu.Item style={{fontFamily: 'Titillium Web'}} name="onboarding" active={this.state.activeItem === 'onboarding'} onClick={this.handleTabClick}><Link to="/onboarding">Onboarding</Link></Menu.Item>
                <Menu.Item style={{fontFamily: 'Titillium Web'}} name="metrics" active={this.state.activeItem === 'metrics'} onClick={this.handleTabClick}><Link to="/metrics">Metrics</Link></Menu.Item>
                <Menu.Item style={{fontFamily: 'Titillium Web'}} name="messages" active={this.state.activeItem === 'messages'} onClick={this.handleTabClick}><Link to="/messages">
                    Messages {
                      this.props.notificationCount > 0 ?
                      '(' + this.props.notificationCount + ')'
                      :
                      ''
                    }
                  </Link></Menu.Item>
                <Menu.Item style={{fontFamily: 'Titillium Web'}} name="contracts" active={this.state.activeItem === 'contracts'} onClick={this.handleTabClick}><Link to="/contracts">Contracts</Link></Menu.Item>
                <Menu.Menu style={{fontFamily: 'Titillium Web'}} position='right'>

                    <Menu.Item style={{fontFamily: 'Titillium Web'}} name='logout' onClick={() => {
                      this.props.logout(this.props.user.id, this.props.messageUserId, this.props.user.company_id)
                    }}  />

                </Menu.Menu>
                </Container>
              </Menu>
            </Segment>
           <Switch>
              <Route exact path="/" component={HomepageLayout} />
              <Route path="/my_info" component={MyInfo} />
              <Route path="/schedules" component={Schedules} />
              <Route path="/onboarding" component={Onboarding} />
              <Route path="/metrics" component={Metrics} />
              <Route path="/messages" component={Messages} />
              <Route path="/contracts" component={Contracts} />
            </Switch>
          </Visibility>
          </Router>

          :

          <Router>
          <Visibility once={false} onBottomPassed={this.showFixedMenu} onBottomPassedReverse={this.hideFixedMenu}>
            <Segment style={{background: '#1c3448'}} inverted textAlign='center'  vertical>

              <Menu
                fixed={fixed ? 'top' : null}
                inverted={!fixed}
                pointing={!fixed}
                secondary={!fixed}
                size='small'
                style={{background: '#1c3448', borderStyle: 'none'}}
              >


              <Container>
                <Menu.Item style={{fontFamily: 'Titillium Web'}} name="home" active={this.state.activeItem === 'home'} onClick={this.handleTabClick}><Link to="/">Home</Link></Menu.Item>
                <Menu.Item style={{fontFamily: 'Titillium Web'}} name="info" active={this.state.activeItem === 'info'} onClick={this.handleTabClick}><Link to="/my_info">My Info</Link></Menu.Item>
                <Menu.Item style={{fontFamily: 'Titillium Web'}} name="metrics" active={this.state.activeItem === 'metrics'} onClick={this.handleTabClick}><Link to="/metrics">Metrics</Link></Menu.Item>
                <Menu.Item style={{fontFamily: 'Titillium Web'}} name="messages" active={this.state.activeItem === 'messages'} onClick={this.handleTabClick}><Link to="/messages">Messages</Link></Menu.Item>
                <Menu.Item style={{fontFamily: 'Titillium Web'}} name="contracts" active={this.state.activeItem === 'contracts'} onClick={this.handleTabClick}><Link to="/contracts">Contracts</Link></Menu.Item>
                <Menu.Menu position='right'>
                  <Menu.Item style={{fontFamily: 'Titillium Web'}} name='logout' onClick={() => this.props.logout(this.props.user.id, this.props.messageUserId, this.props.user.company_id)}  />
                </Menu.Menu>
              </Container>

              </Menu>

            </Segment>
           <Switch>
              <Route exact path="/" component={HomepageLayout} />
              <Route path="/my_info" component={MyInfo} />
              <Route path="/metrics" component={Metrics} />
              <Route path="/messages" component={Messages} />
              <Route path="/contracts" component={Contracts} />
            </Switch>
          </Visibility>
          </Router>
          }
          </div>
      </Responsive>
    );
  }
}

DesktopContainer.propTypes = {
  children: PropTypes.node,
  logout: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  user: state.users.user,
  messageUserId: state.messages.messageUserId,
  notifications: state.messages.notifications,
  notificationCount: state.messages.notificationCount
});



export default withRouter(connect(mapStateToProps, { getNotifications, logout, countTotalNotifications })(DesktopContainer));
