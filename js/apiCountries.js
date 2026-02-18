// Fetch country and currency data

const API_URL = 'https://restcountries.com/v3.1/all';

// Get list of currencies from countries API
export async function getCurrencies() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();

    const currencies = new Set();

    data.forEach(country => {
      if (country.currencies) {
        Object.keys(country.currencies).forEach(code => {
          currencies.add(code);
        });
      }
    });

    return Array.from(currencies).sort();
  } catch (error) {
    console.error('Error fetching countries:', error);
    return [];
  }
}
