import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { createCompany } from '../../actions/newCompanyActions.js';
import { handleChange } from '../../actions/formChangeActions.js';

import {
  Button,
  Container,
  Form,
  Grid,
  Header,
  Input,
  Message,
  Modal,
  Segment
} from 'semantic-ui-react';

const style = {
  h1: {
    marginTop: '3em',
    marginBottom: '20px'
  },
  h2: {
    margin: '4em 0em 2em',
  },
  h3: {
    marginTop: '0em',
    padding: '2em 0em',
  },
  last: {
    marginBottom: '30px',
  }
};

const PwErrorMessage = () => (
  <Message
    negative
    header='There were an error with your submission'
    list={[
      'Your confirmed password does not match the first one.'
    ]}
  />
)

 class SignUpForm extends Component {
   constructor(props) {
     super(props);
     
     this.state = {
       retypePw: '',
       showPwError: false
     }
   }

   handleRetypePw(e) {
     console.log(e)
     this.setState({
       retypePw: e
     })
   }

   handleSubmit = (e) => {
    let company = {
      company_name: this.props.company_name,
      website: this.props.website,
      street_1: this.props.street_1,
      zip_code: this.props.zip_code,
      state: this.props.state
    }

    let admin = {
      first_name: this.props.first_name,
      last_name: this.props.last_name,
      email: this.props.email,
      pw: this.props.pw
    }

    if(this.props.pw !== this.state.retypePw) {
      this.setState({
        showPwError: true
      })
    }

    if (Object.values(company).indexOf('') === -1 && Object.values(company).indexOf('') === -1) {
      e.preventDefault();;
      company[street_2] = this.props.street_2;
      this.props.createCompany(company, admin)
    }
    
   }

  render() {
    return (
      <Modal trigger={<Button>Signup</Button>} basic size='small' closeIcon>
      <div className='login-form'>
      <style>{`
      body > div,
      body > div > div,
      body > div > div > div.login-form {
        height: 100%;
      }
    `}</style>
      <Modal.Content style={{ padding: '8em 0em' }}>
        <Modal.Content>
        <Grid columns={2} width={30}>
        <Segment>
        <Header
          as='h3'
          content='Sign up for your free Startup Force account!'
          textAlign='center'
          style={style.h3}
        />
        <Form>
          <Form.Group widths='equal'>
            <Form.Field required control={Input} label='Company Name' name='company_name' onChange={(e) => {this.props.handleChange(e.target.name, e.target.value)}} />
            <Form.Field required control={Input} label='Website URL' name='website' onChange={(e) => {this.props.handleChange(e.target.name, e.target.value)}} />
          </Form.Group>
        </Form>
  
        <Form>
          <Form.Group widths='equal'>
            <Form.Field required control={Input} label='Street 1' name='street_1' onChange={(e) => {this.props.handleChange(e.target.name, e.target.value)}} />
            <Form.Field control={Input} label='Street 2' name='street_2' onChange={(e) => {this.props.handleChange(e.target.name, e.target.value)}} />
            <Form.Field required control={Input} label='Zip Code' name='zip_code' onChange={(e) => {this.props.handleChange(e.target.name, e.target.value)}} />
            <Form.Field required control={Input} label='State' name='state' onChange={(e) => {this.props.handleChange(e.target.name, e.target.value)}} />
          </Form.Group>
        </Form>

        <Form>
          <Form.Group widths='equal'>
            <Form.Field required control={Input} label='First Name' name='first_name' onChange={(e) => {this.props.handleChange(e.target.name, e.target.value)}} />
            <Form.Field required control={Input} label='Last Name' name='last_name' onChange={(e) => {this.props.handleChange(e.target.name, e.target.value)}} />
            <Form.Field required control={Input} label='Email' name='email' onChange={(e) => {this.props.handleChange(e.target.name, e.target.value)}} />
          </Form.Group>
        </Form>

          <Form style={style.last}>
          <Form.Group widths='equal'>
            <Form.Field required control={Input} label='Password' name='pw' onChange={(e) => {this.props.handleChange(e.target.name, e.target.value)}} />
            <Form.Field required control={Input} label='Retype password' name='retype_pw' onChange={(e) => {this.handleRetypePw(e.target.value)}}  />
          </Form.Group >
          <Form.Field control={Button} type='submit' onClick={this.handleSubmit}>Create your new Startup Force Account</Form.Field>
        </Form>
        { this.state.showPwError ? <PwErrorMessage /> : null }
        </Segment>
        </Grid>
        
        </Modal.Content>
      </Modal.Content> 
      </div>
      </Modal>
    )
  }
}


const mapStateToProps = state => ({
  company_name: state.newCompanyReducer.company_name,
  website: state.newCompanyReducer.website,
  street_1: state.newCompanyReducer.street_1,
  street_2: state.newCompanyReducer.street_2,
  zip_code: state.newCompanyReducer.zip_code,
  state: state.newCompanyReducer.state,
  first_name: state.newCompanyReducer.first_name,
  last_name: state.newCompanyReducer.last_name,
  email: state.newCompanyReducer.email,
  pw: state.newCompanyReducer.pw
})

SignUpForm.propTypes = {
  handleChange: PropTypes.func.isRequired,
  createCompany: PropTypes.func.isRequired,
}

export default withRouter(connect(mapStateToProps, { createCompany, handleChange })(SignUpForm));
