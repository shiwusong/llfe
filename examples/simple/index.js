module.exports = async (fastify, options) => {
  fastify.get('/hello', async (res, req) => {
    return { code: 0, msg: 'learn learn front end!!!' }
  })
}
