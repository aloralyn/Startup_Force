import React, { Component } from 'react';
import moment from 'moment';
import { Icon, Button } from 'semantic-ui-react'

class OneEmpl extends Component {
	render() {
	const { day, empl, showModal, schedules } = this.props;
	var match;
	var ind;
{/*find a match with employee's id and the day*/}
	schedules.forEach((one, i) => {
		if (one.id === empl.id && moment(moment(day, "YYYY MMM DD")).isSame(moment(one.start).format("YYYY MMM DD")) ) {
			match = one;
			ind = i;
		}
	})
		return (
			<div>
			{
				match && moment().isBefore(moment(day, "YYYY MMM DD")) &&
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
			   match && !moment().isBefore(moment(day, "YYYY MMM DD")) &&
			   	<Button>
			      <Button.Content>
				      <div>{`${moment(match.start).format("h:mm a")}`}</div>
							<div>{`${moment(match.finish).format("h:mm a")}`}</div>
			      </Button.Content>
			    </Button>
			    ||
			   	moment().isBefore(moment(day, "YYYY MMM DD")) &&
			    <Button size='mini' onClick={()=>this.props.showModal('post', empl, day)}><Icon name='plus'/></Button>
			}
			</div>
		)
	}
}

export default OneEmpl;