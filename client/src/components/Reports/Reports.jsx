import React from 'react';
import { Grid, Dropdown, Segment } from 'semantic-ui-react';
import Chart from './Chart.jsx';

export default class Reports extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentChart: '',
    };

    this.reportOptions = [
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
    ];

    this.handleDropdownClick = this.handleDropdownClick.bind(this);
  }

  handleDropdownClick(e, data) {
    const { value } = data;

    if (this.state.currentChart !== value) {
      this.reportOptions.forEach((option) => {
        if (value === option.value && this.state.currentChart !== option.value) {
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
                options={this.reportOptions}
                onChange={this.handleDropdownClick}
              />
            </Grid.Column>
            <Grid.Column width={7}>
              <Chart />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}
