import { motion } from 'framer-motion';
import { Users, Target, Globe, Award, Building, Handshake } from 'lucide-react';
import { useLanguage } from '../contexts/I18nContext';

export default function AboutPage() {
  const { t } = useLanguage();

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
      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-[#004aad] to-[#0066dd]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-white py-20"
          >
            <h1 className="text-5xl font-bold mb-6">{t('about.title')}</h1>
            <div className="text-xl text-blue-100 mb-4">
              <p>{t('about.founded')} | {t('about.ceo')}</p>
            </div>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              {t('about.description')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-gray-50 p-8 rounded-2xl"
            >
              <Target className="w-12 h-12 text-[#004aad] mb-6" />
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
              <p className="text-gray-600 text-lg">
                {t('about.mission')}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-gray-50 p-8 rounded-2xl"
            >
              <Globe className="w-12 h-12 text-[#004aad] mb-6" />
              <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('about.capabilities')}</h2>
              <div className="space-y-3 text-gray-600">
                <p>• {t('about.easeBarriers')}</p>
                <p>• {t('about.customized')}</p>
                <p>• {t('about.networks')}</p>
                <p>• {t('about.hrCapabilities')}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{t('achievements.title')}</h2>
            <p className="text-xl text-gray-600">Proven track record of success</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { key: 'incorporations', icon: Building },
              { key: 'partners', icon: Users },
              { key: 'strategies', icon: Target },
              { key: 'jvDueDiligence', icon: Handshake },
              { key: 'consultations', icon: Award },
              { key: 'thoughtLeadership', icon: Globe }
            ].map((achievement, index) => {
              const Icon = achievement.icon;
              return (
                <motion.div
                  key={achievement.key}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="text-center bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow"
                >
                  <div className="w-16 h-16 bg-starajin-blue rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-starajin-blue mb-2">
                    {t(`achievements.${achievement.key}`).split(' ')[0]}
                  </div>
                  <div className="text-gray-600">
                    {t(`achievements.${achievement.key}`).split(' ').slice(1).join(' ')}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Leadership Team</h2>
            <p className="text-xl text-gray-600">Meet the experts driving Korea-India business success</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{member.name}</h3>
                  <p className="text-[#004aad] font-medium mb-4">{member.position}</p>
                  <p className="text-gray-600">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Journey</h2>
            <p className="text-xl text-gray-600">Key milestones in our growth</p>
          </motion.div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-[#004aad]"></div>
            
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className={`relative flex items-center mb-8 ${
                  index % 2 === 0 ? 'justify-start' : 'justify-end'
                }`}
              >
                <div className={`bg-white p-6 rounded-lg shadow-lg max-w-md ${
                  index % 2 === 0 ? 'mr-8' : 'ml-8'
                }`}>
                  <div className="text-2xl font-bold text-[#004aad] mb-2">{milestone.year}</div>
                  <div className="text-gray-700">{milestone.event}</div>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-[#004aad] rounded-full"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}