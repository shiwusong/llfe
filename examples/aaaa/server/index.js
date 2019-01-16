const knex = require('knex')
module.exports = async (fastify, options) => {
	fastify.register(require('./user'), {
		prefix: '/user',
	})

	fastify.get('/test', async (res, req) => {
		const client = await fastify.getKnex('sws')
		const result = await client.select().from('user')
		console.log(result)
		return { code: 200, data: result }
	})
}
