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
        <div className="flex-1 overflow-y-auto px-6  space-y-6">
          {/* Timezone Section */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-primary" />
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
                    <Globe className="w-4 h-4 text-primary shrink-0" />
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
                      className="rounded-md text-sm py-2.5 px-2 my-0.5 cursor-pointer data-[highlighted]:bg-primary/5 data-[highlighted]:text-primary"
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

          {/* Quick Schedule Section */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-gray-900">Quick Schedule</h3>
            <div className="relative group">
              {/* Left Scroll Button */}
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "absolute left-0 top-1/2 -translate-y-1/2 z-20 h-8 w-8 rounded-full",
                  "bg-white/90 hover:bg-white shadow-md",
                  "opacity-0 group-hover:opacity-100 transition-opacity",
                  "disabled:opacity-0 hover:text-primary"
                )}
                onClick={() => handleScroll('left')}
                disabled={scrollContainerRef.current?.scrollLeft === 0}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>

              {/* Right Scroll Button */}
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "absolute right-0 top-1/2 -translate-y-1/2 z-20 h-8 w-8 rounded-full",
                  "bg-white/90 hover:bg-white shadow-md",
                  "opacity-0 group-hover:opacity-100 transition-opacity",
                  "disabled:opacity-0 hover:text-primary"
                )}
                onClick={() => handleScroll('right')}
                disabled={
                  scrollContainerRef.current
                    ? scrollContainerRef.current.scrollLeft + scrollContainerRef.current.clientWidth >=
                      scrollContainerRef.current.scrollWidth
                    : false
                }
              >
                <ChevronRight className="h-5 w-5" />
              </Button>

              {/* Gradient Shadows */}
              <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
              
              {/* Scrollable Container */}
              <div 
                ref={scrollContainerRef}
                className="overflow-x-auto scrollbar-hide scroll-smooth"
              >
                <div className="flex gap-2 px-8 pb-2 min-w-min">
                  {getQuickOptions().map((option, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className={cn(
                        "flex-none px-4 py-2 h-auto rounded-full border-primary/20",
                        "hover:bg-primary/5 hover:text-primary hover:border-primary/30",
                        "transition-all duration-200 min-w-[100px]",
                        selectedTime && date && 
                        format(option.date, 'HH:mm') === selectedTime &&
                        format(option.date, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
                          ? "bg-primary/5 text-primary border-primary/30"
                          : "bg-white text-gray-600"
                      )}
                      onClick={() => {
                        setDate(option.date);
                        setSelectedTime(format(option.date, 'HH:mm'));
                      }}
                    >
                      <div className="flex flex-col items-center gap-0.5">
                        <span className="text-sm font-medium">{option.label}</span>
                        <span className="text-xs text-gray-500">{option.subLabel}</span>
                      </div>
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Date & Time Selection */}
          <div className="grid grid-cols-[1.5fr,1fr] gap-6">
            {/* Date Selection */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-gray-900 flex items-center gap-2">
                <CalendarIcon className="w-4 h-4 text-primary" />
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
                    cell: "h-10 w-10 text-center text-sm p-0 relative [&:has([aria-selected])]:bg-primary/5",
                    day: cn(
                      "h-10 w-10 p-0 font-normal aria-selected:opacity-100",
                      "hover:bg-primary/5 hover:text-primary transition-colors",
                      "aria-selected:bg-primary aria-selected:text-white aria-selected:rounded-full"
                    ),
                    nav_button: "h-7 w-7 bg-transparent p-0 hover:bg-primary/5 rounded-full transition-colors",
                    nav_button_previous: "absolute left-1",
                    nav_button_next: "absolute right-1",
                  }}
                />
              </div>
            </div>

            {/* Time Selection */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-gray-900 flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" />
                Select Time
              </h3>
              <div className="bg-white rounded-lg border border-gray-200 h-[350px] overflow-y-auto">
                <div className="divide-y divide-gray-100">
                  {/* Morning Times */}
                  <div>
                    <h4 className="text-xs font-medium text-gray-500 px-4 py-2 bg-gray-50">
                      Morning (5 AM - 11:59 AM)
                    </h4>
                    <div className="py-1">
                      {TIME_GROUPS.morning.map((time) => (
                        <Button
                          key={time.value}
                          variant="ghost"
                          className={cn(
                            "w-full justify-start h-9 px-4 rounded-none transition-colors",
                            selectedTime === time.value
                              ? "bg-primary/5 text-primary font-medium"
                              : "text-gray-600 hover:bg-primary/5 hover:text-primary"
                          )}
                          onClick={() => setSelectedTime(time.value)}
                        >
                          <span className="text-sm">{time.label}</span>
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Afternoon Times */}
                  <div>
                    <h4 className="text-xs font-medium text-gray-500 px-4 py-2 bg-gray-50">
                      Afternoon (12 PM - 4:59 PM)
                    </h4>
                    <div className="py-1">
                      {TIME_GROUPS.afternoon.map((time) => (
                        <Button
                          key={time.value}
                          variant="ghost"
                          className={cn(
                            "w-full justify-start h-9 px-4 rounded-none transition-colors",
                            selectedTime === time.value
                              ? "bg-primary/5 text-primary font-medium"
                              : "text-gray-600 hover:bg-primary/5 hover:text-primary"
                          )}
                          onClick={() => setSelectedTime(time.value)}
                        >
                          <span className="text-sm">{time.label}</span>
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Evening Times */}
                  <div>
                    <h4 className="text-xs font-medium text-gray-500 px-4 py-2 bg-gray-50">
                      Evening (5 PM - 8:59 PM)
                    </h4>
                    <div className="py-1">
                      {TIME_GROUPS.evening.map((time) => (
                        <Button
                          key={time.value}
                          variant="ghost"
                          className={cn(
                            "w-full justify-start h-9 px-4 rounded-none transition-colors",
                            selectedTime === time.value
                              ? "bg-primary/5 text-primary font-medium"
                              : "text-gray-600 hover:bg-primary/5 hover:text-primary"
                          )}
                          onClick={() => setSelectedTime(time.value)}
                        >
                          <span className="text-sm">{time.label}</span>
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Night Times */}
                  <div>
                    <h4 className="text-xs font-medium text-gray-500 px-4 py-2 bg-gray-50">
                      Night (9 PM - 4:59 AM)
                    </h4>
                    <div className="py-1">
                      {TIME_GROUPS.night.map((time) => (
                        <Button
                          key={time.value}
                          variant="ghost"
                          className={cn(
                            "w-full justify-start h-9 px-4 rounded-none transition-colors",
                            selectedTime === time.value
                              ? "bg-primary/5 text-primary font-medium"
                              : "text-gray-600 hover:bg-primary/5 hover:text-primary"
                          )}
                          onClick={() => setSelectedTime(time.value)}
                        >
                          <span className="text-sm">{time.label}</span>
                        </Button>
                      ))}
                    </div>
                  </div>
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
                ? "bg-primary/50 cursor-not-allowed"
                : "bg-primary hover:bg-primary/90 shadow-sm hover:shadow"
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