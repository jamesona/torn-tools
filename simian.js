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
	const repo = 'https://raw.githubusercontent.com/jamesona/torn-tools'
	const branch = 'react'

	document.createElement('torn-tools')
	document.innerHTML = `
	<script src="https://unpkg.com/react@16/umd/react.development.js" crossorigin></script>
	<script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js" crossorigin></script>
	<script src="${repo}/${branch}/src/toolbar.js"></script>
	`
})()
