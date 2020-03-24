import { queryBuyButtons } from './queryBuyButtons'
import { waitAndTryAgain } from './waitAndTryAgain'

export async function buyMarketItem(buyButton, maxPrice: number) {
	if (buyButton instanceof Event) buyButton = undefined
	buyButton = buyButton || queryBuyButtons()[0]

	return await buyItem(buyButton, maxPrice)
}

export function parsePrice(price: string): number {
	return Number(price.replace(/[$,]/g, ''))
}

function getPrice(confirmBar: HTMLElement): number {
	let match: any[] | null = confirmBar.innerText
		.replace(',', '')
		.match(/\$(\d+)/)
	if (match) {
		return parsePrice(match[1])
	} else {
		return null
	}
}

function queryToObject(query: string): { [key: string]: any } {
	return query
		.replace(/\?/, '')
		.split('&')
		.reduce((prev, cur) => {
			const [key, val] = cur.split('=')
			prev[key] = val
			return prev
		}, {})
}

export function getItemType(): number {
	const params = window.location.hash.slice(2)
	const paramsObj = queryToObject(params)
	return paramsObj.type
}

function findYesButton(buyButton) {
	const confirmBar =
		buyButton.parentNode.parentNode.parentNode.nextElementSibling
			.children[0]
	if (confirmBar) {
		if (
			confirmBar.classList.contains('t-red') ||
			confirmBar.innerText.includes('sorry')
		) {
			return confirmBar.nextElementSibling
		} else {
			return confirmBar.children[2]
		}
	} else {
		return undefined
	}
}

function findBoughtText(yesButton) {
	if (
		!yesButton ||
		!yesButton.parentElement ||
		!yesButton.parentElement.parentElement ||
		!yesButton.parentElement.parentElement.nextElementSibling
	)
		return undefined
	const successBar = yesButton.parentElement.parentElement.nextElementSibling
	const children = successBar.children[0].children
	// this is a shortcut for when complete
	if (children) return children[1]
}

async function waitForYesButton(buyButton) {
	let yesButton
	while (yesButton === undefined) {
		yesButton = await waitAndTryAgain(() => findYesButton(buyButton))
	}
	return yesButton
}

async function waitForBoughtText(yesButton) {
	let bought
	while (!bought) {
		bought = await waitAndTryAgain(() => findBoughtText(yesButton))
	}
	return bought
}

async function buyItem(buyButton: HTMLElement, maxPrice?: number) {
	if (!buyButton) debugger
	buyButton.click()
	const yesButton = await waitForYesButton(buyButton)

	const price: number = getPrice(yesButton.parentElement)
	// const type: number = getItemType()

	if (maxPrice) {
		if (price > maxPrice) return null
	}

	// Config.maxPrices = Config.maxPrices || {}
	// maxPrice = Config.maxPrices[type]

	// if (maxPrice && price > maxPrice) {
	// 	const message =
	// 		`The price for this item ($${price})` +
	// 		` is greater than your previous max price ($${maxPrice}),` +
	// 		' would you like to buy and set a new max?'
	// 	if (!confirm(message)) {
	// 		const done = await wait(3000)
	// 		window.location.reload()
	// 	}
	// }

	// if (!maxPrice || price > maxPrice) {
	// 	Config.maxPrices = { ...Config.maxPrices, [type]: price }
	// }

	// Config.lastPrices = Config.lastPrices || {}
	// Config.lastPrices = { ...Config.lastPrices, [type]: price }

	if (yesButton.classList.contains('close-icon')) {
		yesButton.click()
		return null
	} else {
		yesButton.click()
		const boughtMessage = await waitForBoughtText(yesButton)
		return boughtMessage
	}
}

export function wait(time) {
	return new Promise(resolve => {
		debugger
		setTimeout(() => resolve('done!'), time)
	})
}
