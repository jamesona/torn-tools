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
//# sourceMappingURL=waitAndTryAgain.js.map