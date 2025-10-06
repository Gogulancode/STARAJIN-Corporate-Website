import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/I18nContext';
import { useNavigate } from 'react-router-dom';

export default function ServicesPage() {
  const { language } = useLanguage();
  const navigate = useNavigate();

  // Define multilingual content
  const content = {
    en: {
      heroTitle: "Services"
    },
    ko: {
      heroTitle: "서비스"
    }
  };

  const currentContent = content[language as keyof typeof content] || content.en;

  return (
    <main className="min-h-screen pt-16">
      {/* Simple Hero Banner Section with Background Image */}
      <section className="hero-banner relative h-[60vh] min-h-[400px] bg-cover bg-center bg-no-repeat overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(34, 66, 136, 0.7), rgba(34, 66, 136, 0.7)), url('https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#224288]/80 via-[#224288]/70 to-[#feb25a]/20"></div>
        
        <div className="relative h-full flex items-center justify-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            
            {/* Page Title */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-6xl md:text-7xl font-bold text-white mb-8 leading-tight"
            >
              {currentContent.heroTitle}
            </motion.h1>

            {/* Breadcrumb Navigation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex items-center justify-center text-lg"
            >
              <span 
                onClick={() => navigate('/')}
                className="text-white hover:text-[#feb25a] cursor-pointer transition-colors duration-300"
              >
                Home
              </span>
              <span className="mx-3 text-[#feb25a]">→</span>
              <span className="text-[#feb25a] font-semibold">{currentContent.heroTitle}</span>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Tailored Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-16">
            <div>
              <div className="inline-block px-4 py-2 bg-gray-100 rounded-full text-sm font-medium text-gray-700 mb-6">
                SERVICES
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                Tailored Services to <span className="text-[#4A90E2]">Grow</span> &<br />
                <span className="text-[#4A90E2]">Protect</span> Your Business
              </h2>
            </div>
            
            <div className="lg:pt-12">
              <p className="text-gray-600 text-lg leading-relaxed">
                No matter where you are today, our comprehensive solutions are 
                designed to meet you there — and guide you to where you 
                truly want to be.
              </p>
            </div>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Service 1 - Market Entry */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
              className="group bg-gray-50 rounded-3xl p-8 hover:bg-white hover:shadow-lg transition-all duration-300"
            >
              <div className="w-16 h-16 bg-[#4A90E2]/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#4A90E2]/20 transition-colors">
                <div className="w-8 h-8 bg-[#4A90E2] rounded-lg flex items-center justify-center">
                  <ArrowRight className="w-4 h-4 text-white rotate-45" />
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-4">Market Entry</h3>
              <p className="text-gray-600 leading-relaxed">
                Comprehensive market analysis and strategic planning for successful entry into Indian markets with regulatory compliance.
              </p>
            </motion.div>

            {/* Service 2 - Investment Advisory */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="group bg-gray-50 rounded-3xl p-8 hover:bg-white hover:shadow-lg transition-all duration-300"
            >
              <div className="w-16 h-16 bg-[#4A90E2]/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#4A90E2]/20 transition-colors">
                <div className="w-8 h-8 bg-[#4A90E2] rounded-lg flex items-center justify-center">
                  <div className="w-4 h-4 border-2 border-white rounded-full flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                  </div>
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-4">Investment Advisory</h3>
              <p className="text-gray-600 leading-relaxed">
                Find clarity, direction, and confidence to thrive in your investment journey with our expert guidance.
              </p>
            </motion.div>

            {/* Service 3 - Business Strategy */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="group bg-gray-50 rounded-3xl p-8 hover:bg-white hover:shadow-lg transition-all duration-300"
            >
              <div className="w-16 h-16 bg-[#4A90E2]/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#4A90E2]/20 transition-colors">
                <div className="w-8 h-8 bg-[#4A90E2] rounded-lg flex items-center justify-center">
                  <div className="w-4 h-4 border-2 border-white rounded-sm flex items-center justify-center">
                    <div className="w-1 h-2 bg-white"></div>
                  </div>
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-4">Business Strategy</h3>
              <p className="text-gray-600 leading-relaxed">
                Break free from limiting beliefs and adopt a powerful, growth-focused business strategy for sustainable success.
              </p>
            </motion.div>

            {/* Service 4 - Partnership */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="group bg-gray-50 rounded-3xl p-8 hover:bg-white hover:shadow-lg transition-all duration-300"
            >
              <div className="w-16 h-16 bg-[#4A90E2]/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#4A90E2]/20 transition-colors">
                <div className="w-8 h-8 bg-[#4A90E2] rounded-lg flex items-center justify-center">
                  <div className="w-4 h-4 flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full mr-0.5"></div>
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-4">Partnership</h3>
              <p className="text-gray-600 leading-relaxed">
                Strengthen your business relationships by nurturing connection, communication, and strategic partnerships.
              </p>
            </motion.div>

          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="starajin-gradient rounded-3xl p-12 text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to Expand Your Business?</h2>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
              Let our experts guide you through every step of your Korea-India business expansion journey.
            </p>
            <button className="inline-flex items-center px-8 py-4 bg-starajin-orange text-white font-semibold rounded-full hover:bg-orange-600 transition-all duration-300 transform hover:scale-105">
              Get Started Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}