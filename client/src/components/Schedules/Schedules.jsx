import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import axios from 'axios';
import moment from 'moment-timezone';
import Mailer from './mailer.jsx'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import * as Actions from '../../actions/scheduleActions'

import { Header, Form, Segment, Table, Icon, Button, Modal, Accordion, TransitionablePortal } from 'semantic-ui-react'

import DayPickerInput from 'react-day-picker/DayPickerInput';
import TimePicker from 'rc-time-picker';
import './App.css'
// import 'rc-time-picker/assets/index.css';
import 'react-day-picker/lib/style.css';


import OneEmpl from './OneEmpl.jsx'


class Schedules extends Component {
	constructor(props) {
		super(props)
		this.state = {
			email: false,
			week: [],
			open: false,
			emptySH: true, emptySM: true, emptyFM: true, emptyFH: true,
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
		pickedDay = pickedDay || new Date();
	console.log("picked day: ",pickedDay)
		let week = this.getWeekByDay(pickedDay)
		let date = this.month_year(pickedDay)
		if (this.state.fetchedMonths.includes(date[0]) ) {
			this.setState({ week, pickedDay })
		} else {
			this.props.getSchedules(date[1], date[0], 1); // hard coded - NEED TO BE CHANGED
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

	close = () => this.setState({open: false, start: '', finish: '', action: '', empl: '', day: ''})

	showModal = (action, empl, day) => this.setState({ action, empl, day, open: true })

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

	changeTimeFormatFrom12To24 = t => {
	{/*Functin to format picked hour in the TimePicker*/}
		let time = moment(t).format('hh a')
  	let hour = Number(time.slice(0,2))
  	if (time.includes('12 am')) {
  		hour = hour - 12
  	} else if (time.includes('pm') && !time.includes('12')) {
  		hour = hour + 12
  	}
  	return hour
	}

	compileTimeToNeededFormat = () => {
	{/*Function which formating date and then make EDIT/POST action*/}
    const { empl, action, day, start, startHour, startMinute, finish, finishHour, finishMinute, emptySH, emptySM, emptyFH, emptyFM } = this.state;
    console.log( empl, action, day, start, startHour, startMinute, finish, finishHour, finishMinute, emptySH, emptySM, emptyFH, emptyFM )
    if (!emptySH && !emptySM && !emptyFH && !emptyFM) {
    	let copy = day.slice();
    	let newStart = moment(moment(copy).set({ h : startHour, m : startMinute })).format()
    	let newFinish = moment(moment(copy).set({ h : finishHour, m : finishMinute })).format();
    	let date = this.month_year(newStart);
    	console.log("+++++new finish and start ", newStart, newFinish, empl.start, empl.finish)
    	if (moment(empl.start).isBefore(moment(empl.finish)) || moment(newStart).isBefore(moment(newFinish)) ) {
    		if (action === 'edit') {
      		console.log("EDIIIIIIIIT")
      		this.props.editSchedule({first_name: empl.first_name, start: empl.start, startEdit: newStart, finish: empl.finish, finishEdit: newFinish, id: empl.id });
      	} else if (action === 'post') {
      		console.log("POOOOOOOOOOOST")
      		this.props.postSchedule({id: empl.id, first_name: empl.first_name, start: newStart, finish: newFinish, month: date[0], year: date[1] });
      	}
      	this.close();
      	this.setState({
      		startGreaterFinish: false,
      		confirm: true,
      		emptySH: true, emptySM: true, emptyFH: true, emptyFM: true,
      		start: '', finish: '', newStart: '', newFinish: '',
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
		console.log('this props: ', this.props)
		const { email, week, action, empl, event, day, open, start, finish, startGreaterFinish, confirm } = this.state;
		if (confirm) { setTimeout(() => { this.setState({confirm: false})}, 1000)}

	return (
		<div style={{margin: '10px'}}>

		{/*****************************************************************
										Modal-Popup for EDIT/POST schedule
		*******************************************************************/}
		<Modal size={'tiny'} open={open} onClose={this.close}
		style={{position: 'absolute', top: '40%', left: '40%'}}>
			<Modal.Content>
			<Modal.Description>
        {
	        this.state.action === 'edit' ?
		        <Header>Edit {empl.first_name}'s shift on {day}</Header>
		        :
		        <Header>Add {empl.first_name}'s shift on {day}</Header>
    		}
        Start
        <br />
        Hours:
        <TimePicker
			    showSecond={false}
			    showMinute={false}
			    className="xxx"
			    onChange={(start) => this.setState({startHour: this.changeTimeFormatFrom12To24(start), emptySH: false})}
			    format={'h a'}
			    use12Hours
			    inputReadOnly
			  />

			  Minutes:
			  <TimePicker
			    showSecond={false}
			    showHour={false}
			    className="xxx"
			    onChange={(start) => this.setState({startMinute: moment(start).format('mm'), emptySM: false})}
			    format={'mm'}
			    minuteStep={15}
			    inputReadOnly
			  />
			  <br />
			  <br />
			  Finish
			  <br />
			  Hours:
			  <TimePicker
			    showSecond={false}
			    showMinute={false}
			    className="xxx"
			    onChange={(finish) => this.setState({finishHour: this.changeTimeFormatFrom12To24(finish), emptyFH: false})}
			    format={'hh a'}
			    use12Hours
			  />

			  Minutes:
			  <TimePicker
			    showSecond={false}
			    showHour={false}
			    className="xxx"
			    onChange={(finish) => this.setState({finishMinute: moment(finish).format('mm'), emptyFM: false})}
			    format={'mm'}
			    minuteStep={15}
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
		<Form>
		<Button onClick={()=>this.weekBack()} icon="caret left"/>
		<DayPickerInput
			style={{height: '100px'}}
			placeholder="          Calendar"
			fixedWeeks
			firstDayOfWeek={1}
      onDayChange={day => this.renderCalendar(day)}
    />
		<Button onClick={()=>this.weekForth()} icon="caret right"/>
		</Form>
    {/*****************************************************************
																		Table
		*******************************************************************/}
		<Button onClick={()=>this.setState({email:true})} content="Send Emails"/>
<Table celled selectable textAlign={'center'} verticalAlign={'middle'}>
  <Table.Header>
    <Table.Row>
				<Table.HeaderCell width={2}>Employees</Table.HeaderCell>
				{week.map((d, i) => (<Table.HeaderCell width={1} key={i}>{`${d.slice(5)}`}</Table.HeaderCell>))}
		</Table.Row>
  </Table.Header>
	<Table.Body>
			{this.props.employees.map((empl, indOfEmpl) => (
				<Table.Row style={{height: '90px'}} key={indOfEmpl}>
					<Table.Cell>{empl.first_name}</Table.Cell>
						{week.map((day, indOfDate) => (
							<Table.Cell key={indOfDate}>
							<div><OneEmpl schedules={this.props.schedules} showModal={this.showModal} day={day} empl={empl} /></div>
							</Table.Cell>))}
				</Table.Row>))}
	</Table.Body>
</Table>

		<br />
		<br />


		</div>
	)
}
}

const mapStateToProps = store => ({
		employees: store.scheduleReducer.employees,
		schedules: store.scheduleReducer.schedules,
		postSchedule: store.postSchedule,
		editSchedule: store.editSchedule,
		deleteSchedule: store.deleteSchedule
})

function matchDispatchToProps(dispatch) {
	return bindActionCreators(Actions, dispatch)
}

export default withRouter(connect(mapStateToProps, matchDispatchToProps)(Schedules));
