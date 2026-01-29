/** Main App Orchestrator - main.js

 * Purpose:
 * Start the app
 * Initilizes state
 * Initilizes UI
 * Triggers initial data fetch

main.js
  ↓
state.js  ←→  dom.js
  ↑
api.js

*/

import { initState } from "./state.js"
import { fetchTransactions } from "./api.js"
import { initUI } from "./dom.js"

document.addEventListener("DOMContentLoaded", () => {
  console.log("App initlized")

  initState();
  initUI();
  fetchTransactions();
})