/** UI renderer - dom.js

 * Purpose:
 * Render transaction table
 * Render stats cards
 * Render details panel
 * Show loading and empty states

 */

import { state } from "./state.js"
import { applyFilters } from "./filter.js";

const tbody = document.querySelector("#transactions tbody");
const statusSelected = document.querySelector("#filters select")
const searchedInput = document.querySelector("#filters input")
const detailedView = document.querySelector("#transaction-details .details-panel");
const clearFiltersButton = document.querySelector("#filters button");
const startDateInput = document.querySelector("#start-date");
const endDateInput = document.querySelector("#end-date");


export function initUI() {

  statusSelected.addEventListener("change", () => {
    state.filters.status = statusSelected.value;
    applyFilters();
    render();
  });

  let debounceTimer;

  searchedInput.addEventListener("input", () => {
    const value = searchedInput.value.trim();

    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      state.filters.search = value;
      applyFilters();
      render();
    }, 700);
  });

  startDateInput.addEventListener("change", () => {
    state.filters.startDate = startDateInput.value;
    applyFilters();
    render();
  });

  endDateInput.addEventListener("change", () => {
    state.filters.endDate = endDateInput.value;
    applyFilters();
    render();
  });

  clearFiltersButton.addEventListener("click", () => {
    state.filters.search = "";
    state.filters.status = "";
    searchedInput.value = "";
    state.filters.startDate = "";
    state.filters.endDate = "";
    statusSelected.value = "";
    startDateInput.value = "";
    endDateInput.value = "";
    state.selectedTransaction = null;
    applyFilters();
    render();
    renderDetails();
  })
  // cache DOM elements
  // setup empty placeholders
  // bind event listeners (later)
}





export function renderDetails() {
  const txn = state.selectedTransaction;

  if (!txn) {
    detailedView.innerHTML = `<p class="details-empty">Select a transaction to view details</p>`;
    return;
  }

  detailedView.innerHTML = `
  <p><strong>ID:</strong> #${txn.id}</p>
  <p><strong>Date:</strong> ${new Date(txn.createdAt).toLocaleString()}</p>
  <p><strong>Amount:</strong> ₹${txn.amount}</p>
  <p><strong>Status:</strong> ${txn.status}</p>
  <p><strong>Sender:</strong> ${txn.sender}</p>
  <p><strong>Receiver:</strong> ${txn.receiver}</p>
  <p><strong>Reference:</strong> ${txn.reference}</p>
`;

}



export function render() {
  if (state.isLoading) {
    tbody.innerHTML = `<tr><td colspan="4">Loading transactions...</td></tr>`;
    return;
  }

  if (state.error) {
    tbody.innerHTML = `<tr><td colspan="4">${state.error}</td></tr>`;
    return;
  }

  if (state.filteredTransactions.length === 0) {
    tbody.innerHTML = `<tr><td colspan="4">No transactions found</td></tr>`;
    return;
  }

  // render table + stats

  tbody.innerHTML = "";

  state.filteredTransactions.forEach(txn => {
    const tr = document.createElement("tr");

    tr.classList.add(`row-${txn.status}`);

    tr.addEventListener("click", () => {
      state.selectedTransaction = txn;
      renderDetails();
    });

    tr.innerHTML = `
      <td>#${txn.id}</td>
      <td>${new Date(txn.createdAt).toLocaleDateString()}</td>
      <td>₹${txn.amount}</td>
      <td>${txn.status}</td>
    `;

    tbody.appendChild(tr);
  });

}