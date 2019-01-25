module.exports = () => {
	const files = require.context('./', true)
	console.log(files)
}
