import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function importExistingHomePageContent() {
  try {
    // Check if home page already exists
    let homePage = await prisma.page.findFirst({
      where: { key: 'home' }
    });

    if (!homePage) {
      // Create home page if it doesn't exist
      homePage = await prisma.page.create({
        data: {
          key: 'home',
          slug: '/',
          isEnabled: true,
          translations: {
            create: {
              locale: 'en',
              title: 'Home',
              seoDesc: 'STARAJIN - Empowering Global Visions between Korea and India'
            }
          }
        }
      });
    }

    // Delete existing sections to reimport
    await prisma.section.deleteMany({
      where: { pageId: homePage.id }
    });

    // 1. Import Hero Section with Multiple Slides (Exact Frontend Order)
    await prisma.section.create({
      data: {
        pageId: homePage.id,
        type: 'hero',
        sortOrder: 1,
        isEnabled: true,
        config: {
          isCarousel: true,
          autoPlay: true,
          autoPlayInterval: 6000
        },
        translations: {
          create: {
            locale: 'en',
            content: {
              slides: [
                {
                  index: 0,
                  title: 'Market Entry Strategy',
                  subtitle: 'Empowering Global Visions',
                  description: 'Transform your business aspirations into reality with our comprehensive market entry solutions for Korean markets.',
                  buttonText: 'Start Your Journey',
                  buttonLink: '/contact',
                  backgroundImage: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
                  features: [
                    'Comprehensive Market Analysis',
                    'Regulatory Compliance Support', 
                    'Local Partnership Development',
                    'Cultural Integration Guidance'
                  ]
                },
                {
                  index: 1,
                  title: 'Investment Facilitation',
                  subtitle: 'Bridge to Success',
                  description: 'Connect with the right investors and opportunities in Korean markets with our proven investment facilitation services.',
                  buttonText: 'Explore Opportunities',
                  buttonLink: '/services',
                  backgroundImage: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
                  features: [
                    'Investor Matching Services',
                    'Due Diligence Support',
                    'Investment Documentation',
                    'Regulatory Approval Assistance'
                  ]
                },
                {
                  index: 2,
                  title: 'Cultural Exchange',
                  subtitle: 'Building Bridges',
                  description: 'Foster meaningful business relationships through our cultural exchange programs and deep understanding of Korean business culture.',
                  buttonText: 'Learn More',
                  buttonLink: '/culture',
                  backgroundImage: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
                  features: [
                    'Business Culture Training',
                    'Language Support Services',
                    'Relationship Building Programs',
                    'Cross-Cultural Communication'
                  ]
                }
              ]
            }
          }
        }
      }
    });

    // 2. Import WhyStarajin Section (Text + Image with Stats)
    await prisma.section.create({
      data: {
        pageId: homePage.id,
        type: 'text_image',
        sortOrder: 2,
        isEnabled: true,
        config: {
          imagePosition: 'right',
          hasStats: true
        },
        translations: {
          create: {
            locale: 'en',
            content: {
              title: 'Why STARAJIN?',
              subtitle: '15 Years of Excellence in Korea-India Business',
              description: 'With deep expertise and extensive networks built over 15 years, we provide unmatched value in Korea-India business partnerships.',
              imageUrl: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
              stats: [
                {
                  value: '15+',
                  label: 'Years in India',
                  description: '15 years of experience in India with experts & Knowhows'
                },
                {
                  value: '1000+',
                  label: 'Network',
                  description: 'Built an intimate network across Korean-Indian government, companies, and institutions'
                },
                {
                  value: '50+',
                  label: 'Success Cases',
                  description: 'Many success stories with data-driven, customized strategies'
                },
                {
                  value: '100%',
                  label: 'Total Support',
                  description: 'Comprehensive support from market entry to growth'
                }
              ]
            }
          }
        }
      }
    });

    // 3. Import Services Section (Slider with Cards)
    await prisma.section.create({
      data: {
        pageId: homePage.id,
        type: 'text',
        sortOrder: 3,
        isEnabled: true,
        config: {
          layout: 'slider',
          hasReadMore: true
        },
        translations: {
          create: {
            locale: 'en',
            content: {
              title: 'Our Services',
              subtitle: 'Comprehensive solutions for your Korea-India business expansion',
              description: 'We provide end-to-end support for businesses looking to expand between Korean and Indian markets.',
              ctaText: 'Ready to expand your business to Korea?',
              ctaDescription: 'Get expert guidance for your Korean market expansion journey.',
              ctaButtonText: 'Get Started',
              services: [
                {
                  title: 'Business Entry Strategy',
                  description: 'Comprehensive market analysis and entry planning for successful business expansion into Korean markets.',
                  image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=500&fit=crop&crop=center',
                  readMoreText: 'Read Article'
                },
                {
                  title: 'Investment Facilitation',
                  description: 'Connecting investors with opportunities and facilitating investment processes for Korean market entry.',
                  image: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=800&h=500&fit=crop&crop=center',
                  readMoreText: 'Read Article'
                },
                {
                  title: 'B2B Partnership Development',
                  description: 'Building strategic partnerships and business relationships for sustainable growth in Korean markets.',
                  image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=500&fit=crop&crop=center',
                  readMoreText: 'Read Article'
                },
                {
                  title: 'Strategy Consultation',
                  description: 'Expert strategic guidance and consultation for market entry, expansion, and operations.',
                  image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=500&fit=crop&crop=center',
                  readMoreText: 'Read Article'
                },
                {
                  title: 'Digital Services',
                  description: 'Modern digital solutions and technology integration for efficient business operations.',
                  image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop&crop=center',
                  readMoreText: 'Read Article'
                }
              ]
            }
          }
        }
      }
    });

    // 4. Import TrackRecord Section (Achievements)
    await prisma.section.create({
      data: {
        pageId: homePage.id,
        type: 'stats',
        sortOrder: 4,
        isEnabled: true,
        config: {
          layout: 'achievements'
        },
        translations: {
          create: {
            locale: 'en',
            content: {
              title: 'Our Track Record',
              subtitle: 'Proven success across multiple industries and sectors',
              categories: [
                {
                  name: 'Business Entry',
                  achievements: [
                    'Successfully facilitated 50+ business entries into Korean market',
                    'Achieved 95% success rate in market penetration strategies',
                    'Reduced average market entry time by 40%'
                  ]
                },
                {
                  name: 'Investment Facilitation',
                  achievements: [
                    'Facilitated over $100M in investments between Korea and India',
                    'Connected 200+ investors with promising opportunities',
                    'Maintained 90% investor satisfaction rate'
                  ]
                },
                {
                  name: 'Partnership Development',
                  achievements: [
                    'Established 300+ strategic business partnerships',
                    'Created lasting relationships with 85% partnership retention',
                    'Expanded client networks by average 150%'
                  ]
                }
              ]
            }
          }
        }
      }
    });

    // 5. Import NewsSection (Latest Updates)
    await prisma.section.create({
      data: {
        pageId: homePage.id,
        type: 'text',
        sortOrder: 5,
        isEnabled: true,
        config: {
          layout: 'news'
        },
        translations: {
          create: {
            locale: 'en',
            content: {
              title: 'Latest News & Updates',
              subtitle: 'Stay informed about Korea-India business developments',
              news: [
                {
                  title: 'New Trade Agreement Boosts Korea-India Commerce',
                  summary: 'Recent bilateral agreements open new opportunities for businesses in both markets.',
                  image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&h=500&fit=crop&crop=center',
                  date: '2024-09-01',
                  readMoreLink: '/news/trade-agreement'
                },
                {
                  title: 'Tech Startup Success Stories in Korean Market',
                  summary: 'Indian tech companies achieving remarkable growth through strategic Korean partnerships.',
                  image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=500&fit=crop&crop=center',
                  date: '2024-08-28',
                  readMoreLink: '/news/tech-success'
                },
                {
                  title: 'Cultural Exchange Program Launch',
                  summary: 'New initiative to strengthen business relationships through cultural understanding.',
                  image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&h=500&fit=crop&crop=center',
                  date: '2024-08-25',
                  readMoreLink: '/news/cultural-exchange'
                }
              ]
            }
          }
        }
      }
    });

    // 6. Import BrandSection (Partner Logos)
    await prisma.section.create({
      data: {
        pageId: homePage.id,
        type: 'image',
        sortOrder: 6,
        isEnabled: true,
        config: {
          layout: 'logo_carousel'
        },
        translations: {
          create: {
            locale: 'en',
            content: {
              title: 'Trusted by Leading Companies',
              subtitle: 'We are proud to partner with industry leaders across Korea and India',
              logos: [
                { name: 'Samsung', image: 'https://via.placeholder.com/200x100/0052CC/FFFFFF?text=SAMSUNG' },
                { name: 'LG', image: 'https://via.placeholder.com/200x100/A50034/FFFFFF?text=LG' },
                { name: 'Hyundai', image: 'https://via.placeholder.com/200x100/002C5B/FFFFFF?text=HYUNDAI' },
                { name: 'SK Group', image: 'https://via.placeholder.com/200x100/EA1917/FFFFFF?text=SK+GROUP' },
                { name: 'KakaoTalk', image: 'https://via.placeholder.com/200x100/FFEB00/000000?text=KAKAO' },
                { name: 'Naver', image: 'https://via.placeholder.com/200x100/03C75A/FFFFFF?text=NAVER' },
                { name: 'Tata Group', image: 'https://via.placeholder.com/200x100/1F4E79/FFFFFF?text=TATA' },
                { name: 'Reliance', image: 'https://via.placeholder.com/200x100/FF6B35/FFFFFF?text=RELIANCE' },
                { name: 'Infosys', image: 'https://via.placeholder.com/200x100/0099CC/FFFFFF?text=INFOSYS' },
                { name: 'TCS', image: 'https://via.placeholder.com/200x100/004B87/FFFFFF?text=TCS' },
                { name: 'Wipro', image: 'https://via.placeholder.com/200x100/634F9B/FFFFFF?text=WIPRO' },
                { name: 'Tech Mahindra', image: 'https://via.placeholder.com/200x100/C1282C/FFFFFF?text=TECH+MAHINDRA' }
              ]
            }
          }
        }
      }
    });

    // 7. Import CTA Section (Contact Form)
    await prisma.section.create({
      data: {
        pageId: homePage.id,
        type: 'cta',
        sortOrder: 7,
        isEnabled: true,
        config: {
          hasContactForm: true
        },
        translations: {
          create: {
            locale: 'en',
            content: {
              title: 'Ready to Expand to Korean Markets?',
              subtitle: 'Get Started Today',
              description: 'Take the first step towards successful business expansion with our expert guidance and comprehensive support.',
              buttonText: 'Contact Us Now',
              buttonLink: '/contact',
              form: {
                fields: [
                  { name: 'name', label: 'Full Name', type: 'text', required: true },
                  { name: 'email', label: 'Email Address', type: 'email', required: true },
                  { name: 'company', label: 'Company Name', type: 'text', required: true },
                  { name: 'phone', label: 'Phone Number', type: 'tel', required: false },
                  { name: 'service', label: 'Service Interest', type: 'select', required: true, options: [
                    'Market Entry Strategy',
                    'Investment Facilitation', 
                    'B2B Partnership Development',
                    'Strategy Consultation',
                    'Digital Services'
                  ]},
                  { name: 'message', label: 'Message', type: 'textarea', required: true }
                ]
              }
            }
          }
        }
      }
    });

    console.log('✅ Complete home page content imported successfully!');
    return {
      success: true,
      message: 'Home page content imported with 7 sections: Hero Carousel, WhyStarajin, Services, TrackRecord, News, Brands, and CTA'
    };
  } catch (error) {
    console.error('❌ Import failed:', error);
    throw error;
  }
}
