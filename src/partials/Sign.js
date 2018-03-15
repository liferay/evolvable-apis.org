'use strict';

import {isServerSide} from 'metal';
import Component from 'metal-component';
import Soy from 'metal-soy';
import WeDeploy from 'wedeploy';

import templates from './Sign.soy.js';

class Sign extends Component {
	attached() {
		if (isServerSide()) {
			return;
		}
	}

	onSubmit(e) {
		e.preventDefault();

		WeDeploy
			.data('data-evolvableapis.wedeploy.io')
			.create('signatures', {
				name: e.target.name.value,
				email: e.target.email.value,
				location: e.target.location.value,
				timestamp: new Date().toISOString()
			})
			.then(response => {
				alert('Thanks for signing!');
				e.target.reset();
			})
			.catch(error => {
				alert('Some error occurred, please try again later.');
				console.error(error);
			});
	}
};

Soy.register(Sign, templates);

export default Sign;
