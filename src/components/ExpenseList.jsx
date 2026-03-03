import { useState, useMemo } from "react";
import { Receipt } from "lucide-react";
import { CATEGORIES } from "../utils/categories";
import ExpenseItem from "./ExpenseItem";

const SORT_OPTIONS = [
  { value: "newest", label: "Newest" },
  { value: "oldest", label: "Oldest" },
  { value: "highest", label: "Highest" },
  { value: "lowest", label: "Lowest" },
];

const SkeletonRow = () => (
  <div className="flex items-center gap-3 rounded-lg bg-surface-card border border-surface-border px-3 py-2.5 sm:px-4 sm:py-3 animate-pulse">
    <div className="h-8 w-8 sm:h-9 sm:w-9 rounded-lg bg-surface-border shrink-0" />
    <div className="flex-1 space-y-2">
      <div className="h-3 w-2/3 rounded bg-surface-border" />
      <div className="h-2 w-1/3 rounded bg-surface-border" />
    </div>
    <div className="h-3 w-16 rounded bg-surface-border shrink-0" />
  </div>
);

const ExpenseList = ({ filteredExpenses, onDelete, isLoaded = true }) => {
  const [filterCategory, setFilterCategory] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  const processed = useMemo(() => {
    let list =
      filterCategory === "all"
        ? filteredExpenses
        : filteredExpenses.filter((e) => e.category === filterCategory);

    const sorted = [...list].sort((a, b) => {
      switch (sortBy) {
        case "oldest":
          return new Date(a.date) - new Date(b.date);
        case "highest":
          return b.amount - a.amount;
        case "lowest":
          return a.amount - b.amount;
        case "newest":
        default:
          return new Date(b.date) - new Date(a.date);
      }
    });

    return sorted;
  }, [filteredExpenses, filterCategory, sortBy]);

  return (
    <div className="space-y-3">
      {/* Filter bar */}
      <div className="flex flex-wrap items-center gap-2">
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="rounded-md border border-surface-border bg-surface px-2.5 py-1.5 text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-brand"
        >
          <option value="all">All Categories</option>
          {CATEGORIES.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.label}
            </option>
          ))}
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="rounded-md border border-surface-border bg-surface px-2.5 py-1.5 text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-brand"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        <span className="text-xs text-surface-muted ml-auto">
          Showing {processed.length} expense{processed.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Loading skeleton */}
      {!isLoaded ? (
        <div className="space-y-2">
          <SkeletonRow />
          <SkeletonRow />
          <SkeletonRow />
        </div>
      ) : processed.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-surface-muted">
          <Receipt className="h-12 w-12 mb-3 opacity-30" />
          <p className="text-sm font-medium">No expenses yet</p>
          <p className="text-xs mt-1">Tap the + button to add one</p>
        </div>
      ) : (
        <div className="space-y-2 max-h-[28rem] overflow-y-auto pr-1">
          {processed.map((expense) => (
            <ExpenseItem
              key={expense.id}
              expense={expense}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ExpenseList;
