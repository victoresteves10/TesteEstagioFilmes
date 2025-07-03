
const parseDinheiro = require('../utils/parseDinheiro.js')
const formatarDinheiro = require('../utils/formatarDinheiro.js')
const { buscarFilmesExternos } = require('../services/filmesServices.js')



function parseFilme(filme) {
  const lucro = parseDinheiro(filme.bilheteria) - parseDinheiro(filme.orcamento)
  const lucroFormatado = formatarDinheiro(lucro)

  const premio = Array.isArray(filme.premios) && filme.premios.length > 0
    ? filme.premios.reduce((a, b) => a.relevancia > b.relevancia ? a : b).nome
    : 'Nenhuma'

  const duracaoSegundos = filme.duracao * 60

  const notaIMDB = Array.isArray(filme.ratings)
    ? (() => {
      const imdb = filme.ratings.find(r => r.fonte?.toLowerCase() === 'imdb')
      return imdb ? String(imdb.valor) : 'Não possui avaliação'
    })()
    : 'Não possui avaliação'

  const sinopse = Array.isArray(filme.sinopse) && filme.sinopse.length > 0
    ? (() => {
      const escolhida =
        filme.sinopse.find(s => s.idioma === 'pt-br') ||
        filme.sinopse.find(s => s.idioma === 'en') ||
        filme.sinopse[0]

      return escolhida?.texto ? String(escolhida.texto) : 'Sinopse não disponível'
    })()
    : 'Sinopse não disponível'

  return {
    titulo: String(filme.titulo),
    ano: String(filme.ano),
    diretor: String(filme.diretor),
    genero: String(filme.genero),
    duracaoSegundos,
    notaIMDB,
    lucro: lucroFormatado,
    premio,
    sinopse
  }
}

async function transformarFilmes() {
  const filmes = await buscarFilmesExternos()
  return filmes.map(parseFilme)
}

module.exports = { transformarFilmes }