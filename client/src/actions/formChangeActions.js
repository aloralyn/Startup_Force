export const handleChange = (eName, val) => dispatch => {
  dispatch({
    type: 'HANDLE_FORMCHANGE',
    payload: {
      eName: eName,
      val: val
    }
  });
};
