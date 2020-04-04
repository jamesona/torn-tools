import React from 'react'
import ReactDOM from 'react-dom'
import { awaitElement, log, addLocationChangeCallback } from './utils'

import Toolbar from './Toolbar'

log('React script has successfully started')

async function main() {
	const body = await awaitElement('body')

	const container = document.createElement('torn-tools')
	container.style.position = 'absolute'
	container.style.top = '73px'
	container.style.height = '100%'
	body.appendChild(container)

	ReactDOM.render(<Toolbar />, container)
}

addLocationChangeCallback(() => {
	main().catch(e => {
		log(e)
	})
})
