import React from 'react';
import { Grid, Dropdown, Segment } from 'semantic-ui-react';
import axios from 'axios';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import Metrics from './Metrics.jsx';

import { getEmployeeData } from '../../actions/reportsActions.js';

class Reports extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentChart: '',
      employeeData: null,
      chartData: null,
      currentChartDisplayed: '',
      reportOptions: [
        {
          key: 'Sales Figures',
          value: 'Sales Figures',
          text: 'Sales Figures',
        },
        {
          key: 'Employee Stats',
          value: 'Employee Stats',
          text: 'Employee Stats',
        },
        {
          key: 'Hours worked',
          value: 'Hours worked',
          text: 'Hours worked',
        },
      ],
    };
    this.handleDropdownClick.bind(this);
  }

  handleDropdownClick = (e, data) => {
    const { value } = data;
    axios.post('/get/employee/data', { data: 'data' })
      .then((res) => {
        console.log('successful post with res: ', res.data.rows);
        this.setState({ chartData: res.data.rows });
      })
      .catch((err) => {
        console.log('ERROR in handleDropdownClick axios post, error: ', err);
      });

    if (this.state.currentChart !== value) {
      this.state.reportOptions.forEach((option) => {
        if (value === option.value && this.props.currentChart !== option.value) {
          console.log(`Render ${option.text} Chart`);
          this.setState({
            currentChart: option.value,
          });
        }
      });
    } else {
      console.log('same chart, do not rerender');
    }
  }

  render() {
    return (
      <div className="App-chart-container">
        <Grid>
          <Grid.Row />
          <Grid.Row columns={2}>
            <Grid.Column width={3}>
              <Dropdown
                fluid
                selection
                placeholder="Report Options"
                options={this.state.reportOptions}
                onChange={this.handleDropdownClick}
              />
            </Grid.Column>
            <Grid.Column width={7}>
              <Metrics />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  users: state.users.users,
  currentChart: state.reportsReducer.currentChart,
  chartData: state.reportsReducer.chartData,
});

export default withRouter(connect(mapStateToProps, { getEmployeeData })(Reports));
