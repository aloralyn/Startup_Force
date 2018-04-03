import React from 'react';
import { Button, Input} from 'semantic-ui-react';
import axios from 'axios';
import c3 from 'c3';
import * as d3 from "d3";
import moment from 'moment';

export default class Metrics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      companyID: 1,
      contractData: [],
      salesGoal: 100000,
      loaded: false,
    };
    this.getAllContracts = this.getAllContracts.bind(this);
    this.testingFunction = this.testingFunction.bind(this);
    this.setChartColumnData = this.setChartColumnData.bind(this);
    this.setChartXData = this.setChartXData.bind(this);
    this.setPieChartData = this.setPieChartData.bind(this);
    this.setGaugeChartData = this.setGaugeChartData.bind(this);
    this.convertDollarsToNumber = this.convertDollarsToNumber.bind(this);
  }

  componentWillMount() {
    console.log('running');
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

  setChartColumnData(temp = []) {
    this.state.contractData.forEach(({ contract_amount }) => {
      const number = this.convertDollarsToNumber(contract_amount);
      temp.push(number);
    });
    return temp;
  }

  setChartXData(temp = []) {
    this.state.contractData.forEach(({ contract_end_date }) => {
      temp.push(contract_end_date);
    });
    return temp;
  }

  setPieChartData(chartData = {}, formattedChartData = []) {
    this.state.contractData.forEach(({ preferred_name, contract_amount }) => {
      const sales = this.convertDollarsToNumber(contract_amount);
      if (chartData.hasOwnProperty(preferred_name)) chartData[preferred_name].push(sales);
      else chartData[preferred_name] = [sales];
    });
    for (let key in chartData) {
      formattedChartData.push([key, ...chartData[key]]);
    }
    return formattedChartData;
  }

  setGaugeChartData(sum = 0) {
    this.state.contractData.forEach(({ contract_amount }) => {
      const amount = this.convertDollarsToNumber(contract_amount);
      sum += amount;
    });
    return (sum / this.state.salesGoal) * 100;
  }

  convertDollarsToNumber(dollars) {
    return Number(dollars.replace(/[^0-9\.-]+/g,""));
  }

  testingFunction() {
    // console.log('current state: ', this.state);
    // console.log('current props: ', this.props);
    // console.log('output of setChartXDate(): ', this.setChartXData());
    // console.log(this.state.contractData.sort((a, b) => new Date(a.contract_end_date) - new Date(b.contract_end_date)));
    // console.log('this is the contractData: ', this.state.contractData);
  }

  render() {
    const salesChart = c3.generate({
      bindto: '#barchart',
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
            text: 'USD Contract Amount',
            position: 'outer-middle',
          },
          tick: {
            format: d3.format('$,'),
          },
        },
      },
    });

    const pieChart = c3.generate({
      bindto: '#piechart',
      data: {
        columns: this.setPieChartData(),
        type: 'pie',
      },
    });

    const gaugeChart = c3.generate({
      bindto: '#gaugechart',
      data: {
        columns: [
          ['Total Sales', this.setGaugeChartData()],
        ],
        type: 'gauge',
      },
      color: {
        pattern: ['#FF0000', '#F97600', '#F6C600', '#60B044'], // the three color levels for the percentage values.
        threshold: {
          values: [30, 60, 90, 100],
        },
      },
      size: {
        height: 180,
      },
    });

    return (
      <div>
        <div id="barchart"></div>
        <div id="piechart"></div>
        <div id="gaugechart"></div>
        <Button onClick={this.testingFunction}>TestingButton</Button>
      </div>
    );
  }
}
