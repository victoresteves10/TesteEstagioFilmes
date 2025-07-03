const parseFilme = require('../utils/parseFilme')

async function buscarFilmesExternos() {
  const res = await fetch('https://tv5hn2gvyijpl76yxlmsy66jwa0nlmxn.lambda-url.us-east-1.on.aws/')
  const data = await res.json()
  return data.filmes.map(parseFilme)
}

module.exports = { buscarFilmesExternos }
