// Fetch exchange rates and convert balance

const API_URL = 'https://api.exchangerate-api.com/v4/latest/USD';

// Get exchange rates from the API
export async function getExchangeRates() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    return data.rates;
  } catch (error) {
    console.error('Error fetching exchange rates:', error);
    return null;
  }
}

// Convert amount to selected currency
export async function convertCurrency(amount, currency) {
  const rates = await getExchangeRates();
  if (!rates || !rates[currency]) return amount;
  return (amount * rates[currency]).toFixed(2);
}
