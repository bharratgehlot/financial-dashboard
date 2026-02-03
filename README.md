# 💳 Financial Transactions Dashboard

## Project Intro
The **Financial Transactions Dashboard** is a frontend-focused fintech project built using **Vanilla JavaScript**.
It simulates a real-world transaction monitoring system where users can view, search, filter, and analyze financial transactions fetched from a REST API.

The goal of this project is to demonstrate **production-style frontend engineering** used in fintech products—handling financial data, state updates, and UI responsiveness without relying on frameworks.

---

## Use Case
This dashboard represents a common fintech internal tool used by:
- Operations teams to monitor transactions
- Support teams to investigate failed or pending payments
- Analysts to view transaction volume and success rates

Key user actions:
- View a list of transactions
- Filter by status, date range, or amount
- Search transactions in real time
- Click a transaction to inspect detailed data
- View live-updating dashboard statistics

---

## Tech Stack
- **Vanilla JavaScript (ES6+)**
- **Fetch API** for REST API integration
- **HTML5 (Semantic Markup)**
- **CSS Grid & Flexbox** (mobile-first)
- **Git & GitHub** for version control
- **Mock REST API** (MockAPI / JSONPlaceholder / JSON Server)

> No frameworks or libraries were used to reflect core JavaScript proficiency.

---

## Fintech Patterns Used
This project intentionally follows common fintech UI and data-handling patterns:

- **Transaction Table Pattern**
  - Paginated, filterable, searchable transaction list
- **Master–Detail View**
  - Clicking a transaction opens a detailed inspection panel
- **Derived State Calculations**
  - Stats like total volume and success rate computed from filtered data
- **Status-Based Visualization**
  - Clear visual distinction between completed, pending, and failed transactions
- **Resilient UI States**
  - Loading, empty, and error states handled gracefully

---

## Project Architecture
The project follows **separation of concerns**, similar to real production systems:

```text
financial-dashboard/
├── index.html
├── css/
│   ├── layout.css
│   └── components.css
├── js/
│   ├── api.js
│   ├── state.js
│   ├── dom.js
│   └── main.js
├── README.md
└── .gitignore
```

**Data Flow**
1. `api.js` fetches transaction data  
2. `state.js` stores source data, filters, pagination, selection  
3. `dom.js` renders UI based on state  
4. `main.js` connects user actions → state updates → UI re-render  

---

## Screenshots

- Dashboard overview

<img src="https://github.com/user-attachments/assets/490eb812-00f1-4e4f-a64a-a6f7f045f1a0" width="90%" />

- Transaction table with filters

<img src="https://github.com/user-attachments/assets/7fe4783e-d41e-47bd-8748-f588c7f5c4d4" width="90%" />

- Transaction details panel

<img src="https://github.com/user-attachments/assets/a1c05e73-e5ee-45bc-8615-31fc82593c5a" width="90%" />

- Mobile responsive view

<p>
  <img src="https://github.com/user-attachments/assets/af647ab6-46c3-43ec-91e4-16a65bfaa2d6" width="35%" />
  <img src="https://github.com/user-attachments/assets/889f9991-2689-449b-978c-d54e890e9101" width="35%" />
</p>

