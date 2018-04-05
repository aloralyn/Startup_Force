import 'react-day-picker/lib/style.css';
import './App.css'
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import axios from 'axios';
import moment from 'moment-timezone';
import Mailer from './mailer.jsx'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import * as Actions from '../../actions/scheduleActions';
import { fetchUsers } from '../../actions/dashboardActions.js';


import { Container, Header, Form, Segment, Table, Icon, Button, Menu, Modal, Accordion, TransitionablePortal } from 'semantic-ui-react'

import DayPickerInput from 'react-day-picker/DayPickerInput';
import TimePicker from 'rc-time-picker';

import OneEmpl from './OneEmpl.jsx'


class Schedules extends Component {
	constructor(props) {
		super(props)
		this.state = {
			email: false,
			week: [],
			open: false,
			startEmpty: true,
			finishEmpty: true,
			startGreaterFinish: false,
			action: '',
			empl: '',
			finish: '', start: '',
			startHour: '', startMinute: '', finishHour: '', finishMinute: '',
			fetchedMonths: [],
			event: '',
			confirm: false,
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
			this.setState({ week, pickedDay })
		} else {
			this.props.getSchedules(date[1], date[0], this.props.user.id);
			this.setState({ week, pickedDay })
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

	timePicker = (string, time) => { {/*string can be finish or start*/}
  	let hour = moment(time).format('hh a');
  	let minute = moment(time).format('mm');
  	this.setState({
  		[`${string}Hour`]: this.changeTimeFormatFrom12To24(hour),
  		[`${string}Minute`]: minute,
  		[`${string}Empty`]: false
  	})
	}

	month_year = day => {
		let month = moment(day).format("MMM");
		let year = moment(day).format("YYYY");
		return [month, year]
	}

	close = () => this.setState({open: false, start: '', finish: '', action: '', empl: '', day: ''})

	showModal = (action, empl, day) => this.setState({ action, empl, day, open: true })

	getWeekByDay = d => {
	{/*Function to compute whole week by one day*/}
	let weekNum = moment(d).isoWeeks();
	let year = moment(d).get('year');
  	let week = [];
		for (let i = 0; i < 7; i++) {
			let days = (weekNum - 1) * 7 + 1 + i;
			let date = moment().set({'year': year, 'month': 0, 'date': days})
			week.push(moment(date).format("YYYY MMM DD"))
		}
		return week
	}

	changeTimeFormatFrom12To24 = t => {
	{/*Function to format picked hour in the TimePicker*/}
  	let hour = Number(t.slice(0,2))
  	if (t.includes('12 am')) {
  		hour = hour - 12
  	} else if (t.includes('pm') && !t.includes('12')) {
  		hour = hour + 12
  	}
  	return hour
	}

	compileTimeToNeededFormat = () => {
	{/*Function which formating date and then make EDIT/POST action*/}
    const { 
    	empl, 
    	action, 
    	day, 
    	start, startHour, startMinute, 
    	finish, finishHour, finishMinute, 
    	startEmpty, finishEmpty 
    } = this.state;
    if (!startEmpty && !finishEmpty) {
    	let copy = day.slice();
    	let newStart = moment(moment(copy, "YYYY MMM DD").set({ h : startHour, m : startMinute })).format()
    	let newFinish = moment(moment(copy, "YYYY MMM DD").set({ h : finishHour, m : finishMinute })).format();
    	let date = this.month_year(newStart);
    	if (moment(empl.start).isBefore(moment(empl.finish)) || moment(newStart).isBefore(moment(newFinish)) ) {
    		if (action === 'edit') {
      		this.props.editSchedule({
      			id: empl.id,
      			first_name: empl.first_name,
      			start: empl.start, 
      			startEdit: newStart, 
      			finish: empl.finish, 
      			finishEdit: newFinish
      		})
      	} else if (action === 'post') {
      		this.props.postSchedule({
      			id: empl.id, 
      			first_name: empl.first_name, 
      			start: newStart, 
      			finish: newFinish, 
      			month: date[0], 
      			year: date[1] 
      		});
      	}
      	this.close();
      	this.setState({
      		startGreaterFinish: false, 
      		confirm: true, 
      		startEmpty: true, 
      		finishEmpty: true,
      		start: '', finish: '', 
      		newStart: '', newFinish: '',
      		empl: '',
      		confirm: true,
      		event: action,
      	})
    	} else {
    		this.setState({startGreaterFinish: true})
    	}
    }
	}

	render() {
		const { email, week, action, empl, event, day, open, start, finish, startGreaterFinish, confirm } = this.state;
		if (confirm) { setTimeout(() => { this.setState({confirm: false})}, 1000)} 
console.log("ACTIONS: ", this.props)
	return (
    <Container style={{ padding: '8em 0em'}}>

		{/*****************************************************************
										Modal-Popup for EDIT/POST schedule
		*******************************************************************/}
		<Modal size={'tiny'} open={open} onClose={this.close}
		style={{position: 'absolute', top: '40%', left: '40%'}}>
			<Modal.Content>
			<Modal.Description>
        {this.state.action === 'edit' ? 
		        <Header>Edit {empl.first_name}'s shift on {day}</Header>
		        :
		        <Header>Add {empl.first_name}'s shift on {day}</Header>}
        Start:
	      <TimePicker
			    showSecond={false}
			    className="xxx"
			    onChange={(time) => this.timePicker('start', time)}
			    format={'hh:mm a'}
			    minuteStep={15}
			    use12Hours
			    inputReadOnly
		  	/>

			  <br />
			  <br />
			  Finish: 
			  <TimePicker
			    showSecond={false}
			    className="xxx"
			    onChange={(time) => this.timePicker('finish', time)}
			    format={'hh:mm a'}
			    minuteStep={15}
			    use12Hours
			    inputReadOnly
			  />

			  <br />
			  <br />
			  {startGreaterFinish ? <p style={{color: 'red'}}>Finish can't be earlier than start</p> : ""}
      </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
      {
      	!!empl.start ?
        <Button color='red' style={{float: 'left'}}
	        onClick={() => {
	        	this.props.deleteSchedule({id: empl.id, start: empl.start, finish: empl.finish})
	        	this.close()
	        	this.setState({confirm: true, event: 'deleted'})
	      }}>
          Delete shift
        </Button>
        :
        null
      }
        <Button content="Cancel" color='black' onClick={this.close} />
        <Button positive icon='checkmark' labelPosition='right' content="Add new time"
        	onClick={() => this.compileTimeToNeededFormat()} />
      </Modal.Actions>
      </Modal>
		{/*****************************************************************
							Popup for 1 sec - added / editted / deleted
		*******************************************************************/}
        <TransitionablePortal open={confirm} transition={{ animation: 'fly up', duration: '1000' }}>
            <Segment style={{ left: '40%', position: 'fixed', top: '40%', zIndex: 991000 }}>
              <Icon name="check" size={'huge'} color={'green'}/>
           		<p>Successfully {event}</p>
            </Segment>
          </TransitionablePortal>
		{/*****************************************************************
							Popup for sending mail
		*******************************************************************/}
        <TransitionablePortal open={email} transition={{ animation: 'swing up', duration: '1000' }}>
            <Segment style={{ left: '25%', position: 'fixed', top: '40%', zIndex: 991000 }}>
            		<div>Send email to your employees if you changed or added their schedule </div>
            		<br />
								<Mailer empl={this.props.employees}/>
								<br />
								<Button onClick={()=>this.setState({email: false})} content="Close window" />
            </Segment>
          </TransitionablePortal>
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
																		Table
		*******************************************************************/}
		    <br/>
       
        <Button onClick={()=>this.setState({email:true})} content="Send Emails"/>
  
    <Table celled selectable textAlign={'center'} verticalAlign={'middle'}>
      <Table.Header>
        <Table.Row>
            <Table.HeaderCell width={2}>Employees</Table.HeaderCell>
            {week.map((d, i) => { let color = moment().format("YYYY MMM DD") === moment(d).format("YYYY MMM DD") ? '#EF9A9A' : null;
              return <Table.HeaderCell 
              style={{'backgroundColor': color}} 
              width={1} key={i}>{moment(d).format('YYYY MMM DD ddd')}</Table.HeaderCell>})}
        </Table.Row>
      </Table.Header>
      <Table.Body>
          {this.props.employees.map((empl, indOfEmpl) => (
            <Table.Row key={indOfEmpl} style={{height: '90px'}}>
              <Table.Cell>{empl.first_name}</Table.Cell>
                {week.map((day, indOfDate) => (
                  <Table.Cell key={indOfDate}>
                  <div>
                    <OneEmpl 
                    key={indOfEmpl*indOfDate} 
                    schedules={this.props.schedules} 
                    showModal={this.showModal} 
                    day={day} 
                    empl={empl} />
                  </div>
                  </Table.Cell>))}
            </Table.Row>))}
      </Table.Body>
    </Table>

		<br />
		<br />

</Container>
	)
}
}

const mapStateToProps = store => ({
		employees: store.scheduleReducer.employees,
		schedules: store.scheduleReducer.schedules,
		fetchMonth: store.scheduleReducer.fetchedMonthsForMaker,
		postSchedule: store.postSchedule,
		editSchedule: store.editSchedule,
		deleteSchedule: store.deleteSchedule,
		user: store.users.user,
})

function matchDispatchToProps(dispatch) {
	return bindActionCreators({...Actions, fetchUsers}, dispatch)
}

export default withRouter(connect(mapStateToProps, matchDispatchToProps)(Schedules));
