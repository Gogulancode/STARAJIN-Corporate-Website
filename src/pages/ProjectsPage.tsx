import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Users, Award, Filter, ExternalLink } from 'lucide-react';
import { Handshake } from 'lucide-react';
import { useLanguage } from '../contexts/I18nContext';

export default function ProjectsPage() {
  const { t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState('all');

  const projects = [
    {
      id: 1,
      title: 'G2B MoU: Softberry with Rajasthan Government',
      category: 'mou',
      date: '2023-03-15',
      location: 'Jaipur, India',
      image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg',
      description: 'Strategic G2B MoU between Softberry and Rajasthan Government for facilitating Korean business investments and technology transfer.',
      participants: 50,
      status: 'completed'
    },
    {
      id: 2,
      title: 'KOFICE Local Culture Exchange Project',
      category: 'cultural',
      date: '2023-05-20',
      location: 'Multiple Cities',
      image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg',
      description: 'KOFICE-supported local culture exchange project promoting Korean cultural content and fostering cross-cultural understanding.',
      participants: 150,
      status: 'completed'
    },
    {
      id: 3,
      title: 'Launch of Super 30 (Korean Translation)',
      category: 'publication',
      date: '2023-08-10',
      location: 'Mumbai, India',
      image: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg',
      description: 'Successful launch of the Korean translation of the Indian bestseller "Super 30", making this inspiring story accessible to Korean readers.',
      participants: 15,
      status: 'completed'
    },
    {
      id: 4,
      title: 'Korea Edu Tour 2025 – Pune',
      category: 'tour',
      date: '2025-03-15',
      location: 'Pune to Korea',
      image: 'https://images.pexels.com/photos/3184297/pexels-photo-3184297.jpeg',
      description: 'Comprehensive educational tour program connecting Pune-based students and professionals with Korean educational institutions and corporate culture.',
      participants: 30,
      status: 'upcoming'
    },
    {
      id: 5,
      title: 'India-Korea Artist Camp by Namisland',
      category: 'cultural',
      date: '2024-06-20',
      location: 'Nami Island, Korea',
      image: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg',
      description: 'Intensive artist exchange program at Nami Island bringing together Korean and Indian artists for collaborative creative projects.',
      participants: 40,
      status: 'completed'
    },
    {
      id: 6,
      title: 'B2B MoUs Portfolio',
      category: 'mou',
      date: '2023-12-01',
      location: 'Multiple Locations',
      image: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg',
      description: 'Series of strategic B2B MoUs facilitating business partnerships and collaborations between Korean and Indian companies.',
      participants: 100,
      status: 'ongoing'
    }
  ];

  const categories = [
    { key: 'all', label: 'All Projects' },
    { key: 'mou', label: 'MoUs' },
    { key: 'cultural', label: 'Cultural Exchange' },
    { key: 'publication', label: 'Publications' },
    { key: 'tour', label: 'Tours' }
  ];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'ongoing': return 'bg-blue-100 text-blue-800';
      case 'upcoming': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <main className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="pt-20 pb-16 starajin-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-white py-20"
          >
            <h1 className="text-5xl font-bold mb-6">Our Projects & Partnerships</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Discover our successful initiatives bridging Korean and Indian businesses, cultures, and communities
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category.key}
                onClick={() => setActiveFilter(category.key)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  activeFilter === category.key
                    ? 'bg-starajin-blue text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Filter className="w-4 h-4 inline mr-2" />
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  
                  {/* Status Badge */}
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(project.status)}`}>
                      {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-starajin-blue transition-colors">
                    {project.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {project.description}
                  </p>

                  {/* Meta Info */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="w-4 h-4 mr-2" />
                      {new Date(project.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <MapPin className="w-4 h-4 mr-2" />
                      {project.location}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Users className="w-4 h-4 mr-2" />
                      {project.participants} participants
                    </div>
                  </div>

                  {/* CTA */}
                  <button className="group/btn inline-flex items-center text-starajin-blue font-semibold hover:text-starajin-orange transition-colors">
                    View Details
                    <ExternalLink className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Impact</h2>
            <p className="text-xl text-gray-600">Measurable results from our Korea-India initiatives</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { number: '50+', label: 'Successful Projects', icon: Award },
              { number: '500+', label: 'Participants', icon: Users },
              { number: '15+', label: 'Partner Organizations', icon: Handshake },
              { number: '4', label: 'Years of Excellence', icon: Calendar }
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-starajin-blue rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-starajin-blue mb-2">{stat.number}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}