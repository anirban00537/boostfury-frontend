import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Plus, Trash2, Info, GripVertical } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import {
  ALL_TIMES,
  TIME_GROUPS,
  POPULAR_TIMES,
  TimeOption,
} from "@/lib/constants/times";
import { TimeSelect } from "@/components/ui/time-select";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { getTimeSlots, updateTimeSlots } from "@/services/content-posting";
import toast from "react-hot-toast";
import { RootState } from "@/state/store";
import { useSelector } from "react-redux";
import { DAYS_OF_WEEK } from "@/lib/core-constants";

interface TimeSlot {
  id: string;
  time: string;
}

interface SlotInfo {
  dayOfWeek: number;
  isActive: boolean;
}

interface TimeSlotGroup {
  time: string;
  slots: SlotInfo[];
}

interface TimeSlotResponse {
  success: boolean;
  message: string;
  data: {
    timeSlots: TimeSlotGroup[];
  };
}

interface QueueModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "add" | "edit";
  post?: any;
  onSave: (data: any) => void;
}

export interface UpdateTimeSlotsRequest {
  timeSlots: TimeSlotGroup[];
}

export const QueueModal = ({
  isOpen,
  onClose,
  mode,
  post,
  onSave,
}: QueueModalProps) => {
  const queryClient = useQueryClient();
  const { linkedinProfile } = useSelector((state: RootState) => state.user);
  const [selectedSlots, setSelectedSlots] = React.useState<{
    [key: string]: boolean;
  }>({});
  const [timeSlots, setTimeSlots] = React.useState<TimeSlot[]>([
    { id: "1", time: "09:00" },
  ]);
  const [isDragging, setIsDragging] = React.useState(false);
  const [showHelp, setShowHelp] = React.useState(true);

  const weekDays = Object.entries(DAYS_OF_WEEK)
    .sort((a, b) => a[1] - b[1])
    .map(([key]) => key.slice(0, 3));

  // Fetch existing time slots
  const { data: timeSlotsData, isLoading } = useQuery<TimeSlotResponse>(
    ["timeSlots", linkedinProfile?.id],
    () => getTimeSlots(linkedinProfile?.id || ""),
    {
      enabled: !!linkedinProfile?.id,
      onSuccess: (response) => {
        // Ensure data exists
        if (!response?.data?.timeSlots) {
          return;
        }

        // Convert API data to component state format
        const convertedSlots: { [key: string]: boolean } = {};
        const uniqueTimes: TimeSlot[] = [];

        response.data.timeSlots.forEach((group, index) => {
          const timeSlotId = (index + 1).toString();
          uniqueTimes.push({ id: timeSlotId, time: group.time });

          group.slots.forEach((slot) => {
            const day = weekDays[slot.dayOfWeek];
            convertedSlots[`${day}-${timeSlotId}`] = slot.isActive;
          });
        });

        setSelectedSlots(convertedSlots);
        setTimeSlots(uniqueTimes);
      },
    }
  );

  // Update time slots mutation
  const { mutate: updateTimeSlotsMutation } = useMutation(
    (data: UpdateTimeSlotsRequest) =>
      updateTimeSlots(linkedinProfile?.id || "", data),
    {
      onSuccess: () => {
        toast.success("Schedule updated successfully");
        queryClient.invalidateQueries(["timeSlots", linkedinProfile?.id]);
        onClose();
      },
      onError: () => {
        toast.error("Failed to update schedule");
      },
    }
  );

  const addNewTimeSlot = () => {
    const newId = (timeSlots.length + 1).toString();
    setTimeSlots([...timeSlots, { id: newId, time: "12:00" }]);
  };

  const removeTimeSlot = (slotId: string) => {
    setTimeSlots(timeSlots.filter((slot) => slot.id !== slotId));
    // Clean up selected slots
    const newSelectedSlots = { ...selectedSlots };
    Object.keys(newSelectedSlots).forEach((key) => {
      if (key.includes(`-${slotId}`)) {
        delete newSelectedSlots[key];
      }
    });
    setSelectedSlots(newSelectedSlots);
  };

  const toggleTimeSlot = (day: string, slotId: string) => {
    const key = `${day}-${slotId}`;
    setSelectedSlots((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleTimeChange = (slotId: string, newTime: string) => {
    setTimeSlots((prev) =>
      prev.map((slot) =>
        slot.id === slotId ? { ...slot, time: newTime } : slot
      )
    );
  };

  const handleSave = () => {
    if (!linkedinProfile?.id) {
      toast.error("No LinkedIn profile selected");
      return;
    }

    const formattedTimeSlots: TimeSlotGroup[] = timeSlots
      .map((timeSlot) => ({
        time: timeSlot.time,
        slots: weekDays
          .map((day, index) => ({
            dayOfWeek: index,
            isActive: !!selectedSlots[`${day}-${timeSlot.id}`],
          }))
          .filter((slot) => slot.isActive),
      }))
      .filter((group) => group.slots.length > 0);

    updateTimeSlotsMutation({ timeSlots: formattedTimeSlots });
  };

  // Calculate total selected slots
  const totalSelectedSlots =
    Object.values(selectedSlots).filter(Boolean).length;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] flex flex-col">
        <DialogHeader className="space-y-2">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-base font-medium">
              Edit your post schedule
            </DialogTitle>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSelectedSlots({});
                  setTimeSlots([{ id: "1", time: "09:00" }]);
                }}
                className="text-xs gap-1 h-7 px-2 text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <Trash2 className="h-3 w-3" />
                Clear All
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={addNewTimeSlot}
                className="text-xs gap-1 h-7 px-2 border-dashed hover:border-primary hover:text-white"
              >
                <Plus className="h-3 w-3" />
                Add Time Slot
              </Button>
            </div>
          </div>

          {/* Help Text */}
          <AnimatePresence>
            {showHelp && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-blue-50 rounded-lg p-3 text-xs text-blue-700 flex items-start gap-2"
              >
                <Info className="h-4 w-4 flex-shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p>
                    Select your preferred posting time and click on days to
                    schedule posts.
                  </p>
                  <p>
                    Click "Add Time Slot" to schedule posts for different times
                    of the day.
                  </p>
                  <button
                    onClick={() => setShowHelp(false)}
                    className="text-blue-600 hover:underline"
                  >
                    Got it
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </DialogHeader>

        <div className="flex-1 flex flex-col min-h-0">
          {/* Fixed Header */}
          <div className="grid grid-cols-[140px,repeat(7,1fr)] gap-1 pb-2 sticky top-0 bg-white z-10">
            <div className="text-xs font-medium text-gray-600 flex items-center gap-1">
              Time Slots
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="h-3 w-3 text-gray-400" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Choose your posting time and select days</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            {weekDays.map((day) => (
              <motion.div
                key={day}
                whileHover={{ scale: 1.05 }}
                className="text-xs font-medium text-center text-gray-600"
              >
                {day}
              </motion.div>
            ))}
          </div>

          {/* Scrollable Content */}
          <div className="overflow-y-auto min-h-0 flex-1 pr-1 -mr-1">
            <div className="space-y-2">
              {timeSlots.map((slot, index) => (
                <motion.div
                  key={slot.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="grid grid-cols-[140px,repeat(7,1fr)] gap-1 items-center group hover:bg-gray-50 p-1 rounded-lg transition-colors relative"
                >
                  <div className="pr-2 flex items-center gap-2">
                    <TimeSelect
                      value={slot.time}
                      onChange={(newTime) => handleTimeChange(slot.id, newTime)}
                      className="w-[120px] h-8"
                    />
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => removeTimeSlot(slot.id)}
                      className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity rounded-md hover:bg-red-50 flex items-center justify-center"
                    >
                      <Trash2 className="h-3.5 w-3.5 text-red-500" />
                    </motion.button>
                  </div>
                  {weekDays.map((day) => {
                    const key = `${day}-${slot.id}`;
                    const isSelected = selectedSlots[key];

                    return (
                      <motion.button
                        key={key}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => toggleTimeSlot(day, slot.id)}
                        className={cn(
                          "aspect-square rounded-md transition-all duration-200",
                          "hover:ring-2 hover:ring-primary/20 focus:outline-none",
                          isSelected
                            ? "bg-primary shadow-lg"
                            : "bg-gray-100 hover:bg-gray-200"
                        )}
                      />
                    );
                  })}
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Fixed Footer */}
        <div className="flex justify-between items-center gap-2 mt-4 pt-4 border-t">
          <p className="text-xs text-gray-500">
            {totalSelectedSlots} time slots selected
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onClose}
              className="text-xs"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              size="sm"
              disabled={totalSelectedSlots === 0}
              className="text-xs bg-primary hover:bg-primary/90 disabled:opacity-50"
            >
              Save Schedule
            </Button>
          </div>
        </div>

        {isLoading && (
          <div className="flex items-center justify-center py-6">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
