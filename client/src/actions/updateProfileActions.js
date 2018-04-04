import { SHOW_PHOTOUPLOAD, SELECT_PHOTO, LOGIN, UPDATE_USERDATA } from './types.js';
import axios from 'axios';

export const showPhotoUploader = () => dispatch => {
  dispatch({
    type: 'SHOW_PHOTOUPLOAD',
    payload: {
      showPhotoUpload: true
    }
  });
};

export const showProfileEditor = (user) => dispatch => {
  dispatch({
    type: 'SHOW_EDITPROFILE',
    payload: {
      showEditProfile: true,
      preferred_name: user.preferred_name,
      street_1: user.street_1,
      street_2: user.street_2,
      city: user.city,
      zip_code: user.zip_code,
      state: user.state,
      phone_number: user.phone_number,
      linkedin_url: user.linkedin_url,
      pw: user.pw,
      personal_email: user.personal_email
    }
  });
};

export const updateProfile = (newInfo) => dispatch => {
  axios.post('/api/update_profile', newInfo)
    .then(response => {
      console.log('response.data', response.data)
      dispatch({
        type: UPDATE_USERDATA,
        payload: response.data
      })
      dispatch({
        type: 'HIDE_EDITPROFILE',
        payload: {
          showEditProfile: false
        }
      });
    }).catch(err => console.log('There was an error updating a profile', err))
}

export const onDrop = (files) => dispatch => {
  dispatch({
    type: 'SELECT_PHOTO',
    payload: {
      file: files[0],
      name: files[0].name
    }
  })
};

export const handlePhotoUpload = (file, userId) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'rdi5qpfu');
  const xhr = new XMLHttpRequest();

  return (dispatch) => {
    xhr.open('POST', `https://api.cloudinary.com/v1_1/dblinea1z/image/upload`, false );
    xhr.send(formData);
    const imageResponse = JSON.parse(xhr.responseText);
    axios.post('/api/update_photo', {
      id: userId,
      profilePicId: imageResponse.public_id
    }).then((response) => {
      dispatch({
        type: UPDATE_USERDATA,
        payload: response.data
      });
      dispatch({
        type: 'HIDE_PHOTOUPLOAD',
        payload: {
          showPhotoUpload: false
        }
      });
    })
    .catch((err) => console.log('There was an error', err));
  };
};


