import React from 'react'

import Market from './Market'
import Faction from './Faction'
import Bazaar from './Bazaar'

const stickyWrapperStyle = {
	position: 'relative',
	height: '100%',
}

const toolbarStyle = {
	position: 'sticky',
	top: '0',
	padding: '0.5rem',
}

const menuStyle = {
	backgroundColor: 'rgb(242, 242, 242)',
	width: '10rem',
	borderRadius: '0 5px 5px 0',
}
function Toolbar() {
	return (
		<div style={stickyWrapperStyle}>
			<div style={toolbarStyle}>
				{(() => {
					switch (window.location.pathname) {
						case '/imarket.php':
							return (
								<div style={menuStyle}>
									<Market />
								</div>
							)
						case '/factions.php':
							return (
								<div style={menuStyle}>
									<Faction />
								</div>
							)
						case '/bazaar.php':
							return (
								<div style={menuStyle}>
									<Bazaar />
								</div>
							)
						default:
							return null
					}
				})()}
			</div>
		</div>
	)
}

export default Toolbar
