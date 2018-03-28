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
    };
    this.handleChange = this.handleChange.bind(this);
    this.toggleView = this.toggleView.bind(this);
    this.getExistingContract = this.getExistingContract.bind(this);
  }

  getExistingContract() {
    axios.post('/api/get/contract', {
      contractName: this.state.existingContract,
    })
      .then((res) => {
        console.log('this is the result: ', res);
      })
      .catch((err) => {
        console.log('ERROR in getExistingContract within Contracts.jsx, error: ', err);
      });
  }

  toggleView() {
    this.setState({
      viewState: !this.state.viewState,
    });
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  render() {
    return (
      <div>
        <Segment style={{ padding: '8em 0em' }} vertical>
          <Grid container stackable>
            <Grid.Row>
              {this.state.viewState ? <NewContractForm /> : <ExistingContract />}
            </Grid.Row>
          </Grid>
        </Segment>
        <Button onClick={this.toggleView}>Click</Button>
        <Button onClick={this.getExistingContract}>GetContract</Button>
      </div>
    );
  }
}
