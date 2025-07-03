const {transformarFilmes} = require('../services/parseService.js')

async function buscarFilmes(request, reply) {
  try {
    const filmes = await transformarFilmes()
    reply.send({
      total: filmes.length,
      filmes
    })
  } catch (err) {
    reply.status(500).send({ erro: 'Erro ao buscar dados', detalhe: err.message })
  }
}

module.exports = { buscarFilmes }