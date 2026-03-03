import { useState, useEffect, useMemo } from "react";
import { v4 as uuidv4 } from "uuid";
import { isInMonth, getCurrentMonth } from "../utils/dateHelpers";

const EXPENSES_KEY = "expenses";
const BUDGET_KEY = "budget";

const loadFromStorage = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};

export const useExpenses = () => {
  const [expenses, setExpenses] = useState(() =>
    loadFromStorage(EXPENSES_KEY, []),
  );
  const [budgets, setBudgetsState] = useState(() =>
    loadFromStorage(BUDGET_KEY, {}),
  );
  const [activeMonth, setActiveMonth] = useState(getCurrentMonth);
  const [isLoaded, setIsLoaded] = useState(false);

  // Mark as loaded after initial mount
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Persist expenses to localStorage on every change
  useEffect(() => {
    localStorage.setItem(EXPENSES_KEY, JSON.stringify(expenses));
  }, [expenses]);

  // Persist budget to localStorage on every change
  useEffect(() => {
    localStorage.setItem(BUDGET_KEY, JSON.stringify(budgets));
  }, [budgets]);

  // Add a new expense
  const addExpense = (expenseData) => {
    const newExpense = {
      id: uuidv4(),
      amount: Number(expenseData.amount),
      category: expenseData.category,
      date: expenseData.date,
      note: expenseData.note || "",
      createdAt: Date.now(),
    };
    setExpenses((prev) => [newExpense, ...prev]);
  };

  // Delete an expense by ID
  const deleteExpense = (id) => {
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  };

  // Set budget for the active month
  const setBudget = (amount) => {
    setBudgetsState((prev) => ({ ...prev, [activeMonth]: Number(amount) }));
  };

  // Derived: current month's budget (0 if not set)
  const currentBudget = budgets[activeMonth] ?? 0;

  // Derived: expenses filtered by activeMonth
  const filteredExpenses = useMemo(
    () => expenses.filter((e) => isInMonth(e.date, activeMonth)),
    [expenses, activeMonth],
  );

  // Derived: total spent this month
  const totalSpent = useMemo(
    () => filteredExpenses.reduce((sum, e) => sum + e.amount, 0),
    [filteredExpenses],
  );

  // Derived: remaining budget
  const remaining = currentBudget - totalSpent;

  // Derived: totals per category
  const spentByCategory = useMemo(
    () =>
      filteredExpenses.reduce((acc, e) => {
        acc[e.category] = (acc[e.category] || 0) + e.amount;
        return acc;
      }, {}),
    [filteredExpenses],
  );

  return {
    expenses,
    currentBudget,
    addExpense,
    deleteExpense,
    setBudget,
    filteredExpenses,
    activeMonth,
    setActiveMonth,
    totalSpent,
    remaining,
    spentByCategory,
    isLoaded,
  };
};
