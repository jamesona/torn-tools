import React from 'react'
import Menu from './Menu'

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
		mutation.target.children[2].click()
	}).observe(e.parentElement, {
		attributes: false,
		childList: true,
		subtree: true,
	})

	getBuyButton(e).click()
}

function Market() {
	const menuItems = [{ text: 'Buy Top Item', onClick: buyTopItem }]

	return <Menu items={menuItems} />
}

export default Market
