import { openDatabaseSync } from 'expo-sqlite';

const db = openDatabaseSync('assistencia.db');

export async function createTable() {
  try {
    await db.execAsync(
      "CREATE TABLE IF NOT EXISTS servicos (id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT, descricao TEXT);"
    );
  } catch (error) {
    console.log(error);
  }
}

export async function inserirServico(nome, descricao, callback) {
  try {
    await db.runAsync(
      "INSERT INTO servicos (nome, descricao) VALUES (?, ?);",
      nome,
      descricao
    );
    callback(true);
  } catch (error) {
    console.log(error);
    callback(false);
  }
}