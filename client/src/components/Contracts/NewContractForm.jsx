import React from 'react';
import { Button, Form, Grid, Header, Input, Dropdown, Message, TextArea, TransitionablePortal, Segment, Icon } from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import axios from 'axios';
import moment from 'moment';

const ErrorMessage = () => (
  <Message
    negative
    header="There were some errors with your submission"
    list={[
      'Please be sure to complete all required fields',
    ]}
  />
);

export default class NewContractForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clientName: '',
      contractName: '',
      contractAmount: '',
      awardedToId: '',
      contractStartDate: null,
      contractEndDate: null,
      dateFormat: 'MM/DD/YYYY',
      contractDescription: '',
      confirm: false,
      showError: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleStartDateChange = this.handleStartDateChange.bind(this);
    this.handleEndDateChange = this.handleEndDateChange.bind(this);
    this.handleSuccessfulAdd = this.handleSuccessfulAdd.bind(this);
    this.resetState = this.resetState.bind(this);
    this.checkInputs = this.checkInputs.bind(this);
  }

  handleChange(e, d) {
    this.setState({ [d.name]: d.value });
  }

  handleStartDateChange(e) {
    this.setState({ contractStartDate: e })
  }

  handleEndDateChange(e) {
    this.setState({ contractEndDate: e })
  }

  handleSubmit() {
    if (this.checkInputs()) {
      axios.post('/api/add/contract', {
        clientName: this.state.clientName,
        contractName: this.state.contractName,
        contractAmount: this.state.contractAmount,
        awardedToId: this.state.awardedToId,
        contractStartDate: this.state.contractStartDate.format(this.state.dateFormat),
        contractEndDate: this.state.contractEndDate.format(this.state.dateFormat),
        contractDescription: this.state.contractDescription,
      })
        .then(() => {
          this.handleSuccessfulAdd();
          this.resetState();
          this.props.getAllContracts();
        })
        .catch(err => console.log('ERROR in handleSubmit in NewContractForm, error: ', err));
    } else {
      this.setState({ showError: true });
    }
  }

  checkInputs() {
    const entries = Object.entries(this.state);
    let res = true;
    entries.forEach((input) => {
      if (!input[1]
        && input[0] !== 'confirm'
        && input[0] !== 'contractDescription'
        && input[0] !== 'showError') {
        res = false;
      }
    });
    if (!res) return false;
    return true;
  }

  resetState() {
    this.setState({
      clientName: '',
      contractName: '',
      contractAmount: '',
      awardedToId: '',
      contractStartDate: null,
      contractEndDate: null,
      contractDescription: '',
      confirm: false,
      showError: false,
    });
  }

  handleSuccessfulAdd() {
    this.setState({ confirm: !this.state.confirm });
  }

  render() {
    return (
      <div>
        <TransitionablePortal open={this.state.confirm} transition={{ animation: 'fly up', duration: '1500' }}>
          <Segment style={{ left: '40%', position: 'fixed', top: '40%', zIndex: 991000 }}>
            <Icon name="check" size={'huge'} color={'green'}/>
            <p>Successfully Saved Contract!</p>
          </Segment>
        </TransitionablePortal>
        <Grid.Column width={9}>
          <Header style={{ fontSize: '2em', fontFamily: 'Titillium Web', color: '#1c3448'}}>New Contract Form</Header>
          <Segment>
            <Form>
              <Form.Group widths="equal">
                <Form.Field
                  value={this.state.clientName}
                  control={Input}
                  label="Client Name"
                  name="clientName"
                  placeholder="Client Name"
                  onChange={this.handleChange}
                />
                <Form.Field
                  value={this.state.contractName}
                  control={Input}
                  label="Contract Name"
                  name="contractName"
                  placeholder="Contract Name"
                  onChange={this.handleChange}
                />
                <Form.Field
                  value={this.state.contractAmount}
                  type="number"
                  min="0.01"
                  step="0.01"
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
                  label="Employee In Charge"
                  name="awardedToId"
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
              <Form.Group widths="equal">
                <Form.Field
                  id="form-contract-new-description"
                  value={this.state.contractDescription}
                  control={TextArea}
                  label="Contract Description"
                  name="contractDescription"
                  placeholder="Enter Description of Contract"
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group widths="equal">
                <Form.Field
                  control={Button}
                  positive
                  fluid
                  type="submit"
                  style={{fontFamily: 'Titillium Web'}}
                  onClick={this.handleSubmit}
                >
                  Save Contract
                </Form.Field>
              </Form.Group>
            </Form>
          </Segment>
          <Form.Group widths="equal">
            <Form.Field>
              <Button
                icon
                labelPosition="left"
                fluid
                type="toggleview"
                style={{fontFamily: 'Titillium Web'}}
                onClick={this.props.toggleView}
              >
                <Icon name="left arrow" />
                Search Existing Contracts
              </Button>
            </Form.Field>
          </Form.Group>
          {this.state.showError ? <ErrorMessage /> : null }
        </Grid.Column>
      </div>
    );
  }
}
