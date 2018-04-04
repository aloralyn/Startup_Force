import { CREATE_EMPLOYEE, HANDLE_FORMCHANGE, CLEAR_EMPLOYEEFORM } from '../actions/types'; 

const initialState = {
      company_id: '',
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
      start_date: null,
      department: '',
      division: '',
      reports_to: '',
      wage: '',
      pay_per: '',
      pay_type: '',
      is_manager: '',
      pw: '',
      personal_email: ''
};

function newEmployeeReducer(state = initialState, action){
  switch(action.type) {
    case HANDLE_FORMCHANGE:
      return {
        ...state,
        [action.payload.eName]: action.payload.val
      };
    case CLEAR_EMPLOYEEFORM:
      return {
        ...state,
        company_id: '',
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
        start_date: null,
        department: '',
        division: '',
        reports_to: '',
        wage: '',
        pay_per: '',
        pay_type: '',
        is_manager: '',
        pw: '',
        personal_email: ''
      }
    default: 
      return state;
  }
}

export default newEmployeeReducer;