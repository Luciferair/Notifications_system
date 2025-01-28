import { useState } from "react";
import Navbar from "../components/Navbar";
import { demoTasks } from "../demo";
import { FiSearch, FiPlus } from "react-icons/fi";
import { useThemeStore } from "../store/ThemeStore";
import { motion } from "framer-motion";
import TaskCard from "../components/Home/TaskCard";

function Dashboard() {
    const { isDark } = useThemeStore();
    const [searchTerm, setSearchTerm] = useState("");
    const filteredTasks = demoTasks.filter(task =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
        <div className={`min-h-screen transition-colors duration-300 ${
            isDark ? 'bg-gray-900' : 'bg-gray-50'
        }`}>
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4"
                >
                    <h1 className={`text-3xl font-bold ${
                        isDark ? 'text-white' : 'text-gray-900'
                    }`}>
                        Tasks Overview
                    </h1>
                    <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 w-full md:w-auto">
                        <div className="relative">
                            <FiSearch className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                                isDark ? 'text-gray-400' : 'text-gray-500'
                            }`} />
                            <input
                                type="text"
                                placeholder="Search tasks..."
                                className={`w-full sm:w-auto pl-10 pr-4 py-2 rounded-lg border ${
                                    isDark 
                                        ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400' 
                                        : 'bg-white border-gray-200 text-gray-900'
                                } focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors duration-200`}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <motion.button 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center justify-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition duration-200"
                        >
                            <FiPlus />
                            <span>Add Task</span>
                        </motion.button>
                    </div>
                </motion.div>

                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {filteredTasks.map((task) => (
                        <TaskCard task={task} key={task.id}/>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}

export default Dashboard;
