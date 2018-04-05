import React, { Component } from 'react'
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import ProfilePic from '../ProfilePic/ProfilePic.jsx'
import { connect } from 'react-redux'; // connects to the redux store
import { fetchUsers } from '../../actions/dashboardActions.js';
import { getSchedule } from '../../actions/scheduleActions.js';
import { getNotifications } from '../../actions/messageActions.js';
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
      week: []
    }
  }
  componentDidMount() {
    this.renderCalendar()
  }

  renderCalendar = pickedDay => {
  {/*Function to change week in the calendar and fetch schedules from DB*/}
    pickedDay = pickedDay || moment().format();
    let week = this.getWeekByDay(pickedDay)
    let date = this.month_year(pickedDay)
    if (this.props.fetchMonth.includes(date.join(' ')) ) {
      console.log("FIRST RENDER includes: ", this.props, week)
      this.setState({ week, pickedDay })
    } else {
      console.log("first RENDER NOT include: ", this.props)
      this.props.getSchedule(date[1], date[0], this.props.user.id);
      this.setState({ week, pickedDay })
    }
  }

  weekBack = () => {
    let pickedDay = moment(this.state.pickedDay).subtract(7, 'day').format();
    this.renderCalendar(pickedDay)
  }
  weekForth = () => {
    let pickedDay = moment(this.state.pickedDay).add(7, 'day').format();
    this.renderCalendar(pickedDay)
  }
  

  month_year = day => {
    let month = moment(day).format("MMM");
    let year = moment(day).format("YYYY");
    return [month, year]
  }

  getWeekByDay = d => {
  {/*Function to compute whole week by one day*/}
  let weekNum = moment(d).isoWeeks();
  let year = moment(d).get('year');
  console.log("GET WEEK: ", weekNum)
  let week = [];
    for (let i = 0; i < 7; i++) {
      let days = (weekNum - 1) * 7 + 1 + i;
      let date = moment().set({'year': year, 'month': 0, 'date': days})
      week.push(moment(date).format("YYYY MMM DD"))
    }
    return week
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user !== this.props.user) {
      this.props.getNotifications(nextProps.user.id, nextProps.user.company_id);
    }
  }

  render() {
    console.log("RENDER PROPS: ",this.props)
    const { week} = this.state;
  {/*if (this.props.user.id && !this.state.rendered) {
      this.renderCalendar();
      this.setState({ rendered: true })
    }*/}
    return (
      this.props.fetchMonth.length > 0 ?
      <Container style={{ padding: '8em 0em' }}>
        <Grid container stackable>
            <Grid.Row>
              <Grid.Column width={5}>
                <ProfilePic />
              </Grid.Column>
              <Grid.Column width={10}>
              <Header size='large' verticalalign='text-top'>Welcome,  {this.props.user.first_name} {this.props.user.last_name}!</Header>

    {/*****************************************************************
                                    Calendar
    *******************************************************************/}
    <Form width={2}>
        <Form.Group>
        <Form.Field control={Button} style={{ padding: '0.5em 0.5em'}} onClick={()=>this.weekBack()} icon="caret left"/>
        
        <Form.Field>
        <DayPickerInput
          style={{padding: '0.5em 0.5em'}}
          placeholder="           Calendar"
          fixedWeeks
          firstDayOfWeek={1}
          onDayChange={day => this.renderCalendar(day)}
        />
        </Form.Field>
        
        <Form.Field control={Button} style={{ padding: '0.5em 0.5em'}} onClick={()=>this.weekForth()} icon="caret right"/>
        </Form.Group>
        </Form>
     
    {/*****************************************************************
                                  Table VIEW >> WEEK
    *******************************************************************/}
  <Table celled selectable textAlign={'center'} verticalAlign={'middle'}>
      <Table.Header>
        <Table.Row>
          {week.map((d, i) => { let color = moment().format("YYYY MMM DD") === moment(d).format("YYYY MMM DD") ? '#EF9A9A' : null;
              return <Table.HeaderCell style={{backgroundColor: color}} width={2} key={i}>{`${moment(d, "YYYY MMM DD").format("MMM DD dddd")}`}</Table.HeaderCell>
          })}
        </Table.Row>
      </Table.Header>
      <Table.Body>
          {
            <Table.Row style={{height: '100px'}}>
                {week.map((day, indOfDate) =>
                (<Table.Cell key={indOfDate}>
                    <div key={indOfDate}><Empl
                      key={indOfDate}
                      day={day}
                      first_name={this.props.user.first_name}
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
</Container> : null
    )
  }
}



const Empl = ({ day, first_name, schedule}) => {
  var needed;
  var ind;
if (schedule) {
  schedule.forEach((one, i) => {
    if (one.first_name === first_name && moment(day).format("YYYY MMM DD") === moment(one.start).format("YYYY MMM DD")) {
      needed = one;
      ind = i;
    }
  })
}

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
  schedule: state.scheduleReducer.schedule,
  fetchMonth: state.scheduleReducer.fetchedMonthsForHome,
});

export default withRouter(connect(mapStateToProps, { fetchUsers, getSchedule, getNotifications })(HomepageLayout));
