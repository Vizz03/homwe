// App.js
import React, { useState, useEffect, useCallback } from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
  Text,
} from 'react-native';
import databaseManager from './src/database/database';
import BalanceHeader from './src/components/BalanceHeader';
import TransactionForm from './src/components/TransactionForm';
import TransactionList from './src/components/TransactionList';

export default function App() {
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState({ balance: 0, totalIncome: 0, totalExpense: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [isDbReady, setIsDbReady] = useState(false);

  // Initialize database on app launch
  useEffect(() => {
    const initDB = async () => {
      try {
        await databaseManager.initDatabase();
        setIsDbReady(true);
      } catch (error) {
        console.error('Failed to initialize database:', error);
        setIsLoading(false);
      }
    };
    
    initDB();
  }, []);

  // Load initial data
  useEffect(() => {
    if (isDbReady) {
      loadData();
    }
  }, [isDbReady]);

  const loadData = async () => {
    try {
      setIsLoading(true);
      await Promise.all([fetchTransactions(), fetchBalance()]);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchTransactions = async () => {
    try {
      const data = await databaseManager.getAllTransactions();
      setTransactions(data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  const fetchBalance = async () => {
    try {
      const balanceData = await databaseManager.getGlobalBalance();
      setBalance(balanceData);
    } catch (error) {
      console.error('Error fetching balance:', error);
    }
  };

  const handleAddTransaction = useCallback(async (transactionData) => {
    try {
      await databaseManager.addTransaction(transactionData);
      await Promise.all([fetchTransactions(), fetchBalance()]);
    } catch (error) {
      console.error('Error adding transaction:', error);
      alert('Failed to add transaction. Please try again.');
    }
  }, []);

  const handleDeleteTransaction = useCallback(async (id) => {
    try {
      await databaseManager.deleteTransaction(id);
      await Promise.all([fetchTransactions(), fetchBalance()]);
    } catch (error) {
      console.error('Error deleting transaction:', error);
      alert('Failed to delete transaction. Please try again.');
    }
  }, []);

  if (isLoading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <StatusBar barStyle="dark-content" />
        <ActivityIndicator size="large" color="#4CAF50" />
        <Text style={styles.loadingText}>Loading your finances...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8F9FA" />
      <BalanceHeader balance={balance} />
      <TransactionForm onAddTransaction={handleAddTransaction} />
      <TransactionList 
        transactions={transactions} 
        onDeleteTransaction={handleDeleteTransaction}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#6C757D',
    fontFamily: 'System',
  },
});