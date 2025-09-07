import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Building2, Globe, Briefcase, Users, TrendingUp, Award, Target, Handshake } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '../contexts/I18nContext';

interface Achievement {
  id: number;
  category: string;
  icon: React.ComponentType<any>;
  image: string;
  items: Array<{
    title: string;
    description: string;
  }>;
  stats?: Array<{
    number: string;
    label: string;
  }>;
}

export default function TrackRecord() {
  // Component is temporarily hidden
  // return null;
  
  const { t } = useLanguage();
  
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [activeTab, setActiveTab] = useState(0);

  const achievements: Achievement[] = [
    {
      id: 1,
      category: "Led G2B & B2B MoU signing; Business Entry & network creation",
      icon: Building2,
      image: "/images/achievements/Sogang.jpg",
      items: [
        {
          title: "G2B MoU: Softberry with Rajasthan Government",
          description: "Strategic government partnership for technology solutions and business development"
        },
        {
          title: "B2B MoU: Sogang Startup Innovation Center with i-Hub Divya Sampark",
          description: "Innovation ecosystem collaboration between Korea and India fostering startup growth"
        },
        {
          title: "Sogang University with IIT Roorkee",
          description: "Academic excellence partnership for research, education and technology transfer"
        }
      ]
    },
    {
      id: 2,
      category: "Culture Exchange Projects",
      icon: Globe,
      image: "/images/achievements/Culture Exchange Projects.jpg",
      items: [
        {
          title: "KOFICE Local Culture International Exchange project",
          description: "Promoting Korean culture and fostering international understanding through cultural programs"
        },
        {
          title: "Launching Indian Bestseller Book 'Super 30', translated in Korean",
          description: "Breaking language barriers through educational content and literary exchange"
        },
        {
          title: "Organized 'Korea Edu Tour 2025, Pune', Networking with Educationist",
          description: "Educational bridge-building between Korean and Indian institutions and educators"
        },
        {
          title: "Advisor of 'India-Korea Artist Camp' organized by Namisland Culture and education group",
          description: "Fostering artistic collaboration and cultural exchange between creative communities"
        }
      ]
    },
    {
      id: 3,
      category: "Various Business Consulting cases",
      icon: Briefcase,
      image: "/images/achievements/Various Business Consulting cases.jpg",
      items: [
        {
          title: "Incorporation Services",
          description: "Complete business setup and legal incorporation services for Korea-India ventures"
        },
        {
          title: "Partner Matching & Due Diligence",
          description: "Strategic partner identification and comprehensive due diligence for joint ventures"
        },
        {
          title: "Market Leadership & Strategy",
          description: "Thought leadership through seminars, market reports, and strategic business planning"
        }
      ]
    }
  ];

  return (
    <section className="py-8 lg:py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="font-malgun text-4xl lg:text-5xl font-bold text-starajin-blue leading-tight">
            {t('trackRecord.title')}
          </h2>
        </motion.div>

        {/* Tab Navigation - Exact CVS Style */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center mb-12"
        >
          <div className="flex bg-white rounded-lg shadow-sm border border-gray-200">
            {achievements.map((achievement, index) => (
              <button
                key={achievement.id}
                onClick={() => setActiveTab(index)}
                className={`px-6 py-4 font-medium text-sm transition-all duration-300 first:rounded-l-lg last:rounded-r-lg relative ${
                  activeTab === index 
                    ? 'bg-white text-gray-900 border-b-2 border-starajin-orange' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                {index === 0 ? 'G2B/B2B MoU' : index === 1 ? 'Culture Exchange' : 'Business Consulting'}
                {activeTab === index && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-starajin-orange"></div>
                )}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Main Content Card - Exact CVS Layout */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden"
        >
          <div className="flex flex-col lg:flex-row">
            
            {/* Left Content Section - Exact CVS Style */}
            <div className="w-full lg:w-1/2 p-8 lg:p-12">
              <div className="space-y-8">
                
                {/* Main Title */}
                <div>
                  <h3 className="font-malgun text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6">
                    {activeTab === 0 ? 'Virtual' : activeTab === 1 ? 'Cultural' : 'Business'}
                  </h3>
                  <p className="font-malgun text-gray-700 text-lg leading-relaxed">
                    {activeTab === 0 
                      ? 'Starajin Virtual Primary Care™ gives plan members convenient, virtual access to business partnerships, cultural exchange programs, strategic consulting and business development services.'
                      : activeTab === 1
                      ? 'Starajin Cultural Exchange Services™ provides comprehensive cultural bridge-building, translation services, and cross-cultural business facilitation between Korea and India.'
                      : 'Starajin Business Consulting™ offers strategic business advisory, market entry support, and comprehensive consulting services for companies expanding into new markets.'
                    }
                  </p>
                </div>

                {/* Dynamic Features List */}
                <div className="space-y-4">
                  {achievements[activeTab].items.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="flex items-start space-x-4 group"
                    >
                      <div className="w-2 h-2 bg-starajin-orange rounded-full mt-3 flex-shrink-0 group-hover:scale-125 transition-transform duration-200"></div>
                      <div>
                        <h4 className="font-malgun text-lg font-bold text-gray-900 mb-1 group-hover:text-starajin-blue transition-colors">
                          {item.title}
                        </h4>
                        <p className="font-malgun text-gray-600 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Image Section - Exact CVS Style */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="w-full lg:w-1/2 relative"
            >
              <div className="relative h-full min-h-[400px] lg:min-h-[500px]">
                <img
                  key={activeTab} // Force re-render when tab changes
                  src={achievements[activeTab].image}
                  alt={`Starajin ${activeTab === 0 ? 'Virtual Services' : activeTab === 1 ? 'Cultural Exchange' : 'Business Consulting'}`}
                  className="w-full h-full object-contain bg-gray-50 rounded-r-2xl lg:rounded-r-2xl lg:rounded-l-none transition-opacity duration-500"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = `data:image/svg+xml;base64,${btoa(`
                      <svg width="600" height="500" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" style="stop-color:#f8f9fa;stop-opacity:1" />
                            <stop offset="50%" style="stop-color:#e9ecef;stop-opacity:1" />
                            <stop offset="100%" style="stop-color:#dee2e6;stop-opacity:1" />
                          </linearGradient>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#grad)"/>
                        <rect x="50" y="100" width="500" height="300" rx="20" fill="#6c757d" opacity="0.1"/>
                        <circle cx="300" cy="200" r="60" fill="#6c757d" opacity="0.15"/>
                        <circle cx="400" cy="300" r="40" fill="#feb25a" opacity="0.3"/>
                        <text x="50%" y="45%" font-family="Arial" font-size="24" fill="#495057" text-anchor="middle" font-weight="bold">
                          Starajin ${activeTab === 0 ? 'Virtual Services' : activeTab === 1 ? 'Cultural Exchange' : 'Business Consulting'}
                        </text>
                        <text x="50%" y="55%" font-family="Arial" font-size="16" fill="#6c757d" text-anchor="middle">
                          Professional Business Solutions
                        </text>
                        <rect x="420" y="350" width="120" height="80" rx="12" fill="white" opacity="0.9"/>
                        <text x="480" y="375" font-family="Arial" font-size="12" fill="#495057" text-anchor="middle" font-weight="bold">${activeTab === 0 ? 'Partnership' : activeTab === 1 ? 'Cultural' : 'Consulting'}</text>
                        <text x="480" y="390" font-family="Arial" font-size="10" fill="#6c757d" text-anchor="middle">Solutions</text>
                        <circle cx="450" cy="405" r="15" fill="#feb25a"/>
                        <text x="450" y="410" font-family="Arial" font-size="10" fill="white" text-anchor="middle" font-weight="bold">✓</text>
                      </svg>
                    `)}`;
                  }}
                />
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Bottom CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-12 text-center bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-12"
        >
          <div className="max-w-2xl mx-auto">
            <h3 className="font-malgun text-3xl font-bold text-gray-900 mb-4">
              {t('trackRecord.readyToCreate')}
            </h3>
            <p className="font-malgun text-gray-600 mb-8 text-lg leading-relaxed">
              {t('trackRecord.joinNetwork')}
            </p>
            <button className="inline-flex items-center px-8 py-4 bg-starajin-blue text-white font-malgun font-semibold rounded-xl hover:bg-starajin-blue/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1">
              <TrendingUp className="w-5 h-5 mr-2" />
              {t('services.getStarted')}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
