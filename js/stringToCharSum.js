"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function stringToCharSum(str) {
    const a = 'abcdefghijklmnopqrstuvwxyz'.split('');
    return str.toLowerCase().split('').map(c => a.indexOf(c)).reduce((acc, cur) => acc + cur);
}
exports.stringToCharSum = stringToCharSum;
//# sourceMappingURL=stringToCharSum.js.map