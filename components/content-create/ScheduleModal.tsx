"use client";
import React, { useState, useCallback, useMemo } from 'react';
import { format, parse, setHours, setMinutes } from "date-fns";
import { Calendar as CalendarIcon, Clock, X, Globe, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ALL_TIMES, TIME_GROUPS, TimeOption } from "@/lib/constants/times";

interface ScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSchedule: (date: Date) => void;
  isScheduling?: boolean;
}

// Helper function to check if a date is before today (ignoring time)
const isBeforeToday = (date: Date) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  date.setHours(0, 0, 0, 0);
  return date < today;
};

export function ScheduleModal({ 
  isOpen, 
  onClose, 
  onSchedule,
  isScheduling = false 
}: ScheduleModalProps) {
  const [date, setDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>();
  const [timezone, setTimezone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone);

  // Generate time slots for the full day
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 15) {
        const time = format(
          setMinutes(setHours(new Date(), hour), minute),
          'h:mm a'
        );
        slots.push(time);
      }
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  const handleSchedule = useCallback(() => {
    if (!date || !selectedTime) return;

    const [hours, minutes] = selectedTime.split(':');
    const scheduledDate = new Date(date);
    scheduledDate.setHours(parseInt(hours));
    scheduledDate.setMinutes(parseInt(minutes));
    scheduledDate.setSeconds(0);
    scheduledDate.setMilliseconds(0);

    onSchedule(scheduledDate);
  }, [date, selectedTime, onSchedule]);

  // Enhanced quick options
  const getQuickOptions = () => {
    const now = new Date();
    
    return [
      {
        label: "In 1 min",
        subLabel: format(new Date(now.getTime() + 1 * 60000), 'h:mm a'),
        date: new Date(now.getTime() + 1 * 60000)
      },
      {
        label: "In 3 min",
        subLabel: format(new Date(now.getTime() + 3 * 60000), 'h:mm a'),
        date: new Date(now.getTime() + 3 * 60000)
      },
      {
        label: "In 15 min",
        subLabel: format(new Date(now.getTime() + 15 * 60000), 'h:mm a'),
        date: new Date(now.getTime() + 15 * 60000)
      },
      {
        label: "In 30 min",
        subLabel: format(new Date(now.getTime() + 30 * 60000), 'h:mm a'),
        date: new Date(now.getTime() + 30 * 60000)
      },
      {
        label: "In 1 hour",
        subLabel: format(new Date(now.getTime() + 60 * 60000), 'h:mm a'),
        date: new Date(now.getTime() + 60 * 60000)
      },
      {
        label: "Tonight",
        subLabel: "11:59 PM",
        date: (() => {
          const tonight = new Date(now);
          tonight.setHours(23, 59, 0, 0);
          return tonight;
        })()
      },
      {
        label: "Tomorrow",
        subLabel: "9:00 AM",
        date: (() => {
          const tomorrow = new Date(now);
          tomorrow.setDate(tomorrow.getDate() + 1);
          tomorrow.setHours(9, 0, 0, 0);
          return tomorrow;
        })()
      },
      {
        label: "Next Week",
        subLabel: "9:00 AM",
        date: (() => {
          const nextWeek = new Date(now);
          nextWeek.setDate(nextWeek.getDate() + 7);
          nextWeek.setHours(9, 0, 0, 0);
          return nextWeek;
        })()
      }
    ];
  };

  const quickOptions = getQuickOptions();

  const getTimezoneOptions = () => {
    // Get all timezone names
    const timezones = Intl.supportedValuesOf('timeZone');
    
    return timezones.map(timezone => ({
      value: timezone,
      label: timezone.replace(/_/g, ' ')
    }));
  };

  const timezoneOptions = useMemo(getTimezoneOptions, []);

  // Add ref for scroll container
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);
  
  // Add scroll handlers
  const handleScroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    
    const container = scrollContainerRef.current;
    const scrollAmount = 200; // Adjust this value to change scroll distance
    
    const targetScroll = direction === 'left' 
      ? container.scrollLeft - scrollAmount
      : container.scrollLeft + scrollAmount;
    
    container.scrollTo({
      left: targetScroll,
      behavior: 'smooth'
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[600px] h-[700px] p-0 flex flex-col overflow-hidden bg-white">
        {/* Fixed Header */}
        <div className="px-6 py-4 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h2 className="text-xl font-semibold text-gray-900">Schedule Post</h2>
              <p className="text-sm text-gray-500">
                Choose when your post will be published
              </p>
            </div>
            <button
              onClick={onClose}
              className="size-8 rounded-lg flex items-center justify-center hover:bg-gray-50"
            >
              <X className="size-4 text-gray-400" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-6 space-y-6 py-6">
          {/* Timezone Section */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Globe className="size-4 text-gray-400" />
              <span className="text-sm font-medium text-gray-900">Timezone</span>
            </div>
            
            <Select value={timezone} onValueChange={setTimezone}>
              <SelectTrigger className="w-full h-10 bg-white border border-gray-200 rounded-lg">
                <SelectValue placeholder="Select timezone" className="text-sm" />
              </SelectTrigger>
              <SelectContent className="max-h-[320px]">
                {timezoneOptions.map((tz) => (
                  <SelectItem
                    key={tz.value}
                    value={tz.value}
                    className="text-sm py-2.5"
                  >
                    {tz.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Quick Schedule Section */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-gray-900">Quick Schedule</h3>
            <div className="relative">
              {/* Scroll Buttons */}
              <button
                onClick={() => handleScroll('left')}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10"
              >
                <div className="size-8 rounded-lg flex items-center justify-center bg-white border border-gray-200 hover:bg-gray-50">
                  <ChevronLeft className="size-4 text-gray-400" />
                </div>
              </button>

              <div 
                ref={scrollContainerRef}
                className="overflow-x-auto scrollbar-hide scroll-smooth"
              >
                <div className="flex gap-2 px-8 pb-2 min-w-min">
                  {getQuickOptions().map((option, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setDate(option.date);
                        setSelectedTime(format(option.date, 'HH:mm'));
                      }}
                      className={cn(
                        "flex-none min-w-[100px] px-4 py-2 rounded-lg border transition-colors",
                        selectedTime && date && 
                        format(option.date, 'HH:mm') === selectedTime &&
                        format(option.date, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
                          ? "bg-primary/5 border-primary text-primary"
                          : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
                      )}
                    >
                      <div className="flex flex-col items-center gap-0.5">
                        <span className="text-sm font-medium">{option.label}</span>
                        <span className="text-xs text-gray-400">{option.subLabel}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => handleScroll('right')}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10"
              >
                <div className="size-8 rounded-lg flex items-center justify-center bg-white border border-gray-200 hover:bg-gray-50">
                  <ChevronRight className="size-4 text-gray-400" />
                </div>
              </button>
            </div>
          </div>

          {/* Date & Time Selection */}
          <div className="grid grid-cols-[1.5fr,1fr] gap-6">
            {/* Calendar Section */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <CalendarIcon className="size-4 text-gray-400" />
                <span className="text-sm font-medium text-gray-900">Select Date</span>
              </div>

              <div className="p-4 bg-white border border-gray-200 rounded-lg">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  disabled={(date) => isBeforeToday(new Date(date))}
                  className="w-full border-0 p-0"
                  classNames={{
                    months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
                    head_cell: "text-gray-500 font-normal text-[0.9rem] w-10",
                    cell: "h-10 w-10 text-center text-sm p-0 relative [&:has([aria-selected])]:bg-primary/5",
                    day: cn(
                      "h-10 w-10 p-0 font-normal aria-selected:opacity-100",
                      "hover:bg-gray-100 transition-colors",
                      "aria-selected:bg-primary aria-selected:text-white aria-selected:hover:bg-primary"
                    ),
                    nav_button: "h-7 w-7 bg-transparent p-0 hover:bg-gray-100 rounded-lg transition-colors",
                    nav_button_previous: "absolute left-1",
                    nav_button_next: "absolute right-1",
                  }}
                />
              </div>
            </div>

            {/* Time Selection */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Clock className="size-4 text-gray-400" />
                <span className="text-sm font-medium text-gray-900">Select Time</span>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg h-[350px] overflow-y-auto">
                <div className="divide-y divide-gray-100">
                  {Object.entries(TIME_GROUPS).map(([period, times]) => (
                    <div key={period}>
                      <h4 className="text-xs font-medium text-gray-500 px-4 py-2 bg-gray-50">
                        {period.charAt(0).toUpperCase() + period.slice(1)} Times
                      </h4>
                      <div className="py-1">
                        {times.map((time) => (
                          <button
                            key={time.value}
                            onClick={() => setSelectedTime(time.value)}
                            className={cn(
                              "w-full text-left px-4 py-2 text-sm transition-colors",
                              selectedTime === time.value
                                ? "bg-primary/5 text-primary font-medium"
                                : "text-gray-600 hover:bg-gray-50"
                            )}
                          >
                            {time.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Fixed Footer */}
        <div className="px-6 py-4 border-t border-gray-100 bg-white">
          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              disabled={isScheduling}
              className="px-6 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 border border-gray-200"
            >
              Cancel
            </button>

            <button
              onClick={handleSchedule}
              disabled={!date || !selectedTime || isScheduling}
              className={cn(
                "px-6 py-2 rounded-lg text-sm font-medium text-white transition-colors",
                !date || !selectedTime || isScheduling
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-primary hover:bg-primary/90"
              )}
            >
              {isScheduling ? (
                <div className="flex items-center gap-2">
                  <div className="size-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  <span>Scheduling...</span>
                </div>
              ) : (
                "Schedule Post"
              )}
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 