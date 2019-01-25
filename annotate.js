const fs = require('fs')

const outFile = 'torn.user.js'

const packageJSON = fs.readFileSync('package.json')
const packageData = JSON.parse(packageJSON)
const headerLines = [
	`//==UserScript==`,
	`@name ${packageData.name}`,
	`@namespace http://tampermonkey.net/`,
	`@version ${packageData.version}`,
	`@description ${packageData.description}`,
	`@author ${packageData.author}`,
	`@match https://www.torn.com`,
	`@include https://www.torn.com*`,
	`@grant none`,
	`==/UserScript==`,
]
const insert = new Buffer(headerLines.join('\n//') + '\n')
const data = fs.readFileSync(outFile)
const fd = fs.openSync(outFile, 'w+')
fs.writeSync(fd, insert, 0, insert.length, 0)
fs.writeSync(fd, data, 0, data.length, insert.length)
fs.close(fd, (err) => {
	if (err) throw err;
});
