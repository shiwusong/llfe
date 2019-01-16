const fp = require('fastify-plugin')
const { getKnex, createKnex } = require('./lib')
const plugin = async (fastify, options) => {
	const configs = Object.assign({}, options).mysql
	await createKnex(configs)
	fastify.decorate('getKnex', getKnex)
}
module.exports = fp(plugin, {
	fastify: '>=1.2.0',
	name: 'sw-mysql',
})
