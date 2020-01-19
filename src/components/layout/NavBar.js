/**
 * using link or nav link to optimizing routing
 * NavLink is good to apply different styles to the active class
 * higher order component can be added to give it more functionality
 */

import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import About from './About'

class NavBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <nav className="nav-wrapper z-depth-0 grey darken-3">
        <div className="container">
          <Link to="/" className="brand-logo">No Hiding</Link>
        </div>
        <div className="container">
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <Link to="/About" style={{fontSize:30}} className="right">About</Link>
          </ul>
        </div>
      </nav>
    )
  }
}

export default NavBar;