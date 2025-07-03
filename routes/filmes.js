const { buscarFilmes } = require('../controllers/filmesController')

module.exports = async function (fastify) {
  fastify.get('/filmes', buscarFilmes)
}