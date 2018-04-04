export const handleChange = (eName, val) => dispatch => {
  dispatch({
    type: 'HANDLE_FORMCHANGE',
    payload: {
      eName: eName,
      val: val
    }
  });
};

export const clearEmployeeForm = () => dispatch => {
  dispatch({
    type: 'CLEAR_EMPLOYEEFORM',
    payload: ''
  })
}
