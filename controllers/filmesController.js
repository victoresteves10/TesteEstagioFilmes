const parseDinheiro = require('../utils/parseDinheiro')
const formatarDinheiro = require('../utils/formatarDinheiro')

async function buscarFilmes(request, reply) {
  try {
    const response = await fetch('https://tv5hn2gvyijpl76yxlmsy66jwa0nlmxn.lambda-url.us-east-1.on.aws/')
    const data = await response.json()

    const filmes = data.filmes.map((filme) => {
      const orcamento = parseDinheiro(filme.orcamento)
      const bilheteria = parseDinheiro(filme.bilheteria)
      const lucro = formatarDinheiro(bilheteria - orcamento)

      let premio = 'Nenhuma'
      if (Array.isArray(filme.premios) && filme.premios.length > 0) {
        const maisRelevante = filme.premios.reduce((a, b) => a.relevancia > b.relevancia ? a : b)
        premio = String(maisRelevante.nome)
      }

      const duracaoSegundos = String(filme.duracao * 60)

      let notaIMDB = 'Não possui avaliação'
      if (Array.isArray(filme.ratings)) {
        const imdb = filme.ratings.find(n => n.fonte?.toLowerCase() === 'imdb')
        if (imdb) notaIMDB = String(imdb.valor)
      }

      let sinopse = 'Sinopse não disponível'
      if (Array.isArray(filme.sinopse) && filme.sinopse.length > 0) {
        const escolha = filme.sinopse.find(s => s.idioma === 'pt-br')
          || filme.sinopse.find(s => s.idioma === 'en')
          || filme.sinopse[0]
        if (escolha?.texto) sinopse = String(escolha.texto)
      }

      return {
        titulo: String(filme.titulo),
        ano: String(filme.ano),
        diretor: String(filme.diretor),
        genero: String(filme.genero),
        duracaoSegundos,
        notaIMDB,
        lucro,
        premio,
        sinopse,
      }
    })

    return {
      total: filmes.length,
      filmes
    }
  } catch (err) {
    reply.status(500).send({ erro: 'Erro ao buscar filmes', detalhe: err.message })
  }
}

module.exports = { buscarFilmes }