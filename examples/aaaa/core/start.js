const fastify = require('fastify')({ logger: { level: 'error' } })
const Next = require('next')
const serveStatic = require('serve-static')
const fp = require('fastify-plugin')
const path = require('path')
const port = parseInt(process.env.PORT, 10) || 3006
const dev = process.env.NODE_ENV !== 'production'
fastify.use('/public', serveStatic(path.resolve(__dirname, '..', 'public')))
fastify.register((fastify, opts, next) => {
	const app = Next({ dev, dir: './client' })
	app.prepare()
		.then(_ => {
			if (dev) {
				fastify.get('/_next/*', (req, reply) => {
					return app.handleRequest(req.req, reply.res).then(_ => {
						reply.sent = true
					})
				})
			}

			fastify.get('/*', (req, reply) => {
				return app.handleRequest(req.req, reply.res).then(() => {
					reply.sent = true
				})
			})

			fastify.setNotFoundHandler((request, reply) => {
				return app.render404(request.req, reply.res).then(() => {
					reply.sent = true
				})
			})

			next()
		})
		.catch(err => next(err))
})

fastify.register(fp(require('../index')))

fastify.listen(port, err => {
	if (err) throw err
	console.log(`> Ready on http://localhost:${port}`)
})
