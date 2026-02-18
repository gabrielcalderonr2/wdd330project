import { getTransactions } from './storage.js';

// Display transactions and update summary
export function renderTransactions() {
  const list = document.querySelector('#transaction-list');
  const incomeEl = document.querySelector('#income');
  const expensesEl = document.querySelector('#expenses');
  const balanceEl = document.querySelector('#balance');

  list.innerHTML = '';

  let income = 0;
  let expenses = 0;

  const transactions = getTransactions();

  transactions.forEach((transaction, index) => {
    const li = document.createElement('li');
    li.classList.add('transaction-card', transaction.type);

    // Animate only the newest transaction
    if (index === transactions.length - 1) {
      li.classList.add('new');
    }

    li.innerHTML = `
      <span class="icon">🕒</span>
      <div class="transaction-info">
        <strong>${transaction.type.toUpperCase()}</strong>
        <span>$${transaction.amount}</span>
      </div>
    `;

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
