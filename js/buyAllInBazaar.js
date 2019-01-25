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
//# sourceMappingURL=buyAllInBazaar.js.map