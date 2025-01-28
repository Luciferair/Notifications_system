import { useState } from 'react'
import { motion } from 'framer-motion'
import Hero from '../components/Hero'
import Featurescard from '../components/Featurescard'
import Navbar from '../components/Navbar'

function LandingPage() {
    const [isDark, setIsDark] = useState(true)
    

    return (
        <div className={`min-h-screen flex flex-col ${isDark ? 'bg-gray-900 text-white' : 'bg-gradient-to-b from-blue-50 to-white'}`}>
            <div className="fixed inset-0 -z-10">
                <div className={`absolute inset-0 ${isDark ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900' : 'bg-gradient-to-br from-blue-50 via-white to-purple-50'} animate-gradient`}></div>
            </div>

            <Navbar isDark={isDark} setIsDark={setIsDark}/>

            <main className="flex-grow">
                <Hero isDark={isDark} />
                <div className={`${isDark ? 'bg-gray-800/50' : 'bg-white/50'} py-12 sm:py-16 backdrop-blur-xl`}>
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
                            {[
                                { number: "50K+", label: "Active Users" },
                                { number: "1M+", label: "Tasks Completed" },
                                { number: "99%", label: "Satisfaction Rate" },
                                { number: "24/7", label: "Support" }
                            ].map((stat, index) => (
                                <motion.div
                                    key={index}
                                    className="text-center"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <h3 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
                                        {stat.number}
                                    </h3>
                                    <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} mt-2`}>
                                        {stat.label}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                <Featurescard isDark={isDark} />
            </main>

            <footer className={`${isDark ? 'bg-gray-800/80' : 'bg-gray-50/80'} py-8 sm:py-12 backdrop-blur-xl`}>
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        Made with ❤️ by Cyber Group
                    </p>
                </div>
            </footer>
        </div>
    )
}

export default LandingPage;
