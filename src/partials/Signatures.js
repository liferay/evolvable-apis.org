'use strict';

import {isServerSide} from 'metal';
import Component from 'metal-component';
import Soy from 'metal-soy';
import moment from 'moment';
import WeDeploy from 'wedeploy';

import templates from './Signatures.soy.js';

class Signatures extends Component {
	rendered() {
		if (isServerSide()) {
			return;
		}

		WeDeploy
			.data('data-evolvableapis.wedeploy.io')
			.orderBy('timestamp', 'desc')
			.limit(5)
			.get('signatures')
			.then(response => {
				this.appendSignatures(response);
			})
	}

	appendSignatures(signatures) {
		let container = document.querySelector('#signatures-container');
		let html = `<h3 class="header-subtitle">See who signed</h3>`

		signatures.forEach(signature => {
			html += `
				<p>${signature.name} from ${signature.location} - ${moment(signature.timestamp).fromNow()}</p>
			`
		});

		container.innerHTML = html;
	}
};

Soy.register(Signatures, templates);

export default Signatures;
