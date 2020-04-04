import React from 'react'

const listItemElements = () =>
	Array.from(document.querySelectorAll('.items .item'))

function Market() {
	const functions = Object.values({
		'Log Elements'() {
			listItemElements().forEach(console.log)
		},
	})

	return (
		<div>
			{functions.map(f => (
				<span
					onClick={() => {
						console.log(f)
						debugger
						f()
					}}
				>
					{f.name}
				</span>
			))}
		</div>
	)
}

export default Market
