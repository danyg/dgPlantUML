'use strict';

import {default as DOMListener}  from 'es6!DOMListener';

class Msg extends DOMListener {
	constructor() {
		super();
		this._hidden = true;
		this._setElement();
	}

	_onInteractiveDOM() {
		if(this._onElement) {
			this._onElement();
		}
	}

	_setElement() {
		throw new Error(`Set Element like this._element = document.getElementById('error');`);
	}

	setHTML(html) {
		this._element.innerHTML = html;
	}

	show(html) {

		if(this._element === null) {
			this._onElement = () => {
				this.show(html);
			};
			return;
		}
		clearTimeout(this._hideTimeOut);
		this.setHTML(html);

		if(this._hidden) {
			this._element.style.opacity = '0';
			this._element.style.display = 'initial';
			this._element.style.opacity = '1';
			this._hidden = false;
		}
	}

	showBy(html, timeMs) {
		this.show(html);
		this.hideIn(timeMs);
	}

	hide() {
		if(!this._hidden) {
			this._hidden = true;
			this._element.style.opacity = '0';

			this._hideTimeOut = setTimeout(() => {
				this._element.style.display = 'none';
			}, 400);
		}
	}

	hideIn(timeMs) {
		this._hideTimeOut = setTimeout(
			() => this.hide(),
			timeMs
		);
	}

}

export default Msg;
