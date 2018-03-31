import React from 'react';
import { Button, Form, Grid, Header, Input, Select, Dropdown } from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import axios from 'axios';
import moment from 'moment';

export default class NewContractForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clientName: '',
      contractName: '',
      contractAmount: '',
      awardedTo: '',
      contractStartDate: null,
      contractEndDate: null,
      dateFormat: 'MM/DD/YYYY',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleStartDateChange = this.handleStartDateChange.bind(this);
    this.handleEndDateChange = this.handleEndDateChange.bind(this);
  }

  handleChange(e, d) {
    console.log('this is e: ', e);
    console.log('this is d: ', d);
    this.setState({ [d.name]: d.value });
  }

  handleStartDateChange(e) {
    this.setState({ contractStartDate: e })
  }

  handleEndDateChange(e) {
    this.setState({ contractEndDate: e })
  }

  handleSubmit() {
    axios.post('/api/add/contract', {
      clientName: this.state.clientName,
      contractName: this.state.contractName,
      contractAmount: this.state.contractAmount,
      awardedTo: this.state.awardedTo,
      contractStartDate: this.state.contractStartDate.format(this.state.dateFormat),
      contractEndDate: this.state.contractEndDate.format(this.state.dateFormat),
    })
      .then(() => this.props.getAllContracts())
      .catch(err => console.log('ERROR in handleSubmit in NewContractForm, error: ', err));
  }

  render() {
    return (
      <Grid.Column width={8}>
        <Header size="large">Add a Contract</Header>
        <Form>
          <Form.Group widths="equal">
            <Form.Field
              control={Input}
              label="Client Name"
              name="clientName"
              placeholder="Client Name"
              onChange={this.handleChange}
            />
            <Form.Field
              control={Input}
              label="Contract Name"
              name="contractName"
              placeholder="Contract Name"
              onChange={this.handleChange}
            />
            <Form.Field
              control={Input}
              label="Contract Amount"
              name="contractAmount"
              placeholder="Contract Amount"
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Dropdown
              fluid
              selection
              search
              label="Employees"
              name="awardedTo"
              placeholder="Employees"
              options={this.props.employeeDropdown}
              onChange={this.handleChange}
            />
            <Form.Field>
              <label>Contract Start Date</label>
              <DatePicker
                selected={this.state.contractStartDate}
                onChange={this.handleStartDateChange}
                placeholderText="Start Date"
              />
            </Form.Field>
            <Form.Field>
              <label>Contract End Date</label>
              <DatePicker
                selected={this.state.contractEndDate}
                onChange={this.handleEndDateChange}
                placeholderText="End Date"
              />
            </Form.Field>
          </Form.Group>
          <Form.Group>
            <Form.Field
              control={Button}
              type="submit"
              onClick={this.handleSubmit}
            >
            Save Contract
            </Form.Field>
          </Form.Group>
        </Form>
      </Grid.Column>
    );
  }
}
