export const verifyUser = (result) => {
  return (dispatch, getState) => {
    // make async call to database here
    dispatch({type:'USER_VERIFICATION', result: result });
  }
};

export default verifyUser;

