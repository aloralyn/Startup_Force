import React, { Component } from 'react';
import { 
	Icon, 
	Button, 
	Input,
	Select,
	Dropdown
} from 'semantic-ui-react'
import axios from 'axios';
class Mailer extends Component {
	constructor(props) {
		super(props)
		this.state = {
			empls: {},
			message: ''
		}
	}
change = (id) => {
	let empl = this.props.empl.filter(e => e.id === id)
	console.log(empl)
	this.setState({empls: {...this.state.empls, [id]: empl[0] } }, () => console.log("STATE: ",Object.keys(this.state.empls), this.state.empls));
}
delete = (id) => {
	console.log("ID: ", id)
	let empls = {...this.state.empls};
	delete empls[id];
	this.setState({ empls })
}

get = (obj) => {
	axios.post('/schedule/mail', obj)
}

send = (arr) => {
	console.log("----",arr)
	this.setState({message: 'Emails have been sent'}, () => Promise.all(arr.map(this.get)))
}

render() {

if (this.state.message.length > 0) { setTimeout(() => { this.setState({message: '', empls: {}})}, 1500)} 
let arr = []
this.props.empl.forEach(e => arr.push({value: e.id, text: e.first_name, key: e.id}) )
	return (
		<div>
		{Object.keys(this.state.empls)
			.map(e => 
				<Button 
				value={e} key={e} 
				onClick={(ev, d) => this.delete(d.value)} 
				style={{margin: '3px', width: '150px'}} 
				content={this.state.empls[e].first_name} 
				icon='close' labelPosition='right'>
				</Button>)}
		<br />
		<Dropdown 
		placeholder='Select Friend' selection options={arr} 
		onChange={(e, d) => this.change(d.value)}/>
		<br />
		<Button content="send" onClick={() => this.send(Object.values(this.state.empls))}/>
		<div>{this.state.message}</div>
		</div>
	)
}
}

export default Mailer;