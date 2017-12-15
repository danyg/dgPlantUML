require.config({
	paths: {
		//babel 6 (weirdly doesn't work with ace for some reason...)
		// 'es6': '../node_modules/requirejs-babel6/es6',
		// 'babel': '../node_modules/requirejs-babel6/babel.min',

		//babel 5
		'es6': '../node_modules/requirejs-babel/es6',
		'babel': '../node_modules/requirejs-babel/babel-5.8.34.min',

		'ace': '../node_modules/ace-builds/src-min-noconflict/ace'
	},
	babel: {
		blacklist: [],
		nonStandard: true,
		modules: 'amd'
	},
	shim: {
		'ace': {
			exports: 'ace'
		}
	}
});

define([
	'es6!plantUML',

	'./syncro'
], function (
	plantUML
) {
	'use strict';

});
