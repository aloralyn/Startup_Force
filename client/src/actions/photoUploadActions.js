import { SHOW_PHOTOUPLOAD, SELECT_PHOTO } from './types.js';
// import { cloudName, uploadPreset  } from '../../../config.js';
import { load } from './dashboardActions.js';
import axios from 'axios';

export const showPhotoUploader = () => dispatch => {
  dispatch({
    type: 'SHOW_PHOTOUPLOAD',
    payload: {
      showPhotoUpload: true
    }
  });
};

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
        type: 'HIDE_PHOTOUPLOAD',
        payload: {
          showPhotoUpload: false
        }
      });
    })
    .catch((err) => console.log('There was an error', err));
  };
};
