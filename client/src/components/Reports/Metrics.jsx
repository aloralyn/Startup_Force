import React from 'react';
import { Button } from 'semantic-ui-react';
import axios from 'axios';
import c3 from 'c3';
import * as d3 from "d3";
import moment from 'moment';

export default class Metrics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      placeholder: '',
      companyID: 1,
      contractData: [],
    };
    this.getAllContracts = this.getAllContracts.bind(this);
    this.testingFunction = this.testingFunction.bind(this);
    this.setChartColumnData = this.setChartColumnData.bind(this);
    this.setChartXData = this.setChartXData.bind(this);
  }

  // @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @
  // @ Contract Data is an array that holds all the
  // @ data about the contracts that will be used by the charts
  // @ We will need to map this array and format the data for the charts
  // @ columns will be the contract amounts that will be plotted over time

  componentWillMount() {
    this.getAllContracts();
  }

  getAllContracts() {
    axios.post('/api/get/contract/all/data', {
      companyID: this.state.companyID,
    })
      .then((res) => {
        res.data.sort((a, b) => new Date(a.contract_end_date) - new Date(b.contract_end_date));
        this.setState({ contractData: res.data });
      })
      .catch(err => console.error('ERROR in getAllContracts within Metrics.jsx, error: ', err));
  }

  setChartColumnData() {
    const temp = [];
    this.state.contractData.forEach((item) => {
      const number = Number(item.contract_amount.replace(/[^0-9\.-]+/g,""));
      temp.push(number);
    });
    return temp;
  }

  setChartXData() {
    const temp = [];
    this.state.contractData.forEach((item) => {
      temp.push(item.contract_end_date);
    });
    return temp;
  }

  testingFunction() {
    console.log('current state: ', this.state);
    console.log('current props: ', this.props);
    console.log('output of setChartXDate(): ', this.setChartXData());
    console.log(this.state.contractData.sort((a, b) => new Date(a.contract_end_date) - new Date(b.contract_end_date)));
  }

  render() {
    const chart = c3.generate({
      bindto: '#chart',
      x: 'x',
      data: {
        columns: [
          ['Contract Amount', ...this.setChartColumnData()],
        ],
        type: 'bar',
      },
      axis: {
        x: {
          type: 'category',
          categories: [...this.setChartXData()],
          tick: {
            rotate: 45,
          },
        },
        y: {
          label: {
            text: 'USD',
            position: 'outer-middle',
          },
          tick: {
            format: d3.format('$,'),
          },
        },
      },
    });

    return (
      <div>
        <div id="chart"></div>
        <Button onClick={this.testingFunction}>TestingButton</Button>
      </div>
    );
  }
}
