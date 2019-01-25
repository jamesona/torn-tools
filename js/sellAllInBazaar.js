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
//# sourceMappingURL=sellAllInBazaar.js.map