function formatarDinheiro(valor) {
  if (typeof valor !== 'number' || isNaN(valor)) return 'Indefinido'

  if (valor >= 1_000_000_000) {
    const base = (valor / 1_000_000_000).toFixed(1).replace('.', ',')
    const sufixo = base === '1,0' ? 'bilhão' : 'bilhões'
    return `$${base} ${sufixo}`
  } else if (valor >= 1_000_000) {
    const base = (valor / 1_000_000).toFixed(1).replace('.', ',')
    const sufixo = base === '1,0' ? 'milhão' : 'milhões'
    return `$${base} ${sufixo}`
  } else {
    return `$${valor.toLocaleString('pt-BR')}`
  }
}

module.exports = formatarDinheiro
