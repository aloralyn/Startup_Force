// import React from 'react';
// import { Grid, Dropdown, Segment } from 'semantic-ui-react';
// import axios from 'axios';
// import { withRouter } from 'react-router';
// import { connect } from 'react-redux';
//
// import Metrics from './Metrics.jsx';
//
// import { getEmployeeData } from '../../actions/reportsActions.js';
//
// class Reports extends React.Component {
//   constructor(props) {
//     super(props);
//   }
//
//   render() {
//     return (
//       <div className="App-chart-container">
//         <Grid>
//           <Grid.Row />
//           <Grid.Column width={9}>
//             <Metrics />
//           </Grid.Column>
//         </Grid>
//       </div>
//     );
//   }
// }
//
// const mapStateToProps = state => ({
//   users: state.users.users,
//   currentChart: state.reportsReducer.currentChart,
//   chartData: state.reportsReducer.chartData,
// });
//
// export default withRouter(connect(mapStateToProps, { getEmployeeData })(Reports));
