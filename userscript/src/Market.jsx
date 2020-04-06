import React from 'react'

const marketItemSelector =
	'.item-market-search-wrap > .items-list > .items .item'

// const listItemElements = () =>
// 	Array.from(document.querySelectorAll(marketItemSelector))

const getTopItemElement = () => document.querySelector(marketItemSelector)
const getBuyButton = e => e.children[1]
// const getConfirmButton = e => e.nextElementSibling.children[0].children[2]
const buyTopItem = () => {
	const e = getTopItemElement()

	// listen for changes on the market list, and fire a callback when the row is added
	new MutationObserver(([mutation], observer) => {
		observer.disconnect()
		setTimeout(() => {
			mutation.target.children[2].click()
		}, 100)
	}).observe(e.parentElement, {
		attributes: false,
		childList: true,
		subtree: true,
	})

	getBuyButton(e).click()
}

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
		<span onClick={() => item.onClick()}>{item.text}</span>
	) : null

function Market() {
	const menuItems = appendVisibility([
		{ text: 'Buy Top Item', onClick: buyTopItem },
	])

	return menuItems.some(item => item.visible) ? (
		<div>{menuItems.map(buttonOrNull)}</div>
	) : null
}

export default Market
