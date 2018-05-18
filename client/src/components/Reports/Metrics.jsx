import React from 'react';
import { Button, Input, Divider, Header } from 'semantic-ui-react';
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
      salesTotal: null,
    };
    this.getAllContracts = this.getAllContracts.bind(this);
    this.setChartColumnData = this.setChartColumnData.bind(this);
    this.setChartXData = this.setChartXData.bind(this);
    this.setPieChartData = this.setPieChartData.bind(this);
    this.setGaugeChartData = this.setGaugeChartData.bind(this);
    this.convertDollarsToNumber = this.convertDollarsToNumber.bind(this);

    const pieChart = c3.generate({
      bindto: '#piechart',
      data: {
        columns: this.setPieChartData(),
        type: 'pie',
      },
    });
  }

  componentWillMount() {
    this.getAllContracts();
  }

  getAllContracts() {
    axios.post('/api/get/contract/all/data', {
      companyID: this.state.companyID,
    })
      .then((res) => {
        res.data.sort((a, b) => new Date(a.contract_end_date) - new Date(b.contract_end_date));
        this.setState({ contractData: res.data }, () => console.log('updated contractData Array'));
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
    this.setState({ salesTotal: sum });
    return (sum / this.state.salesGoal) * 100;
  }

  convertDollarsToNumber(dollars) {
    return Number(dollars.replace(/[^0-9\.-]+/g,""));
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

    return (
      <div>
        <br />
        <Header size="large" textAlign="center" style={{fontFamily: 'Titillium Web'}}>Contract Revenue by Date</Header>
        <div id="barchart" />
        <Divider />
        <br />
        <Header size="large" textAlign="center" style={{fontFamily: 'Titillium Web'}}>Percentage Sales by Team Member</Header>
        <div id="piechart" />
        <Divider />
      </div>
    );
  }
}
