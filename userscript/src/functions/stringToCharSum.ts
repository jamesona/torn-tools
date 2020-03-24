export function stringToCharSum(str: string): number {
	const a = 'abcdefghijklmnopqrstuvwxyz'.split('')
	return str.toLowerCase().split('').map(c => a.indexOf(c)).reduce((acc, cur) => acc + cur)
}
