const listItemElements = () =>
	Array.from(document.querySelectorAll('.items .item'))

function Market() {
	this.functions = {
		LogElements() {
			listItemElements().forEach(console.log)
		},
	}

	return `<div>
		${Object.values(this.functions)
			.map(f => `<a onClick={() => f}>{f.name}</a>`)
			.join('')}
	</div>`
}

export default Market
