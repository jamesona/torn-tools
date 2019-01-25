(() => {
	const template = document.createElement('template')
	template.innerHTML = `
	<style>
		.torn-toolbar {
			border-radius: 5px 5px 5px 5px;
			background: #f2f2f2;
		}

		.torn-toolbar > * {
			width: 100%;
		}

		.torn-toolbar > header {
			border-radius: 5px 5px 0 0;
			height: 40px;
			background-color: rgb(23, 153, 125);
			background-image: linear-gradient(90deg, transparent 50%, rgba(0, 0, 0, 0.07) 0px);
			background-size: 4px;
		}

		.torn-toolbar > footer {
			border-radius: 0 0 5px 5px;
			height: 40px;
		}
	</style>
	<div class="torn-toolbar">
		<header></header>
		<footer></footer>
	</div>
	`
	class TornToolbar extends HTMLElement {
		constructor() {
			super()
			this._shadowRoot = this
				.attachShadow({ mode: 'closed' })
				.appendChild(template.content.cloneNode(true))
		}
		
		connectedCallback() {
		}
	}
	customElements.define('torn-toolbar', TornToolbar)
})()
