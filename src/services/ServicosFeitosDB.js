import { openDatabaseSync } from 'expo-sqlite';

const db = openDatabaseSync('assistencia.db');

export async function createTableServicosFeitos() {
  try {
    await db.execAsync(
      `CREATE TABLE IF NOT EXISTS servicos_feitos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        tipo_servico TEXT,
        nome_cliente TEXT,
        valor TEXT,
        descricao TEXT,
        data_servico TEXT
      );`
    );
  } catch (error) {
    console.log('Erro ao criar tabela servicos_feitos:', error);
  }
}

export async function inserirServicoFeito(tipoServico, nomeCliente, valor, descricao, data, callback) {
  try {
    await db.runAsync(
      `INSERT INTO servicos_feitos 
        (tipo_servico, nome_cliente, valor, descricao, data_servico)
        VALUES (?, ?, ?, ?, ?);`,
      tipoServico,
      nomeCliente,
      valor,
      descricao,
      data
    );
    callback(true);
  } catch (error) {
    console.log('Erro ao inserir serviço feito:', error);
    callback(false);
  }
}

export async function atualizarServicoFeito(id, tipoServico, nomeCliente, valor, descricao, data, callback) {
  try {
    await db.runAsync(
      `UPDATE servicos_feitos 
        SET tipo_servico = ?, nome_cliente = ?, valor = ?, descricao = ?, data_servico = ?
        WHERE id = ?;`,
      tipoServico,
      nomeCliente,
      valor,
      descricao,
      data,
      id
    );
    callback(true);
  } catch (error) {
    console.log('Erro ao atualizar serviço feito:', error);
    callback(false);
  }
}

export async function listarServicosFeitos(callback) {
  try {
    const resultados = await db.getAllAsync(
      'SELECT id, tipo_servico, nome_cliente, valor, descricao, data_servico FROM servicos_feitos;'
    );
    callback(resultados);
  } catch (error) {
    console.log('Erro ao obter serviços.', error);
    callback();
  }
}

export async function excluirServicoFeito(id, callback) {
  try {
    await db.runAsync(
      `DELETE FROM servicos_feitos WHERE id = ?;`,
      id
    );
    callback(true);
  } catch (error) {
    console.log('Erro ao excluir serviço feito:', error);
    callback(false);
  }
}

export async function obterEstatisticasServicos() {
  try {
    const totalRes = await db.getAllAsync(
      'SELECT COUNT(*) as total, SUM(CAST(valor AS REAL)) as valor_total FROM servicos_feitos;'
    );
    const total = totalRes[0]?.total || 0;
    const valorTotal = totalRes[0]?.valor_total || 0;

    const top3 = await db.getAllAsync(
      `SELECT tipo_servico, COUNT(*) as quantidade
         FROM servicos_feitos
         GROUP BY tipo_servico
         ORDER BY quantidade DESC
         LIMIT 3;`
    );

    const caro = await db.getAllAsync(
      `SELECT tipo_servico, valor
         FROM servicos_feitos
         ORDER BY CAST(valor AS REAL) DESC
         LIMIT 1;`
    );

    const barato = await db.getAllAsync(
      `SELECT tipo_servico, valor
         FROM servicos_feitos
         ORDER BY CAST(valor AS REAL) ASC
         LIMIT 1;`
    );

    const mesesDados = await db.getAllAsync(
      'SELECT data_servico, valor FROM servicos_feitos;'
    );
    const meses = new Set();
    mesesDados.forEach(r => {
      const partes = (r.data_servico || '').split('/');
      if (partes.length === 3) meses.add(partes[1] + '/' + partes[2]);
    });
    const qtdMeses = meses.size || 1;

    return {
      top3,
      maisCaro: caro[0] || { tipo_servico: '', valor: 0 },
      maisBarato: barato[0] || { tipo_servico: '', valor: 0 },
      totalServicos: total,
      montanteTotal: valorTotal || 0,
      mediaServicosMes: total / qtdMeses,
      mediaValorMes: (valorTotal || 0) / qtdMeses,
    };
  } catch (error) {
    console.log('Erro ao obter estatisticas:', error);
    return null;
  }
}
