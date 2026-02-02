/** UI renderer - dom.js

 * Purpose:
 * Render transaction table
 * Render stats cards
 * Render details panel
 * Show loading and empty states

 */

import { state } from "./state.js"
import { applyFilters } from "./filter.js";
import { calculateStats } from "./stats.js";


function renderStats(stats) {
  statTotalEl.textContent = stats.total;
  statSuccessEl.textContent = `${stats.successRate}%`;
  statVolumeEl.textContent = `₹${stats.totalVolume.toLocaleString()}`;
  statAvgEl.textContent = `₹${stats.avgAmount.toLocaleString()}`;
}


const tbody = document.querySelector("#transactions tbody");
const statusSelected = document.querySelector("#filters select")
const searchedInput = document.querySelector("#filters input")
const detailedView = document.querySelector("#transaction-details .details-panel");
const clearFiltersButton = document.querySelector(".filters-panel button");
const startDateInput = document.querySelector("#start-date");
const endDateInput = document.querySelector("#end-date");

const filterToggleBtn = document.querySelector("#filter-toggle");
const filterPanel = document.querySelector(".filters-panel");

const statTotalEl = document.querySelector("#stats .stat-card:nth-child(1) .stat-value");
const statSuccessEl = document.querySelector("#stats .stat-card:nth-child(2) .stat-value");
const statVolumeEl = document.querySelector("#stats .stat-card:nth-child(3) .stat-value");
const statAvgEl = document.querySelector("#stats .stat-card:nth-child(4) .stat-value");


let selectedRowEl = null;

export function initUI() {
  console.log(filterToggleBtn, filterPanel);

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
    selectedRowEl = null;
    applyFilters();
    render();
    renderDetails();
  })

  //  Filter panel visibility 

  if (filterToggleBtn && filterPanel) {
    filterToggleBtn.addEventListener("click", () => {
      const isOpen = filterPanel.style.display === "flex";
      filterPanel.style.display = isOpen ? "none" : "flex";
    });
  }

  // Clicking outside will close the filter panel

  document.addEventListener("click", (e) => {
    if (!filterPanel || !filterToggleBtn) return;

    const clickedInsidePanel = filterPanel.contains(e.target);
    const clickedToggle = filterToggleBtn.contains(e.target);

    if (!clickedInsidePanel && !clickedToggle) {
      filterPanel.style.display = "none";
    }
  });

  // cache DOM elements
  // setup empty placeholders
  // bind event listeners (later)
}





export function renderDetails() {
  const txn = state.selectedTransaction;

  if (!txn) {
    detailedView.innerHTML = `

    <p class="details-empty">Select a transaction to view details</p>

    `;
    return;
  }

  detailedView.innerHTML = `
  <div><strong>ID:</strong><span>#${txn.id}</span></div>
  <div class="details-item">
  <strong>Date</strong>
  <span>${new Date(txn.createdAt).toLocaleString()}</span>
</div>

<div class="details-item">
  <strong>Amount</strong>
  <span>₹${txn.amount}</span>
</div>

<div class="details-item">
  <strong>Status</strong>
  <span class="status ${txn.status}">
    ${txn.status}
  </span>
</div>

<div class="details-item">
  <strong>Sender</strong>
  <span>${txn.sender || "—"}</span>
</div>

<div class="details-item">
  <strong>Receiver</strong>
  <span>${txn.receiver || "—"}</span>
</div>

<div class="details-item">
  <strong>Reference</strong>
  <span>${txn.reference || "—"}</span>
</div>
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

  // render stats dynamically

  const stats = calculateStats(state.filteredTransactions);
  renderStats(stats);


  if (state.filteredTransactions.length === 0) {
    tbody.innerHTML = `<tr><td colspan="4">No transactions found</td></tr>`;
    return;
  }




  // render table + stats

  tbody.innerHTML = "";

  state.filteredTransactions.forEach(txn => {
    const tr = document.createElement("tr");

    tr.classList.add(`row-${txn.status}`);

    tr.innerHTML = `
      <td>#${txn.id}</td>
      <td>${new Date(txn.createdAt).toLocaleDateString()}</td>
      <td>₹${txn.amount}</td>
      <td>${txn.status}</td>
    `;

    // restore selection after re-render

    if (state.selectedTransaction?.id === txn.id) {
      tr.classList.add("selected");
      selectedRowEl = tr;
    }

    tr.addEventListener("click", () => {

      if (selectedRowEl) {
        selectedRowEl.classList.remove("selected");
      }

      // apply new selection

      tr.classList.add("selected");
      selectedRowEl = tr;


      state.selectedTransaction = txn;
      renderDetails();
    });


    tbody.appendChild(tr);
  });

}