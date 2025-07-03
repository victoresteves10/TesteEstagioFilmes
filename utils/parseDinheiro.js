function parseDinheiro(valor) {
  if (typeof valor !== 'string') return 0

  valor = valor.toLowerCase()

  let multiplicador = 1
  if (valor.includes('milhão') || valor.includes('milhões')) multiplicador = 1_000_000
  else if (valor.includes('bilhão') || valor.includes('bilhões')) multiplicador = 1_000_000_000

  const numero = parseFloat(valor.replace(/[^\d,\.]/g, '').replace(',', '.'))
  return isNaN(numero) ? 0 : numero * multiplicador
}

module.exports = parseDinheiro