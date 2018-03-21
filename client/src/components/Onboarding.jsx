import React, { Component } from 'react';
import NewEmployeeForm from './NewEmployeeForm.jsx';
import NewDepartmentForm from './NewDepartmentForm.jsx';

import {
  Button,
  Container,
  Grid,
  Header,
  Icon,
  Segment
} from 'semantic-ui-react'


 class Onboarding extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddEmploy: true,
      showAddDepartment: false
    }

    this.handleAddEmployee = this.handleAddEmployee.bind(this);
    this.handleAddDepartment = this.handleAddDepartment.bind(this); 
  }

  handleAddEmployee() {
    this.setState({
      showAddEmploy: true
    })
  }

  handleAddDepartment() {
    this.setState({
      showAddDepartment: !this.state.showAddDepartment,
      showAddEmploy: !this.state.showAddEmploy
    })
  }

  render() {
    return (
      <div>
        <Segment style={{ padding: '8em 0em'}} vertical>
          <Grid container stackable>
              <Grid.Row>
                <Grid.Column width={4}>
                    <div>
                      <Button.Group vertical>
                        <Button icon labelPosition='left' onClick={this.handleAddEmployee}>
                          <Icon name='plus' />
                          Add Employee
                        </Button>
                        <Button icon labelPosition='left' onClick={this.handleAddDepartment}>
                          <Icon name='plus' />
                          Add Department
                        </Button>
                    </Button.Group>
                    </div>
                </Grid.Column>
                  {this.state.showAddEmploy ? 
                    <NewEmployeeForm /> : <NewDepartmentForm />
                  }          
            </Grid.Row>
          </Grid>
        </Segment>
        </div>
    ) 
  }
}

export default Onboarding;
