"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Info } from "lucide-react";
import { ALL_TIMES } from "@/lib/constants/times";

interface ScheduleEditorModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const DAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

export function ScheduleEditorModal({
  open,
  onOpenChange,
}: ScheduleEditorModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg p-4">
        <DialogHeader className="mb-2">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-sm">Edit post schedule</DialogTitle>
            <Button
              variant="outline"
              size="sm"
              className="text-[10px] h-6 px-2"
            >
              + Add Time Slot
            </Button>
          </div>
        </DialogHeader>

        <div className="bg-blue-50 p-2 rounded mb-3">
          <div className="flex gap-1.5">
            <Info className="w-3 h-3 text-blue-600 mt-0.5 flex-shrink-0" />
            <div className="text-[10px] text-blue-900 space-y-0.5">
              <p>Select posting time and click days to schedule.</p>
              <Button
                variant="link"
                className="text-blue-600 p-0 h-5 text-[10px]"
              >
                Got it
              </Button>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="text-[10px] font-medium">Time Slots</div>

          <div className="grid grid-cols-8 gap-2">
            <div className="col-span-1">
              <Select defaultValue="12:00">
                <SelectTrigger className="h-6 text-[10px] px-2">
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  {ALL_TIMES.map((time) => (
                    <SelectItem
                      key={time.value}
                      value={time.value}
                      className="text-[10px] h-6"
                    >
                      {time.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="col-span-7 grid grid-cols-7 gap-1">
              {DAYS.map((day) => (
                <Button
                  key={day}
                  variant="outline"
                  className="aspect-square p-0 h-6 text-[10px] hover:bg-blue-50 hover:border-blue-600 data-[selected=true]:bg-blue-600 data-[selected=true]:text-white"
                  data-selected={day === "TUE"}
                >
                  {day}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-8 gap-2">
            <div className="col-span-1">
              <Select defaultValue="16:00">
                <SelectTrigger className="h-6 text-[10px] px-2">
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  {ALL_TIMES.map((time) => (
                    <SelectItem
                      key={time.value}
                      value={time.value}
                      className="text-[10px] h-6"
                    >
                      {time.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="col-span-7 grid grid-cols-7 gap-1">
              {DAYS.map((day) => (
                <Button
                  key={day}
                  variant="outline"
                  className="aspect-square p-0 h-6 text-[10px] hover:bg-blue-50 hover:border-blue-600 data-[selected=true]:bg-blue-600 data-[selected=true]:text-white"
                  data-selected={day === "THU"}
                >
                  {day}
                </Button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center mt-3 pt-3 border-t">
          <div className="text-[10px] text-gray-500">2 time slots selected</div>
          <div className="flex gap-1.5">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              size="sm"
              className="text-[10px] h-6 px-2"
            >
              Cancel
            </Button>
            <Button size="sm" className="text-[10px] h-6 px-2">
              Save Schedule
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
