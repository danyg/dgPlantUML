'use strict';

import * as editor from 'editor';
import {default as DOMListener}  from 'es6!DOMListener';
import {default as errorMsg} from 'es6!errorMsg';
import {default as infoMsg} from 'es6!infoMsg';
import {default as keyboardHandler} from 'es6!keyboardHandler';

const DEFAULT_ERR_MSG = 'Syntax Error!';
const ERROR_MAP = {
	'>Syntax error: ': DEFAULT_ERR_MSG,
	'>Syntax Error?<': DEFAULT_ERR_MSG,
	'>No such participant ': 'Start tag Syntax Error!'
};
const ERROR_KEYS = Object.keys(ERROR_MAP);

class PlantUML extends DOMListener{
	constructor() {
		super();
		this._syntaxError = false;

		this._listenForHashChanges();
	}

	_listenForHashChanges() {
		if(window.location.hash === '') {
			window.location.hash = '#default';
		}
		let oldHash = window.location.hash;
		setInterval(() => {
			try {
				if(window.location.hash !== oldHash) {
					this._onFileChanged(oldHash);
				}
			} catch(e) {
				window.console.error('Error dispatching Hash Changed Event');
			}
			oldHash = window.location.hash;
		}, 10);

	}

	_onFileChanged(oldHash) {
		this._save(oldHash);
		if(!this.loadPreviousStatus()) {
			this._writeEditor('@startuml\n(*)-->"do stuff"\n-->(*)\n@enduml');
		}
	}

	_writeEditor(data) {
		this.editor.setValue(data);
		this.editor.clearSelection();
	}

	_onWindowUnload() {
		if(this._popup) {
			this._popup.close();
		}
	}

	_onInteractiveDOM() {
		this.editor = editor;
		window._editor = editor;
		this.editorPane = document.getElementById('editor-pane');
		this.editor.on("change", this._onEditorChange.bind(this));
		this.presenter = document.getElementById('uml-presenter');
		this.presenter.addEventListener('contextmenu', this.togglePresenter.bind(this));


		this.loadPreviousStatus();
		this.addHotKeys();
		this.callServer();
	}


	_onEditorChange(/*e*/) {
		clearTimeout(this._editChangeTO);
		this._editChangeTO = setTimeout(() => {
			this.saveStatus();
			this.callServer();
		}, 500);
	}

	loadPreviousStatus() {
		if(window.localStorage.hasOwnProperty(window.location.hash)) {
			this._writeEditor(window.localStorage.getItem(window.location.hash));
			return true;
		}
		return false;
	}
	saveStatus(byUser) {

		if(!this._syntaxError) {
			this._save(window.location.hash);
			infoMsg.showBy('Saved!', 1500);
		} else if(this._syntaxError && byUser) {
			infoMsg.showBy('Cannot Save, Syntax Error!', 2500);
		}
	}

	_save(fileName) {
		window.localStorage.setItem(fileName, this.editor.getValue());
	}

	callServer() {
		var data = this.getSerialized();
		this._call('GET', `/plantuml/svg/${data}`)
			.then(this._processResponse.bind(this))
		;
	}

	_call(method, uri) {
		return new Promise((resolve, reject) => {
			var request = new XMLHttpRequest();
			request.addEventListener('readystatechange', () => {
				if(request.readyState === XMLHttpRequest.DONE) {
					if(request.status >= 200 && request.status < 300) {
						resolve(request);
					} else {
						reject(request);
					}
				}
			});

			request.open(method, uri);
			request.send();
		});
	}

	getSerialized() {
		var s = this.editor.getValue();
		s = unescape(encodeURIComponent(s));
		return encode64(zip_deflate(s, 9));
	}

	_processResponse(response) {
		if(this._validateAndShowError(response.responseText)) {
			let pos = response.responseText.indexOf('?>') +2;
			this.presenter.innerHTML = response.responseText.substring(pos);
		}
	}

	_validateAndShowError(txtResponse) {
		let err;
		for (let i=0; i < ERROR_KEYS.length; i++) {
			err = ERROR_KEYS[i];
			if(txtResponse.indexOf(err) !== -1) {
				this._syntaxError = true;
				errorMsg.show(ERROR_MAP[err]);
				return false;
			}
		}
		this._syntaxError = false;
		errorMsg.hide();
		return true;
	}

	togglePresenter(e) {
		if(document.body.className.indexOf('superpossed') === -1) {
			if(!this._popup) {
				this._popup = window.open('popup.html', 'presenter', 'menubar=yes,location=no, resizable=yes,scrollbars=yes');
				setTimeout(() => {
					Array.prototype.forEach.call(document.getElementsByClassName('transpasableSS'), (item) => {
						this._popup.document.head.appendChild( item.cloneNode() );
					});

					this._popup.document.body.appendChild(this.presenter);
				}, 1000);
			} else {
				window.body.appendChild(this.presenter);
				this._popup.close();
			}
			e.preventDefault();
			return false;
		}
	}

	addHotKeys() {
		keyboardHandler.on(
			'Ctrl-S',
			this.saveStatus.bind(this, true),
			true
		);

		keyboardHandler.on(
			'Ctrl-`',
			this.toggleEditor.bind(this),
			true
		);
	}

	toggleEditor() {
		let style = this.editorPane.style;
		if(style.display !== 'none') {
			style.display = 'none';
		} else {
			style.display = 'initial';
		}
	}

}

export default new PlantUML();
