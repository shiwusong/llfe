const mysqlConfig = require('./config/mysql')

module.exports = async (fastify, options) => {
	// mysql - knex
	fastify.register(require('./plugin/sw-mysql'), { mysql: mysqlConfig }).after(err => {
		if (err) {
			console.error('[plugin] sw-mysql register failed!')
			throw err
		}
	})

	fastify
		.register(require('./server/index'), {
			prefix: '/api',
		})
		.after(err => {
			if (err) {
				console.error('[modules] ./server/index register failed!')
				throw err
			}
		})
}

// const fastify = require('fastify')({ logger: { level: 'error' } })
// const Next = require('next')
// const serveStatic = require('serve-static')
// const path = require('path')
// const port = parseInt(process.env.PORT, 10) || 3000
// const dev = process.env.NODE_ENV !== 'production'
// fastify.use('/public', serveStatic(path.resolve(__dirname, 'public')))
// fastify.register((fastify, opts, next) => {
//   const app = Next({ dev })
//   app
//     .prepare()
//     .then(_ => {
//       if (dev) {
//         fastify.get('/_next/*', (req, reply) => {
//           return app.handleRequest(req.req, reply.res).then(_ => {
//             reply.sent = true
//           })
//         })
//       }

//       fastify.get('/a', (req, reply) => {
//         return app.render(req.req, reply.res, '/about', req.query).then(() => {
//           reply.sent = true
//         })
//       })

//       fastify.get('/*', (req, reply) => {
//         return app.handleRequest(req.req, reply.res).then(() => {
//           reply.sent = true
//         })
//       })

//       fastify.setNotFoundHandler((request, reply) => {
//         return app.render404(request.req, reply.res).then(() => {
//           reply.sent = true
//         })
//       })

//       next()
//     })
//     .catch(err => next(err))
// })

// fastify.register(require('./server'), {
//   prefix: '/api'
// })

// fastify.addHook('onRequest', async (req, res) => {
//   console.log('url:', req.url)
// })

// fastify.listen(port, err => {
//   if (err) throw err
//   console.log(`> Ready on http://localhost:${port}`)
// })
