import React from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { Card, Icon, Image } from 'semantic-ui-react';
import { connect } from 'react-redux'; // connects to the redux store
import { fetchUsers } from '../actions/dashboardActions.js';

class ProfilePic extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     name: 'Leanne Graham',
  //     title: 'Head of HR',
  //     startDate: 'May 2016'
  //   }
  // }

  render() {
    return (
      <Card>
        <Image src='https://res.cloudinary.com/teepublic/image/private/s--UvSUNgzW--/b_rgb:fffffe,t_Heather%20Preview/c_lpad,f_jpg,h_630,q_90,w_1200/v1494469473/production/designs/1595608_1.jpg' />
        <Card.Content>
          <Card.Header>
            {this.props.users[0].first_name}
          </Card.Header>
          <Card.Meta>
            <span className='date'>
              At CompanyXYZ since 2017
            </span>
          </Card.Meta>
          <Card.Description>
            Title: Placeholder
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
  users: state.users.users
})

export default withRouter(connect(mapStateToProps, { fetchUsers })(ProfilePic));
