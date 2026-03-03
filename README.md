## SpendWise a Student Expense Tracker

A clean, mobile-friendly expense tracking app built for students. Log daily spending, set a monthly budget, and visualize where your money goes — all stored locally in your browser.

## Features

- **Add & Delete Expenses** — quickly log expenses with an amount, category, date, and optional note
- **Monthly Budget** — set a monthly budget and track remaining balance with a live progress bar
- **Month Navigation** — switch between months to review past spending
- **Category Breakdown** — interactive pie chart (Recharts) showing spending by category
- **7 Expense Categories** — Food & Drinks, Transport, School, Entertainment, Groceries, Health, Miscellaneous
- **Persistent Storage** — expenses and budget are saved to `localStorage` so data survives page refreshes
- **Responsive Design** — works on both desktop and mobile with a floating action button for quick entry

## Tech Stack

| Tool                                     | Purpose                                             |
| ---------------------------------------- | --------------------------------------------------- |
| [React 19](https://react.dev/)           | UI framework                                        |
| [Vite](https://vite.dev/)                | Build tool & dev server                             |
| [Tailwind CSS](https://tailwindcss.com/) | Utility-first styling                               |
| [Radix UI](https://www.radix-ui.com/)    | Accessible UI primitives (Dialog, Select, Progress) |
| [Recharts](https://recharts.org/)        | Category pie chart                                  |
| [Lucide React](https://lucide.dev/)      | Icons                                               |
| [date-fns](https://date-fns.org/)        | Date formatting & filtering                         |
| [uuid](https://github.com/uuidjs/uuid)   | Unique expense IDs                                  |

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/student-expense-tracker.git
cd student-expense-tracker

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
├── App.jsx                 # Root component & layout
├── components/
│   ├── AddExpenseModal.jsx # Modal form for logging a new expense
│   ├── BudgetSetterModal.jsx # Modal for updating the monthly budget
│   ├── BudgetSummary.jsx   # Budget progress card
│   ├── CategoryChart.jsx   # Recharts pie chart
│   ├── ExpenseItem.jsx     # Single expense row
│   ├── ExpenseList.jsx     # Scrollable list of expenses
│   ├── Navbar.jsx          # Header with month navigation
│   └── ui/                 # Shared shadcn/ui-style components
├── hooks/
│   └── useExpenses.js      # Core state & localStorage logic
└── utils/
    ├── categories.js       # Category definitions (id, label, color, icon)
    ├── dateHelpers.js      # Month filtering utilities
    └── formatCurrency.js   # Currency formatting helper
```

## License

MIT
