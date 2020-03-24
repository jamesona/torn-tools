const BUY_BUTTON = 'span.buy-icon'

export function queryBuyButtons() {
	return Array.from(document.querySelectorAll(BUY_BUTTON))
}
