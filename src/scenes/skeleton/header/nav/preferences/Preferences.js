import React, { Component } from 'react'
import Dialog from '@components/dialog'
import InputText from "@components/Input/Text"
import EventBus from '@service/EventBus/EventBus';

export default class Preferences extends Component {
	constructor(props) {
		super(props)

		this.state = {
			name: null
		}

		EventBus.instance.emit("getName").then(name => this.setState({ name: name || "empty" }))
	}

	changed(val) {
		EventBus.instance.emit("setName", val)
	}

	render() {
		return (
			<Dialog title="Einstellungen">
				{this.state.name ? <InputText id="name-input" value={this.state.name} label="Name" onChange={this.changed.bind(this)} throttled={500} /> : ""
				}
			</Dialog>
		)
	}
}