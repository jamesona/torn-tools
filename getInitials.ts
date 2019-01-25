export function getInitials(str: string): string {
	return str.split(' ').map(w => w.split('').shift()).join('')
}
