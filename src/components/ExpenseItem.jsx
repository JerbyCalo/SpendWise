import { useState, useRef } from "react";
import {
  Trash2,
  UtensilsCrossed,
  Bus,
  BookOpen,
  Gamepad2,
  ShoppingCart,
  HeartPulse,
  MoreHorizontal,
} from "lucide-react";
import { CATEGORIES } from "../utils/categories";
import { formatPHP } from "../utils/formatCurrency";
import { formatDisplayDate } from "../utils/dateHelpers";

const ICON_MAP = {
  UtensilsCrossed,
  Bus,
  BookOpen,
  Gamepad2,
  ShoppingCart,
  HeartPulse,
  MoreHorizontal,
};

const ExpenseItem = ({ expense, onDelete }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const itemRef = useRef(null);

  const category =
    CATEGORIES.find((c) => c.id === expense.category) ||
    CATEGORIES[CATEGORIES.length - 1];
  const IconComponent = ICON_MAP[category.icon] || MoreHorizontal;
  const displayText = expense.note || category.label;

  const handleDelete = () => {
    setIsDeleting(true);
    setTimeout(() => {
      onDelete(expense.id);
    }, 250);
  };

  return (
    <div
      ref={itemRef}
      className={`animate-fade-in group flex items-center gap-3 rounded-lg bg-surface-card border border-surface-border px-3 py-2.5 sm:px-4 sm:py-3 hover:border-surface-muted transition-all duration-250 ${
        isDeleting ? "opacity-0 scale-95" : "opacity-100 scale-100"
      }`}
    >
      {/* Category icon with color dot */}
      <div
        className="flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-lg"
        style={{ backgroundColor: category.color + "20" }}
      >
        <IconComponent
          className="h-3.5 w-3.5 sm:h-4 sm:w-4"
          style={{ color: category.color }}
        />
      </div>

      {/* Note + Date */}
      <div className="min-w-0 flex-1">
        <p className="text-xs sm:text-sm font-medium text-white truncate">
          {displayText}
        </p>
        <p className="text-[10px] sm:text-xs text-surface-muted">
          {formatDisplayDate(expense.date)}
        </p>
      </div>

      {/* Amount */}
      <p className="text-xs sm:text-sm font-bold text-white mono shrink-0">
        {formatPHP(expense.amount)}
      </p>

      {/* Delete button — visible on hover, always tappable on touch */}
      <button
        onClick={handleDelete}
        className="shrink-0 p-1.5 rounded-md text-surface-muted opacity-0 group-hover:opacity-100 sm:opacity-0 active:opacity-100 hover:text-red-400 hover:bg-red-500/10 transition-all touch-manipulation"
      >
        <Trash2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
      </button>
    </div>
  );
};

export default ExpenseItem;
