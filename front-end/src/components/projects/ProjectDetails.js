import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchPingData } from '../../store/actions/projectActions';
import { fetchAP } from '../../store/actions/chartActions';
import piLogo from '../../img/raspberrypi_logo.png'
import aiImage from '../../img/aiImage.jpg'
import aiData from '../../img/aiData.json'
/**
 * Specific details for each Pi Project */ class ProjectDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      success: false,
      data: [],
      date: [new Date('2019-01-01Z00:00:00:000'), new Date('2021-01-01Z00:00:00:000')],
      myAP: [],
      APbutton: []
    }
  }

  onChange = date => this.setState({ date }) //NOT USED

  componentDidMount() {
    this.props.fetchPingData();
    this.props.fetchAP();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.data === undefined && this.props.data !== undefined) {
      this.setState({
        ...this.state,
        data: this.props.data
      })
    }
    if (prevProps.myAP === undefined && this.props.myAP !== undefined) {
      this.setState({
        ...this.state,
        myAP: this.props.myAP
      })
    }
  }
  callbackFunction = (childData) => {
    this.setState({ APbutton: childData })
  }
  render() {
    const { id } = this.props.match.params;
    const ind = parseInt(id) - 1;
    const project = this.props.projects
    if (ind === 0) {
      return (
        <div>
          <div className="center center-align project-details">
            <div className="row">
              <div className="card white col s12">
                <div className="card-content center">
                  <div className="center-align">
                    <img src={piLogo} className="left center-align col" alt="Pi_Logo" style={{ width: 170, height: 120 }}></img>
                  </div>
                  <div>
                    <span className="card-title">{project[ind].title}</span>
                    <p>{project[ind].content}</p>
                    <p> Sensor Status: <span className="green-text text-darken-2"> Online</span></p>
                    <p>Capacity: <span className="red-text text-darken-2"> {aiData}</span></p>
                  </div>
                </div>
              </div>
            </div>
            <img src={aiImage}></img>
          </div>
        </div>
      )
    } else {
      return (
        <div className="container section project-details grey darken-2">
          <div className="card z-depth-0">
            <div className="card-content">
              <span className="card-title">Invalid ID</span>
              <p>No Pis associated with this ID</p>
            </div>
          </div>
        </div>
      )
    }
  }
}

const matchStateToProps = (globalState) => {
  console.log("GLOBAL", globalState);
  return {
    projects: globalState.project.projects,
    data: globalState.project.data,
    myAP: globalState.myAP
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    fetchPingData: fetchPingData,
    fetchAP: fetchAP
  }, dispatch)

export default connect(matchStateToProps, mapDispatchToProps)(ProjectDetails);
