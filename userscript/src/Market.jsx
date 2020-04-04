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
			}).map(f => (
				<span onClick={() => f}>{f.name}</span>
			))}
		</div>
	)
}

export default Market
