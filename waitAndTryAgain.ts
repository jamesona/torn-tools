export function waitAndTryAgain(fn: () => void, ttl: number = 100): Promise<void> {
	return new Promise(resolve => {
		setTimeout(() => {
			resolve(fn())
		}, ttl)
	})
}
