// Manage transactions using localStorage

let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

// Save a new transaction and update localStorage
export function saveTransaction(transaction) {
  transactions.push(transaction);
  localStorage.setItem('transactions', JSON.stringify(transactions));
}

// Load transactions from localStorage when the app starts
export function loadTransactions() {
  transactions = JSON.parse(localStorage.getItem('transactions')) || [];
}

// Return all stored transactions
export function getTransactions() {
  return transactions;
}
