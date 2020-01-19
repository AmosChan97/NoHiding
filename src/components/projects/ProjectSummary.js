import React from 'react';

const ProjectSummary = ({project}) => {
  return (
    <div className="card z-depth-0 project-summary grey darken-2">
      <div className="card-content white-text text-lighten-3">
        <span className="card-title">{project.title}</span>
        <p className="red-text">Crowded</p>
        <p className="grey-text">Last updated: 1 Jan 2020 14:34:32</p>
      </div>
    </div>
  )
}

export default ProjectSummary;