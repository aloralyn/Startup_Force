import React from 'react';
import { connect } from 'react-redux';
// import { Button } from 'semantic-ui-react';

// @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @
// @ IMPORT COMPONENTS AND ACTIONS HERE
// @ I'm leaving it here as an example

// import UserList from './UserList.jsx';
// import { fetchUsers } from '../actions/userActions';
// import { testButton } from '../actions/buttonPressAction';


// @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @
// @ Not sure if we're going to use this style of connecting to the store
// @ I'm leaving it here as an example
// @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @
// @connect((store) => {
//   return {
//     users: store.users.users,
//     something: store
//   };
// })

export default class App extends React.Component {
  componentWillMount() {
    // starting actions can be invoked here
    // this.props.dispatch(fetchUsers());
  }

  render() {
    // main app render component aka dashboard
    // import components here
    return (
      <div>
        My App Component
      </div>
    );
  }
}
