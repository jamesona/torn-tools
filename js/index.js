"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const buyMarketItem_1 = require("./buyMarketItem");
const buyAllInMarket_1 = require("./buyAllInMarket");
const buyAllInBazaar_1 = require("./buyAllInBazaar");
const sellAllInBazaar_1 = require("./sellAllInBazaar");
const config_1 = require("./config");
function main() {
    const header = document.querySelector('.header-wrapper-bottom');
    const buttons = document.createElement('div');
    buttons.style.margin = 'auto';
    buttons.style.maxWidth = '30vw';
    buttons.style.position = 'fixed';
    const buttonConfigs = [{
            name: 'Buy Top Item',
            task: buyMarketItem_1.buyMarketItem
        }, {
            name: 'Buy All Listings',
            task: buyAllInMarket_1.buyAllInMarket
        }, {
            name: 'Buy All In Bazaar',
            task: buyAllInBazaar_1.buyAllInBazaar
        }, {
            name: 'Sell All',
            task: sellAllInBazaar_1.sellAll
        }];
    const autoBuyToggle = createAutoBuyToggle();
    appendChildren([...makeButtons(buttonConfigs), autoBuyToggle], buttons);
    const style = createStyle();
    appendChildren([buttons, style], header);
    header && header.appendChild(buttons);
    if (window.location.pathname.includes('market') && config_1.Config.autoBuy) {
        const item = buyMarketItem_1.getItemType();
        const maxPrice = config_1.Config.maxPrices[item];
        buyAllInMarket_1.buyAllInMarket(Number(maxPrice));
    }
}
function createStyle() {
    const style = document.createElement('style');
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
	`;
    return style;
}
function createButton(config) {
    const { name, task } = config;
    const button = document.createElement('button');
    button.innerText = name;
    button.addEventListener('click', task);
    return button;
}
function makeButtons(buttons) {
    return buttons.map(config => createButton(config));
}
function createAutoBuyToggle() {
    const input = document.createElement('input');
    input.type = 'checkbox';
    input.id = 'auto-buy';
    input.onchange = () => {
        config_1.Config.autoBuy = !!(input.checked);
    };
    input.checked = !!(config_1.Config.autoBuy);
    return input;
}
function appendChildren(children, parent) {
    children.forEach(child => parent.appendChild(child));
}
main();
//# sourceMappingURL=index.js.map