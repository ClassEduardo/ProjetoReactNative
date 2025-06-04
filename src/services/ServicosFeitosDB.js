import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('assistencia.db');

export function criarTabelaServicosFeitos() {
  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS servicos_feitos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        tipo_servico TEXT,
        nome_cliente TEXT,
        valor TEXT,
        descricao TEXT,
        data_servico TEXT
      );`
    );
  });
}

// Insere um novo serviço feito
export function inserirServicoFeito(tipoServico, nomeCliente, valor, descricao, data, callback) {
  db.transaction(tx => {
    tx.executeSql(
      `INSERT INTO servicos_feitos 
        (tipo_servico, nome_cliente, valor, descricao, data_servico) 
        VALUES (?, ?, ?, ?, ?);`,
      [tipoServico, nomeCliente, valor, descricao, data],
      (_, result) => callback(true),
      (_, error) => { console.log(error); callback(false); }
    );
  });
}
