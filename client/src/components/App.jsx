import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from '../store.js';
import { Router } from 'react-router-dom';
import { syncHistoryWithStore } from 'react-router-redux';
import Dashboard from './Dashboard.jsx'

import { createBrowserHistory } from 'history';

const history = syncHistoryWithStore(createBrowserHistory(), store);

class App extends Component {
  componentWillMount() {
    // starting actions can be invoked here
    // this.props.dispatch(fetchUsers());
  }

  render() {

    return (
      <Provider store={store}>
        <Router history={history}>
          <Dashboard />
        </Router>
    </Provider>
    );
  }
}

export default App;
