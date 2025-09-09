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
              title: 'Business Data & Analysis',
              description: 'Comprehensive market research, data analysis, and business intelligence for informed decisions.',
              image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop&crop=center',
              readMoreText: 'Read Article'
            }
          ]
        }
      }
    });

    // 4. Import Track Record Section (Achievement Categories with Images)
    await prisma.section.create({
      data: {
        pageId: homePage.id,
        type: 'stats',
        sortOrder: 4,
        isEnabled: true,
        config: {
          title: 'Our Track Record',
          subtitle: 'Proven Success Across Industries',
          description: 'Our comprehensive track record demonstrates our commitment to delivering exceptional results across various industries and market segments.',
          layout: 'achievements',
          hasCategories: true,
          categories: [
            {
              id: 1,
              category: 'Market Entry',
              icon: 'building',
              image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=500&fit=crop',
              items: [
                {
                  title: 'Technology Sector Entry',
                  description: 'Successfully facilitated entry of 15+ tech companies into Korean market'
                },
                {
                  title: 'Manufacturing Partnerships',
                  description: 'Established strategic manufacturing partnerships for 20+ companies'
                }
              ],
              stats: [
                { number: '35+', label: 'Companies Entered' },
                { number: '$50M+', label: 'Investment Facilitated' }
              ]
            },
            {
              id: 2,
              category: 'Investment Success',
              icon: 'trending-up',
              image: 'https://images.unsplash.com/photo-1559081842-52d318327c08?w=800&h=500&fit=crop',
              items: [
                {
                  title: 'Venture Capital Connections',
                  description: 'Connected startups with leading Korean VC firms'
                },
                {
                  title: 'Private Equity Deals',
                  description: 'Facilitated major PE investments in Indian companies'
                }
              ],
              stats: [
                { number: '95%', label: 'Success Rate' },
                { number: '$100M+', label: 'Total Investment' }
              ]
            }
          ]
        }
      }
    });

    // 5. Import News Section (Latest Updates)
    await prisma.section.create({
      data: {
        pageId: homePage.id,
        type: 'text',
        sortOrder: 5,
        isEnabled: true,
        config: {
          title: 'Latest Updates',
          subtitle: 'Stay informed about Korea-India business trends',
          description: 'Keep up with the latest developments, success stories, and opportunities in Korea-India business partnerships.',
          layout: 'news',
          hasDateBadge: false,
          news: [
            {
              title: 'Korea-India Trade Relations Strengthen',
              description: 'New bilateral agreements open doors for enhanced business cooperation and expanded market opportunities.',
              date: '2025-09-01',
              image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=500&fit=crop',
              readTime: '3 min read'
            },
            {
              title: 'Successful Market Entry: Korean Tech Giant',
              description: 'Major Korean technology company successfully enters Indian market with our comprehensive guidance.',
              date: '2025-08-28',
              image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop',
              readTime: '5 min read'
            },
            {
              title: 'Cultural Exchange Program Launch',
              description: 'New program facilitates cultural understanding and business relationship building between Korean and Indian companies.',
              date: '2025-08-25',
              image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&h=500&fit=crop',
              readTime: '4 min read'
            }
          ]
        }
      }
    });

    // 6. Import Brand/Partners Section (Trusted Companies)
    await prisma.section.create({
      data: {
        pageId: homePage.id,
        type: 'image',
        sortOrder: 6,
        isEnabled: true,
        config: {
          title: 'Trusted by Leading Companies',
          subtitle: 'Partners who trust us for their Korea-India expansion',
          description: 'We are proud to work with industry leaders and innovative companies across various sectors.',
          layout: 'logo_carousel',
          autoPlay: true,
          showNavigation: true,
          logos: [
            {
              name: 'Partner 1',
              logo: '/logos/logo_01.png',
              alt: 'Leading Technology Partner'
            },
            {
              name: 'Partner 2', 
              logo: '/logos/logo_02.png',
              alt: 'Manufacturing Excellence Partner'
            },
            {
              name: 'Partner 3',
              logo: '/logos/logo_03.png',
              alt: 'Financial Services Partner'
            },
            {
              name: 'Partner 4',
              logo: '/logos/logo_04.png',
              alt: 'Healthcare Innovation Partner'
            },
            {
              name: 'Partner 5',
              logo: '/logos/logo_05.png',
              alt: 'Automotive Industry Partner'
            },
            {
              name: 'Partner 6',
              logo: '/logos/logo_06.png',
              alt: 'Consumer Goods Partner'
            },
            {
              name: 'Partner 7',
              logo: '/logos/logo_07.png',
              alt: 'Energy Sector Partner'
            },
            {
              name: 'Partner 8',
              logo: '/logos/logo_08.png',
              alt: 'Logistics Partner'
            },
            {
              name: 'Partner 9',
              logo: '/logos/logo_09.png',
              alt: 'Real Estate Partner'
            },
            {
              name: 'Partner 10',
              logo: '/logos/logo_10.png',
              alt: 'Education Partner'
            },
            {
              name: 'Partner 11',
              logo: '/logos/logo_11.png',
              alt: 'Entertainment Partner'
            },
            {
              name: 'Partner 12',
              logo: '/logos/logo_12.png',
              alt: 'Agriculture Partner'
            }
          ]
        }
      }
    });

    // 7. Import CTA Section (Call to Action with Form)
    await prisma.section.create({
      data: {
        pageId: homePage.id,
        type: 'cta',
        sortOrder: 7,
        isEnabled: true,
        config: {
          title: 'Ready to Expand Your Business?',
          subtitle: 'Begin Your Korean Market Expansion Journey with STARAJIN',
          description: 'Join hundreds of successful companies that have expanded into Korean markets with our expert guidance and proven strategies.',
          buttonText: 'Get Started Today',
          buttonLink: '/contact',
          secondaryButtonText: 'Schedule Consultation',
          secondaryButtonLink: '/contact',
          hasContactForm: true,
          hasBackgroundElements: true,
          benefits: [
            'Expert market analysis and strategic planning',
            'Cultural bridge for seamless business relationships', 
            'Regulatory and compliance support',
            'Proven track record of successful expansions'
          ],
          backgroundImage: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
          contactForm: {
            title: 'Quick Consultation Request',
            subtitle: 'Get expert advice tailored to your business needs',
            fields: [
              { name: 'name', placeholder: 'Your Name', type: 'text', required: true },
              { name: 'company', placeholder: 'Company Name', type: 'text', required: true },
              { name: 'email', placeholder: 'Email Address', type: 'email', required: true },
              { name: 'service', placeholder: 'Select Service Interest', type: 'select', required: true, options: [
                'Market Entry Strategy',
                'Investment Facilitation', 
                'Business Consulting',
                'Cultural Exchange',
                'Other'
              ]},
              { name: 'message', placeholder: 'Tell us about your goals...', type: 'textarea', required: false }
            ],
            submitText: 'Request Consultation',
            privacyText: 'Your information is secure and confidential'
          }
        }
      }
    });

    console.log('✅ Complete home page content imported successfully!');
    return { success: true, message: 'Complete home page content imported successfully with exact frontend structure' };

  } catch (error) {
    console.error('❌ Error importing home page content:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}
