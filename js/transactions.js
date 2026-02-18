import { getTransactions } from './storage.js';

// Display transactions and update income, expenses, and balance
export function renderTransactions() {
  const list = document.querySelector('#transaction-list');
  const incomeEl = document.querySelector('#income');
  const expensesEl = document.querySelector('#expenses');
  const balanceEl = document.querySelector('#balance');

  list.innerHTML = '';

  let income = 0;
  let expenses = 0;

  getTransactions().forEach(transaction => {
    const li = document.createElement('li');
    li.textContent = `${transaction.type}: $${transaction.amount}`;
    list.appendChild(li);

    if (transaction.type === 'income') {
      income += transaction.amount;
    } else {
      expenses += transaction.amount;
    }
  });

  incomeEl.textContent = income.toFixed(2);
  expensesEl.textContent = expenses.toFixed(2);
  balanceEl.textContent = (income - expenses).toFixed(2);
}
