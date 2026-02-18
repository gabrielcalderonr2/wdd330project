import { convertCurrency } from './apiExchange.js';
import { saveTransaction, loadTransactions } from './storage.js';
import { renderTransactions } from './transactions.js';

const form = document.querySelector('#transaction-form');
const amountInput = document.querySelector('#amount');
const typeSelect = document.querySelector('#type');
const currencySelect = document.querySelector('#currency-select');
const convertedBalanceEl = document.querySelector('#converted-balance');

// Load saved transactions when the page loads
loadTransactions();
renderTransactions();

// Handle form submission
form.addEventListener('submit', (event) => {
  event.preventDefault();

  const amount = Number(amountInput.value);
  const type = typeSelect.value;

  // Prevent invalid values
  if (amount <= 0) {
    return;
  }

  saveTransaction({ amount, type });
  renderTransactions();
  form.reset();
});
async function updateConvertedBalance() {
  const balance = Number(document.querySelector('#balance').textContent);
  const currency = currencySelect.value;
  const converted = await convertCurrency(balance, currency);
  convertedBalanceEl.textContent = converted;
}

currencySelect.addEventListener('change', updateConvertedBalance);
