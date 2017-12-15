'use strict';

import * as editor from 'editor';
import {default as DOMListener}  from 'es6!DOMListener';

const KEY_NAMES = {
	'ArrowUp': 'Up',
	'ArrowDown': 'Down',
	'ArrowLeft': 'Left',
	'ArrowRight': 'Right'
};

class KeyboardHandler extends DOMListener {
	constructor() {
		super();
		this._keys = {};
	}

	_onInteractiveDOM() {
		document.addEventListener('keydown', this._onKey.bind(this));
	}

	on(key, cbk, toEditorToo) {
		var key = key.toLowerCase();
		if(!this._keys.hasOwnProperty(key)) {
			this._keys[key] = [];
		}
		this._keys[key].push(cbk);

		if(toEditorToo) {
			editor.commands.addCommand({
				name: 'Key ' + key,
				bindKey: {win: key,  mac: key},
				exec: cbk
			});
		}
	}

	_onKey(event) {
		var key = '';
		key += event.ctrlKey  ? 'Ctrl-' + ''  : '';
		key += event.altKey   ? 'Alt-' + ''   : '';
		key += event.shiftKey ? 'Shift-' + '' : '';
		key += this._getKey(event.key);
		key = key.toLowerCase();

		if(this._keys.hasOwnProperty(key)) {
			this._keys[key].forEach((cbk) => {
				try {
					cbk(event);
				} catch(e) {
					window.console.error(`ERROR executing Key Handler for ${key}`);
				}
			});

			event.preventDefault();
			return false;
		}
	}

	_getKey(eventKeyName) {
		if(KEY_NAMES.hasOwnProperty(eventKeyName)) {
			return KEY_NAMES[eventKeyName];
		}
		return eventKeyName;
	}
}

export default new KeyboardHandler();
