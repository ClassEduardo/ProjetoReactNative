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