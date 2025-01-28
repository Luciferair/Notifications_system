import { useState } from "react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { useThemeStore } from "@/store/ThemeStore";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimeClock } from '@mui/x-date-pickers/TimeClock';
import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Dayjs } from "dayjs";

interface TimePickerProps {
    selectedTime: Dayjs | null;
    setSelectedTime: (data: Dayjs | null) => void;
}

function TimePicker({ selectedTime, setSelectedTime }: TimePickerProps) {
    const { isDark } = useThemeStore();
    const [isOpen, setIsOpen] = useState(false);

    const handleTimeChange = (newValue: Dayjs | null) => {
        setSelectedTime(newValue);
    };

    return (
        <Popover open={isOpen} onOpenChange={() => setIsOpen(true)}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    className={cn(
                        "w-full justify-start text-left font-normal",
                        "transition-transform duration-200 hover:scale-105",
                        isDark
                            ? "bg-gray-800 text-white border-gray-700 hover:bg-gray-700 hover:text-white"
                            : "bg-white text-gray-900 border-gray-300 hover:bg-gray-100",
                        !selectedTime && "text-gray-500"
                    )}
                >
                    <motion.div
                        initial={{ rotate: 0 }}
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Clock className="mr-2 h-4 w-4" />
                    </motion.div>
                    {selectedTime ? selectedTime.format('HH:mm') : <span>Pick a Time</span>}
                </Button>
            </PopoverTrigger>

            <PopoverContent
                className={cn(
                    "p-0 rounded-lg shadow-xl border w-fit",
                    isDark
                        ? "bg-gray-800 border-gray-700"
                        : "bg-white border-gray-200"
                )}
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2 }}
                >
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <div className={cn(
                            "p-4 rounded-lg",
                            isDark
                                ? "bg-gray-800 text-white"
                                : "bg-white text-gray-900"
                        )}>
                            <TimeClock
                                ampm={false}
                                value={selectedTime}
                                onChange={handleTimeChange}
                                views={['hours', 'minutes']}
                                className={isDark ? "time-picker-dark" : ""}
                                sx={{
                                    '& .MuiClock-clock': {
                                        backgroundColor: isDark ? '#374151' : '#fff',
                                    },
                                    '& .MuiClockPointer-root': {
                                        backgroundColor: '#9333ea',
                                    },
                                    '& .MuiClockPointer-thumb': {
                                        backgroundColor: '#9333ea',
                                        borderColor: '#9333ea',
                                    },
                                    '& .MuiClock-pin': {
                                        backgroundColor: '#9333ea',
                                    },
                                    '& .MuiPickersLayout-root': {
                                        backgroundColor: isDark ? '#374151' : '#fff',
                                    },
                                    '& .MuiTimeClock-root': {
                                        color: isDark ? '#fff' : '#000',
                                    },
                                    '& .MuiClock-text': {
                                        color: isDark ? '#D1D5DB' : '#4B5563',
                                    },
                                }}
                            />
                            <div className="flex justify-between items-center mt-4">
                                <motion.p
                                    className={cn(
                                        "font-medium",
                                        isDark ? "text-gray-200" : "text-gray-700" // Ensuring proper text color for both themes
                                    )}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                >
                                    {selectedTime
                                        ? `Selected: ${selectedTime.format('HH:mm')}`
                                        : 'No time selected'}
                                </motion.p>
                                <Button
                                    onClick={() => setIsOpen(false)}
                                    className={cn(
                                        "px-4 py-1 rounded-md text-sm",
                                        isDark
                                            ? "bg-purple-600 hover:bg-purple-700 text-white"
                                            : "bg-purple-600 hover:bg-purple-700 text-white"
                                    )}
                                >
                                    Done
                                </Button>
                            </div>
                        </div>
                    </LocalizationProvider>
                </motion.div>
            </PopoverContent>
        </Popover>
    );
}

export default TimePicker;
