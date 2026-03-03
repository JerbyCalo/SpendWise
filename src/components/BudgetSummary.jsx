import { useState } from "react";
import { TrendingUp, TrendingDown, Settings } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatPHP } from "../utils/formatCurrency";
import BudgetSetterModal from "./BudgetSetterModal";

const BudgetSummary = ({ totalSpent, budget, remaining, onSetBudget }) => {
  const [isBudgetModalOpen, setIsBudgetModalOpen] = useState(false);

  const percentage =
    budget.monthly > 0
      ? Math.min(Math.round((totalSpent / budget.monthly) * 100), 100)
      : 0;

  const isOver = remaining < 0;

  return (
    <>
      <Card className="bg-surface-card border-surface-border">
        <CardContent className="p-4 sm:p-6 space-y-4">
          {/* Top row: Total Spent + Over Budget badge */}
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs sm:text-sm text-surface-muted">
                Total Spent
              </p>
              <p className="text-2xl sm:text-3xl font-bold text-white mono">
                {formatPHP(totalSpent)}
              </p>
            </div>
            {isOver && (
              <Badge className="bg-red-500/15 text-red-400 border-red-500/30 hover:bg-red-500/20">
                Over Budget!
              </Badge>
            )}
          </div>

          {/* Progress bar */}
          <div className="space-y-1.5">
            <Progress
              value={percentage}
              className="h-2.5 bg-surface-border"
              indicatorClassName={isOver ? "bg-red-500" : "bg-brand"}
            />
            <div className="flex justify-between text-xs text-surface-muted">
              <span>{percentage}% used</span>
              <span className="mono">{formatPHP(budget.monthly)}</span>
            </div>
          </div>

          {/* Budget + Remaining row */}
          <div className="grid grid-cols-2 gap-2 sm:gap-4">
            <div className="rounded-lg bg-surface p-2.5 sm:p-3 border border-surface-border">
              <p className="text-[10px] sm:text-xs text-surface-muted mb-1">
                Monthly Budget
              </p>
              <p className="text-base sm:text-lg font-semibold text-white mono">
                {formatPHP(budget.monthly)}
              </p>
            </div>
            <div className="rounded-lg bg-surface p-2.5 sm:p-3 border border-surface-border">
              <div className="flex items-center gap-1 mb-1">
                <p className="text-[10px] sm:text-xs text-surface-muted">
                  Remaining
                </p>
                {isOver ? (
                  <TrendingDown className="h-3 w-3 text-red-400" />
                ) : (
                  <TrendingUp className="h-3 w-3 text-brand" />
                )}
              </div>
              <p
                className={`text-base sm:text-lg font-semibold mono ${
                  isOver ? "text-red-400" : "text-brand-light"
                }`}
              >
                {formatPHP(remaining)}
              </p>
            </div>
          </div>

          {/* Set Budget button */}
          <Button
            variant="ghost"
            onClick={() => setIsBudgetModalOpen(true)}
            className="w-full text-surface-muted hover:text-white hover:bg-surface border border-surface-border"
          >
            <Settings className="h-4 w-4 mr-2" />
            Set Budget
          </Button>
        </CardContent>
      </Card>

      <BudgetSetterModal
        currentBudget={budget.monthly}
        onSave={onSetBudget}
        isOpen={isBudgetModalOpen}
        onClose={() => setIsBudgetModalOpen(false)}
      />
    </>
  );
};

export default BudgetSummary;
