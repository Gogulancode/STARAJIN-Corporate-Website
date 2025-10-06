import { motion } from 'framer-motion';
import { Users, Target, Globe, Award, Building, Handshake, CheckCircle, ArrowRight, Mail } from 'lucide-react';
import { useLanguage } from '../contexts/I18nContext';
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';

export default function AboutPage() {
  const { t, language } = useLanguage();
  const navigate = useNavigate();

  // Define multilingual content
  const content = {
    en: {
      missionTitle: "Our Mission",
      missionTagline: "Beyond Entering Market, Building Excellence in India",
      missionSubtitle: "Driven by Purpose, Guided by Results",
      visionTitle: "Our Vision",
      visionTagline: "Supporting Sustainable Growth and Successful Market Entry for Korean Companies in India",
      visionSubtitle: "Built on Trust, Backed by Experience",
      valuesTitle: "Our Core Values",
      valuesTagline: "Bridging | Expertise | Innovation | Sustainability | Trust",
      valuesSubtitle: "The Principles That Guide Every Step We Take",
      valuesDescription: "At the heart of our consulting practice lies a clear set of values that shape every relationship, decision, and solution we deliver. These principles guide our commitment to excellence in Korea-India business facilitation.",
      missionPoint1: "Comprehensive market entry strategies tailored to Korean businesses",
      missionPoint2: "Cultural bridge-building through expert local insights",
      missionPoint3: "Sustainable business growth through strategic partnerships",
      visionPoint1: "Leading Korea-India business facilitation platform by 2030",
      visionPoint2: "Creating lasting economic partnerships between two nations",
      visionPoint3: "Fostering innovation through cross-cultural collaboration",
      valuesPoint1: "Integrity and transparency in all business dealings",
      valuesPoint2: "Cultural sensitivity and respect for diversity",
      valuesPoint3: "Excellence in service delivery and client satisfaction",
      freeConsultation: "Free Consultation"
    },
    ko: {
      missionTitle: "우리의 사명",
      missionTagline: "시장 진입을 넘어, 인도에서 우수성 구축",
      missionSubtitle: "목적에 의해 주도되고, 결과에 의해 안내되는",
      visionTitle: "우리의 비전",
      visionTagline: "한국 기업의 인도 내 지속 가능한 성장과 성공적인 시장 진입 지원",
      visionSubtitle: "신뢰를 기반으로 구축되고, 경험으로 뒷받침되는",
      valuesTitle: "우리의 핵심 가치",
      valuesTagline: "연결 | 전문성 | 혁신 | 지속가능성 | 신뢰",
      valuesSubtitle: "우리가 취하는 모든 단계를 안내하는 원칙들",
      valuesDescription: "우리 컨설팅 실무의 핵심에는 모든 관계, 결정, 그리고 우리가 제공하는 솔루션을 형성하는 명확한 가치 세트가 있습니다. 이러한 원칙들은 한국-인도 비즈니스 촉진에서 우수성에 대한 우리의 약속을 안내합니다.",
      missionPoint1: "한국 기업을 위한 맞춤형 종합 시장 진출 전략",
      missionPoint2: "전문 현지 통찰력을 통한 문화적 가교 구축",
      missionPoint3: "전략적 파트너십을 통한 지속 가능한 비즈니스 성장",
      visionPoint1: "2030년까지 한국-인도 비즈니스 촉진 플랫폼 선도",
      visionPoint2: "두 국가 간 지속적인 경제 파트너십 창출",
      visionPoint3: "문화 간 협력을 통한 혁신 촉진",
      valuesPoint1: "모든 비즈니스 거래에서 진실성과 투명성",
      valuesPoint2: "다양성에 대한 문화적 민감성과 존중",
      valuesPoint3: "서비스 제공 및 고객 만족도에서 우수성",
      freeConsultation: "무료 상담"
    }
  };

  const currentContent = content[language as keyof typeof content] || content.en;

  const handleFreeConsultation = () => {
    navigate('/services');
  };

  const timelineRef = useRef<HTMLDivElement>(null);

  // Auto-scroll effect
  useEffect(() => {
    const container = timelineRef.current;
    if (!container) return;

    let scrollInterval: number;
    let isHovered = false;

    const startAutoScroll = () => {
      scrollInterval = setInterval(() => {
        if (!isHovered && container) {
          container.scrollLeft += 1;
          // Reset to beginning when reached end
          if (container.scrollLeft >= container.scrollWidth - container.clientWidth) {
            container.scrollLeft = 0;
          }
        }
      }, 30);
    };

    const stopAutoScroll = () => {
      clearInterval(scrollInterval);
    };

    // Mouse event handlers
    const handleMouseEnter = () => {
      isHovered = true;
      stopAutoScroll();
    };

    const handleMouseLeave = () => {
      isHovered = false;
      startAutoScroll();
    };

    // Start auto-scroll
    startAutoScroll();

    // Add event listeners
    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);

    // Cleanup
    return () => {
      stopAutoScroll();
      if (container) {
        container.removeEventListener('mouseenter', handleMouseEnter);
        container.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  const teamMembers = [
    {
      name: "Yujin Han",
      position: "Founder & CEO",
      image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg",
      bio: "Expert in Korea-India business relations with 10+ years experience in international consulting."
    },
    {
      name: "Dr. Rajesh Kumar",
      position: "Director - India Operations",
      image: "https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg",
      bio: "Former government official with deep expertise in Indian market regulations and compliance."
    },
    {
      name: "Kim Min-jun",
      position: "Cultural Exchange Director",
      image: "https://images.pexels.com/photos/3184297/pexels-photo-3184297.jpeg",
      bio: "Specialist in cross-cultural communication and educational program development."
    }
  ];

  const milestones = [
    { year: "2020", event: "Company Founded in Seoul" },
    { year: "2021", event: "India Office Established" },
    { year: "2022", event: "First MoU with Rajasthan Government" },
    { year: "2023", event: "100+ Business Partnerships Facilitated" },
    { year: "2024", event: "Expansion to Cultural Exchange Programs" }
  ];

  return (
    <main className="min-h-screen pt-16">
      {/* Simple Hero Banner Section with Background Image */}
      <section className="hero-banner relative h-[60vh] min-h-[400px] bg-cover bg-center bg-no-repeat overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(34, 66, 136, 0.7), rgba(34, 66, 136, 0.7)), url('https://images.pexels.com/photos/3183183/pexels-photo-3183183.jpeg')`,
        }}
      >
        {/* Background Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        
        {/* Content Container */}
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="text-center text-white px-4">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="hero-title text-6xl md:text-7xl font-bold mb-4"
            >
              {t('nav.about')}
            </motion.h1>
            
            {/* Breadcrumb Navigation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hero-breadcrumb flex items-center justify-center space-x-2 text-lg"
            >
              <span className="text-white hover:text-[#feb25a] transition-colors cursor-pointer">
                {t('nav.home')}
              </span>
              <span className="text-[#feb25a]">→</span>
              <span className="text-[#feb25a] font-medium">
                {t('nav.about')}
              </span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission, Vision & Core Values Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Empowering Your Business Journey</h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              with Korea-India Expertise and Excellence
            </p>
            <p className="text-gray-600 mt-4 max-w-3xl mx-auto">
              We're a team of expert consultants committed to helping businesses make strategic decisions for successful expansion between Korea and India with tailored strategies and trusted guidance
            </p>
          </motion.div>

          {/* Three Column Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Our Mission */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="flex flex-col"
            >
              {/* Header Section */}
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{currentContent.missionTitle}</h3>
                <p className="text-green-600 font-medium text-sm px-2">{currentContent.missionTagline}</p>
              </div>
              
              {/* Content Card */}
              <div className="bg-gray-50 p-6 rounded-lg flex-grow mb-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4 text-center">{currentContent.missionSubtitle}</h4>
                <p className="text-gray-600 text-sm leading-relaxed text-center mb-4">
                  {t('about.mission')}
                </p>
                <div className="space-y-3">
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-600 text-xs">{currentContent.missionPoint1}</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-600 text-xs">{currentContent.missionPoint2}</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-600 text-xs">{currentContent.missionPoint3}</p>
                  </div>
                </div>
              </div>
              
              {/* Image */}
              <div className="mt-auto">
                <img 
                  src="https://images.pexels.com/photos/3183183/pexels-photo-3183183.jpeg"
                  alt="Mission" 
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
            </motion.div>

            {/* Our Vision */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col"
            >
              {/* Header Section */}
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{currentContent.visionTitle}</h3>
                <p className="text-blue-600 font-medium text-sm px-2">{currentContent.visionTagline}</p>
              </div>
              
              {/* Content Card */}
              <div className="bg-gray-50 p-6 rounded-lg flex-grow mb-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4 text-center">{currentContent.visionSubtitle}</h4>
                <p className="text-gray-600 text-sm leading-relaxed text-center mb-4">
                  {t('about.vision')}
                </p>
                <div className="space-y-3">
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-600 text-xs">{currentContent.visionPoint1}</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-600 text-xs">{currentContent.visionPoint2}</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-600 text-xs">{currentContent.visionPoint3}</p>
                  </div>
                </div>
              </div>
              
              {/* Image */}
              <div className="mt-auto">
                <img 
                  src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg"
                  alt="Vision" 
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
            </motion.div>

            {/* Our Core Values */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-col"
            >
              {/* Header Section */}
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-yellow-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{currentContent.valuesTitle}</h3>
                <p className="text-yellow-600 font-medium text-sm px-2">{currentContent.valuesTagline}</p>
              </div>
              
              {/* Content Card */}
              <div className="bg-gray-50 p-6 rounded-lg flex-grow mb-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4 text-center">{currentContent.valuesSubtitle}</h4>
                <p className="text-gray-600 text-sm leading-relaxed text-center mb-4">
                  {currentContent.valuesDescription}
                </p>
                <div className="space-y-3">
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-600 text-xs">{currentContent.valuesPoint1}</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-600 text-xs">{currentContent.valuesPoint2}</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-600 text-xs">{currentContent.valuesPoint3}</p>
                  </div>
                </div>
              </div>
              
              {/* Image */}
              <div className="mt-auto">
                <img 
                  src="https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg"
                  alt="Core Values" 
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
            </motion.div>
          </div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center mt-12"
          >
            <button 
              onClick={handleFreeConsultation}
              className="inline-flex items-center bg-[#224288] text-white px-8 py-4 rounded-full hover:bg-[#1a3770] transition-all duration-300 font-semibold text-lg group cursor-pointer"
            >
              <span className="mr-3">{currentContent.freeConsultation}</span>
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center group-hover:translate-x-1 transition-transform duration-300">
                <svg className="w-4 h-4 text-[#224288]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </button>
          </motion.div>
        </div>
      </section>

      {/* Achievements Section - Clean White Design */}
      <section className="py-16 bg-white relative overflow-hidden">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-r from-[#224288]/5 to-[#feb25a]/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-72 h-72 bg-gradient-to-r from-[#feb25a]/5 to-[#224288]/5 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Elegant Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center bg-gradient-to-r from-[#224288] to-[#1a3770] text-white px-4 py-1 rounded-full text-sm font-medium mb-4">
              Our Impact
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Numbers That 
              <span className="bg-gradient-to-r from-[#224288] to-[#feb25a] bg-clip-text text-transparent"> Speak</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Delivering measurable results across Korea and India
            </p>
          </motion.div>

          {/* Compact Statistics Row */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-6">
            {[
              { number: '50+', label: 'Incorporations', icon: Building, color: 'bg-emerald-50 text-emerald-600 border-emerald-200' },
              { number: '200+', label: 'Partners', icon: Users, color: 'bg-blue-50 text-blue-600 border-blue-200' },
              { number: '100+', label: 'Strategies', icon: Target, color: 'bg-purple-50 text-purple-600 border-purple-200' },
              { number: '75+', label: 'JV Projects', icon: Handshake, color: 'bg-orange-50 text-orange-600 border-orange-200' },
              { number: '500+', label: 'Consultations', icon: Award, color: 'bg-yellow-50 text-yellow-600 border-yellow-200' },
              { number: '25+', label: 'Publications', icon: Globe, color: 'bg-cyan-50 text-cyan-600 border-cyan-200' }
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -4, transition: { duration: 0.3 } }}
                  className="group text-center"
                >
                  <div className="bg-white border border-gray-100 rounded-xl p-4 lg:p-6 shadow-md hover:shadow-lg transition-all duration-300 h-full">
                    {/* Compact Icon */}
                    <div className={`w-10 h-10 lg:w-12 lg:h-12 rounded-lg ${item.color} border flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-5 h-5 lg:w-6 lg:h-6" />
                    </div>
                    
                    {/* Compact Number */}
                    <div className="text-2xl lg:text-3xl font-bold text-gray-900 mb-1 group-hover:bg-gradient-to-r group-hover:from-[#224288] group-hover:to-[#feb25a] group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                      {item.number}
                    </div>
                    
                    {/* Compact Label */}
                    <div className="text-gray-600 font-medium text-xs lg:text-sm leading-tight group-hover:text-gray-900 transition-colors duration-300">
                      {item.label}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Clean Call-to-Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-center mt-16"
          >
            <div className="inline-flex items-center space-x-6 bg-gray-50 rounded-2xl px-8 py-6 border border-gray-100">
              <div className="text-left">
                <p className="text-gray-900 font-semibold text-lg">Ready to join our success stories?</p>
                <p className="text-gray-600 text-sm">Let's discuss your Korea-India expansion</p>
              </div>
              <button className="bg-gradient-to-r from-[#224288] to-[#1a3770] text-white px-8 py-3 rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-300 font-semibold flex items-center group">
                Get Started
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Leadership Team Section - Clean Professional Design */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center bg-white px-4 py-2 rounded-full text-sm font-medium mb-4 shadow-sm">
              <span className="text-[#224288]">Leadership</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-gray-900">Meet Our </span>
              <span className="text-[#224288]">Expert </span>
              <span className="text-[#feb25a]">Team</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experienced professionals driving Korea-India business success
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="group relative"
              >
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100">
                  {/* Professional Photo */}
                  <div className="relative overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  
                  {/* Content Section */}
                  <div className="p-6 relative">
                    {/* Name and Arrow */}
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#224288] transition-colors duration-300">
                        {member.name}
                      </h3>
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-[#224288] transition-all duration-300">
                        <svg 
                          className="w-4 h-4 text-gray-600 group-hover:text-white transition-colors duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
                        </svg>
                      </div>
                    </div>
                    
                    {/* Position */}
                    <p className="text-[#feb25a] font-semibold text-sm mb-4 group-hover:text-[#e69c42] transition-colors duration-300">
                      {member.position}
                    </p>
                    
                    {/* Bio */}
                    <p className="text-gray-600 text-sm leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                      {member.bio}
                    </p>

                    {/* Hover Background Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#224288]/5 to-[#feb25a]/5 rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Additional CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center mt-16"
          >
            <div className="inline-flex items-center space-x-4 bg-white rounded-2xl px-8 py-6 shadow-lg border border-gray-100">
              <div className="text-left">
                <p className="text-gray-900 font-semibold text-lg">Want to meet our team?</p>
                <p className="text-gray-600 text-sm">Schedule a consultation with our experts</p>
              </div>
              <button className="bg-gradient-to-r from-[#224288] to-[#1a3770] text-white px-6 py-3 rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-300 font-semibold flex items-center group">
                Contact Us
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Our Journey Timeline Section */}
      <section className="py-20 bg-gradient-to-r from-[#224288] to-[#1a3770] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-4">
              <span className="text-[#feb25a] font-semibold text-sm">Timeline</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Our Journey</h2>
            <p className="text-white/80 text-lg max-w-2xl mx-auto">
              Key milestones in our growth and expansion
            </p>
          </motion.div>

          {/* Timeline Container */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute top-16 left-0 right-0 h-0.5 bg-white/30 transform hidden lg:block"></div>
            
            {/* Timeline Dots */}
            <div className="absolute top-16 left-0 right-0 transform hidden lg:flex justify-between px-8">
              {milestones.map((_, index) => (
                <div key={index} className="w-4 h-4 bg-white rounded-full border-4 border-[#224288] shadow-lg relative z-10"></div>
              ))}
            </div>

            {/* Navigation Arrows */}
            <button 
              onClick={() => {
                if (timelineRef.current) timelineRef.current.scrollLeft -= 300;
              }}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-gray-50 transition-all duration-300 z-20 shadow-lg"
            >
              <svg className="w-6 h-6 text-[#224288]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button 
              onClick={() => {
                if (timelineRef.current) timelineRef.current.scrollLeft += 300;
              }}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-gray-50 transition-all duration-300 z-20 shadow-lg"
            >
              <svg className="w-6 h-6 text-[#224288]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Auto-Scrolling Timeline Cards Container */}
            <div 
              ref={timelineRef}
              id="timeline-container"
              className="flex overflow-x-auto scrollbar-hide px-16 gap-6 pb-4"
              style={{
                scrollBehavior: 'smooth',
                msOverflowStyle: 'none',
                scrollbarWidth: 'none'
              }}
            >
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group relative flex-shrink-0 w-80"
                >
                  {/* Year Badge - Positioned above card */}
                  <div className="text-center mb-6 mt-8">
                    <div className="inline-flex items-center bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-lg font-bold text-sm border border-white/30">
                      {milestone.year}
                    </div>
                  </div>

                  {/* Content Card - Styled like reference image */}
                  <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:border-white/40 transition-all duration-300 group-hover:bg-white/15 h-64 flex flex-col">
                    <h3 className="text-white font-bold text-xl mb-4 leading-tight">
                      {milestone.event}
                    </h3>
                    <p className="text-white/80 text-sm leading-relaxed flex-grow">
                      {index === 0 && "Established our presence in Seoul with a vision to bridge Korean innovation with Indian market opportunities, laying the foundation for cross-border business facilitation."}
                      {index === 1 && "Expanded operations to India, establishing our Rajasthan office and building strategic local partnerships to better serve our clients in the Indian market."}
                      {index === 2 && "Signed our first government MoU with Rajasthan, solidifying our position as a trusted Korea-India business facilitator and opening new opportunities."}
                      {index === 3 && "Reached a significant milestone of facilitating over 100 successful business partnerships, demonstrating our expertise in cross-border commerce."}
                      {index === 4 && "Diversified our services to include cultural exchange programs, enhancing cross-cultural understanding and strengthening Korea-India business relationships."}
                    </p>
                  </div>
                </motion.div>
              ))}
              
              {/* Add duplicate cards for seamless loop */}
              {milestones.map((milestone, index) => (
                <motion.div
                  key={`duplicate-${index}`}
                  className="group relative flex-shrink-0 w-80"
                >
                  <div className="text-center mb-6 mt-8">
                    <div className="inline-flex items-center bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-lg font-bold text-sm border border-white/30">
                      {milestone.year}
                    </div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:border-white/40 transition-all duration-300 group-hover:bg-white/15 h-64 flex flex-col">
                    <h3 className="text-white font-bold text-xl mb-4 leading-tight">
                      {milestone.event}
                    </h3>
                    <p className="text-white/80 text-sm leading-relaxed flex-grow">
                      {index === 0 && "Established our presence in Seoul with a vision to bridge Korean innovation with Indian market opportunities, laying the foundation for cross-border business facilitation."}
                      {index === 1 && "Expanded operations to India, establishing our Rajasthan office and building strategic local partnerships to better serve our clients in the Indian market."}
                      {index === 2 && "Signed our first government MoU with Rajasthan, solidifying our position as a trusted Korea-India business facilitator and opening new opportunities."}
                      {index === 3 && "Reached a significant milestone of facilitating over 100 successful business partnerships, demonstrating our expertise in cross-border commerce."}
                      {index === 4 && "Diversified our services to include cultural exchange programs, enhancing cross-cultural understanding and strengthening Korea-India business relationships."}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Background Decorative Elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-[#feb25a]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>

      </section>

      {/* Ready to Expand CTA Section */}
      <section className="section-padding bg-white relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#224288]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#feb25a]/10 rounded-full blur-3xl"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-gray-900"
            >
              <div className="inline-flex items-center px-4 py-2 bg-[#224288]/10 backdrop-blur-sm rounded-full text-sm font-medium mb-6 text-[#224288]">
                <span className="w-2 h-2 bg-[#feb25a] rounded-full mr-2 animate-pulse"></span>
                Ready to Partner with Us?
              </div>

              <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6 text-gray-900">
                Let's Begin Your
                <span className="block text-[#feb25a]">India Journey</span>
              </h2>
              
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Join successful Korean companies who have expanded to India with our expert guidance and proven strategies.
              </p>
              
              {/* Benefits List */}
              <div className="space-y-4 mb-8">
                {[
                  'Comprehensive market entry analysis and strategy',
                  'Cultural bridge-building with local expertise',
                  'Regulatory compliance and government relations',
                  'Proven track record with 100+ successful partnerships'
                ].map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start space-x-3"
                  >
                    <CheckCircle className="w-6 h-6 text-[#feb25a] flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">{benefit}</span>
                  </motion.div>
                ))}
              </div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <button 
                  onClick={() => navigate('/contact')}
                  className="group inline-flex items-center px-8 py-4 bg-[#224288] text-white font-semibold rounded-full hover:bg-[#224288]/90 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Get Started Today
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </button>
                
                <button 
                  onClick={() => navigate('/services')}
                  className="group inline-flex items-center px-8 py-4 bg-white border-2 border-[#224288] text-[#224288] font-semibold rounded-full hover:bg-[#224288] hover:text-white transition-all duration-300"
                >
                  <Users className="mr-2 h-5 w-5" />
                  Explore Our Services
                </button>
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-gray-50 border border-gray-200 rounded-3xl p-8 shadow-xl">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Quick Consultation</h3>
                  <p className="text-gray-600">Get expert advice tailored to your expansion needs</p>
                </div>
                
                <form className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Your Name"
                      className="w-full px-4 py-3 rounded-xl bg-white border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#feb25a] focus:border-transparent"
                    />
                    <input
                      type="text"
                      placeholder="Company"
                      className="w-full px-4 py-3 rounded-xl bg-white border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#feb25a] focus:border-transparent"
                    />
                  </div>
                  
                  <input
                    type="email"
                    placeholder="Email Address"
                    className="w-full px-4 py-3 rounded-xl bg-white border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#feb25a] focus:border-transparent"
                  />
                  
                  <select className="w-full px-4 py-3 rounded-xl bg-white border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#feb25a] focus:border-transparent">
                    <option value="" className="text-gray-500">Select Service Interest</option>
                    <option value="market-entry" className="text-gray-900">Market Entry Strategy</option>
                    <option value="business-dev" className="text-gray-900">Business Development</option>
                    <option value="consulting" className="text-gray-900">Strategic Consulting</option>
                    <option value="cultural" className="text-gray-900">Cultural Exchange</option>
                  </select>
                  
                  <textarea
                    placeholder="Tell us about your expansion goals..."
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#feb25a] focus:border-transparent resize-none"
                  ></textarea>
                  
                  <button
                    type="submit"
                    className="w-full px-6 py-4 bg-[#feb25a] text-white font-semibold rounded-xl hover:bg-[#feb25a]/90 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center"
                  >
                    <Mail className="mr-2 h-5 w-5" />
                    Request Free Consultation
                  </button>
                </form>
                
                <div className="mt-6 text-center">
                  <p className="text-gray-500 text-sm">
                    Your information is secure and will only be used to contact you about our services.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}