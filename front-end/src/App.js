/**
 * Demostrating routes
 * Just pure routes would force a reload on every click
 * Switch will do cascading checks from the top to bottom
 * jsonplaceholder.typicode.com for dummy data
 * f
 */

import React, { Component } from 'react';
import NavBar from './components/layout/NavBar';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Dashboard from './components/dashboard/Dashboard';
import ProjectDetails from './components/projects/ProjectDetails';
import About from './components/layout/About';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <NavBar/>
          <Switch>
            <Route exact path='/' component={Dashboard} />
            <Route exact path='/About' component={About}/>
            <Route exact path='/project/:id' component={ProjectDetails} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }  
}

export default App;
