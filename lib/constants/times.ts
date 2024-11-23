export interface TimeOption {
  value: string; // 24-hour format: "HH:mm"
  label: string; // 12-hour format with AM/PM
}

// Common business hours (9 AM to 6 PM)
export const BUSINESS_HOURS: TimeOption[] = [
  { value: "09:00", label: "9:00 AM" },
  { value: "09:30", label: "9:30 AM" },
  { value: "10:00", label: "10:00 AM" },
  { value: "10:30", label: "10:30 AM" },
  { value: "11:00", label: "11:00 AM" },
  { value: "11:30", label: "11:30 AM" },
  { value: "12:00", label: "12:00 PM" },
  { value: "12:30", label: "12:30 PM" },
  { value: "13:00", label: "1:00 PM" },
  { value: "13:30", label: "1:30 PM" },
  { value: "14:00", label: "2:00 PM" },
  { value: "14:30", label: "2:30 PM" },
  { value: "15:00", label: "3:00 PM" },
  { value: "15:30", label: "3:30 PM" },
  { value: "16:00", label: "4:00 PM" },
  { value: "16:30", label: "4:30 PM" },
  { value: "17:00", label: "5:00 PM" },
  { value: "17:30", label: "5:30 PM" },
  { value: "18:00", label: "6:00 PM" },
];

// All times (24 hours, 15-minute intervals)
export const ALL_TIMES: TimeOption[] = (() => {
  const times: TimeOption[] = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let minute of ["00", "15", "30", "45"]) {
      const value = `${hour.toString().padStart(2, "0")}:${minute}`;
      const date = new Date(`2000-01-01T${value}`);
      const label = date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
      times.push({ value, label });
    }
  }
  return times;
})();

// Popular posting times for social media
export const POPULAR_TIMES: TimeOption[] = [
  { value: "07:00", label: "7:00 AM" },
  { value: "09:00", label: "9:00 AM" },
  { value: "12:00", label: "12:00 PM" },
  { value: "15:00", label: "3:00 PM" },
  { value: "17:00", label: "5:00 PM" },
  { value: "19:00", label: "7:00 PM" },
  { value: "21:00", label: "9:00 PM" },
];

// Time groups for better organization in select
export const TIME_GROUPS = {
  morning: ALL_TIMES.filter((t) => {
    const hour = parseInt(t.value.split(":")[0]);
    return hour >= 5 && hour < 12;
  }),
  afternoon: ALL_TIMES.filter((t) => {
    const hour = parseInt(t.value.split(":")[0]);
    return hour >= 12 && hour < 17;
  }),
  evening: ALL_TIMES.filter((t) => {
    const hour = parseInt(t.value.split(":")[0]);
    return hour >= 17 && hour < 21;
  }),
  night: ALL_TIMES.filter((t) => {
    const hour = parseInt(t.value.split(":")[0]);
    return hour >= 21 || hour < 5;
  }),
};
