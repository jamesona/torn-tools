"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getInitials(str) {
    return str.split(' ').map(w => w.split('').shift()).join('');
}
exports.getInitials = getInitials;
//# sourceMappingURL=getInitials.js.map