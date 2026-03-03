import { useState } from "react";
import { format } from "date-fns";
import { CircleDollarSign } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CATEGORIES } from "../utils/categories";
import { formatPHP } from "../utils/formatCurrency";

const getToday = () => format(new Date(), "yyyy-MM-dd");

const initialState = () => ({
  amount: "",
  category: CATEGORIES[0].id,
  date: getToday(),
  note: "",
});

const AddExpenseModal = ({ onAdd, isOpen, onClose }) => {
  const [form, setForm] = useState(initialState);
  const [error, setError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (field === "amount") setError("");
  };

  const handleSubmit = () => {
    const amount = Number(form.amount);
    if (!amount || amount <= 0) {
      setError("Amount must be greater than " + formatPHP(0));
      return;
    }

    onAdd({
      amount,
      category: form.category,
      date: form.date,
      note: form.note.trim(),
    });

    // Brief success toast
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      resetAndClose();
    }, 1500);
  };

  const resetAndClose = () => {
    setForm(initialState());
    setError("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && resetAndClose()}>
      <DialogContent className="bg-surface-card border-surface-border text-white sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-white">
            <CircleDollarSign className="h-5 w-5 text-brand" />
            Add Expense
          </DialogTitle>
          <DialogDescription className="text-surface-muted">
            Log a new expense to track your spending.
          </DialogDescription>
        </DialogHeader>

        {/* Success toast */}
        {showSuccess && (
          <div className="bg-brand/15 border border-brand/30 text-brand-light rounded-md px-3 py-2 text-sm font-medium animate-fade-in">
            Expense added successfully!
          </div>
        )}

        <div className="space-y-4">
          {/* Amount */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-300">
              Amount (₱)
            </label>
            <Input
              type="number"
              min="1"
              step="0.01"
              placeholder="0.00"
              value={form.amount}
              onChange={(e) => handleChange("amount", e.target.value)}
              className="bg-surface border-surface-border text-white placeholder:text-surface-muted mono"
            />
            {error && <p className="text-red-400 text-xs">{error}</p>}
          </div>

          {/* Category */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-300">
              Category
            </label>
            <select
              value={form.category}
              onChange={(e) => handleChange("category", e.target.value)}
              className="w-full rounded-md border border-surface-border bg-surface px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-brand"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          {/* Date */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-300">Date</label>
            <Input
              type="date"
              value={form.date}
              onChange={(e) => handleChange("date", e.target.value)}
              className="bg-surface border-surface-border text-white"
            />
          </div>

          {/* Note */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-300">
              Note <span className="text-surface-muted">(optional)</span>
            </label>
            <Input
              type="text"
              maxLength={60}
              placeholder="e.g. Jollibee lunch"
              value={form.note}
              onChange={(e) => handleChange("note", e.target.value)}
              className="bg-surface border-surface-border text-white placeholder:text-surface-muted"
            />
            <p className="text-xs text-surface-muted text-right">
              {form.note.length}/60
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="ghost"
            onClick={resetAndClose}
            className="text-surface-muted hover:text-white hover:bg-surface"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            className="bg-brand hover:bg-brand-dark text-white"
          >
            Add Expense
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddExpenseModal;
