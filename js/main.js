import { getCurrencies } from './apiCountries.js';
import { saveTransaction, loadTransactions } from './storage.js';
import { renderTransactions } from './transactions.js';
import { convertCurrency } from './apiExchange.js';

const form = document.querySelector('#transaction-form');
const amountInput = document.querySelector('#amount');
const typeSelect = document.querySelector('#type');
const currencySelect = document.querySelector('#currency-select');
const convertedBalanceEl = document.querySelector('#converted-balance');

// Load saved data on page load
loadTransactions();
renderTransactions();
updateConvertedBalance();
loadCurrencies();


// Handle form submit
form.addEventListener('submit', (event) => {
  event.preventDefault();

  const amount = Number(amountInput.value);
  const type = typeSelect.value;

  if (amount <= 0) return;

  saveTransaction({ amount, type });
  renderTransactions();
  updateConvertedBalance();
  form.reset();
});

// Update converted balance when currency changes
currencySelect.addEventListener('change', updateConvertedBalance);

// Convert current balance
async function updateConvertedBalance() {
  const balance = Number(document.querySelector('#balance').textContent);
  const currency = currencySelect.value;
  const converted = await convertCurrency(balance, currency);
  convertedBalanceEl.textContent = converted;
}
async function loadCurrencies() {
  const currencies = await getCurrencies();

  if (currencies.length === 0) return;

  currencies.forEach(code => {
    const option = document.createElement('option');
    option.value = code;
    option.textContent = code;
    currencySelect.appendChild(option);
  });
}

