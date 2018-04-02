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
  Button,
  Form
} from 'semantic-ui-react'

class HomepageLayout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      week: [],
      fetchedMonths: []
    }
  }

  componentWillMount() {
    this.renderCalendar()
  }

  renderCalendar = pickedDay => {
  {/*Function to change week in the calendar and fetch schedules from DB*/}
    pickedDay = pickedDay || new Date();
  console.log("picked day: ",pickedDay)
    let week = this.getWeekByDay(pickedDay)
    let date = this.month_year(pickedDay)
    if (this.state.fetchedMonths.includes(date[0]) ) {
      this.setState({ week, pickedDay })
    } else {
      this.props.getSchedule(date[1], date[0], 1); // hard coded - NEED TO BE CHANGED
      console.log('this is fetched months: ', this.state.fetchedMonths)
      let newfetchedMonths = this.state.fetchedMonths.slice()
      newfetchedMonths.push(date[0])
      this.setState({ week, fetchedMonths: newfetchedMonths, pickedDay })
    }
  }


  weekBack = () => {
    let pickedDay = moment(this.state.pickedDay).subtract(7, 'day')._d;
    this.renderCalendar(pickedDay)
  }
  weekForth = () => {
    let pickedDay = moment(this.state.pickedDay).add(7, 'day')._d;
    this.renderCalendar(pickedDay)
  }

  month_year = day => {
    let month = moment(day).format("MMM").toString();
    let year = moment(day).format("YYYY").toString();
    return [month, year]
  }

  getWeekByDay = d => {
  {/*Function to compute whole week by one day*/}
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay()||7));
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
    var weekNumber = Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7);
    let week = [];
    let year = d.getUTCFullYear();
    for (var i = 0; i < 7; i++) {
      var day = new Date(year, 0, 1+ i +( (weekNumber-1)*7 ) )
      week.push(moment(`${year}-${day.getMonth() + 1}-${day.getDate()}`).format("YYYY MMM DD"))
    }
    return week
  }

  render() {
    const { week} = this.state;
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
              <Header size='large' verticalalign='text-top'>Welcome,  {this.props.user.first_name} {this.props.user.last_name}!</Header>

    {/*****************************************************************
                                    Calendar
    *******************************************************************/}
    <Form>
    <Button onClick={()=>this.weekBack()} icon="caret left"/>
    <DayPickerInput
      placeholder="          Calendar"
      fixedWeeks
      firstDayOfWeek={1}
      onDayChange={day => this.renderCalendar(day)}
    />
    <Button onClick={()=>this.weekForth()} icon="caret right"/>
    </Form>
    {/*****************************************************************
                                  Table VIEW >> WEEK
    *******************************************************************/}
<Table celled selectable textAlign={'center'} verticalAlign={'middle'}>
    <Table.Header>
      <Table.Row>

            {week.map((d, i) => (
                <Table.HeaderCell width={2} key={i}>{`${d.slice(5)}`}</Table.HeaderCell>
            ))}
        </Table.Row>
    </Table.Header>
    <Table.Body>

        {
          <Table.Row style={{height: '100px'}}>


              {week.map((day, indOfDate) =>
              (<Table.Cell>
                  <div key={indOfDate}><Empl
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
