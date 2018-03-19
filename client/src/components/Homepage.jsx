import React, { Component } from 'react'
import PropTypes from 'prop-types';
import ProfilePic from './ProfilePic.jsx'
import { connect } from 'react-redux'; // connects to the redux store
import { fetchUsers } from '../actions/dashboardActions.js'


import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Responsive,
  Segment,
  Sidebar,
  Visibility,
} from 'semantic-ui-react'

class DesktopContainer extends Component {
  state = {
    fixed: undefined
  }

  hideFixedMenu = () => this.setState({ fixed: false })
  showFixedMenu = () => this.setState({ fixed: true })

  render() {
    const { children } = this.props
    const { fixed } = this.state
    
    return (
      <Responsive {...Responsive.onlyComputer}>
        <Visibility once={false} onBottomPassed={this.showFixedMenu} onBottomPassedReverse={this.hideFixedMenu}>
          <Segment inverted textAlign='center'  vertical>
            <Menu
              fixed={fixed ? 'top' : null}
              inverted={!fixed}
              pointing={!fixed}
              secondary={!fixed}
              size='large'
            >
              <Container>
                <Menu.Item as='a' active>Home</Menu.Item>
                <Menu.Item as='a'>My Info</Menu.Item>
                <Menu.Item as='a'>Job Openings</Menu.Item>
                <Menu.Item as='a'>Reports</Menu.Item>
                <Menu.Item as='a'>Messages</Menu.Item>
                <Menu.Item position='right'>
                  <Button as='a' inverted={!fixed} primary={fixed} style={{ marginLeft: '0.5em' }}>Sign Out</Button>
                </Menu.Item>
              </Container>
            </Menu>
          </Segment>
        </Visibility>

        {children}
      </Responsive>
    )
  }
}

DesktopContainer.propTypes = {
  children: PropTypes.node,
}

const ResponsiveContainer = ({ children }) => (
  <div>
    <DesktopContainer>{children}</DesktopContainer>
  </div>
)

ResponsiveContainer.propTypes = {
  children: PropTypes.node,
}

class HomepageLayout extends Component {

  componentWillMount() {
    this.props.fetchUsers();
    console.log(this.props)
  }

  render() {

    console.log(this.props.users[0]);

    return (
      this.props.users[0] ? 
      <ResponsiveContainer>
        <Segment style={{ padding: '8em 0em' }} vertical>
          <Grid container stackable verticalAlign='middle'>
              <Grid.Row>
                <Grid.Column width={6}>
                  <ProfilePic />
                </Grid.Column>
             
                <Grid.Column width={8} >
                <Header size='large' verticalalign='text-top'>Welcome,  {this.props.users[0].name}!</Header>
                  {/* <p style={{ fontSize: '1.33em' }}>
                  
                    We can give your company superpowers to do things that they never thought possible. Let us delight
                    your customers and empower your needs... through pure data analytics.
                  </p>
                 
                  <p style={{ fontSize: '1.33em' }}>
                    Yes that's right, you thought it was the stuff of dreams, but even bananas can be bioengineered.
                  </p> */}
             
                </Grid.Column>
            </Grid.Row>
            {/* <Grid.Row>
              <Grid.Column textAlign='center'>
                <Button size='huge'>Check Them Out</Button>
              </Grid.Column>
            </Grid.Row> */}
          </Grid>
        </Segment>
        
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
      </ResponsiveContainer> : null
    )
  }
}

HomepageLayout.propTypes = {
  fetchUsers: PropTypes.func.isRequired
}


const mapStateToProps = state => ({
  users: state.users.users,
  user: state.users.user
});

//export default HomepageLayout;

export default connect(mapStateToProps, { fetchUsers })(HomepageLayout);
