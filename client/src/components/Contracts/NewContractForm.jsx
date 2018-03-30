import React from 'react';
import { Button, Form, Grid, Header, Input, Select, Dropdown } from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import axios from 'axios';

export default class NewContractForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clientName: '',
      contractName: '',
      contractAmount: '',
      awardedTo: '',
      contractStartDate: '',
      contractEndDate: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e, d) {
    this.setState({ [d.name]: d.value });
  }

  handleSubmit() {
    axios.post('/api/add/contract', {
      clientName: this.state.clientName,
      contractName: this.state.contractName,
      contractAmount: this.state.contractAmount,
      awardedTo: this.state.awardedTo,
      contractStartDate: this.state.contractStartDate,
      contractEndDate: this.state.contractEndDate,
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
            <Form.Field
              control={Input}
              label="Contract Start Date"
              name="contractStartDate"
              placeholder="Start Date"
              onChange={this.handleChange}
            />
            <Form.Field
              control={Input}
              label="Contract End Date"
              name="contractEndDate"
              placeholder="End Date"
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Field
              control={Button}
              type="submit"
              onClick={this.handleSubmit}
            >
            Add Contract
            </Form.Field>
          </Form.Group>
        </Form>
      </Grid.Column>
    );
  }
}
