import { getImage } from './getImage'

export function buyAllInBazaar() {
	waitForClickAndBuy()
}

async function waitForClickAndBuy() {
	const img = await getImage()
	buyAll(img)
}

function buyAll(img: HTMLImageElement) {
	const query = `[src="${img}"]`
	const elements: HTMLElement[] = Array.from(document.querySelectorAll(query))
	const prices: number[] = elements.map(getPrice)
	const minPrice: number = Math.min(...prices)
	const safePurchases: HTMLElement[] = elements.filter(
		e => getPrice(e) <= minPrice * 1.15
	)
	const total: number = safePurchases.map(getPrice).reduce((a, c) => a + c)
	if (
		window.confirm(
			`Buying ${safePurchases.length} items for ${total}. Continue?`
		)
	) {
		safePurchases.forEach((element: HTMLElement) => {
			const baseElement: HTMLElement = element.parentElement
			;(baseElement.children[1].children[1] as HTMLElement).click()
			setTimeout(
				() =>
					(baseElement.nextElementSibling.children[1]
						.children[2] as HTMLElement).click(),
				300
			)
			setTimeout(
				() =>
					(baseElement.parentElement.nextElementSibling.children[1]
						.children[1].children[0] as HTMLElement).click(),
				300
			)
			setTimeout(
				() =>
					(baseElement.nextElementSibling.children[1]
						.children[2] as HTMLElement).click(),
				300
			)
		})
	}
}

function getPrice(e) {
	const info: HTMLElement = e.parentElement.parentElement
	const description: HTMLElement = (Array.from(
		info.children
	) as HTMLElement[]).find(e => e.className === 'desc')
	const price: HTMLElement = (Array.from(
		description.firstElementChild.children
	) as HTMLElement[]).find(e => e.classList.contains('price'))
	return Number(price.innerText.replace(/[$,]/g, ''))
}
