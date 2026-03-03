import { Wallet, ChevronLeft, ChevronRight } from "lucide-react";
import { format, subMonths, addMonths, parse } from "date-fns";

const Navbar = ({ activeMonth, setActiveMonth }) => {
  const parsed = parse(activeMonth, "yyyy-MM", new Date());
  const displayLabel = format(parsed, "MMMM yyyy");

  const goPrev = () => {
    const prev = subMonths(parsed, 1);
    setActiveMonth(format(prev, "yyyy-MM"));
  };

  const goNext = () => {
    const next = addMonths(parsed, 1);
    setActiveMonth(format(next, "yyyy-MM"));
  };

  return (
    <nav className="bg-gray-900 border-b border-surface-border sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        {/* App name */}
        <div className="flex items-center gap-2">
          <Wallet className="h-5 w-5 text-brand" />
          <span className="text-lg font-semibold tracking-tight text-white">
            SpendWise
          </span>
        </div>

        {/* Month selector */}
        <div className="flex items-center gap-1">
          <button
            onClick={goPrev}
            className="p-1.5 rounded-md hover:bg-surface-card transition-colors"
          >
            <ChevronLeft className="h-4 w-4 text-surface-muted" />
          </button>
          <span className="text-sm font-medium text-gray-300 min-w-[130px] text-center">
            {displayLabel}
          </span>
          <button
            onClick={goNext}
            className="p-1.5 rounded-md hover:bg-surface-card transition-colors"
          >
            <ChevronRight className="h-4 w-4 text-surface-muted" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
