/** UI renderer - dom.js

 * Purpose:
 * Render transaction table
 * Render stats cards
 * Render details panel
 * Show loading and empty states

 */

import { state } from "./state.js"

const tbody = document.querySelector("#transactions tbody");
const statusSelected = document.querySelector("#filters select")

export function initUI() {
  statusSelected.addEventListener("change", () => {
    const status = statusSelected.value;
    
    if (!status) {
      state.visibleTransactions = state.transactions;
    } else {
      state.visibleTransactions = state.transactions.filter(
        txn => txn.status === status
      );
    }

    render();
  });

  // cache DOM elements
  // setup empty placeholders
  // bind event listeners (later)
}

const detailedView = document.querySelector("#transaction-details .details-panel");

export function renderDetails(){
  const txn = state.selectedTransaction;

  if(!txn) {
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

  if (state.visibleTransactions.length === 0) {
    tbody.innerHTML = `<tr><td colspan="4">No transactions found</td></tr>`;
    return;
  }

  // render table + stats

  tbody.innerHTML = "";

  state.visibleTransactions.forEach(txn => {
    const tr = document.createElement("tr");

    tr.classList.add(`row-${txn.status}`);

    tr.addEventListener("click", () => {
      state.selectedTransaction = txn;
      renderDetails();
    })

    tr.innerHTML = `
      <td>#${txn.id}</td>
      <td>${new Date(txn.createdAt).toLocaleDateString()}</td>
      <td>₹${txn.amount}</td>
      <td>${txn.status}</td>
    `;

    tbody.appendChild(tr);
  });

}