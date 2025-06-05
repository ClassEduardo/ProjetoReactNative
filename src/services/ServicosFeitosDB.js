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
    callback([]);
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