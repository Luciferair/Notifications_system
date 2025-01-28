import { motion } from 'framer-motion'
import { useThemeStore } from '../../store/ThemeStore';
import { FiCheckCircle, FiClock } from 'react-icons/fi';

interface Task {
    id: string;
    user_id: string;
    title: string;
    description: string;
    status: string;
    time: string;
    due_date: string;
    created_at: string;
    updated_at: string;
}

function TaskCard({ task }: { task: Task; }) {
    const { isDark } = useThemeStore();

    const taskVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100
            }
        }
    };

    return (
        <motion.div
            key={task.id}
            variants={taskVariants}
            whileHover={{ scale: 1.02 }}
            className={`rounded-lg p-6 transition-all duration-200 ${isDark
                ? 'bg-gray-800 hover:bg-gray-750 shadow-lg shadow-purple-900/10'
                : 'bg-white hover:shadow-md'
                }`}
        >
            <div className="flex justify-between items-start mb-4">
                <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-800'
                    }`}>
                    {task.title}
                </h3>
                <span className={`px-3 py-1 rounded-full text-sm ${task.status === 'completed'
                    ? 'bg-green-100 text-green-800'
                    : isDark
                        ? 'bg-yellow-200/20 text-yellow-100'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                    {task.status}
                </span>
            </div>
            <p className={`mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                {task.description}
            </p>
            <div className={`flex items-center justify-between text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'
                }`}>
                <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                        <FiClock />
                        <span>
                            {new Date(task.due_date).toLocaleDateString()}
                        </span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <span className={`px-2 py-0.5 rounded ${isDark ? 'bg-gray-700' : 'bg-gray-100'
                            }`}>
                            {task.time}
                        </span>
                    </div>
                </div>
                {task.status === 'completed' && (
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring" }}
                    >
                        <FiCheckCircle className="text-green-500" />
                    </motion.div>
                )}
            </div>
        </motion.div>
    )
}

export default TaskCard
