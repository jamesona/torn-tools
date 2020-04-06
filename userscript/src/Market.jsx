import React from 'react'
import Menu from './Menu'

const marketItemSelector =
	'.item-market-search-wrap > .items-list > .items .item'

const listItemElements = () =>
	Array.from(document.querySelectorAll(marketItemSelector))

function* makeListItemIterator() {
	const items = listItemElements()

	while (items.length) {
		yield items.shift()
	}
}

const getTopItemElement = () => document.querySelector(marketItemSelector)

const getBuyButton = e => e.children[1]

const buyItem = (e, callback) => {
	// listen for changes on the market list,
	// and fire a callback when the row is added
	new MutationObserver(([{ target: messageRow }], observer) => {
		observer.disconnect()
		setTimeout(() => {
			if (messageRow.innerText.includes('Are you sure you want to buy')) {
				messageRow.children[2].click()
			} else if (
				[
					'Oh sorry! It looks like someone else just bought that item!',
					'This item has already been purchased by someone!',
				].includes(messageRow.innerText)
			) {
				messageRow.nextElementSibling.click()
			} else {
				debugger
			}

			if (callback && typeof callback === 'function') {
				setTimeout(callback)
			}
		})
	}).observe(e.parentElement, {
		attributes: false,
		childList: true,
		subtree: true,
	})

	getBuyButton(e).click()
}

const buyTopItem = callback => {
	buyItem(getTopItemElement(), callback)
}

const buyAllItems = callback => {
	const items = makeListItemIterator()

	const buyNextItem = () => {
		const { value: item, done } = items.next()
		console.log(done, item)

		if (item) {
			buyItem(item, done ? callback : buyNextItem)
		} else if (callback && typeof callback === 'function') {
			callback()
		}
	}

	buyNextItem()
}

function Market() {
	const menuItems = [
		{ text: 'Buy Top Item', onClick: buyTopItem },
		{ text: 'Buy All Items', onClick: buyAllItems },
	]

	return <Menu items={menuItems} />
}

export default Market
