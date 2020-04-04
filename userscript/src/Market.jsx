import React from 'react'

const listItemElements = () =>
	Array.from(document.querySelectorAll('.items .item'))

function Market() {
	return (
		<div>
			$
			{Object.values({
				LogElements() {
					listItemElements().forEach(console.log)
				},
			})
				.map(f => `<a onClick={() => f}>{f.name}</a>`)
				.join('')}
		</div>
	)
}

export default Market
