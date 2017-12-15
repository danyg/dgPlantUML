'use strict';

import {default as Msg}  from 'es6!Msg';

class ErrorMsg extends Msg {
	constructor() {
		super();
	}

	_setElement() {
		this._element = document.getElementById('error');
	}
}

export default new ErrorMsg();
