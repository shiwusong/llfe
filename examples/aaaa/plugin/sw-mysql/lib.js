const knex = require('knex')
let CONFIGS = {}
const CACHE = {}
// init knex connections
const createKnex = async configs => {
	CONFIGS = configs
	await Promise.all(
		Object.entries(CONFIGS).map(async ([key, { host, user, password, database }]) => {
			CACHE[key] = knex({
				client: 'mysql',
				connection: { host, user, password, database },
			})
			// test connect
			await CACHE[key].raw('select database()').catch(err => {
				throw new Error(`'${key}' mysql config can not connect!`)
			})
		})
	)
}
// get knex client
const getKnex = async alias => {
	if (!alias) {
		if (!CACHE.default) throw new Error('no "default" mysql config')
		return CACHE.default
	}
	if (!CACHE[alias]) throw new Error(`no '${alias}' mysql config`)
	return CACHE[alias]
}

module.exports = {
	getKnex,
	createKnex,
}
