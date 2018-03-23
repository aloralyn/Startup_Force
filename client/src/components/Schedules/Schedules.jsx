import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './App.css'
import 'rc-time-picker/assets/index.css';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { 
	getSchedule, 
	postSchedule, 
	editSchedule,
	deleteSchedule,
} from '../../actions/scheduleActions'
import OneEmpl from './OneEmpl.jsx'
import axios from 'axios';
import moment from 'moment-timezone';
import { 
	Header, 
	Segment, 
	Image, 
	Table, 
	Icon, 
	Button, 
	Popup, 
	Modal, 
	TransitionablePortal 
} from 'semantic-ui-react'
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import TimePicker from 'rc-time-picker';


import { Resizable, ResizableBox } from 'react-resizable';


class Schedules extends Component {
	constructor(props) {
		super(props)
		this.state = {
			confirmAdd: false, confirmEdit: false, confirmDelete: false,
			week: [],
			openEdit: false, openAdd: false,
			emptyFieldStyle: {borderRadius: '5px'},
			emptySH: true, emptySM: true, emptyFM: true, emptyFH: true,
			startGreaterFinish: false
		}
	}
	componentWillMount() {
		console.log(this.props)
		this.props.getSchedule(2018, 'mar', '1'); // hard coded - NEED TO BE CHANGED
		var date = new Date()
		var weekNum = this.getWeekNumber(date)
		var week = this.getDateOfWeek(weekNum[1], weekNum[0], date)
	}

	showEdit = (start, finish, ind, first_name, day, id) => this.setState({openEdit: true, id: id, first_name, day, finish, start})
	showAdd = (first_name, day) => this.setState({openAdd: true, first_name, day})
	closeEdit = () => this.setState({openEdit: false})
	closeAdd = () => this.setState({openAdd: false})

	getWeekNumber = (d) => {
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay()||7));
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
    var weekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7);
    return [d.getUTCFullYear(), weekNo];
	}
			
	getDateOfWeek = (w, y, clickedDay) => {
		var week = [];
		for (var i = 0; i < 7; i++) {
			var day = new Date(y, 0, 1+ i +( (w-1)*7 ) )
			week.push(moment(`${y}-${day.getMonth() + 1}-${day.getDate()}`).format("YYYY MMM DD"))
		}
		console.log( moment(clickedDay).format("YYYY MMM DD"), week)
		this.setState({ week, clickedDay: moment(clickedDay).format("YYYY MMM DD").toString() })
	}	

	render() {
		console.log("props: " ,this.props)
		if (this.state.confirmAdd) { setTimeout(() => { this.setState({confirmAdd: false})}, 900)} 
		if (this.state.confirmEdit) { setTimeout(() => { this.setState({confirmEdit: false})}, 900)} 
		if (this.state.confirmDelete) { setTimeout(() => { this.setState({confirmDelete: false})}, 900)} 
	return (
		<div style={{margin: '10px'}}>

		{/*****************************************************************
										Modal-Popup for EDIT schedule
		*******************************************************************/}
		<Modal size={'tiny'} open={this.state.openEdit} onClose={this.closeEdit} 
		style={{position: 'absolute', top: '40%', left: '40%'}}>
			<Modal.Content>
			<Modal.Description>
        <Header>Edit {this.state.first_name}'s shift on {this.state.date}</Header>
        Start
        <br />
        Hours:
        <TimePicker
			    showSecond={false}
			    showMinute={false}
			    className="xxx"
			    onChange={(start) => {
			    	var time = moment(start).format('hh a')
			    	var hour = Number(time.slice(0,2))
			    	if (time.includes('12 am')) {
			    		hour = hour - 12
			    	} else if (time.includes('pm') && !time.includes('12')) {
			    		hour = hour + 12
			    	}
			    	this.setState({startHourEdit: hour, emptySH: false})}
			    }
			    format={'h a'}
			    use12Hours
			    inputReadOnly
			    style={this.state.emptySH ? this.state.emptyFieldStyle : {}}
			    placeholder={this.state.emptySH ? "Please pick the time" : ""}
			  />
			  
			  Minutes:
			  <TimePicker
			    showSecond={false}
			    showHour={false}
			    className="xxx"
			    onChange={(start) => this.setState({startMinuteEdit: moment(start).format('mm'), emptySM: false})}
			    format={'mm'}
			    minuteStep={15}
			    inputReadOnly
			    style={this.state.emptySM ? this.state.emptyFieldStyle : {}}
			    placeholder={this.state.emptySM ? "Please pick the time" : ""}
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
			    onChange={(finish) => {
			    	var time = moment(finish).format('hh a')
			    	var hour = Number(time.slice(0,2))
			    	if (time.includes('12 am')) {
			    		hour = hour - 12
			    	} else if (time.includes('pm') && !time.includes('12')) {
			    		hour = hour + 12
			    	}
			    	this.setState({finishHourEdit: hour, emptyFH: false})}
			    }
			    format={'hh a'}
			    use12Hours
			    style={this.state.emptyFH ? this.state.emptyFieldStyle : {}}
			    placeholder={this.state.emptyFH ? "Please pick the time" : ""}
			  />
			  
			  Minutes:
			  <TimePicker
			    showSecond={false}
			    showHour={false}
			    className="xxx"
			    onChange={(finish) => this.setState({finishMinuteEdit: moment(finish).format('mm'), emptyFM: false})}
			    format={'mm'}
			    minuteStep={15}
			    style={this.state.emptyFM ? this.state.emptyFieldStyle : {}}
			    placeholder={this.state.emptyFM ? "Please pick the time" : ""}
			  />
			  <br />
			  <br />
			  {this.state.startGreaterFinish ? <p style={{color: 'red'}}>Finish can't be earlier than start</p> : ""}
      </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button color='red' style={{float: 'left'}} onClick={() => {
        	this.props.deleteSchedule({id: this.state.id, start: this.state.start, finish: this.state.finish}) 
        	this.closeEdit()
        	this.setState({confirmDelete: true})
        }
        }>
          Delete shift
        </Button>
        <Button color='black' onClick={this.closeEdit}>
          Cancel
        </Button>
        <Button 
        positive icon='checkmark' 
        labelPosition='right' 
        content="Add new time" 
        onClick={() => {

        	const { first_name, start, startHourEdit, startMinuteEdit, finish, finishHourEdit, finishMinuteEdit, id, emptySH, emptySM, emptyFH, emptyFM } = this.state;
        if (emptySH === false && emptySM === false && emptyFH === false && emptyFM === false) {
        	const copy = start.slice();
        	const startEdit = moment(moment(copy).set({ h : startHourEdit, m : startMinuteEdit })).format()
        	const finishEdit = moment(moment(copy).set({ h : finishHourEdit, m : finishMinuteEdit })).format()
        	console.log(first_name, start, startEdit, finish, finishEdit, id )
        	if (moment(startEdit).isBefore(finishEdit)) {
        	this.props.editSchedule({first_name, start, startEdit, finish, finishEdit, id });
        	this.closeEdit();
        	this.setState({startGreaterFinish: false, confirmEdit: true, emptySH: false, emptySM: false, emptyFH: false, emptyFM: false})
        	} else {
        		this.setState({startGreaterFinish: true})
        	}
        }
        }} />
      </Modal.Actions>
      </Modal>
		{/*****************************************************************
										Modal-Popup for POST schedule
		*******************************************************************/}
      <Modal size={'small'} open={this.state.openAdd} onClose={this.closeAdd} 
		style={{position: 'absolute', top: '40%', left: '40%'}}>
			<Modal.Content>
			<Modal.Description>
        <Header>Add {this.state.first_name} shift on {this.state.date}</Header>
        Start
        <br />
        Hours:
        <TimePicker
			    showSecond={false}
			    showMinute={false}
			    className="xxx"
			    onChange={(start) => {
			    	var time = moment(start).format('hh a')
			    	var hour = Number(time.slice(0,2))
			    	if (time.includes('12 am')) {
			    		hour = hour - 12
			    	} else if (time.includes('pm') && !time.includes('12')) {
			    		hour = hour + 12
			    	}
			    	this.setState({startHourEdit: hour, emptySH: false})}
			    }
			    format={'h a'}
			    use12Hours
			    inputReadOnly
			    style={this.state.emptySH ? this.state.emptyFieldStyle : {}}
			    placeholder={this.state.emptySH ? "Please pick the time" : ""}
			  />
			  
			  Minutes:
			  <TimePicker
			    showSecond={false}
			    showHour={false}
			    className="xxx"
			    onChange={(start) => this.setState({startMinuteEdit: moment(start).format('mm'), emptySM: false})}
			    format={'mm'}
			    minuteStep={15}
			    inputReadOnly
			    style={this.state.emptySM ? this.state.emptyFieldStyle : {}}
			    placeholder={this.state.emptySM ? "Please pick the time" : ""}
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
			    onChange={(finish) => {
			    	var time = moment(finish).format('hh a')
			    	var hour = Number(time.slice(0,2))
			    	if (time.includes('12 am')) {
			    		hour = hour - 12
			    	} else if (time.includes('pm') && !time.includes('12')) {
			    		hour = hour + 12
			    	}
			    	this.setState({finishHourEdit: hour, emptyFH: false})}
			    }
			    format={'hh a'}
			    use12Hours
			    style={this.state.emptyFH ? this.state.emptyFieldStyle : {}}
			    placeholder={this.state.emptyFH ? "Please pick the time" : ""}
			  />
			  
			  Minutes:
			  <TimePicker
			    showSecond={false}
			    showHour={false}
			    className="xxx"
			    onChange={(finish) => this.setState({finishMinuteEdit: moment(finish).format('mm'), emptyFM: false})}
			    format={'mm'}
			    minuteStep={15}
			    style={this.state.emptyFM ? this.state.emptyFieldStyle : {}}
			    placeholder={this.state.emptyFM ? "Please pick the time" : ""}
			  />
			  <br />
			  {this.state.startGreaterFinish ? <p style={{color: 'red'}}>Finish can't be earlier than start</p> : ""}
      </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button color='black' onClick={this.closeEdit}>
          Cancel
        </Button>
        <Button 
        positive icon='checkmark' 
        labelPosition='right' 
        content="Add new time" 
        onClick={() => {
        	const { first_name, startHourEdit, startMinuteEdit, finishHourEdit, finishMinuteEdit, day, emptySH, emptySM, emptyFH, emptyFM } = this.state;
        if (emptySH === false && emptySM === false && emptyFH === false && emptyFM === false) {
        	const copy = day.slice();
        	const startEdit = moment(new Date(copy.split(' ').join('-'))).set({h: startHourEdit, m: startMinuteEdit}).format()
        	const finishEdit = moment(new Date(copy.split(' ').join('-'))).set({h: finishHourEdit, m: finishMinuteEdit}).format()
        	const month = moment(new Date(copy.split(' ').join('-'))).format("MMM")
        	const year = moment(new Date(copy.split(' ').join('-'))).format("YYYY")
	        if (moment(startEdit).isBefore(finishEdit)) {

	        this.props.postSchedule({first_name, start: startEdit, finish: finishEdit, month, year });
        	this.closeAdd()
        	this.setState({startGreaterFinish: false, confirmAdd: true, emptySH: false, emptySM: false, emptyFH: false, emptyFM: false})
        } else {
        	this.setState({startGreaterFinish: true})
        }
        }
        }} />
      </Modal.Actions>
      </Modal>
		{/*****************************************************************
																		Popup for 1 sec - added/ editted 
		*******************************************************************/}
        <TransitionablePortal open={this.state.confirmAdd} transition={{ animation: 'fly up', duration: '1000' }}>
            <Segment style={{ left: '40%', position: 'fixed', top: '40%', zIndex: 991000 }}>
              <Icon name="check" size={'huge'} color={'green'}/>
           		<p>Successfully added</p>
            </Segment>
          </TransitionablePortal>
    {/*****************************************************************
																		Popup for 1 sec - editted 
		*******************************************************************/}
        <TransitionablePortal open={this.state.confirmEdit} transition={{ animation: 'fly up', duration: '1000' }}>
            <Segment style={{ left: '40%', position: 'fixed', top: '40%', zIndex: 991000 }}>
              <Icon name="check" size={'huge'} color={'green'}/>
           		<p>Successfully editted</p>
            </Segment>
          </TransitionablePortal>
    {/*****************************************************************
																		Popup for 1 sec - delete
		*******************************************************************/}
        <TransitionablePortal open={this.state.confirmDelete} transition={{ animation: 'fly up', duration: '1000' }}>
            <Segment style={{ left: '40%', position: 'fixed', top: '40%', zIndex: 991000 }}>
              <Icon name="check" size={'huge'} color={'green'}/>
           		<p>Successfully deleted</p>
            </Segment>
          </TransitionablePortal>
      {/*****************************************************************
																		Calendar
		*******************************************************************/}
		<DayPickerInput
			fixedWeeks
			firstDayOfWeek={1}
      onDayChange={day => {
      	var weekNum = this.getWeekNumber(day)
      	var week = this.getDateOfWeek(weekNum[1], weekNum[0], day)
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
								<Table.HeaderCell width={1}>{`${d.slice(5)}`}</Table.HeaderCell>
						))}
				</Table.Row>
    </Table.Header>
		<Table.Body>
      
				{this.props.employees.map((empl, indOfEmpl) => (
					<Table.Row style={{height: '100px'}}>
        		
								<Table.Cell>{empl}</Table.Cell>
							
							{this.state.week.map((day, indOfDate) => 
							(
								<Table.Cell>
									<div><OneEmpl 
										showEdit={this.showEdit}
										showAdd={this.showAdd}
										day={day}
										first_name={empl}
										schedules={this.props.schedules} 
										/></div>
								</Table.Cell>
							)
							
							)}
					</Table.Row>		
					))}
		</Table.Body>
				<Table.Footer fullWidth>
      		<Table.Row>
				<Table.HeaderCell>
					<Button animated='fade' fluid onClick={this.open}>
			      <Button.Content hidden>+Add Employee</Button.Content>
			      <Button.Content visible>
			            <Icon name='add user' />     
			      </Button.Content>
			    </Button>
					</Table.HeaderCell>
					<Table.HeaderCell colSpan='7' />
				</Table.Row>
				</Table.Footer>
		</Table>
		{/*****************************************************************
						Table VIEW >> DAY (not finished and probably won't)
		*******************************************************************/}
{/*
<Table celled selectable fixed textAlign={'center'} verticalAlign={'middle'}>
    <Table.Header>
      <Table.Row fullWidth>
					<Table.HeaderCell colSpan='2'>Employees</Table.HeaderCell>
					<Table.HeaderCell colSpan='24'>{`${this.state.clickedDay}`}</Table.HeaderCell>
				</Table.Row>
    </Table.Header>
		<Table.Body>
      
					<Table.Row style={{height: '70px', margin: '0px'}} colSpan='26'>
        		
						<Table.Cell colSpan='2'></Table.Cell>
					
							{
								['12am', '1am', '2am', '3am', '4am', '5am', '6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm', '9pm', '10pm', '11pm']
								.map((time, num) => (
						<Table.Cell colSpan='1' style={{padding: '0px', fontSize: '9'}}>
							{time}
						</Table.Cell>
								))
							}
							
							
					</Table.Row>		
				{this.props.employees.map((empl, indOfEmpl) => (
					<Table.Row style={{height: '70px', padding: '0px'}} colSpan='26'>
        		
								<Table.Cell colSpan='2' >{empl}</Table.Cell>
							
								<Table.Cell colSpan='24' style={{ padding: '0px'}}>
									Here is should be element
					<ResizableBox className="box" draggableOpts={{grid: [25, 25]}} width={150} height={20} axis="x">
            <span className="text">Only resizable by "x" axis.</span>
          </ResizableBox>
								</Table.Cell>
							
							
					</Table.Row>		
					))}
		</Table.Body>
				<Table.Footer fullWidth>
      		<Table.Row>
				<Table.HeaderCell colSpan='2'>
					<Button animated='fade' fluid>
			      <Button.Content hidden>+Add Employee</Button.Content>
			      <Button.Content visible>
			            <Icon name='add user' />     
			      </Button.Content>
			    </Button>
					</Table.HeaderCell>
					<Table.HeaderCell colSpan='24' />
				</Table.Row>
				</Table.Footer>
		</Table>
		
*/}

		</div>
	)
}
}

const mapStateToProps = store => ({
		employees: store.scheduleReducer.employees,
		schedules: store.scheduleReducer.schedules,
		postSchedule: store.postSchedule,
		editSchedule: store.editSchedule,
		deleteSchedule: store.deleteSchedule,
})


export default withRouter(connect(mapStateToProps, { 
	getSchedule, 
	postSchedule, 
	editSchedule,
	deleteSchedule, })(Schedules));

