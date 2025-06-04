const execAsync = jest.fn();
const runAsync = jest.fn();

export const openDatabaseSync = jest.fn(() => ({
  execAsync,
  runAsync,
}));