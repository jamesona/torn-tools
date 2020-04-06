import React from 'react'

const buttonOrNull = item =>
	item.visible ? (
		<button onClick={() => item.onClick()}>{item.text}</button>
	) : null

const menuStyle = {
	padding: '0.5rem',
	backgroundColor: 'rgb(242, 242, 242)',
	width: '10rem',
	borderRadius: '0 5px 5px 0',
}
function Menu({ items } = {}) {
	const menuItems = items || []

	return menuItems.length ? (
		<div style={menuStyle}>{menuItems.map(buttonOrNull)}</div>
	) : null
}

export default Menu
