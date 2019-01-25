//==UserScript==
//@name torn-tools
//@namespace http://tampermonkey.net/
//@version 0.4.3
//@description tools for http://torn.com
//@author Jameson Aranda
//@match https://www.torn.com
//@include https://www.torn.com*
//@grant none
//==/UserScript==
(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const getImage_1 = require("./getImage");
function buyAllInBazaar() {
    waitForClickAndBuy();
}
exports.buyAllInBazaar = buyAllInBazaar;
function waitForClickAndBuy() {
    return __awaiter(this, void 0, void 0, function* () {
        const img = yield getImage_1.getImage();
        buyAll(img);
    });
}
function buyAll(img) {
    const query = `[src="${img}"]`;
    const elements = Array.from(document.querySelectorAll(query));
    const prices = elements.map(getPrice);
    const minPrice = Math.min(...prices);
    const safePurchases = elements.filter(e => getPrice(e) <= minPrice * 1.15);
    const total = safePurchases.map(getPrice).reduce((a, c) => a + c);
    if (confirm(`Buying ${safePurchases.length} items for ${total}. Continue?`)) {
        safePurchases.forEach((element) => {
            const baseElement = element.parentElement;
            baseElement.children[1].children[1].click();
            setTimeout(() => baseElement.nextElementSibling.children[1].children[2].click(), 300);
            setTimeout(() => baseElement.parentElement.nextElementSibling.children[1].children[1].children[0].click(), 300);
            setTimeout(() => baseElement.nextElementSibling.children[1].children[2].click(), 300);
        });
    }
}
function getPrice(e) {
    const info = e.parentElement.parentElement;
    const description = Array.from(info.children)
        .find(e => e.className === 'desc');
    const price = Array.from(description.firstElementChild.children)
        .find(e => e.classList.contains('price'));
    return Number(price.innerText.replace(/[$,]/g, ''));
}

},{"./getImage":5}],2:[function(require,module,exports){
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const queryBuyButtons_1 = require("./queryBuyButtons");
const buyMarketItem_1 = require("./buyMarketItem");
const waitAndTryAgain_1 = require("./waitAndTryAgain");
const config_1 = require("./config");
function buyAllInMarket(maxPrice) {
    return __awaiter(this, void 0, void 0, function* () {
        const allButtons = yield waitForButtons();
        const buttons = allButtons.filter(button => {
            const costElement = Array.from(button.parentElement.parentElement.parentElement.children).find((element) => element.classList.contains('cost'));
            const price = buyMarketItem_1.parsePrice(costElement.innerText);
            const type = buyMarketItem_1.getItemType();
            return (!config_1.Config.maxPrices || !config_1.Config.maxPrices[type] || price < config_1.Config.maxPrices[type]);
        });
        if (!buttons.length) {
            const done = yield buyMarketItem_1.wait(5000);
        }
        while (buttons.length) {
            const button = yield buyMarketItem_1.buyMarketItem(buttons.shift(), maxPrice);
        }
        window.location.reload();
    });
}
exports.buyAllInMarket = buyAllInMarket;
function waitForButtons() {
    return __awaiter(this, void 0, void 0, function* () {
        let buttons;
        while (buttons === undefined) {
            buttons = yield waitAndTryAgain_1.waitAndTryAgain(() => queryBuyButtons_1.queryBuyButtons());
        }
        return buttons;
    });
}

},{"./buyMarketItem":3,"./config":4,"./queryBuyButtons":7,"./waitAndTryAgain":9}],3:[function(require,module,exports){
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const queryBuyButtons_1 = require("./queryBuyButtons");
const waitAndTryAgain_1 = require("./waitAndTryAgain");
const config_1 = require("./config");
function buyMarketItem(buyButton, maxPrice) {
    return __awaiter(this, void 0, void 0, function* () {
        if (buyButton instanceof Event)
            buyButton = undefined;
        buyButton = buyButton || queryBuyButtons_1.queryBuyButtons()[0];
        return yield buyItem(buyButton, maxPrice);
    });
}
exports.buyMarketItem = buyMarketItem;
function parsePrice(price) {
    return Number(price.replace(/[\$,]/g, ''));
}
exports.parsePrice = parsePrice;
function getPrice(confirmBar) {
    let match = confirmBar.innerText.replace(',', '').match(/\$(\d+)/);
    if (match) {
        return parsePrice(match[1]);
    }
    else {
        return null;
    }
}
function queryToObject(query) {
    return query.replace(/\?/, '').split('&').reduce((prev, cur) => {
        const [key, val] = cur.split('=');
        prev[key] = val;
        return prev;
    }, {});
}
function getItemType() {
    const params = window.location.hash.slice(2);
    const paramsObj = queryToObject(params);
    return paramsObj.type;
}
exports.getItemType = getItemType;
function findYesButton(buyButton) {
    const confirmBar = buyButton.parentNode.parentNode
        .parentNode.nextElementSibling
        .children[0];
    if (confirmBar) {
        if (confirmBar.classList.contains('t-red') || confirmBar.innerText.includes('sorry')) {
            return confirmBar.nextElementSibling;
        }
        else {
            return confirmBar.children[2];
        }
    }
    else {
        return undefined;
    }
}
function findBoughtText(yesButton) {
    if (!yesButton
        || !yesButton.parentElement
        || !yesButton.parentElement.parentElement
        || !yesButton.parentElement.parentElement.nextElementSibling)
        return undefined;
    const successBar = yesButton.parentElement.parentElement.nextElementSibling;
    const children = successBar.children[0].children;
    // this is a shortcut for when complete
    if (children)
        return children[1];
}
function waitForYesButton(buyButton) {
    return __awaiter(this, void 0, void 0, function* () {
        let yesButton;
        while (yesButton === undefined) {
            yesButton = yield waitAndTryAgain_1.waitAndTryAgain(() => findYesButton(buyButton));
        }
        return yesButton;
    });
}
function waitForBoughtText(yesButton) {
    return __awaiter(this, void 0, void 0, function* () {
        let bought;
        while (!bought) {
            bought = yield waitAndTryAgain_1.waitAndTryAgain(() => findBoughtText(yesButton));
        }
        return bought;
    });
}
function buyItem(buyButton, maxPrice) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!buyButton)
            debugger;
        buyButton.click();
        const yesButton = yield waitForYesButton(buyButton);
        const price = getPrice(yesButton.parentElement);
        const type = getItemType();
        if (maxPrice) {
            if (price > maxPrice)
                return null;
        }
        config_1.Config.maxPrices = config_1.Config.maxPrices || {};
        maxPrice = config_1.Config.maxPrices[type];
        if (maxPrice && price > maxPrice) {
            const message = `The price for this item ($${price})` +
                ` is greater than your previous max price ($${maxPrice}),` +
                ' would you like to buy and set a new max?';
            if (!confirm(message)) {
                const done = yield wait(3000);
                window.location.reload();
            }
        }
        if (!maxPrice || price > maxPrice) {
            config_1.Config.maxPrices = Object.assign({}, config_1.Config.maxPrices, { [type]: price });
        }
        config_1.Config.lastPrices = config_1.Config.lastPrices || {};
        config_1.Config.lastPrices = Object.assign({}, config_1.Config.lastPrices, { [type]: price });
        if (yesButton.classList.contains('close-icon')) {
            yesButton.click();
            return null;
        }
        else {
            yesButton.click();
            const boughtMessage = yield waitForBoughtText(yesButton);
            return boughtMessage;
        }
    });
}
function wait(time) {
    return new Promise(resolve => {
        debugger;
        setTimeout(() => resolve('done!'), time);
    });
}
exports.wait = wait;

},{"./config":4,"./queryBuyButtons":7,"./waitAndTryAgain":9}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const KEY = 'tornbarconfig';
window.localStorage.__proto__.clear = () => { };
// get(target, prop, receiver) {
// 	return Reflect.get(realStorage, prop, receiver)
// },
// set(target, prop, value) {
// 	return Reflect.set(realStorage, prop, value)
// }
function getConfig() {
    const storage = localStorage.getItem(KEY);
    try {
        return JSON.parse(storage);
    }
    catch (e) {
        debugger;
        return {};
    }
}
function setConfig(config) {
    localStorage.setItem(KEY, JSON.stringify(config));
}
exports.Config = new Proxy({}, {
    get(target, prop, receiver) {
        const _config = getConfig() || {};
        return Reflect.get(_config, prop, receiver);
    },
    set(target, property, value) {
        try {
            const _config = getConfig() || {};
            _config[property] = value;
            setConfig(_config);
            return true;
        }
        catch (e) {
            debugger;
            return false;
        }
    }
});

},{}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getImage() {
    const style = document.createElement('style');
    style.innerHTML = `.item-hover, .image-wrap {cursor: crosshair !important;}`;
    return new Promise(resolve => {
        const onClick = e => {
            let img;
            switch (e.target.className) {
                case 'view-h':
                case 'buy-h':
                case 'item-hover': {
                    img = e.target.parentElement.previousElementSibling;
                    break;
                }
                case 'image-wrap': {
                    img = e.target.children[0].children[0];
                    break;
                }
                default: {
                    if (e.target.tagName === 'IMG')
                        img = e.target;
                }
            }
            if (!img || !img.src)
                return;
            window.removeEventListener('click', onClick);
            document.body.removeChild(style);
            resolve(img.src.replace('https://www.torn.com', ''));
        };
        document.body.appendChild(style);
        window.addEventListener('click', onClick);
    });
}
exports.getImage = getImage;

},{}],6:[function(require,module,exports){
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

},{"./buyAllInBazaar":1,"./buyAllInMarket":2,"./buyMarketItem":3,"./config":4,"./sellAllInBazaar":8}],7:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BUY_BUTTON = 'span.buy-icon';
function queryBuyButtons() {
    return Array.from(document.querySelectorAll(BUY_BUTTON));
}
exports.queryBuyButtons = queryBuyButtons;

},{}],8:[function(require,module,exports){
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const getImage_1 = require("./getImage");
function sellAll() {
    return __awaiter(this, void 0, void 0, function* () {
        function setValues(elements, price) {
            const inputs = elements.shift();
            const checkbox = inputs.amount.firstElementChild.firstElementChild.children[1];
            checkbox.click();
            const textbox = inputs.price.firstElementChild.firstElementChild;
            textbox.dispatchEvent(new Event('focus'));
            textbox.value = price;
            textbox.dispatchEvent(new KeyboardEvent('keypress', { key: 'tab' }));
            textbox.dispatchEvent(new Event('change'));
            textbox.dispatchEvent(new Event('blur'));
            setTimeout(() => setValues(elements, price), 10);
        }
        const src = yield getImage_1.getImage();
        setTimeout(() => {
            const images = Array.from(document.querySelectorAll('[src="' + src + '"]'));
            const actions = images.map(e => e.parentElement.parentElement.parentElement.nextElementSibling);
            const inputs = actions.map(e => {
                const divs = Array.from(e.children[0].children);
                return {
                    amount: divs.find(e => e.className === 'amount'),
                    price: divs.find(e => e.className === 'price')
                };
            }).filter(i => i.amount && i.price);
            const price = prompt('Enter Price');
            setValues(inputs, price);
        }, 2000);
    });
}
exports.sellAll = sellAll;

},{"./getImage":5}],9:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function waitAndTryAgain(fn, ttl = 100) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(fn());
        }, ttl);
    });
}
exports.waitAndTryAgain = waitAndTryAgain;

},{}]},{},[6]);
