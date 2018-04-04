import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { Button, Dimmer, Container, Icon, Segment, Header, Grid, Table, Dropdown, Form, Label, Loader } from 'semantic-ui-react';

export default class ExistingContract extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      existingDropdownOptions: [],
      selectedContractData: [],
      loadingState: false,
    };
    this.handleExContractChange = this.handleExContractChange.bind(this);
    this.handleLoading = this.handleLoading.bind(this);
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
    const { existingContractOptions } = this.props;
    if (d.value !== this.state.selectedContractData.contract_name) {
      this.handleLoading();
      setTimeout(this.handleLoading.bind(this), 1000);
      for (let i = 0; i < existingContractOptions.length; i += 1) {
        if (existingContractOptions[i].contract_name === d.value) {
          setTimeout(() => { this.setState({ selectedContractData: existingContractOptions[i] }); }, 1000);
          break;
        }
      }
    }
  }

  handleLoading() {
    this.setState({ loadingState: !this.state.loadingState });
  }

  render() {
    const tableWidth = 3;

    return (
      <Grid.Column width={9}>
        <Form>
          <Form.Field>
            <Label pointing="below" size="large">Select from or Search existing contracts</Label>
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
        <Segment>
          <Header
            size="large"
            >
            {this.state.selectedContractData.contract_name}
            <Header.Subheader>
              Contract Information
            </Header.Subheader>
          </Header>
          <Dimmer active={this.state.loadingState}>
            <Loader size="large">Retrieving Contract Info</Loader>
          </Dimmer>
          <Table attached="bottom" celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell width={tableWidth}>Client Name</Table.HeaderCell>
                <Table.HeaderCell width={tableWidth}>Contract Name</Table.HeaderCell>
                <Table.HeaderCell width={tableWidth}>Contract Amount</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row>
                <Table.Cell width={tableWidth}>{this.state.selectedContractData.client_name}</Table.Cell>
                <Table.Cell width={tableWidth}>{this.state.selectedContractData.contract_name}</Table.Cell>
                <Table.Cell width={tableWidth}>{this.state.selectedContractData.contract_amount}</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>

          <Table celled widths="equal">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell width={tableWidth}>Managing Employee</Table.HeaderCell>
                <Table.HeaderCell width={tableWidth}>Contract Start Date</Table.HeaderCell>
                <Table.HeaderCell width={tableWidth}>Contract End Date</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row>
                <Table.Cell width={tableWidth}>{this.state.selectedContractData.preferred_name}</Table.Cell>
                <Table.Cell width={tableWidth}>{this.state.selectedContractData.contract_start_date}</Table.Cell>
                <Table.Cell width={tableWidth}>{this.state.selectedContractData.contract_end_date}</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </Segment>
        <Form>
          <Form.Group widths="equal">
            <Form.Field>
              <Button
                icon
                labelPosition="right"
                fluid
                type="toggleview"
                onClick={this.props.toggleView}
              >
                Switch to New Contract Form View
                <Icon name="right arrow" />
              </Button>
            </Form.Field>
          </Form.Group>
        </Form>

      </Grid.Column>
    );
  }
}
