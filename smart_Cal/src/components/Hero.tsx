import { motion, useScroll, useTransform } from 'framer-motion'
import { jk } from '../assets';
import { useNavigate } from "react-router-dom";
import { useThemeStore } from '../store/ThemeStore';


function Hero() {
    const { isDark } = useThemeStore(); 
    const navigate = useNavigate();
    const { scrollYProgress } = useScroll()
    const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8])

    return (
        <div className="max-w-7xl mx-auto px-4 py-12 sm:py-24">

            <motion.div
                className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                <div className="text-center lg:text-left">
                    <motion.div
                        initial={{ x: -100 }}
                        animate={{ x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-transparent bg-clip-text leading-tight">
                            Transform Your Productivity
                        </h1>
                        <p className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'} mb-8 leading-relaxed`}>
                            Experience the future of task management with AI-powered reminders and intelligent notifications.
                        </p>
                        <div className="flex gap-4">
                            <motion.button
                                className={`${isDark ? 'bg-blue-500 hover:bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'} text-white px-8 py-4 rounded-lg text-lg shadow-lg backdrop-blur-sm`}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => navigate('/dashboard')}
                            >
                                Get Started Free
                            </motion.button>
                            <motion.button
                                className={`${isDark ? 'border-blue-500 text-blue-400' : 'border-blue-600 text-blue-600'} border-2 px-8 py-4 rounded-lg text-lg hover:bg-blue-500/10`}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Watch Demo
                            </motion.button>
                        </div>
                    </motion.div>
                </div>
                <motion.div
                    className="relative"
                    style={{ scale }}
                >
                    <div className={`${isDark ? 'bg-gray-800/50' : 'bg-white/50'} rounded-2xl p-8 backdrop-blur-xl shadow-xl border border-gray-200/20`}>
                        
                        <div className="h-80 rounded-lg overflow-hidden">
                            <img
                                src={jk}
                                alt="App Preview"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </motion.div>
            </motion.div>

        </div>
    )
}

export default Hero
