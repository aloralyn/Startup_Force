import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './App.css'
import 'rc-time-picker/assets/index.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { withRouter } from 'react-router';
import * as Actions from '../../actions/scheduleActions'
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

import 'babel-polyfill';
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
			startGreaterFinish: false,
			
		}
	}
	componentDidMount() {
		var date = new Date()
		var weekNum = this.getWeekNumber(date)
		var week = this.getDateOfWeek(weekNum[1], weekNum[0], date);
		var arr = [];
		var date = moment(date).format("YYYY MMM").toString();
		var month = moment(date).format("MMM").toString();
		var year = moment(date).format("YYYY").toString();
		this.props.getSchedules(year, month, 1); // hard coded - NEED TO BE CHANGED
		arr.push(month)
		this.setState({ week, fetchedMonths: arr})
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
		let month = moment(clickedDay).format("MMM");
		let year = moment(clickedDay).format("YYYY")
		for (var i = 0; i < 7; i++) {
			var day = new Date(y, 0, 1+ i +( (w-1)*7 ) )
			week.push(moment(`${y}-${day.getMonth() + 1}-${day.getDate()}`).format("YYYY MMM DD"))
		}
		return week
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
			  />
			  
			  Minutes:
			  <TimePicker
			    showSecond={false}
			    showHour={false}
			    className="xxx"
			    onChange={(finish) => this.setState({finishMinuteEdit: moment(finish).format('mm'), emptyFM: false})}
			    format={'mm'}
			    minuteStep={15}
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
        <Button color='black' onClick={()=>this.closeEdit()}>
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
			  />
			  
			  Minutes:
			  <TimePicker
			    showSecond={false}
			    showHour={false}
			    className="xxx"
			    onChange={(finish) => this.setState({finishMinuteEdit: moment(finish).format('mm'), emptyFM: false})}
			    format={'mm'}
			    minuteStep={15}
			  />
			  <br />
			  {this.state.startGreaterFinish ? <p style={{color: 'red'}}>Finish can't be earlier than start</p> : ""}
      </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button color='black' onClick={()=>this.closeEdit()}>
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
      	var date = moment(day).format("YYYY MMM").toString() + '';
      	var month = moment(day).format("MMM").toString() + '';
      	var year = moment(day).format("YYYY").toString() + '';
      	var weekNum = this.getWeekNumber(day);
      	var week = this.getDateOfWeek(weekNum[1], weekNum[0], day);
      	if (this.state.fetchedMonths.indexOf(date) === -1) {
      		this.props.getSchedules(year, month, 1)
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
								<Table.HeaderCell width={1}>{`${d.slice(5)}`}</Table.HeaderCell>
						))}
				</Table.Row>
    </Table.Header>
		<Table.Body>
      
				{this.props.employees.map((empl, indOfEmpl) => (
					<Table.Row style={{height: '100px'}}>
        		
								<Table.Cell>{empl.first_name}</Table.Cell>
							
							{this.state.week.map((day, indOfDate) => 
							(<Table.Cell>
									<div><OneEmpl 
										showEdit={this.showEdit}
										showAdd={this.showAdd}
										day={day}
										first_name={empl.first_name}
										schedules={this.props.schedules} 
										/></div>
								</Table.Cell>)
							
							)}
					</Table.Row>		
					))}
		</Table.Body>
		</Table>


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

