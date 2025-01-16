import React from "react";
import { cn } from "@/lib/utils";
import { Clock } from "lucide-react";
import { TimeOption, TIME_GROUPS } from "@/lib/constants/times";

interface TimeGroup {
  label: string;
  options: TimeOption[];
}

interface TimeSelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "onChange"> {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const timeGroups: TimeGroup[] = [
  { label: "Morning (5 AM - 11:59 AM)", options: TIME_GROUPS.morning },
  { label: "Afternoon (12 PM - 4:59 PM)", options: TIME_GROUPS.afternoon },
  { label: "Evening (5 PM - 8:59 PM)", options: TIME_GROUPS.evening },
  { label: "Night (9 PM - 4:59 AM)", options: TIME_GROUPS.night },
];

export const TimeSelect = React.forwardRef<HTMLSelectElement, TimeSelectProps>(
  ({ value, onChange, className, ...props }, ref) => {
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      onChange(event.target.value);
    };

    return (
      <div className="relative">
        <select
          ref={ref}
          value={value}
          onChange={handleChange}
          className={cn(
            "appearance-none w-full pl-8 pr-8 py-1.5 text-xs rounded-md border border-input",
            "bg-background text-foreground shadow-sm",
            "focus:outline-none focus:ring-2 focus:ring-primary/20",
            "hover:border-primary/50 transition-colors duration-200",
            "cursor-pointer font-medium",
            className
          )}
          {...props}
        >
          <option value="" disabled>
            Select time
          </option>
          {timeGroups.map((group) => (
            <optgroup
              key={group.label}
              label={group.label}
              className="text-xs font-medium"
            >
              {group.options.map((option) => (
                <option
                  key={option.value}
                  value={option.value}
                  className="text-xs"
                >
                  {option.label}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
        <Clock className="absolute left-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-500 pointer-events-none" />
        <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
          <svg
            className="h-4 w-4 text-gray-500"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 9l6 6 6-6"
            />
          </svg>
        </div>
      </div>
    );
  }
);

TimeSelect.displayName = "TimeSelect";
