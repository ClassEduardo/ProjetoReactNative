import { openDatabaseSync } from 'expo-sqlite';

const db = openDatabaseSync('assistencia.db');

export async function createTableServicosFeitos() {
  try {
    await db.execAsync(
      `CREATE TABLE IF NOT EXISTS servicos_feitos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        numero_os TEXT,
        nome_cliente TEXT,
        cpf TEXT,
        celular TEXT,
        situacao TEXT,
        data_hora_entrada DATETIME,
        data_hora_saida DATETIME,
        vendedor TEXT,
        tecnico TEXT,
        equipamento TEXT,
        marca TEXT,
        modelo TEXT,
        n_serie TEXT,
        condicoes TEXT,
        defeito TEXT,
        solucao TEXT,
        valor TEXT,
        forma_pagamento TEXT
      );`
    );
  } catch (error) {
    console.log('Erro ao criar tabela servicos_feitos:', error);
  }
}

export async function inserirServicoFeito(dados) {
  try {
    await db.runAsync(
      `INSERT INTO servicos_feitos (
        numero_os, nome_cliente, cpf, celular, situacao,
        data_hora_entrada, data_hora_saida,
        vendedor, tecnico, equipamento, marca, modelo, n_serie,
        condicoes, defeito, solucao, valor, forma_pagamento
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
      dados.numero_os,
      dados.nome_cliente,
      dados.cpf,
      dados.celular,
      dados.situacao,
      dados.data_hora_entrada,
      dados.data_hora_saida,
      dados.vendedor,
      dados.tecnico,
      dados.equipamento,
      dados.marca,
      dados.modelo,
      dados.n_serie,
      dados.condicoes,
      dados.defeito,
      dados.solucao,
      Number(String(dados.valor).replace(/\./g, '').replace(',', '.')),
      dados.forma_pagamento
    );
    return true;
  } catch (error) {
    console.log('Erro ao inserir serviço feito:', error);
    return false;
  }
}

export async function atualizarServicoFeito(dados) {
  const {
    id,
    numero_os,
    nome_cliente,
    cpf,
    celular,
    situacao,
    data_hora_entrada,
    data_hora_saida,
    vendedor,
    tecnico,
    equipamento,
    marca,
    modelo,
    n_serie,
    condicoes,
    defeito,
    solucao,
    valor,
    forma_pagamento,
  } = dados;
  try {
    await db.runAsync(
      `UPDATE servicos_feitos SET
        numero_os = ?, nome_cliente = ?, cpf = ?, celular = ?, situacao = ?,
        data_hora_entrada = ?, data_hora_saida = ?,
        vendedor = ?, tecnico = ?, equipamento = ?, marca = ?, modelo = ?, n_serie = ?,
        condicoes = ?, defeito = ?, solucao = ?, valor = ?, forma_pagamento = ?
        WHERE id = ?;`,
      numero_os,
      nome_cliente,
      cpf,
      celular,
      situacao,
      data_hora_entrada,
      data_hora_saida,
      vendedor,
      tecnico,
      equipamento,
      marca,
      modelo,
      n_serie,
      condicoes,
      defeito,
      solucao,
      Number(String(valor).replace(/\./g, '').replace(',', '.')),
      forma_pagamento,
      id
    );
    return true;
  } catch (error) {
    console.log('Erro ao atualizar serviço feito:', error);
    return false;
  }
}

export async function listarServicosFeitos() {
  try {
    const resultados = await db.getAllAsync(
      `SELECT id, numero_os, nome_cliente, cpf, celular, situacao,
              data_hora_entrada, data_hora_saida, vendedor, tecnico,
              equipamento, marca, modelo, n_serie, condicoes, defeito,
              solucao, valor, forma_pagamento
         FROM servicos_feitos;`
    );
    return resultados;
  } catch (error) {
    console.log('Erro ao obter serviços.', error);
    return [];
  }
}

export async function excluirServicoFeito(id) {
  try {
    await db.runAsync(
      `DELETE FROM servicos_feitos WHERE id = ?;`,
      id
    );
    return true;
  } catch (error) {
    console.log('Erro ao excluir serviço feito:', error);
    return false;
  }
}

export async function obterEstatisticasServicos({ mes, ano } = {}) {
  try {
    const agora = new Date();
    const mesRef = mes || String(agora.getMonth() + 1).padStart(2, '0');
    const anoRef = ano || String(agora.getFullYear());

    const totalRes = await db.getAllAsync(
      `SELECT COUNT(*) as total, SUM(CAST(REPLACE(REPLACE(valor, '.', ''), ',', '.') AS REAL)) as valor_total
         FROM servicos_feitos
        WHERE strftime('%m', data_hora_entrada) = ?
          AND strftime('%Y', data_hora_entrada) = ?;`,
      mesRef,
      anoRef
    );
    const total = totalRes[0]?.total || 0;
    const valorTotal = totalRes[0]?.valor_total || 0;

    const top3Caro = await db.getAllAsync(
      `SELECT solucao, valor
         FROM servicos_feitos
        WHERE strftime('%m', data_hora_entrada) = ?
          AND strftime('%Y', data_hora_entrada) = ?
         ORDER BY CAST(REPLACE(REPLACE(valor, '.', ''), ',', '.') AS REAL) DESC
         LIMIT 3;`,
      mesRef,
      anoRef
    );

    const top3Baratos = await db.getAllAsync(
      `SELECT solucao, valor
         FROM servicos_feitos
        WHERE strftime('%m', data_hora_entrada) = ?
          AND strftime('%Y', data_hora_entrada) = ?
         ORDER BY CAST(REPLACE(REPLACE(valor, '.', ''), ',', '.') AS REAL) ASC
         LIMIT 3;`,
      mesRef,
      anoRef
    );

    const pagamentosRes = await db.getAllAsync(
      `SELECT forma_pagamento as forma, SUM(CAST(REPLACE(REPLACE(valor, '.', ''), ',', '.') AS REAL)) as total
         FROM servicos_feitos
        WHERE strftime('%m', data_hora_entrada) = ?
          AND strftime('%Y', data_hora_entrada) = ?
        GROUP BY forma_pagamento;`,
      mesRef,
      anoRef
    );

    const totaisFormasPagamento = pagamentosRes.reduce((acc, { forma, total }) => {
      acc[forma] = total || 0;
      return acc;
    }, {});

    return {
      top3Caro,
      top3Baratos,
      totalServicos: total,
      montanteTotal: valorTotal || 0,
      totaisFormasPagamento,
    };
  } catch (error) {
    console.log('Erro ao obter estatisticas:', error);
    return null;
  }
}