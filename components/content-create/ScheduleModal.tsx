"use client";
import React, { useState, useCallback, useMemo } from 'react';
import { format, parse, setHours, setMinutes } from "date-fns";
import { Calendar as CalendarIcon, Clock, X, Globe } from "lucide-react";
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

    // Parse the selected time and combine with selected date
    const timeParts = selectedTime.match(/(\d+):(\d+) (AM|PM)/);
    if (!timeParts) return;

    const [_, hours, minutes, meridiem] = timeParts;
    let hour = parseInt(hours);
    
    // Convert to 24-hour format
    if (meridiem === 'PM' && hour !== 12) hour += 12;
    if (meridiem === 'AM' && hour === 12) hour = 0;

    const scheduledDate = new Date(date);
    scheduledDate.setHours(hour);
    scheduledDate.setMinutes(parseInt(minutes));
    scheduledDate.setSeconds(0);
    scheduledDate.setMilliseconds(0);

    onSchedule(scheduledDate);
  }, [date, selectedTime, onSchedule]);

  // Quick options for scheduling
  const getQuickOptions = () => {
    const now = new Date();
    const inOneMin = new Date(now.getTime() + 1 * 60000);
    const inThreeMin = new Date(now.getTime() + 3 * 60000);
    const tonight = new Date(now);
    tonight.setHours(23, 59, 0, 0);

    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(9, 0, 0, 0);

    return [
      {
        label: `In 1 min (${format(inOneMin, 'h:mm a')})`,
        date: inOneMin
      },
      {
        label: `In 3 min (${format(inThreeMin, 'h:mm a')})`,
        date: inThreeMin
      },
      {
        label: `Tonight (${format(tonight, 'h:mm a')})`,
        date: tonight
      },
      {
        label: `Tomorrow (${format(tomorrow, 'h:mm a')})`,
        date: tomorrow
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[600px] h-[700px] p-0 flex flex-col overflow-hidden">
        {/* Fixed Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between shrink-0">
          <div className="space-y-1">
            <h2 className="text-xl font-semibold text-gray-900">Schedule Post</h2>
            <p className="text-sm text-gray-500">Choose when your post will be published</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full hover:bg-gray-100"
            onClick={onClose}
          >
            <X className="h-4 w-4 text-gray-500" />
          </Button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Timezone Section */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-gray-900">Timezone</span>
            </div>
            
            <Select
              value={timezone}
              onValueChange={setTimezone}
            >
              <SelectTrigger className="w-full h-11 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors">
                <SelectValue placeholder="Select timezone" className="text-sm" />
              </SelectTrigger>
              <SelectContent 
                className="max-h-[320px] w-[320px]" 
                align="start"
                position="popper"
              >
                <div className="sticky top-0 bg-white px-2 py-1.5 mb-1 z-10 border-b border-gray-100">
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-blue-600 shrink-0" />
                    <span className="text-xs font-medium text-gray-500">
                      Current timezone
                    </span>
                  </div>
                </div>
                
                <div className="overflow-y-auto max-h-[280px] px-1">
                  {timezoneOptions.map((tz) => (
                    <SelectItem
                      key={tz.value}
                      value={tz.value}
                      className="rounded-md text-sm py-2.5 px-2 my-0.5 cursor-pointer data-[highlighted]:bg-blue-50 data-[highlighted]:text-blue-600"
                    >
                      <div className="flex items-center gap-2">
                        <Globe className="w-3.5 h-3.5 text-gray-400" />
                        <span className="truncate">{tz.label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </div>
              </SelectContent>
            </Select>
          </div>

          {/* Quick Options */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-gray-900">Quick Schedule</h3>
            <div className="grid grid-cols-2 gap-3">
              {quickOptions.map((option, index) => (
                <Button
                  key={index}
                  variant={index < 2 ? "outline" : "default"}
                  className={cn(
                    "h-10 px-4 rounded-full transition-all duration-200",
                    index < 2
                      ? "bg-white hover:bg-blue-50 border-blue-200 text-blue-600 hover:text-blue-700" 
                      : "bg-blue-600 hover:bg-blue-700 text-white shadow-sm hover:shadow"
                  )}
                  onClick={() => {
                    setDate(option.date);
                    setSelectedTime(format(option.date, 'h:mm a'));
                  }}
                >
                  {option.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Date & Time Selection */}
          <div className="grid grid-cols-[1.5fr,1fr] gap-6">
            {/* Date Selection */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-gray-900 flex items-center gap-2">
                <CalendarIcon className="w-4 h-4 text-blue-600" />
                Select Date
              </h3>
              <div className="p-4 bg-white rounded-lg border border-gray-200">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  disabled={(date) => isBeforeToday(new Date(date))}
                  className="w-full border-0 p-0"
                  classNames={{
                    months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
                    head_cell: "text-gray-500 font-normal text-[0.9rem] w-10",
                    cell: "h-10 w-10 text-center text-sm p-0 relative [&:has([aria-selected])]:bg-blue-50",
                    day: cn(
                      "h-10 w-10 p-0 font-normal aria-selected:opacity-100",
                      "hover:bg-blue-50 hover:text-blue-600 transition-colors",
                      "aria-selected:bg-blue-600 aria-selected:text-white aria-selected:rounded-full"
                    ),
                    nav_button: "h-7 w-7 bg-transparent p-0 hover:bg-blue-50 rounded-full transition-colors",
                    nav_button_previous: "absolute left-1",
                    nav_button_next: "absolute right-1",
                  }}
                />
              </div>
            </div>

            {/* Time Selection */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-gray-900 flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-600" />
                Select Time
              </h3>
              <div className="p-4 bg-white rounded-lg border border-gray-200 h-[350px] overflow-y-auto">
                <div className="space-y-1">
                  {timeSlots.map((time) => (
                    <Button
                      key={time}
                      variant="ghost"
                      className={cn(
                        "w-full justify-start h-9 px-3 rounded-md transition-colors",
                        selectedTime === time 
                          ? "bg-blue-50 text-blue-600 font-medium"
                          : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                      )}
                      onClick={() => setSelectedTime(time)}
                    >
                      <span className="text-sm">{time}</span>
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Fixed Footer */}
        <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-3 shrink-0 bg-white">
          <Button
            variant="ghost"
            className="h-10 px-6 hover:bg-gray-100 hover:text-gray-900"
            onClick={onClose}
            disabled={isScheduling}
          >
            Cancel
          </Button>
          <Button
            className={cn(
              "h-10 px-6 rounded-full transition-all duration-200",
              !date || !selectedTime || isScheduling
                ? "bg-blue-600/50 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 shadow-sm hover:shadow"
            )}
            disabled={!date || !selectedTime || isScheduling}
            onClick={handleSchedule}
          >
            {isScheduling ? (
              <>
                <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2"/>
                <span className="text-white">Scheduling...</span>
              </>
            ) : (
              <span className="text-white">Schedule Post</span>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
} 