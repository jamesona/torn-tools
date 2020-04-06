import React from 'react'

const marketItemSelector =
	'.item-market-search-wrap > .items-list > .items .item'

// const listItemElements = () =>
// 	Array.from(document.querySelectorAll(marketItemSelector))

const getTopItemElement = () => document.querySelector(marketItemSelector)
const getBuyButton = e => e.children[1]
// const getConfirmButton = e => e.nextElementSibling.children[0].children[2]
const buyTopItem = () => {
	debugger
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

const buttonStyle = {}

function Market() {
	const functions = {
		'Buy Top Item': {
			disabled: () => !!getTopItemElement(),
			onClick: () => {
				debugger
				buyTopItem()
			},
		},
	}

	return (
		<div>
			{Object.keys(functions).map(key => {
				const { disabled, onClick } = functions[key] || {}
				return (
					<button
						onClick={() => {
							debugger
							onClick()
						}}
						disabled={disabled}
						style={buttonStyle}
					>
						{key}
					</button>
				)
			})}
		</div>
	)
}

export default Market
