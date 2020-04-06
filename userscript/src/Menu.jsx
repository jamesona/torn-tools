import React from 'react'

const appendVisibility = items =>
	items.map(item => ({
		...item,
		visible:
			typeof item.visible === 'undefined' ||
			(typeof item.visible === 'function' && item.visible) ||
			!!item.visible,
	}))

const buttonOrNull = item =>
	item.visible ? (
		<button onClick={() => item.onClick()} disabled={item.disabled}>
			{item.text}
		</button>
	) : null

const menuStyle = {
	padding: '0.5rem',
	backgroundColor: 'rgb(242, 242, 242)',
	width: '10rem',
	borderRadius: '0 5px 5px 0',
}
function Menu({ items } = {}) {
	const menuItems = appendVisibility(items || [])

	return menuItems.some(item => item.visible) ? (
		<div style={menuStyle}>{menuItems.map(buttonOrNull)}</div>
	) : null
}

export default Menu
