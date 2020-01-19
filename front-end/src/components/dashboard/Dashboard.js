import React, { Component } from 'react';
import ProjectList from '../projects/ProjectList';
import { connect } from 'react-redux';
import ai_image from '../../img/ai_image.jpg'
class Dashboard extends Component {
  render() {
    const {projects} = this.props;
    return (
      <div className="dashboard container" style={{backgroundImage: `url(${ai_image})`}}>
        <div className="row">
          <ProjectList projects={projects}/>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    projects: state.project.projects
  }
} 

export default connect(mapStateToProps)(Dashboard);