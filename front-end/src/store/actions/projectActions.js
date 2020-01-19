export const addProject = (project) => {
  return (dispatch, getState) => {
    // make async call to database here
    dispatch({type:'ADD_PROJECT', project: project });
  }
};

const backup =  require('../../components/projects/sampleData.json');


export const fetchPingData = () => {
  return (dispatch, getState) => {
    fetch('http://localhost:5000/api/get_ping_info')
    .catch(err => {
      console.log(err)
      dispatch({
        type:"FETCH_ERROR",
        error: err,
        data: backup,
        success: false
      })
    })
    .then(res => {
      try {
        if (res === undefined) {
          throw TypeError;
        }
        return res.json()
      } catch (err) {
        console.log(err);
        return backup;
      }
    })
    .then(res => {
      if (res.error) {
        throw(res.error)
      }
      dispatch({
        type: "FETCH_DATA",
        data: res,
        success: true
      })
      return res;
    })
  }
}
