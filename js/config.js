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
//# sourceMappingURL=config.js.map