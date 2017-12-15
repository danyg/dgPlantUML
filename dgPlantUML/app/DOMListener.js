'use strict';

const READY_STATES = ['interactive', 'complete'];

class DOMListener {
	constructor() {
		this._listenDOMReady();
		this._listenWindowUnload();
	}

	_listenDOMReady() {
		let checkReadyState = () => {
			if (READY_STATES.indexOf(document.readyState) !== -1) {
				this._onInteractiveDOM();
			}
		};
		document.addEventListener('readystatechange', checkReadyState);
		checkReadyState();
	}

	_listenWindowUnload() {
		window.addEventListener('unload', () => {
			this._onWindowUnload();
		});
	}

	_onInteractiveDOM() {}
	_onWindowUnload() {}
}

export default DOMListener;
