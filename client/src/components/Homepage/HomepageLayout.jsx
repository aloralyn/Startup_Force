import React, { Component } from 'react'
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import ProfilePic from '../ProfilePic.jsx'
import { connect } from 'react-redux'; // connects to the redux store
import { fetchUsers } from '../../actions/dashboardActions.js';
import { getSchedule } from '../../actions/scheduleActions.js';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import moment from 'moment-timezone';
import {
  Container,
  Grid,
  Header,
  Segment,
  Table,
  Button
} from 'semantic-ui-react'

class HomepageLayout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      week: [],
    }
  }

  componentWillMount() {
    this.props.fetchUsers();
    var date = new Date()
    var weekNum = this.getWeekNumber(date)
    var week = this.getDateOfWeek(weekNum[1], weekNum[0], date);
    var arr = [];
    var date = moment(date).format("YYYY MMM").toString();
    var month = moment(date).format("MMM").toString();
    var year = moment(date).format("YYYY").toString();
    this.props.getSchedule(year, month, 1); // hard coded - NEED TO BE CHANGED
    arr.push(month)
    this.setState({ week, fetchedMonths: arr})
  }

  getWeekNumber = (d) => {
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay()||7));
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
    var weekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7);
    return [d.getUTCFullYear(), weekNo];
  }
      
  getDateOfWeek = (w, y, clickedDay) => {
    var week = [];
    let month = moment(clickedDay).format("MMM");
    let year = moment(clickedDay).format("YYYY")
    for (var i = 0; i < 7; i++) {
      var day = new Date(y, 0, 1+ i +( (w-1)*7 ) )
      week.push(moment(`${y}-${day.getMonth() + 1}-${day.getDate()}`).format("YYYY MMM DD"))
    }
    return week
  } 

  render() {
    return (
      this.props.users[0] ? 
      <div>
        <Segment style={{ padding: '8em 0em' }} vertical>
          <Grid container stackable verticalAlign='middle'>
            <Grid.Row>
              <Grid.Column width={5}>
                <ProfilePic />
              </Grid.Column>
              <Grid.Column width={10}>
              <Header size='large' verticalalign='text-top'>Welcome,  {this.props.users[0].first_name} {this.props.users[0].last_name}!</Header>
              
    {/*****************************************************************
                                    Calendar
    *******************************************************************/}


    <DayPickerInput
      fixedWeeks
      firstDayOfWeek={1}
      onDayChange={day => {
        var date = moment(day).format("YYYY MMM").toString() + '';
        var month = moment(day).format("MMM").toString() + '';
        var year = moment(day).format("YYYY").toString() + '';
        var weekNum = this.getWeekNumber(day);
        var week = this.getDateOfWeek(weekNum[1], weekNum[0], day);
        if (this.state.fetchedMonths.indexOf(date) === -1) {
          this.props.getSchedule(year, month, 1)
        var fetchedMonths1 = this.state.fetchedMonths.slice()
        fetchedMonths1.push(date)
          this.setState({ week, fetchedMonths: fetchedMonths1 }, () => console.log(this.state.fetchedMonths))
        } else {
          this.setState({ week })
        }
      }}
    />
    {/*****************************************************************
                                  Table VIEW >> WEEK
    *******************************************************************/}
<Table celled selectable textAlign={'center'} verticalAlign={'middle'}>
    <Table.Header>
      <Table.Row>
          <Table.HeaderCell width={2}>Employees</Table.HeaderCell>
            {this.state.week.map((d, i) => (
                <Table.HeaderCell width={2}>{`${d.slice(5)}`}</Table.HeaderCell>
            ))}
        </Table.Row>
    </Table.Header>
    <Table.Body>
      
        {
          <Table.Row style={{height: '100px'}}>
            
                <Table.Cell>{this.props.users[0].first_name}</Table.Cell>
              
              {this.state.week.map((day, indOfDate) => 
              (<Table.Cell>
                  <div><Empl 
                    day={day}
                    first_name={this.props.users[0].first_name}
                    schedule={this.props.schedule} 
                    /></div>
                </Table.Cell>)
              
              )}
          </Table.Row>    
          }
    </Table.Body>
    </Table>
    </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={6}>
              </Grid.Column>
              <Grid.Column width={8}>
              </Grid.Column>
              
            </Grid.Row>
          </Grid>
        </Segment>
        </div> : null
    )
  }
}



const Empl = ({ day, first_name, schedule}) => {
  var needed;
  var ind;
  schedule.forEach((one, i) => {
    if (one.first_name === first_name && moment(day).format("YYYY MMM DD") === moment(one.start).format("YYYY MMM DD")) {
      needed = one;
      ind = i;
    }
  })
    return (
      <div>
      {
         needed &&
          <Button>
            <Button.Content>
              <div>{`${moment(needed.start).format("h:mm a")}`}</div>
              <div>{`${moment(needed.finish).format("h:mm a")}`}</div>
            </Button.Content>
          </Button>
      }
      </div>
    )
  
}

HomepageLayout.propTypes = {
  fetchUsers: PropTypes.func.isRequired
}


const mapStateToProps = state => ({
  users: state.users.users,
  user: state.users.user,
  schedule: state.scheduleReducer.schedule
});

export default withRouter(connect(mapStateToProps, { fetchUsers, getSchedule })(HomepageLayout));