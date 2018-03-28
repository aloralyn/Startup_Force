import { CREATE_EMPLOYEE } from '../actions/types'; 
import { HANDLE_FORMCHANGE } from '../actions/types'; 

const initialState = {
  company_id: 1,
      first_name: '',
      last_name: '',
      preferred_name: '',
      dob: '',
      ssn: '',
      gender: '',
      street_1: '',
      street_2: '',
      city: '',
      zip_code: '',
      state: '',
      email: '',
      phone_number: '',
      linkedin_url: '',
      position: '',
      employee_status: '',
      start_date: '',
      department: '',
      division: '',
      reports_to: '',
      wage: '',
      pay_per: '',
      pay_type: '',
      is_manager: '',
      pw: ''
};

function newEmployeeReducer(state = initialState, action){
  switch(action.type) {
    case HANDLE_FORMCHANGE:
      return {
        ...state,
        [action.payload.eName]: action.payload.val
      };
    default: 
      return state;
  }
}

export default newEmployeeReducer;