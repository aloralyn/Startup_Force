import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Provider } from 'react-redux';
import store from '../store.js';
import {  Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import HomepageLayout from './Homepage.jsx'

import { createBrowserHistory } from 'history';

const history = syncHistoryWithStore(createBrowserHistory(), store);

class App extends Component {
  componentWillMount() {
    // starting actions can be invoked here
    // this.props.dispatch(fetchUsers());
  }

  render() {
    // main app render component aka dashboard
    // import components here
    return (
      <Provider store={store}>
        <Router history={history}>
          <Route exact path="/" component={HomepageLayout} />
        </Router>
    </Provider>
    );
  }
}

export default App;
