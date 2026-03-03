import { useState } from "react";
import { Plus } from "lucide-react";
import { useExpenses } from "./hooks/useExpenses";
import Navbar from "./components/Navbar";
import AddExpenseModal from "./components/AddExpenseModal";
import BudgetSummary from "./components/BudgetSummary";
import ExpenseList from "./components/ExpenseList";
import CategoryChart from "./components/CategoryChart";

function App() {
  const {
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
  } = useExpenses();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-surface text-white font-sans">
      <Navbar activeMonth={activeMonth} setActiveMonth={setActiveMonth} />

      <main className="max-w-5xl mx-auto px-3 sm:px-4 py-4 sm:py-6 space-y-4 sm:space-y-6 pb-20 sm:pb-6">
        <BudgetSummary
          totalSpent={totalSpent}
          currentBudget={currentBudget}
          remaining={remaining}
          activeMonth={activeMonth}
          onSetBudget={setBudget}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <CategoryChart spentByCategory={spentByCategory} />
          <ExpenseList
            filteredExpenses={filteredExpenses}
            onDelete={deleteExpense}
            isLoaded={isLoaded}
          />
        </div>
      </main>

      {/* Floating Add Button */}
      <button
        onClick={() => setIsAddModalOpen(true)}
        className="fixed bottom-6 right-6 bg-brand hover:bg-brand-dark rounded-full p-4 shadow-lg shadow-brand/25 transition-colors z-50"
      >
        <Plus className="h-6 w-6 text-white" />
      </button>

      <AddExpenseModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={addExpense}
      />
      {/* BudgetSetterModal is managed inside BudgetSummary */}
    </div>
  );
}

export default App;
