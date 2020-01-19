const backup = [{
	"AP_name": "CC-03-AP04"
}, {
	"AP_name": "CC-03-AP11"
}]

export const fetchAP = () => {
    return (dispatch, getState) => {
      fetch('http://localhost:5000/api/unique_ap')
      .catch(err => {
        console.log(err)
        dispatch({
          type:"FETCH_APERROR",
          APerror: err,
          APsuccess: false
        })
      })
      .then(res => {
        try {
          if (res === undefined) {
            throw TypeError;
          } else {
            return res.json();
          }
        } catch (err) {
          return backup
        }
        
      })
      .then(res => {
        if (res.error) {
          throw(res.error)
        }
        dispatch({
          type: "FETCH_APDATA",
          myAP: res,
          APsuccess: true
        })
        return res;
      })
    }
}