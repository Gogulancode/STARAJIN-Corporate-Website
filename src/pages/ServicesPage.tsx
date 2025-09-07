import React from 'react';
import { TrendingUp, Users, Building, Handshake, Target, Globe, CheckCircle, ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/I18nContext';

export default function ServicesPage() {
  const { t } = useLanguage();

  const services = [
    {
      key: 'marketEntry',
      icon: TrendingUp,
      image: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg',
      features: ['Market Research & Analysis', 'Entry Strategy Development', 'Risk Assessment', 'Regulatory Compliance'],
      description: 'Comprehensive market analysis and strategic planning for successful entry into Korean and Indian markets.'
    },
    {
      key: 'culturalExchange',
      icon: Users,
      image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg',
      features: ['Cultural Training Programs', 'Language Support', 'Cross-cultural Communication', 'Local Insights'],
      description: 'Bridge cultural gaps with our comprehensive exchange programs and cultural understanding initiatives.'
    },
    {
      key: 'businessConsulting',
      icon: Building,
      image: 'https://images.pexels.com/photos/3184297/pexels-photo-3184297.jpeg',
      features: ['Strategic Planning', 'Operations Setup', 'Legal Compliance', 'Business Development'],
      description: 'End-to-end business consulting services for establishing and growing your operations.'
    },
    {
      key: 'jvma',
      icon: Handshake,
      image: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg',
      features: ['Partner Identification', 'Due Diligence', 'Deal Structuring', 'Negotiation Support'],
      description: 'Expert guidance for joint ventures, mergers, and acquisitions between Korean and Indian companies.'
    },
    {
      key: 'hrSupport',
      icon: Target,
      image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg',
      features: ['Local Hiring', 'Talent Acquisition', 'HR Compliance', 'Training Programs'],
      description: 'Complete HR solutions including local hiring, compliance, and talent development programs.'
    },
    {
      key: 'factoryLocation',
      icon: Globe,
      image: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg',
      features: ['Site Selection', 'Infrastructure Analysis', 'Government Liaison', 'Setup Support'],
      description: 'Strategic factory location search and setup assistance with government relations support.'
    }
  ];

  return (
    <main className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="pt-20 pb-16 starajin-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white py-20">
            <h1 className="text-5xl font-bold mb-6">{t('services.title')}</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Comprehensive solutions for Korea-India business expansion and cultural exchange
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {services.map((service, index) => {
              const Icon = service.icon;
              
              return (
                <div
                  key={service.key}
                  className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden"
                >
                  {/* Image Section */}
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={service.image}
                      alt={t(`services.${service.key}`)}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                    
                    {/* Icon */}
                    <div className="absolute top-6 left-6 w-14 h-14 bg-starajin-orange rounded-2xl flex items-center justify-center shadow-lg">
                      <Icon className="w-7 h-7 text-white" />
                    </div>

                    {/* Service Title */}
                    <div className="absolute bottom-6 left-6 right-6">
                      <h3 className="text-2xl font-bold text-white">
                        {t(`services.${service.key}`)}
                      </h3>
                    </div>
                  </div>
                  
                  {/* Content Section */}
                  <div className="p-8">
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {service.description}
                    </p>
                    
                    {/* Features */}
                    <div className="space-y-3 mb-6">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center space-x-3">
                          <CheckCircle className="w-5 h-5 text-starajin-blue flex-shrink-0" />
                          <span className="text-gray-700 font-medium">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    {/* CTA */}
                    <button className="group/btn inline-flex items-center text-starajin-blue font-semibold hover:text-starajin-orange transition-colors">
                      Learn More
                      <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              );
            })}
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