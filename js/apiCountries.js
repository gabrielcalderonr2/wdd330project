// Fetch country currency codes using REST Countries API

const API_URL = 'https://restcountries.com/v3.1/region/americas';

// Get a list of currency codes
export async function getCurrencies() {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error('API request failed');
    }

    const data = await response.json();

    // Make sure the response is an array
    if (!Array.isArray(data)) {
      return [];
    }

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
