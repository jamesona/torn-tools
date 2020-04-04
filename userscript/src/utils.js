export function log(...args) {
	console.log('Userscript (React Mode):', ...args)
}

export function logFetch(arg) {
	const url = new URL(arg, window.location)
	log('fetching', '' + url)
	return fetch('' + url, { credentials: 'include' })
}

export function addLocationChangeCallback(callback) {
	window.setTimeout(callback, 0)

	let oldHref = window.location.href
	const body = document.querySelector('body')
	const observer = new MutationObserver(mutations => {
		if (mutations.some(() => oldHref !== document.location.href)) {
			oldHref = document.location.href
			callback()
		}
	})

	observer.observe(body, { childList: true, subtree: true })
	return observer
}

export async function awaitElement(selector) {
	const MAX_TRIES = 60
	let tries = 0
	return new Promise((resolve, reject) => {
		function probe() {
			tries++
			return document.querySelector(selector)
		}

		function delayedProbe() {
			if (tries >= MAX_TRIES) {
				log("Can't find element with selector", selector)
				reject()
				return
			}
			const elm = probe()
			if (elm) {
				resolve(elm)
				return
			}

			window.setTimeout(delayedProbe, 250)
		}

		delayedProbe()
	})
}
