import React from 'react'

import Market from './Market'
import Faction from './Faction'
import Bazaar from './Bazaar'

const toolbarStyle = {
	display: 'flex',
	left: '0',
	position: 'fixed',
	top: '0',
	height: '100vh',
	flexDirection: 'column'
}

function Toolbar() {
	return (
		<div style={toolbarStyle}>
			{(() => {
				switch (window.location.pathname) {
					case '/imarket.php':
						return <Market />
					case '/factions.php':
						return <Faction />
					case '/bazaar.php':
						return <Bazaar />
					default:
						return null
				}
			})()}
		</div>
	)
}

export default Toolbar
