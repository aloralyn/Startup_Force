import React, { Component } from 'react';
import moment from 'moment-timezone';
import { Icon, Button } from 'semantic-ui-react'

class OneEmpl extends Component {
	render() {
	const { day, empl, showModal, schedules } = this.props;
	var match;
	var ind;
{/*find a match with employee's id and the day*/}
	schedules.forEach((one, i) => {
		if (one.id === empl.id && moment(day).isSame(moment(one.start).format("YYYY MMM DD")) ) {
			match = one;
			ind = i;
		}
	})
	console.log("from oneEmpl: ", match)
		return (
			<div>
			{
				match && moment(moment(new Date())).isBefore(day) &&
					<Button animated='fade' fluid 
					onClick={()=>this.props.showModal('edit', match, day)}>
			      <Button.Content hidden>
			      Edit
			      </Button.Content>
			      <Button.Content visible>
				      <div>{`${moment(match.start).format("h:mm a")}`}</div>
							<div>{`${moment(match.finish).format("h:mm a")}`}</div>
			      </Button.Content>
			    </Button>
			    ||
			   match && !moment(moment(new Date())).isBefore(day) &&
			   	<Button>
			      <Button.Content>
				      <div>{`${moment(match.start).format("h:mm a")}`}</div>
							<div>{`${moment(match.finish).format("h:mm a")}`}</div>
			      </Button.Content>
			    </Button>
			    ||
			   	moment(moment(new Date())).isBefore(day) &&
			    <Button size='mini' onClick={()=>this.props.showModal('post', empl, day)}><Icon name='plus'/></Button>
			}
			</div>
		)
	}
}

export default OneEmpl;