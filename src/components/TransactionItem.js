// src/components/TransactionItem.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const TransactionItem = ({ transaction, onDelete }) => {
  const isIncome = transaction.type === 'income';
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  const formatCurrency = (amount) => {
    return `$${Math.abs(amount).toFixed(2)}`;
  };

  const getCategoryIcon = (category) => {
    const icons = {
      'Salary': '💼',
      'Freelance': '💻',
      'Investment': '📈',
      'Gift': '🎁',
      'Food': '🍽️',
      'Transport': '🚗',
      'Shopping': '🛍️',
      'Bills': '📄',
      'Entertainment': '🎮',
      'Other': '📌',
    };
    return icons[category] || '📌';
  };

  const handleLongPress = () => {
    Alert.alert(
      'Delete Transaction',
      'Are you sure you want to delete this transaction?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => onDelete(transaction.id),
        },
      ]
    );
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onLongPress={handleLongPress}
      activeOpacity={0.7}
    >
      <View style={styles.leftSection}>
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>
            {getCategoryIcon(transaction.category)}
          </Text>
        </View>
        <View style={styles.transactionInfo}>
          <Text style={styles.category} numberOfLines={1}>
            {transaction.category}
          </Text>
          {transaction.description && transaction.description !== transaction.category && (
            <Text style={styles.description} numberOfLines={1}>
              {transaction.description}
            </Text>
          )}
          <Text style={styles.date}>{formatDate(transaction.date)}</Text>
        </View>
      </View>
      
      <View style={styles.rightSection}>
        <Text
          style={[
            styles.amount,
            { color: isIncome ? '#4CAF50' : '#F44336' },
          ]}
        >
          {isIncome ? '+' : '-'}{formatCurrency(transaction.amount)}
        </Text>
        <View style={[
          styles.typeBadge,
          { backgroundColor: isIncome ? '#E8F5E9' : '#FFEBEE' },
        ]}>
          <Text style={[
            styles.typeText,
            { color: isIncome ? '#4CAF50' : '#F44336' },
          ]}>
            {isIncome ? 'IN' : 'OUT'}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  leftSection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  icon: {
    fontSize: 24,
  },
  transactionInfo: {
    flex: 1,
  },
  category: {
    fontSize: 16,
    fontWeight: '600',
    color: '#343A40',
    fontFamily: 'System',
    marginBottom: 2,
  },
  description: {
    fontSize: 13,
    color: '#6C757D',
    fontFamily: 'System',
    marginBottom: 2,
  },
  date: {
    fontSize: 12,
    color: '#ADB5BD',
    fontFamily: 'System',
  },
  rightSection: {
    alignItems: 'flex-end',
    marginLeft: 12,
  },
  amount: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'System',
    marginBottom: 4,
  },
  typeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  typeText: {
    fontSize: 10,
    fontWeight: '700',
    fontFamily: 'System',
  },
});

export default TransactionItem;