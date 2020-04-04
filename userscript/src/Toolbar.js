import React from 'react'

import Market from './Market'
import Faction from './Faction'
import Bazaar from './Bazaar'

const stickyWrapperStyle = {
	position: 'relative',
	height: '100%',
}

const toolbarStyle = {
	backgroundColor: 'rgb(242, 242, 242)',
	width: '10rem',
	position: 'sticky',
	top: '0',
	padding: '0.5rem',
	borderRadius: '0 5px 5px 0',
}

function Toolbar() {
	return (
		<div style={stickyWrapperStyle}>
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
		</div>
	)
}

export default Toolbar
