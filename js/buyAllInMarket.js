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
//# sourceMappingURL=buyAllInMarket.js.map