/** Store and manage data - state.js

 * Purpose:
 * Store data in js state temporarely
 * Update state
 * Expose state to other modules
 * Notify UI when state changes
 * It holds all transaction, filter values, selected transactions, and pagination info

 */

export const state = {
  transactions: [], // raw api data 
  allTransactions: [], // cleaned data
  selectedTransaction: null,
  filteredTransactions: [],

  filters: {
    search: "",
    startDate: "",
    endDate: "",
    status: ""
  },
  isLoading: false,
  error: null
};

export function initState() {
  state.transactions = [];
  state.allTransactions = [];
  state.selectedTransaction = null;
  state.filteredTransactions = [];

  state.filters = {
    search: "",
    startDate: "",
    endDate: "",
    status: ""
  };
 
  state.isLoading = false;
  state.error = null;

}

