import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('assistencia.db');

export function createTable() {
  db.transaction(tx => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS servicos (id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT, descricao TEXT);"
    );
  });
}

export function inserirServico(nome, descricao, callback) {
  db.transaction(tx => {
    tx.executeSql(
      "INSERT INTO servicos (nome, descricao) VALUES (?, ?);",
      [nome, descricao],
      (_, result) => callback(true),
      (_, error) => { console.log(error); callback(false); }
    );
  });
}