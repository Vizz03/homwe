// src/database/database.js
import * as SQLite from 'expo-sqlite';

class DatabaseManager {
  constructor() {
    this.db = null;
  }

  async initDatabase() {
    try {
      // Open database
      this.db = await SQLite.openDatabaseAsync('financeapp.db');
      
      // Enable WAL mode for better performance
      await this.db.execAsync('PRAGMA journal_mode = WAL;');
      
      // Create transactions table
      await this.db.execAsync(`
        CREATE TABLE IF NOT EXISTS transactions (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          type TEXT NOT NULL CHECK(type IN ('income', 'expense')),
          category TEXT NOT NULL,
          amount REAL NOT NULL CHECK(amount > 0),
          description TEXT,
          date TEXT NOT NULL DEFAULT (datetime('now')),
          created_at TEXT DEFAULT (datetime('now'))
        );
      `);
      
      // Create index for faster queries
      await this.db.execAsync(`
        CREATE INDEX IF NOT EXISTS idx_transactions_date 
        ON transactions(date);
      `);
      
      await this.db.execAsync(`
        CREATE INDEX IF NOT EXISTS idx_transactions_type 
        ON transactions(type);
      `);
      
      console.log('Database initialized successfully');
      return true;
    } catch (error) {
      console.error('Error initializing database:', error);
      throw error;
    }
  }

  // Add a new transaction
  async addTransaction({ type, category, amount, description }) {
    try {
      const date = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
      
      const result = await this.db.runAsync(
        `INSERT INTO transactions (type, category, amount, description, date) 
         VALUES (?, ?, ?, ?, ?);`,
        [type, category, amount, description, date]
      );
      
      return result.lastInsertRowId;
    } catch (error) {
      console.error('Error adding transaction:', error);
      throw error;
    }
  }

  // Get all transactions
  async getAllTransactions() {
    try {
      const transactions = await this.db.getAllAsync(
        `SELECT * FROM transactions ORDER BY date DESC, id DESC;`
      );
      return transactions;
    } catch (error) {
      console.error('Error fetching transactions:', error);
      throw error;
    }
  }

  // Calculate global balance
  async getGlobalBalance() {
    try {
      const result = await this.db.getAllAsync(
        `SELECT 
          COALESCE(SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END), 0) as totalIncome,
          COALESCE(SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END), 0) as totalExpense
         FROM transactions;`
      );
      
      const totalIncome = result[0]?.totalIncome || 0;
      const totalExpense = result[0]?.totalExpense || 0;
      
      return {
        balance: totalIncome - totalExpense,
        totalIncome,
        totalExpense
      };
    } catch (error) {
      console.error('Error calculating balance:', error);
      throw error;
    }
  }

  // Delete transaction
  async deleteTransaction(id) {
    try {
      await this.db.runAsync(
        `DELETE FROM transactions WHERE id = ?;`,
        [id]
      );
    } catch (error) {
      console.error('Error deleting transaction:', error);
      throw error;
    }
  }

  // Get transactions by date range
  async getTransactionsByDateRange(startDate, endDate) {
    try {
      const transactions = await this.db.getAllAsync(
        `SELECT * FROM transactions 
         WHERE date BETWEEN ? AND ? 
         ORDER BY date DESC, id DESC;`,
        [startDate, endDate]
      );
      return transactions;
    } catch (error) {
      console.error('Error fetching transactions by date:', error);
      throw error;
    }
  }
}

// Create singleton instance
const databaseManager = new DatabaseManager();
export default databaseManager;