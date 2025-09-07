import React from 'react';
import { motion } from 'framer-motion';
import { Users, BookOpen, Music, Palette, Globe, Heart, ArrowRight, Calendar } from 'lucide-react';
import { useLanguage } from '../contexts/I18nContext';

export default function CultureExchangePage() {
  const { t } = useLanguage();

  const programs = [
    {
      title: 'Korea-India Talent Exchange',
      description: 'Comprehensive program connecting talented individuals from both countries for professional and cultural development.',
      image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg',
      icon: Users,
      features: ['Professional Mentorship', 'Cultural Immersion', 'Language Training', 'Network Building']
    },
    {
      title: 'Korea Edu Tour Program',
      description: 'Educational tours providing Indian students and professionals with firsthand experience of Korean education system.',
      image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg',
      icon: BookOpen,
      features: ['University Visits', 'Corporate Tours', 'Cultural Sites', 'Student Exchange']
    },
    {
      title: 'Artist Exchange Camps',
      description: 'Intensive creative programs bringing together Korean and Indian artists for collaborative projects and cultural fusion.',
      image: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg',
      icon: Palette,
      features: ['Art Workshops', 'Cultural Fusion', 'Exhibition Opportunities', 'Mentorship Programs']
    },
    {
      title: 'K-Culture Festivals',
      description: 'Large-scale cultural festivals celebrating Korean culture in India and promoting cross-cultural understanding.',
      image: 'https://images.pexels.com/photos/3184297/pexels-photo-3184297.jpeg',
      icon: Music,
      features: ['Music Performances', 'Food Festivals', 'Traditional Arts', 'Modern Culture']
    }
  ];

  const achievements = [
    {
      title: 'Super 30 Korean Translation',
      description: 'Successfully translated and published the inspiring "Super 30" story in Korean, making it accessible to Korean audiences.',
      impact: '10,000+ copies distributed',
      year: '2023'
    },
    {
      title: 'Cultural Ambassador Program',
      description: 'Trained over 100 cultural ambassadors to facilitate better understanding between Korean and Indian communities.',
      impact: '100+ ambassadors trained',
      year: '2023'
    },
    {
      title: 'Educational Partnerships',
      description: 'Established partnerships with leading universities in both countries for student exchange programs.',
      impact: '15+ university partnerships',
      year: '2022-2024'
    }
  ];

  return (
    <main className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="pt-20 pb-16 starajin-gradient relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-starajin-orange/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-white py-20"
          >
            <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium mb-6">
              <Heart className="w-4 h-4 mr-2" />
              Bridging Cultures
            </div>
            <h1 className="text-5xl font-bold mb-6">Culture Exchange Programs</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
              Facilitating Academy & Industry through Cultural Understanding between Korea and India
            </p>
            <div className="flex items-center justify-center space-x-8 text-blue-100">
              <div className="text-center">
                <div className="text-3xl font-bold">500+</div>
                <div className="text-sm">Participants</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">25+</div>
                <div className="text-sm">Programs</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">4</div>
                <div className="text-sm">Years</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Exchange Programs</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive programs designed to foster deep cultural understanding and professional growth
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {programs.map((program, index) => {
              const Icon = program.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden"
                >
                  {/* Image Section */}
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={program.image}
                      alt={program.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                    
                    {/* Icon */}
                    <div className="absolute top-6 left-6 w-14 h-14 bg-starajin-orange rounded-2xl flex items-center justify-center shadow-lg">
                      <Icon className="w-7 h-7 text-white" />
                    </div>

                    {/* Title */}
                    <div className="absolute bottom-6 left-6 right-6">
                      <h3 className="text-2xl font-bold text-white">
                        {program.title}
                      </h3>
                    </div>
                  </div>
                  
                  {/* Content Section */}
                  <div className="p-8">
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {program.description}
                    </p>
                    
                    {/* Features */}
                    <div className="grid grid-cols-2 gap-3 mb-6">
                      {program.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-starajin-blue rounded-full"></div>
                          <span className="text-gray-700 text-sm font-medium">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    {/* CTA */}
                    <button className="group/btn inline-flex items-center text-starajin-blue font-semibold hover:text-starajin-orange transition-colors">
                      Learn More
                      <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Key Achievements</h2>
            <p className="text-xl text-gray-600">Milestones in our cultural exchange journey</p>
          </motion.div>

          <div className="space-y-8">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
              >
                <div className="flex-1 bg-white p-8 rounded-2xl shadow-lg">
                  <div className="flex items-center mb-4">
                    <div className="text-2xl font-bold text-starajin-orange mr-4">{achievement.year}</div>
                    <h3 className="text-xl font-bold text-gray-900">{achievement.title}</h3>
                  </div>
                  <p className="text-gray-600 mb-4">{achievement.description}</p>
                  <div className="inline-flex items-center px-4 py-2 bg-starajin-blue/10 rounded-full text-starajin-blue font-semibold text-sm">
                    <Globe className="w-4 h-4 mr-2" />
                    {achievement.impact}
                  </div>
                </div>
                
                <div className="w-16 h-16 bg-starajin-blue rounded-full flex items-center justify-center mx-8 flex-shrink-0">
                  <Calendar className="w-8 h-8 text-white" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 starajin-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-white"
          >
            <h2 className="text-4xl font-bold mb-6">Join Our Cultural Exchange</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Be part of the bridge connecting Korean and Indian cultures. Discover opportunities for growth, learning, and meaningful connections.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="inline-flex items-center px-8 py-4 bg-starajin-orange text-white font-semibold rounded-full hover:bg-orange-600 transition-all duration-300 transform hover:scale-105">
                Apply for Programs
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
              <button className="inline-flex items-center px-8 py-4 bg-white/20 backdrop-blur-sm text-white font-semibold rounded-full hover:bg-white/30 transition-all duration-300 border border-white/30">
                Download Brochure
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}