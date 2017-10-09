import React, { Component } from 'react';
import Firebase from '@service/firebase/Firebase';
import { withRouter } from "react-router-dom";
import './Options.css';

class Options extends Component {
  constructor() {
	super();
	
	this.logout = this.logout.bind(this);
  }

  logout() {
		Firebase.logout();
		window.location.pathname = "/";
  }

  render() {
		if (Firebase.isLoggedIn()) {
			return (
					<div className="options-wrapper">
						<div className="options-container">
							<button onClick={ this.logout } title="Ausloggen">
								<span className="fa fa-power-off"></span>
							</button>
						</div>
					</div>
			);
		} else {
			return (<div/>);
		}
  }
}

export default withRouter(Options);
