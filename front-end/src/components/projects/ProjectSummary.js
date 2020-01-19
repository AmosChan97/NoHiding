import React from 'react';

const ProjectSummary = ({project}) => {
  return (
    <div className="card z-depth-0 project-summary grey darken-2">
      <div className="card-content white-text text-lighten-3">
        <span className="card-title">{project.title}</span>
        <p className="green-text">Spacious</p>
  <p className="grey-text">Last updated: 01-19-2020</p>
      </div>
    </div>
  )
}

export default ProjectSummary;