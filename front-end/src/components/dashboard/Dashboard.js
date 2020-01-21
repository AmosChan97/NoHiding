import React, { Component } from 'react';
import ProjectList from '../projects/ProjectList';
import { connect } from 'react-redux';
class Dashboard extends Component {
  render() {
    const {projects} = this.props;
    return (
      <div className="dashboard container">
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