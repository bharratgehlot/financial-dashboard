/** Data filtering logic here - filters.js

 * Purpose:
 * Filter data based on search
 * Show transactions based on status
 * Derive filtered data from state
 * Seperate filter logic

 */

import { state } from "./state.js"

export function applyFilters() {
  // filter logic
  let result = [...state.transactions];

  // status filter
  if (state.filters.status) {
    result = result.filter(txn => txn.status === state.filters.status);
  }

  // search filter
  if (state.filters.search) {
    const q = state.filters.search.toLowerCase();

    result = result.filter(txn => 
      txn.id.toString().includes(q) ||
      txn.sender.toLowerCase().includes(q) ||
      txn.receiver.toLowerCase().includes(q) ||
      txn.reference.toLowerCase().includes(q)
    );
  }

  // date filter 
  if (state.filters.startDate && state.filters.endDate) {
    let start = new Date(state.filters.startDate);
    let end = new Date(state.filters.endDate);

    // auto correct reversed range

    if (start > end) {
      [start ,end] = [end, start];
    }

    // include full end day (UTC-safe)
    end.setUTCHours(23, 59, 59, 999);

    result = result.filter(txn => {
      const txnDate = new Date(txn.createdAt);
      return txnDate >= start && txnDate <= end;
    });
  }


  state.filteredTransactions = result;
}