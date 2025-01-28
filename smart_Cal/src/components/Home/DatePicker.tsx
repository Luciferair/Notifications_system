import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { useThemeStore } from "@/store/ThemeStore";

interface DatePickerProps {
    date: Date | undefined;
    onSelect: (data: Date | undefined) => void;
}

export function DatePicker({ date, onSelect }: DatePickerProps) {
    const { isDark } = useThemeStore();

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    className={cn(
                        "w-full justify-start text-left font-normal",
                        "transition-transform duration-200 hover:scale-105",
                        isDark
                            ? "bg-gray-800 text-white border-gray-700 hover:bg-gray-700 hover:text-white"
                            : "bg-white text-gray-900 border-gray-300 hover:bg-gray-100",
                        !date && "text-gray-500"
                    )}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent
                className={cn(
                    "w-auto p-0 rounded-lg shadow-lg border",
                    isDark
                        ? "bg-gray-800 border-gray-700 text-white"
                        : "bg-white border-gray-300 text-gray-900"
                )}
                align="start"
            >
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={onSelect}
                    initialFocus
                    className={cn(
                        "rounded-lg",
                        isDark ? "bg-gray-500 text-white" : "bg-white text-gray-900"
                    )}
                />
            </PopoverContent>
        </Popover>
    );
}
