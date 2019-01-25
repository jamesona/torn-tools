const KEY = 'tornbarconfig'

window.localStorage.__proto__.clear = () => {}
// get(target, prop, receiver) {
// 	return Reflect.get(realStorage, prop, receiver)
// },
// set(target, prop, value) {
// 	return Reflect.set(realStorage, prop, value)
// }

function getConfig(): object {
	const storage = localStorage.getItem(KEY)
	try {
		return JSON.parse(storage)
	} catch (e) {
		debugger
		return {}
	}
}

function setConfig(config: object): void {
	localStorage.setItem(KEY, JSON.stringify(config))
}

export const Config: {[key: string]: any} = new Proxy({}, {
	get(target, prop, receiver) {
		const _config = getConfig() || {}
		return Reflect.get(_config, prop, receiver)
	},
	set(target, property, value) {
		try {
			const _config = getConfig() || {}
			_config[property] = value
			setConfig(_config)
			return true
		} catch (e) {
			debugger
			return false
		}
	}
})
