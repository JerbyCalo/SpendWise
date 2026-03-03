import { useState, useEffect } from "react";
import { format, parse } from "date-fns";
import { PiggyBank } from "lucide-react";
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
import { formatPHP } from "../utils/formatCurrency";

const BudgetSetterModal = ({
  currentBudget,
  activeMonth,
  onSave,
  isOpen,
  onClose,
}) => {
  const [amount, setAmount] = useState(String(currentBudget || ""));

  const monthLabel = activeMonth
    ? format(parse(activeMonth, "yyyy-MM", new Date()), "MMMM yyyy")
    : "this month";

  // Sync input when modal opens or currentBudget changes
  useEffect(() => {
    if (isOpen) {
      setAmount(currentBudget ? String(currentBudget) : "");
    }
  }, [isOpen, currentBudget]);

  const handleSave = () => {
    const value = Number(amount);
    if (value > 0) {
      onSave(value);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="bg-surface-card border-surface-border text-white sm:max-w-sm">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-white">
            <PiggyBank className="h-5 w-5 text-brand" />
            Set Monthly Budget
          </DialogTitle>
          <DialogDescription className="text-surface-muted">
            Setting budget for{" "}
            <span className="text-white font-medium">{monthLabel}</span>
            {currentBudget > 0 && (
              <>
                {" — "}
                current:{" "}
                <span className="mono">{formatPHP(currentBudget)}</span>
              </>
            )}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-gray-300">
            Budget Amount (₱)
          </label>
          <Input
            type="number"
            min="1"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="bg-surface border-surface-border text-white mono"
          />
        </div>

        <DialogFooter>
          <Button
            variant="ghost"
            onClick={onClose}
            className="text-surface-muted hover:text-white hover:bg-surface"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="bg-brand hover:bg-brand-dark text-white"
          >
            Save Budget
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BudgetSetterModal;
