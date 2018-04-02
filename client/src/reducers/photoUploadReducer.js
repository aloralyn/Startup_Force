import { SHOW_PHOTOUPLOAD, SELECT_PHOTO, HIDE_PHOTOUPLOAD } from '../actions/types';

const initialState = {
  showPhotoUpload: false,
  file: null,
  name: ''
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
      }
    case SELECT_PHOTO: 
      return{
        ...state,
        file: action.payload.file,
        name: action.payload.name
      }
    default: 
      return state;
  }
}

export default showPhotoUploadReducer;