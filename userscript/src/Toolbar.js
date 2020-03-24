import React from 'react'
// import './Tools.css';

const toolbarStyle = {
	backgroundColor: 'black',
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
					case '/factions.php':
					case '/bazaar.php':
					case '/imarket.php':
					default:
						return 'hello world'
				}
			})()}
		</div>
	)
}

export default Toolbar
