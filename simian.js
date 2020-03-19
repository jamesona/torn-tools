//==UserScript==
//@name torn-tools
//@namespace http://tampermonkey.net/
//@version 0.5.0
//@description tools for http://torn.com
//@author Jameson Aranda
//@match https://www.torn.com
//@include https://www.torn.com*
//@grant none
//==/UserScript==
(() => {
	const toolbar = document.createElement('torn-tools')
	toolbar.innerHTML = `
		<script src="https://unpkg.com/react@16/umd/react.development.js" crossorigin></script>
		<script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js" crossorigin></script>
		<script src="https://jamesonaranda.com/torn-tools/src/toolbar.js" crossorigin></script>
	`
	document.body.appendChild(toolbar)
})()
