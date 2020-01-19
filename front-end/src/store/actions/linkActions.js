export const outLink = (result) => {
  return (dispatch, getState) => {
    dispatch({type:'LINK_OUT', result: result })
  }
}