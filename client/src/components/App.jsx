import React, { Component } from 'react';
import { Provider, connect } from 'react-redux';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import { syncHistoryWithStore } from 'react-router-redux';
import { createBrowserHistory } from 'history';
import axios from 'axios';
import store from '../store.js';
import Login from './Main/Login.jsx';
import { load } from '../actions/dashboardActions.js';
import Main from './Main/Main.jsx';
import DesktopContainer from './DesktopContainer.jsx';

const history = syncHistoryWithStore(createBrowserHistory(), store);

axios.defaults.headers.common['Authorization'] = 'JWT ' + localStorage.getItem('authToken');

class App extends Component {
  componentWillMount() {
    // starting actions can be invoked here
    if (localStorage.authToken) { this.props.load(); }
  }


  render() {
    return (
      <Router history={history}>
        {  !localStorage.authToken ?
        <Main/> :
        <DesktopContainer />
        }       
      </Router>
    )
  }
}

const mapStateToProps = state => ({
  verified: state.users.verified,
  user: state.users.user
});

export default connect(mapStateToProps, { load })(App);
