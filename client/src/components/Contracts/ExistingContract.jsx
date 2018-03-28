import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { Button, Container, Header, Grid, Table } from 'semantic-ui-react';

export default class ExistingContract extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      placeholder: '',
    };
  }

  render() {
    return (
      <Grid.Column width={8}>
        <Header size="large">[Existing] Contract Information</Header>
        <Table attached="bottom" celled>
          <Table.Header>
            <Table.HeaderCell>Client Name</Table.HeaderCell>
            <Table.HeaderCell>Contract Name</Table.HeaderCell>
            <Table.HeaderCell>Contract Amount</Table.HeaderCell>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell>Insert Client Name</Table.Cell>
              <Table.Cell>Insert Contract Name</Table.Cell>
              <Table.Cell>Insert Contract Amount</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>

        <Table celled>
          <Table.Header>
            <Table.HeaderCell>Managing Employee</Table.HeaderCell>
            <Table.HeaderCell>Contract Start Date</Table.HeaderCell>
            <Table.HeaderCell>Contract End Date</Table.HeaderCell>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell>Insert Managing Employee</Table.Cell>
              <Table.Cell>Insert Contract Start Date</Table.Cell>
              <Table.Cell>Insert Contract End Date</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </Grid.Column>
    );
  }
}

// return (
//   <Container style={{ padding: '8em 0em' }}>
//     <Grid container stackable>
//       <Grid.Row>
//         <Grid.Column width={8}>
//           <Header size="small">Contract Information</Header>
//           <Table attached="bottom" celled>
//             <Table.Header>
//               <Table.HeaderCell>Client Name</Table.HeaderCell>
//               <Table.HeaderCell>Contract Name</Table.HeaderCell>
//               <Table.HeaderCell>Contract Amount</Table.HeaderCell>
//             </Table.Header>
//             <Table.Body>
//               <Table.Row>
//                 <Table.Cell>Insert Client Name</Table.Cell>
//                 <Table.Cell>Insert Contract Name</Table.Cell>
//                 <Table.Cell>Insert Contract Amount</Table.Cell>
//               </Table.Row>
//             </Table.Body>
//           </Table>
//
//           <Table celled>
//             <Table.Header>
//               <Table.HeaderCell>Managing Employee</Table.HeaderCell>
//               <Table.HeaderCell>Contract Start Date</Table.HeaderCell>
//               <Table.HeaderCell>Contract End Date</Table.HeaderCell>
//             </Table.Header>
//             <Table.Body>
//               <Table.Row>
//                 <Table.Cell>Insert Managing Employee</Table.Cell>
//                 <Table.Cell>Insert Contract Start Date</Table.Cell>
//                 <Table.Cell>Insert Contract End Date</Table.Cell>
//               </Table.Row>
//             </Table.Body>
//           </Table>
//         </Grid.Column>
//       </Grid.Row>
//     </Grid>
//   </Container>
// );
