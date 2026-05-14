// src/components/BalanceHeader.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const BalanceHeader = ({ balance }) => {
  const formatCurrency = (amount) => {
    return `$${Math.abs(amount).toFixed(2)}`;
  };

  const balanceColor = balance.balance >= 0 ? '#4CAF50' : '#F44336';

  return (
    <View style={styles.container}>
      <View style={styles.balanceCard}>
        <Text style={styles.balanceLabel}>Current Balance</Text>
        <Text style={[styles.balanceAmount, { color: balanceColor }]}>
          {formatCurrency(balance.balance)}
        </Text>
        
        <View style={styles.detailsContainer}>
          <View style={styles.detailItem}>
            <View style={[styles.indicator, styles.incomeIndicator]} />
            <View>
              <Text style={styles.detailLabel}>Income</Text>
              <Text style={styles.incomeAmount}>
                {formatCurrency(balance.totalIncome)}
              </Text>
            </View>
          </View>
          
          <View style={styles.divider} />
          
          <View style={styles.detailItem}>
            <View style={[styles.indicator, styles.expenseIndicator]} />
            <View>
              <Text style={styles.detailLabel}>Expenses</Text>
              <Text style={styles.expenseAmount}>
                {formatCurrency(balance.totalExpense)}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  balanceCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  balanceLabel: {
    fontSize: 14,
    color: '#6C757D',
    marginBottom: 8,
    fontFamily: 'System',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  balanceAmount: {
    fontSize: 36,
    fontWeight: '700',
    marginBottom: 16,
    fontFamily: 'System',
  },
  detailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  detailItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  indicator: {
    width: 4,
    height: 32,
    borderRadius: 2,
    marginRight: 12,
  },
  incomeIndicator: {
    backgroundColor: '#4CAF50',
  },
  expenseIndicator: {
    backgroundColor: '#F44336',
  },
  detailLabel: {
    fontSize: 12,
    color: '#6C757D',
    fontFamily: 'System',
  },
  incomeAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4CAF50',
    fontFamily: 'System',
  },
  expenseAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#F44336',
    fontFamily: 'System',
  },
  divider: {
    width: 1,
    height: 40,
    backgroundColor: '#E9ECEF',
    marginHorizontal: 16,
  },
});

export default BalanceHeader;