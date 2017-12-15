define(['ace'], function(ace) {
	'use strict';

	var editor = ace.edit('editor');
	editor.setTheme('ace/theme/tomorrow_night');
	editor.getSession().setUseSoftTabs(false);
	editor.getSession().setTabSize(4);
	document.getElementById('editor').style.fontSize='14px';
	editor.getSession().setUseWrapMode(false);
	editor.setShowPrintMargin(true);

	return editor;
});
