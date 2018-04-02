import React from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { Card, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux'; // connects to the redux store
import { fetchUsers } from '../../actions/dashboardActions.js';
import { showPhotoUploader } from '../../actions/photoUploadActions.js';
import { Image, Transformation } from 'cloudinary-react';

class EditableProfilePic extends React.Component {

  componentDidMount() {
    console.log(this.props);
  }

  render() {
    return (
      <Card>
        <Image cloudName='dblinea1z' publicId={this.props.user.profilepicid}>
       <Transformation width="200" height="250" crop="scale" />
       </Image>
          <Card.Content extra>
            <a onClick={this.props.showPhotoUploader}>
              <Icon name='calendar outline'/>
              Edit photo
            </a>
          </Card.Content>
        <Card.Content>
          <Card.Header>
            {this.props.user.first_name}
          </Card.Header>
          <Card.Meta>
            <span className='date'>
             
            </span>
          </Card.Meta>
          <Card.Description>
            With {this.props.company.company_name} since {this.props.user.start_date}
            <br></br>
            Title: {this.props.user.position}
          </Card.Description>
        </Card.Content>
      </Card>
    )
  }
}

EditableProfilePic.propTypes = {
  fetchUsers: PropTypes.func.isRequired,
  showPhotoUploader: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  user: state.users.user,
  company: state.users.company,
  showPhotoUpload: state.showPhotoUploadReducer.showPhotoUpload

})

export default withRouter(connect(mapStateToProps, { fetchUsers, showPhotoUploader })(EditableProfilePic));
