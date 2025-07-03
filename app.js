const fastify = require('fastify')({ logger: true })
const filmesRoutes = require('./routes/filmes')

fastify.register(filmesRoutes)

fastify.listen({ port: 3000 }, (err, address) => {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  fastify.log.info(`Servidor rodando em ${address}`)
})