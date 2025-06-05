const execAsync = jest.fn();
const runAsync = jest.fn();
const getAllAsync = jest.fn();

export const openDatabaseSync = jest.fn(() => ({
  execAsync,
  runAsync,
  getAllAsync,
}));