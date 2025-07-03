function parseDinheiro(valor) {
  if (typeof valor !== 'string') return 0

  const valorFormatado = valor.toLowerCase()

  const multiplicador =
    valorFormatado.includes('bilhão') || valorFormatado.includes('bilhões')
      ? 1_000_000_000
      : valorFormatado.includes('milhão') || valorFormatado.includes('milhões')
        ? 1_000_000
        : 1

  const numero = parseFloat(valor.replace(/[^\d,\.]/g, '').replace(',', '.'))
  return isNaN(numero) ? 0 : numero * multiplicador
}

module.exports = parseDinheiro