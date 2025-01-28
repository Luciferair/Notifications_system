import { motion } from 'framer-motion'
import { Features } from '../constant';
import { useThemeStore } from '../store/ThemeStore';



function Featurescard() {
    const { isDark } = useThemeStore(); 
    const fadeInUp = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5 }
    }

    return (
        <div className="py-12 sm:py-24">

            <div className="max-w-7xl mx-auto px-4">
                <motion.div
                    className="text-center mb-12 sm:mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                >
                    <h2 className="text-3xl sm:text-4xl font-bold mb-4">Powerful Features</h2>
                    <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} max-w-2xl mx-auto`}>
                        Everything you need to stay productive and organized
                    </p>
                </motion.div>
                <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    {Features.map((feature, index) => (
                        <motion.div
                            key={index}
                            className={`text-center p-8 rounded-xl ${isDark ? 'hover:bg-gray-700' : 'hover:shadow-xl'} transition-all duration-300`}
                            variants={fadeInUp}
                            initial="initial"
                            whileInView="animate"
                            viewport={{ once: true }}
                        >
                            <div className={`${isDark ? 'bg-gray-700' : 'bg-blue-100'} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
                                <svg className={`w-8 h-8 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={feature.icon} />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                            <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>{feature.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>

        </div>
    )
}

export default Featurescard
