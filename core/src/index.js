const _fastify = require('fastify')({ logger: { level: 'error' } })
const _Next = require('next')
const _fp = require('fastify-plugin')
const _path = require('path')
const _port = parseInt(process.env.PORT, 10) || 3005
const dev = process.env.NODE_ENV !== 'production'
const _ROOTPATH = process.cwd()
console.log('项目根目录：', _ROOTPATH)
_fastify.register((_fastify, opts, next) => {
	const app = _Next({ dev, dir: './client' })
	app.prepare()
		.then(_ => {
			if (dev) {
				_fastify.get('/_next/*', (req, reply) => {
					return app.handleRequest(req.req, reply.res).then(_ => {
						reply.sent = true
					})
				})
			}

			_fastify.get('/*', (req, reply) => {
				return app.handleRequest(req.req, reply.res).then(() => {
					reply.sent = true
				})
			})

			_fastify.setNotFoundHandler((request, reply) => {
				return app.render404(request.req, reply.res).then(() => {
					reply.sent = true
				})
			})

			next()
		})
		.catch(err => next(err))
})

_fastify.register(_fp(require(_path.join(_ROOTPATH, 'index'))))

_fastify.listen(_port, err => {
	if (err) throw err
	console.log(`> Ready on http://localhost:${_port}`)
})
