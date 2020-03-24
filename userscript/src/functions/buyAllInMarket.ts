import { queryBuyButtons } from './queryBuyButtons'
import { buyMarketItem, parsePrice, getItemType, wait } from './buyMarketItem'
import { waitAndTryAgain } from './waitAndTryAgain'

export async function buyAllInMarket(maxPrice?: number) {
	const allButtons = await waitForButtons()
	const buttons = allButtons.filter(button => {
		const costElement: HTMLElement = Array.from(
			button.parentElement.parentElement.parentElement.children
		).find((element: HTMLElement) =>
			element.classList.contains('cost')
		) as HTMLElement
		const price = parsePrice(costElement.innerText)
		const type = getItemType()
		return price > type // this is nonsense, get this from the user, I guess
	})
	if (!buttons.length) {
		await wait(5000)
	}
	while (buttons.length) {
		await buyMarketItem(buttons.shift(), maxPrice)
	}
	window.location.reload()
}

async function waitForButtons() {
	let buttons
	while (buttons === undefined) {
		buttons = await waitAndTryAgain(() => queryBuyButtons())
	}
	return buttons
}
