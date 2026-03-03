# 🎓 Student Expense Tracker — Full Copilot Guide
> A complete vibe-coded build guide for GitHub Copilot / AI-assisted development  
> Author: Jerby B. Calo | Stack: React + Vite + Tailwind CSS | Currency: PHP (₱)

---

## 📌 Project Overview

Build a **Student Expense Tracker** web app tailored for a Filipino CS student. The app should feel like a minimal dark-mode fintech dashboard — clean, fast, and satisfying to use. All data is stored in `localStorage`. No backend required.

**Design Vibe:** Dark mode · Emerald/teal accents · Smooth micro-animations · Card-based layout · Mobile-first

---

## 🛠️ Tech Stack

| Layer        | Tool / Library         | Version     |
|--------------|------------------------|-------------|
| Language     | JavaScript (JSX)       | ES2022+     |
| Framework    | React                  | ^18         |
| Build Tool   | Vite                   | ^5          |
| Styling      | Tailwind CSS           | ^3          |
| Charts       | Recharts               | ^2          |
| Icons        | Lucide React           | ^0.263      |
| Date Utility | date-fns               | ^3          |
| ID Generator | uuid                   | ^9          |
| UI Components| shadcn/ui              | latest      |

---

## 🚀 Project Initialization

```bash
# 1. Scaffold the project
npm create vite@latest student-expense-tracker -- --template react
cd student-expense-tracker

# 2. Install dependencies
npm install recharts lucide-react date-fns uuid
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# 3. Initialize shadcn/ui
npx shadcn-ui@latest init

# 4. Add shadcn components you'll need
npx shadcn-ui@latest add card button input select badge progress dialog
```

---

## 📁 Project File Structure

```
student-expense-tracker/
├── public/
├── src/
│   ├── components/
│   │   ├── AddExpenseModal.jsx       ← Modal form to add expenses
│   │   ├── BudgetSummary.jsx         ← Monthly budget card + progress bar
│   │   ├── CategoryChart.jsx         ← Pie/bar chart of spending by category
│   │   ├── ExpenseList.jsx           ← Filterable, sortable list of expenses
│   │   ├── ExpenseItem.jsx           ← Single expense row with delete button
│   │   ├── Navbar.jsx                ← Top navigation bar
│   │   └── BudgetSetterModal.jsx     ← Modal to set monthly budget
│   ├── hooks/
│   │   └── useExpenses.js            ← All state + localStorage logic
│   ├── utils/
│   │   ├── categories.js             ← Category metadata (name, icon, color)
│   │   ├── formatCurrency.js         ← ₱ formatter helper
│   │   └── dateHelpers.js            ← Month filtering helpers
│   ├── App.jsx                       ← Root layout + page composition
│   ├── main.jsx                      ← React entry point
│   └── index.css                     ← Tailwind directives + custom CSS vars
├── tailwind.config.js
├── vite.config.js
└── package.json
```

---

## 🗂️ Data Models

### Expense Object
```js
{
  id: "uuid-v4-string",          // string — unique ID
  amount: 150.00,                // number — in PHP (₱)
  category: "food",              // string — see Category List below
  date: "2025-03-01",            // string — ISO format YYYY-MM-DD
  note: "Jollibee lunch",        // string — optional description
  createdAt: 1709251200000       // number — Unix timestamp
}
```

### Budget Object
```js
{
  monthly: 5000.00               // number — monthly spending limit in ₱
}
```

### localStorage Keys
```js
"expenses"     // JSON array of Expense objects
"budget"       // JSON Budget object
```

---

## 🏷️ Category List

```js
// src/utils/categories.js
export const CATEGORIES = [
  { id: "food",          label: "Food & Drinks",   color: "#f59e0b", icon: "UtensilsCrossed" },
  { id: "transport",     label: "Transport",        color: "#3b82f6", icon: "Bus" },
  { id: "school",        label: "School",           color: "#8b5cf6", icon: "BookOpen" },
  { id: "entertainment", label: "Entertainment",    color: "#ec4899", icon: "Gamepad2" },
  { id: "groceries",     label: "Groceries",        color: "#10b981", icon: "ShoppingCart" },
  { id: "health",        label: "Health",           color: "#ef4444", icon: "HeartPulse" },
  { id: "misc",          label: "Miscellaneous",    color: "#6b7280", icon: "MoreHorizontal" },
];
```

---

## 🪝 useExpenses Hook — Full Spec

> File: `src/hooks/useExpenses.js`

This hook manages ALL app state. Components should only call this hook — never manage state themselves.

### Exported Values

```js
const {
  expenses,           // Expense[] — all stored expenses
  budget,             // { monthly: number }
  addExpense,         // (expenseData) => void
  deleteExpense,      // (id: string) => void
  setBudget,          // (amount: number) => void
  filteredExpenses,   // Expense[] — filtered by activeMonth
  activeMonth,        // string — "YYYY-MM" format e.g. "2025-03"
  setActiveMonth,     // (month: string) => void
  totalSpent,         // number — sum of filteredExpenses
  remaining,          // number — budget.monthly - totalSpent
  spentByCategory,    // { [categoryId]: number } — totals per category
} = useExpenses();
```

### Hook Behavior Rules
- Load `expenses` from `localStorage` on mount using `useEffect`
- Save `expenses` to `localStorage` on every change using `useEffect`
- `filteredExpenses` should auto-derive from `expenses` filtered by `activeMonth`
- `totalSpent` should auto-derive from `filteredExpenses`
- `spentByCategory` should auto-derive from `filteredExpenses`
- Default `activeMonth` to the current month on mount

---

## 🧩 Component Specifications

---

### `<Navbar />`
- App name on the left: **"SpendWise"** with a wallet icon
- Month selector (dropdown or arrows) on the right using `activeMonth`
- Background: `bg-gray-900` with bottom border

---

### `<BudgetSummary />`
**Props:** `totalSpent`, `budget`, `remaining`

- Show a large card with:
  - **Total Spent** this month (e.g. `₱ 2,340.00`)
  - **Budget** (e.g. `₱ 5,000.00`)
  - **Remaining** (green if positive, red if over budget)
  - A `<Progress>` bar showing percentage used
  - A small "Set Budget" button that opens `<BudgetSetterModal />`
- If `remaining < 0`, show a warning badge: `"Over Budget!"`

---

### `<CategoryChart />`
**Props:** `spentByCategory`

- Use `recharts` `PieChart` or `BarChart` — copilot's choice, but must be color-coded by category
- Show category labels and ₱ amounts
- Render a legend below the chart using `CATEGORIES` metadata
- Empty state: show a message `"No expenses this month"` if data is empty

---

### `<ExpenseList />`
**Props:** `filteredExpenses`, `onDelete`

- Show a scrollable list of `<ExpenseItem />` components
- Include a **filter bar** at the top with:
  - Category dropdown (filter by single category or "All")
  - Sort options: `Newest`, `Oldest`, `Highest`, `Lowest`
- Show count: `"Showing X expenses"`
- Empty state: ghost UI with a receipt icon and message

---

### `<ExpenseItem />`
**Props:** `expense`, `onDelete`

- Show in a single row card:
  - Category icon (from lucide-react) with color dot
  - Note text (or category label as fallback)
  - Date (formatted as `Mar 1, 2025`)
  - Amount: `₱ 150.00` (right-aligned, bold)
  - Delete button (trash icon, appears on hover)
- Animate in with a fade + slide on mount

---

### `<AddExpenseModal />`
**Props:** `onAdd`, `isOpen`, `onClose`

- A modal dialog using `shadcn/ui` `<Dialog>`
- Form fields:
  - Amount (number input, required, min: 1)
  - Category (dropdown using `CATEGORIES`)
  - Date (date picker, defaults to today)
  - Note (text input, optional, max 60 chars)
- Validate before submit: amount must be > 0
- After submit: clear form, close modal, show a brief success toast

---

### `<BudgetSetterModal />`
**Props:** `currentBudget`, `onSave`, `isOpen`, `onClose`

- Simple modal with a single number input pre-filled with current budget
- Save button calls `setBudget(amount)` and closes modal

---

## 💅 Styling Rules

### Color Palette (add to `tailwind.config.js`)
```js
colors: {
  brand: {
    DEFAULT: "#10b981",   // emerald-500 — primary accent
    dark:    "#059669",   // emerald-600 — hover states
    light:   "#6ee7b7",   // emerald-300 — highlights
  },
  surface: {
    DEFAULT: "#111827",   // gray-900 — page background
    card:    "#1f2937",   // gray-800 — card background
    border:  "#374151",   // gray-700 — borders
    muted:   "#6b7280",   // gray-500 — secondary text
  }
}
```

### Typography
```css
/* Import in index.css */
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

body { font-family: 'Space Grotesk', sans-serif; }
.mono { font-family: 'JetBrains Mono', monospace; }  /* use for ₱ amounts */
```

### Animation Utilities (add to `index.css`)
```css
@keyframes fadeSlideIn {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
}
.animate-fade-in { animation: fadeSlideIn 0.25s ease-out forwards; }
```

---

## 🗺️ App Layout — `App.jsx`

```jsx
// App.jsx layout structure (pseudocode)
return (
  <div className="min-h-screen bg-surface text-white">
    <Navbar />
    <main className="max-w-5xl mx-auto px-4 py-6 space-y-6">
      <BudgetSummary />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CategoryChart />
        <ExpenseList />
      </div>
    </main>
    {/* Floating Add Button */}
    <button className="fixed bottom-6 right-6 bg-brand rounded-full p-4 shadow-lg">
      <Plus />
    </button>
    <AddExpenseModal />
    <BudgetSetterModal />
  </div>
);
```

---

## 💰 Currency Formatter

```js
// src/utils/formatCurrency.js
export const formatPHP = (amount) =>
  new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    minimumFractionDigits: 2,
  }).format(amount);

// Output: ₱1,234.50
```

---

## 📅 Date Helpers

```js
// src/utils/dateHelpers.js
import { format, parseISO, startOfMonth, endOfMonth, isWithinInterval } from "date-fns";

export const getCurrentMonth = () => format(new Date(), "yyyy-MM");

export const isInMonth = (dateString, yearMonth) => {
  const date = parseISO(dateString);
  const [year, month] = yearMonth.split("-").map(Number);
  const ref = new Date(year, month - 1, 1);
  return isWithinInterval(date, {
    start: startOfMonth(ref),
    end: endOfMonth(ref),
  });
};

export const formatDisplayDate = (dateString) =>
  format(parseISO(dateString), "MMM d, yyyy");
```

---

## ✅ Feature Checklist (Build in This Order)

```
Phase 1 — Core Foundation
  [ ] Project scaffolded with Vite + React
  [ ] Tailwind configured with custom colors + fonts
  [ ] useExpenses hook with localStorage working
  [ ] CATEGORIES constant defined

Phase 2 — UI Shell
  [ ] Navbar with month selector
  [ ] App.jsx layout with grid
  [ ] Floating Add button

Phase 3 — Core Features
  [ ] AddExpenseModal with validation
  [ ] ExpenseList + ExpenseItem with delete
  [ ] BudgetSummary with progress bar
  [ ] CategoryChart with recharts

Phase 4 — Polish
  [ ] BudgetSetterModal
  [ ] Filter + sort in ExpenseList
  [ ] Empty states for list and chart
  [ ] Fade-in animations on expense items
  [ ] Success toast on add
  [ ] Mobile responsive check
```

---

## ⚠️ Rules for Copilot to Always Follow

- ❌ Never use `localStorage` directly inside components — always use `useExpenses`
- ❌ Never hardcode currency symbols — always use `formatPHP()` 
- ❌ Never use inline styles — use Tailwind classes only
- ❌ Never use `<form>` tags — use `onClick` and `onChange` handlers
- ✅ Always use `uuid` for generating expense IDs
- ✅ Always default the date field to today's date
- ✅ Always handle empty/null states gracefully in every component
- ✅ Always use `date-fns` for any date manipulation or formatting

---

*Guide version 1.0 — Built for Jerby B. Calo's Student Expense Tracker project*