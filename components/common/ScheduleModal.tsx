import React, { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Calendar, Clock, Loader2 } from "lucide-react";
import { format } from "date-fns";

interface ScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSchedule: (date: Date) => Promise<void>;
  isScheduling: boolean;
}

export const ScheduleModal: React.FC<ScheduleModalProps> = ({
  isOpen,
  onClose,
  onSchedule,
  isScheduling,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>("12:00");

  const handleSchedule = async () => {
    const [hours, minutes] = selectedTime.split(":").map(Number);
    const scheduleDate = new Date(selectedDate);
    scheduleDate.setHours(hours, minutes);
    await onSchedule(scheduleDate);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <div className="p-6">
          <div className="flex flex-col items-center justify-center text-center">
            <div
              className={cn(
                "size-16 rounded-2xl bg-blue-50 flex items-center justify-center mb-4",
                "border-2 border-dashed border-blue-200"
              )}
            >
              <Calendar className="size-8 text-blue-500" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Schedule Post
            </h3>
            <p className="text-sm text-gray-500 mb-6">
              Choose when you want your post to be published
            </p>

            <div className="w-full space-y-4">
              {/* Date Picker */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-700">
                  Date
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={format(selectedDate, "yyyy-MM-dd")}
                    onChange={(e) => setSelectedDate(new Date(e.target.value))}
                    className={cn(
                      "w-full px-4 py-2.5 rounded-xl",
                      "border border-gray-200",
                      "focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500",
                      "transition-all duration-200"
                    )}
                  />
                  <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                </div>
              </div>

              {/* Time Picker */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-700">
                  Time
                </label>
                <div className="relative">
                  <input
                    type="time"
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className={cn(
                      "w-full px-4 py-2.5 rounded-xl",
                      "border border-gray-200",
                      "focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500",
                      "transition-all duration-200"
                    )}
                  />
                  <Clock className="absolute right-4 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                </div>
              </div>

              {/* Schedule Button */}
              <button
                onClick={handleSchedule}
                disabled={isScheduling}
                className={cn(
                  "w-full bg-gradient-to-r from-blue-500 to-blue-600",
                  "text-white font-medium rounded-xl",
                  "px-4 py-2.5 text-center",
                  "hover:from-blue-600 hover:to-blue-700",
                  "transition-all duration-200",
                  "disabled:opacity-50 disabled:cursor-not-allowed",
                  "mt-4"
                )}
              >
                <div className="flex items-center justify-center gap-2">
                  {isScheduling ? (
                    <>
                      <Loader2 className="size-4 animate-spin" />
                      <span>Scheduling...</span>
                    </>
                  ) : (
                    <>
                      <Calendar className="size-4" />
                      <span>Schedule Post</span>
                    </>
                  )}
                </div>
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
