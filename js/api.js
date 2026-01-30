/** Data layer - api.js

 * Purpose:
 * Talk to external data layer
 * Fetch transactions from MockAPI {/tranactions}
 * Handle API errors
 * Parse JSON and returns clean data

 */

import { state } from './state.js'

const API_CONFIG = "https://697cbaf3889a1aecfeb369ce.mockapi.io/transactions/transactions"

export async function fetchTransactions() {
  state.isLoading = true;
  state.error = null;

  try {
    const response = await fetch(API_CONFIG);
    if (!response.ok) throw new Error('Failed to fetch transactions');

    const data = await response.json();

    // source of data
    state.transactions = data;

    // default view all transactions
    state.visibleTransactions = data;
  }
  catch (err) {
    state.error = err.message;
  }
  finally {
    state.isLoading = false;
  }
}