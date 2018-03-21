import React from 'react';
// import d3 from 'd3';
import Chart from './Chart.jsx';

class Reports extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      placeholder: '',
    };
  }

  render() {
    console.log('something');
    return (
      <div className="App-chart-container">
        HiHiHi
        <Chart />
      </div>
    );
  }
}

export default Reports;
