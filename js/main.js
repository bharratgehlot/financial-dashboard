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
import { initUI, render } from "./dom.js"

document.addEventListener("DOMContentLoaded", async () => {
  console.log("App initlized")

  initState();        // reset state
  initUI();           // setup static UI 
  render();           // show loading state

  await fetchTransactions();  // fetch API data
  render(); // render table
})