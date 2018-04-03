import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { Button, Container, Header, Grid, Table, Dropdown, Form } from 'semantic-ui-react';

export default class ExistingContract extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      existingDropdownOptions: [],
      selectedContractData: [],
    };
    this.handleExContractChange = this.handleExContractChange.bind(this);
  }

  componentWillMount() {
    const tempDropdownOptions = [];
    this.props.existingContractOptions.forEach((contract) => {
      tempDropdownOptions.push({
        text: contract.contract_name,
        value: contract.contract_name,
      });
    });
    this.setState({
      existingDropdownOptions: tempDropdownOptions,
      selectedContractData: this.props.existingContractOptions[0],
    });
  }

  handleExContractChange(e, d) {
    // match contract from props and setState using that contract data
    // contracts can be placed in a hash table for quicker lookup
    for (let i = 0; i < this.props.existingContractOptions.length; i += 1) {
      if (this.props.existingContractOptions[i].contract_name === d.value) {
        this.setState({
          selectedContractData: this.props.existingContractOptions[i],
        });
        break;
      }
    }
  }

  render() {
    return (
      <Grid.Column width={8}>
        <Header size="large">"{this.state.selectedContractData.contract_name}" Contract Information</Header>
        <Table attached="bottom" celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Client Name</Table.HeaderCell>
              <Table.HeaderCell>Contract Name</Table.HeaderCell>
              <Table.HeaderCell>Contract Amount</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell>{this.state.selectedContractData.client_name}</Table.Cell>
              <Table.Cell>{this.state.selectedContractData.contract_name}</Table.Cell>
              <Table.Cell>{this.state.selectedContractData.contract_amount}</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>

        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Managing Employee</Table.HeaderCell>
              <Table.HeaderCell>Contract Start Date</Table.HeaderCell>
              <Table.HeaderCell>Contract End Date</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell>{this.state.selectedContractData.preferred_name}</Table.Cell>
              <Table.Cell>{this.state.selectedContractData.contract_start_date}</Table.Cell>
              <Table.Cell>{this.state.selectedContractData.contract_end_date}</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>

        <Form>
          <Form.Field>
            <label>Select from existing contracts</label>
            <Dropdown
              placeholder="Existing Contracts"
              label="Existing Contracts List"
              search
              selection
              options={this.state.existingDropdownOptions}
              defaultValue={this.state.existingDropdownOptions[0].value}
              onChange={this.handleExContractChange}
            />
          </Form.Field>
        </Form>
      </Grid.Column>
    );
  }
}
