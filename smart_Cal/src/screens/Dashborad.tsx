import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { FiSearch } from "react-icons/fi";
import { useThemeStore } from "../store/ThemeStore";
import { motion } from "framer-motion";
import TaskCard from "../components/Home/TaskCard";
import AddFrom from "@/components/Home/AddFrom";
import { useUser } from "@clerk/clerk-react";

function Dashboard() {
    const { isDark } = useThemeStore();
    const { user } = useUser();
    const [searchTerm, setSearchTerm] = useState("");
    const [tasks, setTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTasks = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await fetch(`http://localhost:3000/api/task?email=${user?.emailAddresses[0].emailAddress}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch tasks');
                }
                const data = await response.json();
                setTasks(data.tasks);
            } catch (error:any) {
                console.error('Error fetching tasks:', error);
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        if (user?.emailAddresses[0].emailAddress) {
            fetchTasks();
        }
    }, [user]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    return (
        <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-gray-900' : 'bg-gray-50'
            }`}>
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4"
                >
                    <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'
                        }`}>
                        Tasks Overview
                    </h1>
                    <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 w-full md:w-auto">
                        <div className="relative">
                            <FiSearch className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${isDark ? 'text-gray-400' : 'text-gray-500'
                                }`} />
                            <input
                                type="text"
                                placeholder="Search tasks..."
                                className={`w-full sm:w-auto pl-10 pr-4 py-2 rounded-lg border ${isDark
                                        ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400'
                                        : 'bg-white border-gray-200 text-gray-900'
                                    } focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors duration-200`}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        <AddFrom />
                    </div>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {isLoading ? (
                        <div className={`col-span-full text-center ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            Loading tasks...
                        </div>
                    ) : error ? (
                        <div className="col-span-full text-center text-red-500">
                            Error: {error}
                        </div>
                    ) : tasks.length === 0 ? (
                        <div className={`col-span-full text-center ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            No tasks found. {searchTerm ? 'Try a different search term.' : 'Please add some tasks to get started.'}
                        </div>
                    ) : (
                        tasks.map((task) => (
                            <TaskCard task={task} key={task} />
                        ))
                    )}
                </motion.div>
            </div>
        </div>
    );
}

export default Dashboard;
