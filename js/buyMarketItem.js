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
//# sourceMappingURL=buyMarketItem.js.map