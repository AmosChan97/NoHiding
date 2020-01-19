const initState = {
    myAP: []
  }
  
  const chartReducer = (state = initState, action) => {
    switch (action.type) {
      case 'FETCH_APDATA':
        console.log("APaction", action.myAP)
        return {
          ...state,
          myAP: action.myAP,
        }
      case 'FETCH_APERROR':
        return state;
      default: 
        return state;
    }
    
  }
  
  export default chartReducer;