"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const stringToCharSum_1 = require("./stringToCharSum");
const getInitials_1 = require("./getInitials");
function hashItemName(item) {
    return stringToCharSum_1.stringToCharSum(item.replace(/[^a-zA-Z]/g, '')) + getInitials_1.getInitials(item);
}
exports.hashItemName = hashItemName;
//# sourceMappingURL=hashItemName.js.map