import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useUser, UserButton } from "@clerk/clerk-react";
import { useThemeStore } from '../store/ThemeStore';


function Navbar() {
    const { isDark, setIsDark } = useThemeStore();
    const { isSignedIn } = useUser();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navigate = useNavigate();

    return (
        <nav className={`${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg sticky top-0 z-50`}>
            <div className="max-w-7xl mx-auto px-4 py-4">
                <div className="flex justify-between items-center">
                    <motion.h1
                        className={`text-xl sm:text-2xl font-bold ${isDark ? 'text-blue-400' : 'text-blue-600'}`}
                        whileHover={{ scale: 1.05 }}
                    >
                        TaskMinder
                    </motion.h1>

                    <div className="hidden md:flex space-x-6">
                        <button className={`${isDark ? 'text-gray-300 hover:text-blue-400' : 'text-gray-600 hover:text-blue-600'} transition-colors`}>Features</button>
                        <button className={`${isDark ? 'text-gray-300 hover:text-blue-400' : 'text-gray-600 hover:text-blue-600'} transition-colors`}>About</button>

                        {isSignedIn ? (
                            <UserButton />
                        ) : (
                            <motion.button
                                className={`${isDark ? 'bg-blue-500 hover:bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'} text-white px-4 py-2 rounded-lg`}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => navigate('/dashboard')}
                            >
                                Get Started
                            </motion.button>
                        )}

                        <button
                            onClick={() => setIsDark(!isDark)}
                            className="p-2 rounded-full hover:bg-gray-700 transition-colors"
                        >
                            {isDark ? '🌞' : '🌙'}
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 rounded-lg hover:bg-gray-700/20"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {isMobileMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Mobile Menu */}
                <motion.div
                    className={`${isMobileMenuOpen ? 'flex' : 'hidden'} md:hidden flex-col space-y-4 pt-4`}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: isMobileMenuOpen ? 1 : 0, height: isMobileMenuOpen ? 'auto' : 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <button className={`${isDark ? 'text-gray-300 hover:text-blue-400' : 'text-gray-600 hover:text-blue-600'} transition-colors w-full text-left py-2`}>Features</button>
                    <button className={`${isDark ? 'text-gray-300 hover:text-blue-400' : 'text-gray-600 hover:text-blue-600'} transition-colors w-full text-left py-2`}>About</button>

                    {isSignedIn ? (
                        <UserButton />
                    ) : (
                        <motion.button
                            className={`${isDark ? 'bg-blue-500 hover:bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'} text-white px-4 py-2 rounded-lg w-full`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => navigate('/dashboard')}
                        >
                            Get Started
                        </motion.button>

                    )}

                </motion.div>
            </div>
        </nav>
    );
}

export default Navbar;
