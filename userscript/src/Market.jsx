import React from 'react'

const marketItemSelector = '.items .item'

// const listItemElements = () =>
// 	Array.from(document.querySelectorAll(marketItemSelector))

const getTopItemElement = () => document.querySelector(marketItemSelector)
const getBuyButton = e => e.children[1]
// const getConfirmButton = e => e.nextElementSibling.children[0].children[2]

const buttonStyle = {}

function Market() {
	const menu = {
		'Buy Top Item': {
			disabled: () => !!getTopItemElement(),
			onClick: () => {
				debugger
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
			},
		},
	}

	return (
		<div>
			{Object.keys(menu).map(key => {
				const { disabled, onClick } = menu[key] || {}
				return (
					<button
						onClick={onClick}
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
