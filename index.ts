import { buyMarketItem, getItemType } from "./buyMarketItem";
import { buyAllInMarket } from "./buyAllInMarket";
import { buyAllInBazaar } from "./buyAllInBazaar";
import { sellAll } from "./sellAllInBazaar";
import { Config } from "./config";

function main() {
	const header = document.querySelector('.header-wrapper-bottom')
	const buttons = document.createElement('div')
	buttons.style.margin = 'auto'
	buttons.style.maxWidth = '30vw'
	buttons.style.position = 'fixed'

	const buttonConfigs = [{
		name: 'Buy Top Item',
		task: buyMarketItem
	}, {
		name: 'Buy All Listings',
		task: buyAllInMarket
	}, {
		name: 'Buy All In Bazaar',
		task: buyAllInBazaar
	}, {
		name: 'Sell All',
		task: sellAll
	}]
	const bazaarLink = document.createElement('a')
	bazaarLink.href = "https://www.torn.com/bazaar.php#/p=add"
	
	const autoBuyToggle = createAutoBuyToggle()

	appendChildren([...makeButtons(buttonConfigs), autoBuyToggle], buttons)

	const style = createStyle()

	appendChildren([buttons, style], header)

	header && header.appendChild(buttons) && header.appendChild(bazaarLink)
	if (window.location.pathname.includes('market') && Config.autoBuy) {
		const item = getItemType()
		const maxPrice = Config.maxPrices[item]
		buyAllInMarket(Number(maxPrice))
	}
}

function createStyle() {
	const style = document.createElement('style')
	style.innerHTML = `
		button {
			color: gray;
			background: black;
			border: 1px solid currentColor;
			margin: 5px;
			cursor: pointer;
		}
		button:hover {
			color: #ccc;
		}
	`
	return style
}

function createButton(config) {
	const { name, task } = config
	const button = document.createElement('button')
	button.innerText = name
	button.addEventListener('click', task)
	return button
}

function makeButtons(buttons) {
	return buttons.map(config => createButton(config))
}

function createAutoBuyToggle() {
	const input = document.createElement('input')
	input.type = 'checkbox'
	input.id = 'auto-buy'
	input.onchange = () => {
		Config.autoBuy = !!(input.checked)
	}
	input.checked = !!(Config.autoBuy)
	return input
}

function appendChildren(children, parent) {
	children.forEach(child => parent.appendChild(child))
}

main()
