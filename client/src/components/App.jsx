import React, { Component } from 'react';
import { Provider, connect } from 'react-redux';
import { Router } from 'react-router-dom';
import { syncHistoryWithStore } from 'react-router-redux';
import { createBrowserHistory } from 'history';
import axios from 'axios';
import store from '../store.js';
import Dashboard from './Dashboard.jsx';
import Login from './Login/Login.jsx';

const history = syncHistoryWithStore(createBrowserHistory(), store);

axios.defaults.headers.common['Authorization'] = 'JWT ' + localStorage.getItem('authToken');

class App extends Component {
  componentWillMount() {
    // starting actions can be invoked here
    // this.props.dispatch(fetchUsers());
  }

  render() {
    return (
      <Router history={history}>
      {  !localStorage.authToken ?
        <Login /> :
        <Dashboard />
      }    
      </Router>
    );
  }
}

const mapStateToProps = state => ({
  verified: state.users.verified
});

export default connect(mapStateToProps)(App);
