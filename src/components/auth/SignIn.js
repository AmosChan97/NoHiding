/**
 * have to be class based to store user input field.  
 */
import React, { Component } from 'react';
import { connect } from 'react-redux'
import { verifyUser } from '../../store/actions/authActions';

class SignIn extends Component {
  state = {
    username: '',
    password: '',
    success: false,
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }
  
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.verifyUser(this.state);
    if (this.state.success) {
      this.props.history.push('/dashboard');
    }
  }

  render() {
    return (
      <div className='container'>
        <form onSubmit={this.handleSubmit} className="white">
            <h5 className="grey-text text-darken-3">Sign In</h5>
            <div className="input-field">
              <label htmlFor="username">Username</label>
              <input type="text" id="username" onChange={this.handleChange}/>
            </div>
            <div className="input-field">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" onChange={this.handleChange}/>
            </div>
            <div className="input-field">
              <button className="btn blue lighten-1 z-depth-0">Login</button>
            </div>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    verifyUser: (details) => dispatch(verifyUser(details))
  }
}

const mapStateToProps = (state) => {
  return {
    success: state.auth.success
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);