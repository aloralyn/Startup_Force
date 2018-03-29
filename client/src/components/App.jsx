import React, { Component } from 'react';
import { Provider, connect } from 'react-redux';
import { Router } from 'react-router-dom';
import { syncHistoryWithStore } from 'react-router-redux';
import { createBrowserHistory } from 'history';
import axios from 'axios';
import store from '../store.js';
import Dashboard from './Dashboard.jsx';
import Login from './Login/Login.jsx';
import { load } from '../actions/dashboardActions.js';
import Test from './Login/Test.jsx';

const history = syncHistoryWithStore(createBrowserHistory(), store);

axios.defaults.headers.common['Authorization'] = 'JWT ' + localStorage.getItem('authToken');

class App extends Component {
  componentWillMount() {
    // starting actions can be invoked here
    if (localStorage.authToken) { this.props.load(); }
  }

  render() {
    // if (!localStorage.authToken ) {
    //   return (
    //     <Router history={history}>
    //       <Test/>
    //     </Router>
    //   )
    // } else {
    //     return (
    //       <Router history={history}>
    //         <Dashboard/>
    //       </Router>
    //     )
    //   }
    // }
    return (
      <Router history={history}>
      {  !localStorage.authToken ?
        <Test/> :
        <Dashboard/>
      }    
      </Router>
    );
  }
}

const mapStateToProps = state => ({
  verified: state.users.verified
});

export default connect(mapStateToProps, { load })(App);
