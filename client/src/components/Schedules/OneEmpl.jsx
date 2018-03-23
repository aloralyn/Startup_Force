import React, { Component } from 'react';
import moment from 'moment-timezone';
import { Icon, Button } from 'semantic-ui-react'


class OneEmpl extends Component {
	constructor(props) {
		super(props)
		this.state = {
		}
	}

	render() {
	const { day, first_name, schedules, showEdit, showAdd } = this.props;
	var needed;
	var ind;
	console.log("ONE EMPL: ", schedules)
	schedules.forEach((one, i) => {
			console.log(first_name, one.first_name, one.first_name===first_name, day,  moment(day).format("YYYY MMM DD") ,moment(one.start).format("YYYY MMM DD"), moment(one.start).format("YYYY MMM DD")===moment(day).format("YYYY MMM DD"))
		if (one.first_name === first_name && moment(day).format("YYYY MMM DD") === moment(one.start).format("YYYY MMM DD")) {
			needed = one;
			ind = i;
		}
	})
	
		return (
			<div>
			{
				needed !== undefined &&
					<Button animated='fade' fluid 
					onClick={()=>this.props.showEdit(needed.start, needed.finish, ind, first_name, day, needed.id)}>
			      <Button.Content hidden>
			      Edit
			      </Button.Content>
			      <Button.Content visible>
				      <div>{`${moment(needed.start).format("h:mm a")}`}</div>
							<div>{`${moment(needed.finish).format("h:mm a")}`}</div>
			      </Button.Content>
			    </Button>
			    ||
			    <Button size='mini' onClick={()=>this.props.showAdd(first_name, day)}><Icon name='plus'/></Button>
				

			}
			</div>
		)
	}
}

export default OneEmpl;