function buyMarketItem() {
	function queryBuyButton() {
		return document.querySelector('span.buy-icon')
	}

	function findYesButton(buyButton) {
		return buyButton.parentNode.parentNode
			.parentNode.nextElementSibling
			.childNodes[1].childNodes[5]
	}

	function findBoughtText() {
		return null
	}

	function waitAndTryAgain(fn, ttl) {
		ttl = ttl || 100
		return new Promise(resolve => {
			setTimeout(() => {
				resolve(fn())
			}, ttl)
		})
	}

	async function waitForYesButton(buyButton) {
		let yesButton
		while (yesButton === undefined) {
			yesButton = await waitAndTryAgain(
				() => findYesButton(buyButton)
			)
		}
		return yesButton
	}

	async function waitForBoughtText() {
		let bought
		while (!bought) {
			bought = await waitAndTryAgain(
				() => findBoughtText()
			)
		}
	}

	async function buyItem() {
		const buyButton = queryBuyButton()
		buyButton.click()
		const yesButton = await waitForYesButton(buyButton)
		yesButton.click()
		setTimeout(() => queryBuyButton() && buyItem(), 300)
	}

	buyItem()
}

function buyAll() {
	function getImage() {
		return new Promise(resolve => {
			const onClick = e => {
				const img = e.target.parentElement.previousElementSibling
				window.removeEventListener('click', onClick)
				resolve(img.src)
			}
			window.addEventListener('click', onClick)
		})
	}
	
	function buyAllInBazaar(img) {
		const query = `[src="${img}"]`
		const elements = Array.from(document.querySelectorAll(query))
		debugger
		elements.forEach(element => {
			const baseElement = element.parentElement
			baseElement.children[1].children[1].click()
			setTimeout(() => baseElement.nextElementSibling.children[1].children[2].click(), 300)
			setTimeout(() => baseElement.parentElement.nextElementSibling.children[1].children[1].children[0].click(), 300)
			setTimeout(() => baseElement.nextElementSibling.children[1].children[2].click(), 300)
		})
	}
	
	async function waitForClickAndBuy() {
		const img = await getImage()
		buyAllInBazaar(img.replace('https://www.torn.com', ''))
	}

	waitForClickAndBuy()
}
