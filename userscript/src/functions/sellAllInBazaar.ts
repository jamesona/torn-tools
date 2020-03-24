import { getImage } from "./getImage";

export async function sellAll() {
	function setValues(elements, price) {
		const inputs = elements.shift()
		const checkbox = inputs.amount.firstElementChild.firstElementChild.children[1]
		checkbox.click()
		const textbox = inputs.price.firstElementChild.firstElementChild
		textbox.dispatchEvent(new Event('focus'))
		textbox.value = price
		textbox.dispatchEvent(new KeyboardEvent('keypress', { key: 'tab' }))
		textbox.dispatchEvent(new Event('change'))
		textbox.dispatchEvent(new Event('blur'))
		setTimeout(() => setValues(elements, price), 10)
	}
	const src = await getImage()
	setTimeout(() => {
		const images = Array.from(document.querySelectorAll('[src="' + src + '"]'))
		const actions = images.map(e => e.parentElement.parentElement.parentElement.nextElementSibling)
		const inputs = actions.map(e => {
			const divs = Array.from(e.children[0].children)
			return {
				amount: divs.find(e => e.className === 'amount'),
				price: divs.find(e => e.className === 'price')
			}
		}).filter(i => i.amount && i.price)
		const price = prompt('Enter Price')
		setValues(inputs, price)
	}, 2000)
}
