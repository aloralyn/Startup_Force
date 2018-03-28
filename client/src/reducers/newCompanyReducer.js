import { HANDLE_SIGNUPCHANGE } from '../actions/types';

const initialState = {
  company_name: '',
  website: '',
  street_1: '',
  street_2: '',
  zip_code: '',
  state: '',
  first_name: '',
  last_name: '',
  email: '',
  pw: ''
};

function newCompanyReducer(state = initialState, action) {
  switch(action.type) {
    case HANDLE_SIGNUPCHANGE:
      return {
        ...state,
        [action.payload.eName]: action.payload.val
      };
    default: 
      return state;
  }
}

export default newCompanyReducer;