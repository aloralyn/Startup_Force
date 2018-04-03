import React from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// ADD IMPORT OF Contracts OPTIONS HERE (FOR REDUX REFACTOR)
import { Button, Container, Grid, Header, Icon, Segment } from 'semantic-ui-react';
import NewContractForm from './NewContractForm.jsx';
import ExistingContract from './ExistingContract.jsx';
import axios from 'axios';

const awardedToOptions = [
  // POPULATE THIS LIST BASED ON LOGGED IN USER'S EMPLOYEES
];

export default class Contracts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      viewState: true,
      existingContract: 'HiR',
      existingContractOptions: [],
      companyID: 1,
      buttonText: 'Show Existing Contracts',
      employees: [],
      employeeDropdown: [],
      loadedPreviously: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.toggleView = this.toggleView.bind(this);
    this.getExistingContract = this.getExistingContract.bind(this);
    this.getAllContracts = this.getAllContracts.bind(this);
    this.getEmployees = this.getEmployees.bind(this);
  }

  componentDidMount() {
    if (!this.state.loadedPreviously) {
      this.getAllContracts();
      this.getEmployees();
      this.setState({ loadedPreviously: true });
    }
  }

  getExistingContract() {
    axios.post('/api/get/contract', {
      contractName: this.state.existingContract,
    })
      .then(res => console.log('this is the result: ', res))
      .catch(err => console.error('ERROR in getExistingContract within Contracts.jsx, error: ', err));
  }

  getAllContracts() {
    axios.post('/api/get/contract/all', {
      companyID: this.state.companyID,
    })
      .then(res => this.setState({ existingContractOptions: res.data }))
      .catch(err => console.error('ERROR in getAllContracts within Contracts.jsx, error: ', err));
  }

  getEmployees() {
    axios.post('/api/get/employees/all', {
      companyID: this.state.companyID,
    })
      .then((res) => {
        const temp = [];
        res.data.forEach((employee, i) => {
          temp.push({
            text: employee.preferred_name,
            value: i+1,
          });
        });
        this.setState({
          employees: res.data,
          employeeDropdown: temp,
        });
      })
      .catch(err => console.error('ERROR in getEmployees in Contracts, error: ', err));
  }

  toggleView() {
    this.setState({ viewState: !this.state.viewState }, () => {
      this.state.buttonText === 'Show Existing Contracts'
        ? this.setState({ buttonText: 'Back to New Contract Edit View' })
        : this.setState({ buttonText: 'Show Existing Contracts' })
    });
  }


  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <div>
        <Segment style={{ padding: '8em 0em' }} vertical>
          <Grid container stackable width={8}>
            <Grid.Row>
              {
                this.state.viewState
                  ? <NewContractForm
                    getAllContracts={this.getAllContracts}
                    toggleView={this.toggleView}
                    employees={this.state.employees}
                    employeeDropdown={this.state.employeeDropdown}
                  />
                  : <ExistingContract
                    toggleView={this.toggleView}
                    existingContractOptions={this.state.existingContractOptions}
                    employees={this.state.employees}
                    employeeDropdown={this.state.employeeDropdown}
                  />
              }
            </Grid.Row>
          </Grid>
        </Segment>
      </div>
    );
  }
}
