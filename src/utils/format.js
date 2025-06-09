export function formatarBRL(valor) {
  const numero = Number(valor);
  if (isNaN(numero)) return valor;
  return numero.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function formatarData(texto) {
  const somenteNumeros = texto.replace(/[^0-9]/g, '').slice(0, 8);
  if (somenteNumeros.length >= 5) {
    return somenteNumeros.replace(/(\d{2})(\d{2})(\d{0,4}).*/, '$1/$2/$3');
  }
  if (somenteNumeros.length >= 3) {
    return somenteNumeros.replace(/(\d{2})(\d{0,2})/, '$1/$2');
  }
  return somenteNumeros;
}