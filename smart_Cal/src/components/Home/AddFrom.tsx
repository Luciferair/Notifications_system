import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from '@/components/ui/textarea';

import { Label } from '@/components/ui/label';
import { motion } from "framer-motion";
import React, { useState } from "react";
import { FiPlus } from "react-icons/fi";
import { useThemeStore } from "@/store/ThemeStore";
import { DatePicker } from "./DatePicker";
import TimePicker from "./TimePicker";
import { cn } from "@/lib/utils";
import { Dayjs } from "dayjs";
import { useUser } from "@clerk/clerk-react";

function AddFrom() {
    const [openDialog, setOpenDialog] = useState(false);
    const { user } = useUser();
    const [dueDate, setDueDate] = useState<Date | undefined>(undefined);
    const [dueTime, setDueTime] = useState<Dayjs | null>(null);
    const { isDark } = useThemeStore();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        email: '',
    });


    const formAnimations = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.3
            }
        },
        exit: {
            opacity: 0,
            y: -20,
            transition: {
                duration: 0.2
            }
        }
    };

    const inputAnimations = {
        focus: {
            scale: 1.02,
            transition: {
                duration: 0.2
            }
        }
    };

    const HandleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        try {
            const taskData = {
                ...formData,
                dueDate: dueDate?.toISOString().split('T')[0],
                dueTime: dueTime ? dueTime.format('HH:mm') : undefined,
            };

            const response = await fetch('http://localhost:3001/api/task', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(taskData),
            });

            if (!response.ok) {
                throw new Error('Failed to create task');
            }

            const result = await response.json();
            console.log('Task created:', result);
            setOpenDialog(false);
            
            setFormData({
                title: '',
                description: '',
                email: user?.primaryEmailAddress?.emailAddress || '',
            });
            setDueDate(undefined);
            setDueTime(null);
 
        } catch (error) {
            console.error('Error creating task:', error);
        }
    };

    return (
        <div>
            <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 5px 15px rgba(0,0,0,0.1)" }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center space-x-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white px-6 py-2.5 rounded-lg hover:from-purple-700 hover:to-purple-800 transition duration-300 shadow-md"
                onClick={() => setOpenDialog(true)}
            >
                <FiPlus className="text-lg" />
                <span className="font-medium">Add Task</span>
            </motion.button>

            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogContent
                    className={cn(
                        "shadow-2xl rounded-xl transition-all duration-300",
                        isDark ? 'bg-gray-800 text-white' : 'bg-white'
                    )}
                >
                    <DialogHeader>
                        <DialogTitle className={`${isDark ? 'text-white' : 'text-gray-900'} text-2xl font-bold`}>
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                Adding New Task
                            </motion.div>
                        </DialogTitle>
                    </DialogHeader>

                    <motion.form
                        onSubmit={HandleSubmit}
                        className="space-y-6"
                        variants={formAnimations}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        <motion.div
                            className="space-y-2"
                            whileHover={{ scale: 1.01 }}
                        >
                            <Label htmlFor="title" className={`${isDark ? 'text-gray-200' : 'text-gray-700'} font-medium`}>
                                Title
                            </Label>
                            <motion.div whileFocus="focus" variants={inputAnimations}>
                                <Input
                                    id="title"
                                    placeholder="Enter task title"
                                    className={`${isDark
                                        ? 'bg-gray-700 text-white border-gray-600 focus:border-purple-500'
                                        : 'bg-white border-gray-200 focus:border-purple-500'
                                        } w-full px-4 py-2.5 rounded-lg transition-all duration-200 focus:ring-2 focus:ring-purple-500/50`}
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    required
                                />
                            </motion.div>
                        </motion.div>

                        <motion.div
                            className="space-y-2"
                            whileHover={{ scale: 1.01 }}
                        >
                            <Label htmlFor="description" className={`${isDark ? 'text-gray-200' : 'text-gray-700'} font-medium`}>
                                Description
                            </Label>
                            <motion.div whileFocus="focus" variants={inputAnimations}>
                                <Textarea
                                    id="description"
                                    placeholder="Enter task description"
                                    className={`${isDark
                                        ? 'bg-gray-700 text-white border-gray-600 focus:border-purple-500'
                                        : 'bg-white border-gray-200 focus:border-purple-500'
                                        } w-full px-4 py-2.5 rounded-lg transition-all duration-200 focus:ring-2 focus:ring-purple-500/50 min-h-[100px]`}
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    required
                                />
                            </motion.div>
                        </motion.div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <motion.div
                                className="space-y-2"
                                whileHover={{ scale: 1.01 }}
                            >
                                <Label htmlFor="dueDate" className={`${isDark ? 'text-gray-200' : 'text-gray-700'} font-medium`}>
                                    Due Date
                                </Label>
                                <DatePicker date={dueDate} onSelect={(date) => setDueDate(date)} />
                            </motion.div>

                            <motion.div
                                className="space-y-2"
                                whileHover={{ scale: 1.01 }}
                            >
                                <Label className={cn(
                                    "font-medium",
                                    isDark ? "text-gray-200" : "text-gray-700"
                                )}>
                                    Due Time
                                </Label>
                                <TimePicker selectedTime={dueTime} setSelectedTime={setDueTime} />
                            </motion.div>
                        </div>

                        <DialogFooter className="mt-6">
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full sm:w-auto"
                            >
                                <Button
                                    type="submit"
                                    className={cn(
                                        "w-full sm:w-auto bg-gradient-to-r from-purple-600 to-purple-700",
                                        "text-white px-6 py-2.5 rounded-lg font-medium",
                                        "hover:from-purple-700 hover:to-purple-800",
                                        "transition-all duration-300 shadow-md",
                                        "disabled:opacity-50 disabled:cursor-not-allowed"
                                    )}
                                    disabled={!formData.title || !dueDate || !dueTime}
                                >
                                    Add Task
                                </Button>
                            </motion.div>
                        </DialogFooter>
                    </motion.form>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default AddFrom;
