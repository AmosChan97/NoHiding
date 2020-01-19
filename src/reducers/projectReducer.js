const initState = {
  projects: [
    { id: '1', title: "COM1 BASEMENT", content: "Sensor Placed at Level 3 Office" },
    { id: '2', title: "CENTRAL LIBRARY LEVEL 1", content: "shalara" },
    { id: '3', title: "DUMMY", content: "shalara" },
    { id: '4', title: "DUMMY", content: "shalara" },
    { id: '5', title: "DUMMY", content: "shalara" },
    { id: '6', title: "DUMMY", content: "shalara" },
    { id: '7', title: "DUMMY", content: "shalara" },
    { id: '8', title: "DUMMY", content: "shalara" }],
  data: []
}

const projectReducer = (state = initState, action) => {
  switch (action.type) {
    case 'ADD_PROJECT':
      console.log('created project', action.project);
      return state;
    case 'FETCH_DATA':
      console.log(action.data)
      return {
        ...state,
        data: action.data,
      }
    case 'FETCH_ERROR':
      return state;
    default:
      return state;
  }

}

export default projectReducer;