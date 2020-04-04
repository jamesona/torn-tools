import React from 'react'

const marketItemSelector = '.items .item'

// const listItemElements = () =>
// 	Array.from(document.querySelectorAll(marketItemSelector))

const getTopItemElement = () => document.querySelector(marketItemSelector)

const getBuyButton = e => e.children[1]
const getConfirmButton = e => e.nextElementSibling.children[0].children[2]

function Market() {
	const functions = Object.values({
		'Buy Top Item'() {
			const e = getTopItemElement()

			// listen for changes on the market list, and fire a callback when the row is added
			new MutationObserver(([mutation], { disconnect }) => {
				disconnect()
				mutation.target.children[2].click()
			}).observe(e.parentElement, {
				attributes: false,
				childList: true,
				subtree: true,
			})

			getBuyButton(e).click()
		},
	})

	return (
		<div>
			{functions.map(f => (
				<span onClick={() => f()}>{f.name}</span>
			))}
		</div>
	)
}

export default Market
