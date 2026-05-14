// src/components/TransactionList.js
import React from 'react';
import { FlatList, View, Text, StyleSheet } from 'react-native';
import TransactionItem from './TransactionItem';

const TransactionList = ({ transactions, onDeleteTransaction }) => {
  const renderEmptyList = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyIcon}>📊</Text>
      <Text style={styles.emptyTitle}>No Transactions Yet</Text>
      <Text style={styles.emptySubtitle}>
        Start adding your income and expenses{'\n'}to track your finances
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Recent Transactions</Text>
        {transactions.length > 0 && (
          <Text style={styles.transactionCount}>
            {transactions.length} {transactions.length === 1 ? 'entry' : 'entries'}
          </Text>
        )}
      </View>
      
      <FlatList
        data={transactions}
        renderItem={({ item }) => (
          <TransactionItem
            transaction={item}
            onDelete={onDeleteTransaction}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={renderEmptyList}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#343A40',
    fontFamily: 'System',
  },
  transactionCount: {
    fontSize: 14,
    color: '#6C757D',
    fontFamily: 'System',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
    flexGrow: 1,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#343A40',
    marginBottom: 8,
    fontFamily: 'System',
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#6C757D',
    textAlign: 'center',
    fontFamily: 'System',
    lineHeight: 20,
  },
});

export default TransactionList;