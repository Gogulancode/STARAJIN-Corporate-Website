import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Image, FileText, Calendar, Eye, Download, Filter, Search } from 'lucide-react';
import { useLanguage } from '../contexts/I18nContext';

export default function MediaPage() {
  const { t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const mediaItems = [
    {
      id: 1,
      title: 'STARAJIN CEO Interview - Korea Business Today',
      type: 'video',
      category: 'interview',
      date: '2024-01-15',
      thumbnail: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg',
      duration: '15:30',
      views: 2500,
      description: 'CEO Yujin Han discusses Korea-India business opportunities and STARAJIN\'s vision for 2024.'
    },
    {
      id: 2,
      title: 'Rajasthan MoU Signing Ceremony',
      type: 'image',
      category: 'event',
      date: '2023-03-15',
      thumbnail: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg',
      views: 1800,
      description: 'Historic signing ceremony of MoU with Rajasthan Government for business collaboration.'
    },
    {
      id: 3,
      title: 'Korea-India Trade Report 2023',
      type: 'document',
      category: 'report',
      date: '2023-12-20',
      thumbnail: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg',
      pages: 45,
      downloads: 850,
      description: 'Comprehensive analysis of trade relations and business opportunities between Korea and India.'
    },
    {
      id: 4,
      title: 'Cultural Festival Highlights',
      type: 'video',
      category: 'event',
      date: '2023-06-20',
      thumbnail: 'https://images.pexels.com/photos/3184297/pexels-photo-3184297.jpeg',
      duration: '8:45',
      views: 3200,
      description: 'Best moments from the Korea-India Cultural Festival held in Seoul.'
    },
    {
      id: 5,
      title: 'Super 30 Book Launch Gallery',
      type: 'image',
      category: 'publication',
      date: '2023-08-10',
      thumbnail: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg',
      views: 1200,
      description: 'Photo gallery from the Korean translation launch of Super 30 book in Mumbai.'
    },
    {
      id: 6,
      title: 'Market Entry Strategy Guide',
      type: 'document',
      category: 'guide',
      date: '2023-11-05',
      thumbnail: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg',
      pages: 32,
      downloads: 1500,
      description: 'Step-by-step guide for Korean companies entering the Indian market.'
    }
  ];

  const categories = [
    { key: 'all', label: 'All Media' },
    { key: 'interview', label: 'Interviews' },
    { key: 'event', label: 'Events' },
    { key: 'report', label: 'Reports' },
    { key: 'publication', label: 'Publications' },
    { key: 'guide', label: 'Guides' }
  ];

  const filteredItems = mediaItems.filter(item => {
    const matchesFilter = activeFilter === 'all' || item.category === activeFilter;
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return Play;
      case 'image': return Image;
      case 'document': return FileText;
      default: return FileText;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'video': return 'bg-red-100 text-red-800';
      case 'image': return 'bg-green-100 text-green-800';
      case 'document': return 'bg-blue-100 text-blue-800';
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
            <h1 className="text-5xl font-bold mb-6">Media Center</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Explore our latest interviews, event coverage, reports, and publications showcasing Korea-India business collaboration
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search media..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-starajin-blue focus:border-transparent"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  key={category.key}
                  onClick={() => setActiveFilter(category.key)}
                  className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                    activeFilter === category.key
                      ? 'bg-starajin-blue text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Media Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item, index) => {
              const TypeIcon = getTypeIcon(item.type);
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group cursor-pointer"
                >
                  {/* Thumbnail */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    
                    {/* Type Badge */}
                    <div className="absolute top-4 left-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${getTypeColor(item.type)}`}>
                        <TypeIcon className="w-3 h-3 mr-1" />
                        {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                      </span>
                    </div>

                    {/* Play Button for Videos */}
                    {item.type === 'video' && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Play className="w-8 h-8 text-white ml-1" />
                        </div>
                      </div>
                    )}

                    {/* Duration/Pages Info */}
                    <div className="absolute bottom-4 right-4 text-white text-sm font-medium">
                      {item.type === 'video' && item.duration}
                      {item.type === 'document' && `${item.pages} pages`}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-starajin-blue transition-colors line-clamp-2">
                      {item.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-4 line-clamp-3 text-sm">
                      {item.description}
                    </p>

                    {/* Meta Info */}
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date(item.date).toLocaleDateString()}
                      </div>
                      <div className="flex items-center">
                        {item.type === 'document' ? (
                          <>
                            <Download className="w-4 h-4 mr-1" />
                            {item.downloads} downloads
                          </>
                        ) : (
                          <>
                            <Eye className="w-4 h-4 mr-1" />
                            {item.views} views
                          </>
                        )}
                      </div>
                    </div>

                    {/* Action Button */}
                    <button className="w-full px-4 py-2 bg-starajin-blue text-white font-semibold rounded-lg hover:bg-starajin-dark-blue transition-colors">
                      {item.type === 'video' ? 'Watch Now' : 
                       item.type === 'document' ? 'Download' : 'View Gallery'}
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* No Results */}
          {filteredItems.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Search className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No media found</h3>
              <p className="text-gray-600">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Content</h2>
            <p className="text-xl text-gray-600">Don't miss our most popular and recent content</p>
          </motion.div>

          <div className="starajin-gradient rounded-3xl p-12 text-white text-center">
            <h3 className="text-2xl font-bold mb-4">Stay Updated</h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Subscribe to our newsletter to receive the latest media updates, reports, and exclusive content about Korea-India business opportunities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-starajin-orange"
              />
              <button className="px-6 py-3 bg-starajin-orange text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}