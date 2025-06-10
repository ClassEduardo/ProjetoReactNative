export function formatarBRL(valor) {
  const numero = Number(String(valor).replace(/\./g, '').replace(',', '.'));
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

export function formatarCPF(texto) {
  const nums = texto.replace(/\D/g, '').slice(0, 11);
  if (nums.length >= 10) return nums.replace(/(\d{3})(\d{3})(\d{3})(\d{0,2}).*/, '$1.$2.$3-$4');
  if (nums.length >= 7) return nums.replace(/(\d{3})(\d{3})(\d{0,3})/, '$1.$2.$3');
  if (nums.length >= 4) return nums.replace(/(\d{3})(\d{0,3})/, '$1.$2');
  return nums;
}

export function formatarCelular(texto) {
  const nums = texto.replace(/\D/g, '').slice(0, 11);
  if (nums.length >= 7) return nums.replace(/(\d{2})(\d{5})(\d{0,4}).*/, '($1)$2-$3');
  if (nums.length >= 3) return nums.replace(/(\d{2})(\d{0,5})/, '($1)$2');
  return nums;
}

export function formatarDataHora(texto) {
  const nums = texto.replace(/\D/g, '').slice(0, 12);
  if (nums.length >= 11) return nums.replace(/(\d{2})(\d{2})(\d{4})(\d{2})(\d{0,2}).*/, '$1/$2/$3 - $4:$5');
  if (nums.length >= 9) return nums.replace(/(\d{2})(\d{2})(\d{4})(\d{0,2})/, '$1/$2/$3 - $4');
  if (nums.length >= 5) return nums.replace(/(\d{2})(\d{2})(\d{0,4})/, '$1/$2/$3');
  if (nums.length >= 3) return nums.replace(/(\d{2})(\d{0,2})/, '$1/$2');
  return nums;
}

export function formatarValor(texto) {
  const nums = texto.replace(/\D/g, '');
  if (!nums) return '';
  const n = parseInt(nums, 10);
  return (n / 100).toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}