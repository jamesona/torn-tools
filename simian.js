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
	document.body.appendChild(toolbar)

	const scripts = [
		"https://unpkg.com/react@16/umd/react.development.js",
		"https://unpkg.com/react-dom@16/umd/react-dom.development.js",
		"https://jamesonaranda.com/torn-tools/src/toolbar.js"
	]

	scripts.forEach(script => {
		const e = document.createElement('script')
		e.src = script
		e.crossOrigin = true
		toolbar.appendChild(e)
	})
})()
