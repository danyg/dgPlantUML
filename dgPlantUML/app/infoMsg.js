'use strict';

import {default as Msg}  from 'es6!Msg';

class InfoMsg extends Msg {
	constructor() {
		super();
	}

	_setElement() {
		this._element = document.getElementById('info');
	}
}

export default new InfoMsg();
