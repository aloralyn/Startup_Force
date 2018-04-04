import { SHOW_PHOTOUPLOAD, SELECT_PHOTO, HIDE_PHOTOUPLOAD, SHOW_EDITPROFILE, HANDLE_FORMCHANGE } from '../actions/types';

const initialState = {
  showPhotoUpload: false,
  showEditProfile: false,
  file: null,
  name: '',
  preferred_name: '',
  street_1: '',
  street_2: '',
  city: '',
  zip_code: '',
  state: '',
  phone_number: '',
  linkedin_url: '',
  pw: '',
  personal_email: ''
};

function showPhotoUploadReducer(state = initialState, action){
  switch(action.type) {
    case SHOW_PHOTOUPLOAD:
      return {
        ...state,
        showPhotoUpload: action.payload.showPhotoUpload
      };
    case HIDE_PHOTOUPLOAD:
      return {
        ...state,
        showPhotoUpload: action.payload.showPhotoUpload
      };
    case SELECT_PHOTO: 
      return{
        ...state,
        file: action.payload.file,
        name: action.payload.name
      };
    case SHOW_EDITPROFILE:
      return {
        ...state,
        showEditProfile: action.payload.showEditProfile,
        preferred_name: action.payload.preferred_name,
        street_1: action.payload.street_1,
        street_2: action.payload.street_2,
        city: action.payload.city,
        zip_code: action.payload.zip_code,
        state: action.payload.state,
        phone_number: action.payload.phone_number,
        linkedin_url: action.payload.linkedin_url,
        pw: action.payload.pw,
        personal_email: action.payload.personal_email
      };
    case 'HANDLE_PROFILECHANGE':
      return {
        ...state,
        [action.payload.eName]: action.payload.val
      };
    case 'HIDE_EDITPROFILE':
      return {
        ...state,
        showEditProfile: action.payload.showEditProfile
      }
    default: 
      return state;
  }
}

export default showPhotoUploadReducer;