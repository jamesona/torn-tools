import { queryBuyButtons } from "./queryBuyButtons";
import { buyMarketItem, parsePrice, getItemType, wait } from "./buyMarketItem";
import { waitAndTryAgain } from "./waitAndTryAgain";
import { Config } from "./config";

export async function buyAllInMarket(maxPrice?: number) {
	const allButtons = await waitForButtons()
	const buttons = allButtons.filter(button => {
		const costElement: HTMLElement = Array.from(
			button.parentElement.parentElement.parentElement.children
		).find(
			(element: HTMLElement) => element.classList.contains('cost')
		) as HTMLElement
		const price = parsePrice(costElement.innerText)
		const type = getItemType()
		return (!Config.maxPrices || !Config.maxPrices[type] || price < Config.maxPrices[type])
	})
	if (!buttons.length) {
		const done = await wait(5000)
	}
	while (buttons.length) {
		const button = await buyMarketItem(buttons.shift(), maxPrice)
	}
	window.location.reload()
}

async function waitForButtons() {
	let buttons
	while (buttons === undefined) {
		buttons = await waitAndTryAgain(
			() => queryBuyButtons()
		)
	}
	return buttons
}
