import React from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { Card, Icon, Image } from 'semantic-ui-react';
import { connect } from 'react-redux'; // connects to the redux store
import { fetchUsers } from '../actions/dashboardActions.js';

class ProfilePic extends React.Component {

  render() {
    return (
      <Card>
        <Image src='https://scontent-lga3-1.xx.fbcdn.net/v/t31.0-8/11834699_10100745305693490_6590435011584098904_o.jpg?_nc_cat=0&oh=adf8464d3eb0e95d5eafa6feb83ca49c&oe=5B44C41D' />
        <Card.Content>
          <Card.Header>
            {this.props.user.first_name}
          </Card.Header>
          <Card.Meta>
            <span className='date'>
             
            </span>
          </Card.Meta>
          <Card.Description>
            Title: {this.props.user.position}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <a>
            <Icon name='calendar outline' />
            Request Time Off
          </a>
        </Card.Content>
      </Card>
    )
  }
}

ProfilePic.propTypes = {
  fetchUsers: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  user: state.users.user,
  company: state.users.company
})

export default withRouter(connect(mapStateToProps, { fetchUsers })(ProfilePic));
