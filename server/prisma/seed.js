"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const password_1 = require("../src/auth/password");
const prisma = new client_1.PrismaClient();
async function main() {
    console.log('🌱 Starting database seeding...');
    console.log('🧹 Clearing existing data...');
    await prisma.sectionTranslation.deleteMany();
    await prisma.section.deleteMany();
    await prisma.pageTranslation.deleteMany();
    await prisma.page.deleteMany();
    await prisma.menuTranslation.deleteMany();
    await prisma.menu.deleteMany();
    await prisma.mediaTranslation.deleteMany();
    await prisma.media.deleteMany();
    await prisma.user.deleteMany();
    console.log('👤 Creating admin user...');
    const adminPassword = await (0, password_1.hashPassword)('admin123456');
    const admin = await prisma.user.create({
        data: {
            email: 'admin@starajin.com',
            passwordHash: adminPassword,
            firstName: 'Admin',
            lastName: 'User',
            role: 'ADMIN',
            isActive: true
        }
    });
    const editorPassword = await (0, password_1.hashPassword)('editor123456');
    const editor = await prisma.user.create({
        data: {
            email: 'editor@starajin.com',
            passwordHash: editorPassword,
            firstName: 'Editor',
            lastName: 'User',
            role: 'EDITOR',
            isActive: true
        }
    });
    console.log('✅ Users created:', {
        admin: admin.email,
        editor: editor.email
    });
    console.log('📸 Creating sample media...');
    const heroImage = await prisma.media.create({
        data: {
            filename: 'hero-image.jpg',
            storedFilename: 'hero-image.jpg',
            url: '/uploads/hero-image.jpg',
            mime: 'image/jpeg',
            size: 1024000,
            width: 1920,
            height: 1080,
            translations: {
                create: [
                    { locale: 'en', altText: 'STARAJIN Corporate Hero Image' },
                    { locale: 'ko', altText: '스타라진 기업 히어로 이미지' }
                ]
            }
        }
    });
    console.log('📄 Creating pages...');
    const homePage = await prisma.page.create({
        data: {
            key: 'home',
            slug: '/',
            isEnabled: true,
            translations: {
                create: [
                    {
                        locale: 'en',
                        title: 'STARAJIN - Corporate Solutions',
                        seoTitle: 'STARAJIN | Leading Corporate Solutions Provider',
                        seoDesc: 'STARAJIN provides innovative corporate solutions and business strategies to help your company grow and succeed in the global market.'
                    },
                    {
                        locale: 'ko',
                        title: '스타라진 - 기업 솔루션',
                        seoTitle: '스타라진 | 선도적인 기업 솔루션 제공업체',
                        seoDesc: '스타라진은 혁신적인 기업 솔루션과 비즈니스 전략을 제공하여 귀하의 회사가 글로벌 시장에서 성장하고 성공할 수 있도록 돕습니다.'
                    }
                ]
            }
        }
    });
    const aboutPage = await prisma.page.create({
        data: {
            key: 'about',
            slug: '/about',
            isEnabled: true,
            translations: {
                create: [
                    {
                        locale: 'en',
                        title: 'About STARAJIN',
                        seoTitle: 'About Us | STARAJIN Corporate Solutions',
                        seoDesc: 'Learn about STARAJIN\'s mission, vision, and commitment to delivering exceptional corporate solutions worldwide.'
                    },
                    {
                        locale: 'ko',
                        title: '스타라진 소개',
                        seoTitle: '회사 소개 | 스타라진 기업 솔루션',
                        seoDesc: '스타라진의 사명, 비전, 그리고 전 세계적으로 뛰어난 기업 솔루션을 제공하겠다는 약속에 대해 알아보세요.'
                    }
                ]
            }
        }
    });
    const contactPage = await prisma.page.create({
        data: {
            key: 'contact',
            slug: '/contact',
            isEnabled: true,
            translations: {
                create: [
                    {
                        locale: 'en',
                        title: 'Contact STARAJIN',
                        seoTitle: 'Contact Us | STARAJIN',
                        seoDesc: 'Get in touch with STARAJIN for business inquiries, partnerships, or more information about our services.'
                    },
                    {
                        locale: 'ko',
                        title: '스타라진 연락처',
                        seoTitle: '연락처 | 스타라진',
                        seoDesc: '비즈니스 문의, 파트너십 또는 서비스에 대한 자세한 정보는 스타라진에 문의하세요.'
                    }
                ]
            }
        }
    });
    console.log('✅ Pages created:', {
        home: homePage.key,
        about: aboutPage.key,
        contact: contactPage.key
    });
    console.log('📑 Creating sections...');
    const heroSection = await prisma.section.create({
        data: {
            pageId: homePage.id,
            type: 'hero',
            isEnabled: true,
            sortOrder: 1,
            config: {
                variant: 'center',
                theme: 'light'
            },
            translations: {
                create: [
                    {
                        locale: 'en',
                        content: {
                            heading: 'Welcome to STARAJIN',
                            subheading: 'Leading the future with innovative corporate solutions',
                            image: {
                                mediaId: heroImage.id,
                                url: heroImage.url,
                                alt: 'STARAJIN Corporate Hero Image'
                            },
                            ctas: [
                                {
                                    text: 'Our Services',
                                    href: '/services',
                                    style: 'primary'
                                },
                                {
                                    text: 'Learn More',
                                    href: '/about',
                                    style: 'secondary'
                                }
                            ]
                        }
                    },
                    {
                        locale: 'ko',
                        content: {
                            heading: '스타라진에 오신 것을 환영합니다',
                            subheading: '혁신적인 기업 솔루션으로 미래를 선도합니다',
                            image: {
                                mediaId: heroImage.id,
                                url: heroImage.url,
                                alt: '스타라진 기업 히어로 이미지'
                            },
                            ctas: [
                                {
                                    text: '우리의 서비스',
                                    href: '/services',
                                    style: 'primary'
                                },
                                {
                                    text: '자세히 알아보기',
                                    href: '/about',
                                    style: 'secondary'
                                }
                            ]
                        }
                    }
                ]
            }
        }
    });
    const servicesSection = await prisma.section.create({
        data: {
            pageId: homePage.id,
            type: 'services',
            isEnabled: true,
            sortOrder: 2,
            config: {
                columns: 3
            },
            translations: {
                create: [
                    {
                        locale: 'en',
                        content: {
                            heading: 'Our Services',
                            subheading: 'Comprehensive solutions for your business needs',
                            items: [
                                {
                                    icon: '🚀',
                                    title: 'Digital Transformation',
                                    summary: 'Modernize your business with cutting-edge digital solutions',
                                    href: '/services/digital-transformation'
                                },
                                {
                                    icon: '💼',
                                    title: 'Business Consulting',
                                    summary: 'Strategic guidance to optimize your business operations',
                                    href: '/services/consulting'
                                },
                                {
                                    icon: '⚡',
                                    title: 'Technology Integration',
                                    summary: 'Seamlessly integrate new technologies into your workflow',
                                    href: '/services/integration'
                                }
                            ],
                            ctas: [
                                {
                                    text: 'View All Services',
                                    href: '/services',
                                    style: 'primary'
                                }
                            ]
                        }
                    },
                    {
                        locale: 'ko',
                        content: {
                            heading: '우리의 서비스',
                            subheading: '비즈니스 요구사항에 맞는 종합적인 솔루션',
                            items: [
                                {
                                    icon: '🚀',
                                    title: '디지털 전환',
                                    summary: '최첨단 디지털 솔루션으로 비즈니스를 현대화하세요',
                                    href: '/services/digital-transformation'
                                },
                                {
                                    icon: '💼',
                                    title: '비즈니스 컨설팅',
                                    summary: '비즈니스 운영을 최적화하기 위한 전략적 지침',
                                    href: '/services/consulting'
                                },
                                {
                                    icon: '⚡',
                                    title: '기술 통합',
                                    summary: '새로운 기술을 워크플로우에 원활하게 통합',
                                    href: '/services/integration'
                                }
                            ],
                            ctas: [
                                {
                                    text: '모든 서비스 보기',
                                    href: '/services',
                                    style: 'primary'
                                }
                            ]
                        }
                    }
                ]
            }
        }
    });
    const contactSection = await prisma.section.create({
        data: {
            pageId: contactPage.id,
            type: 'contact',
            isEnabled: true,
            sortOrder: 1,
            config: {
                layout: 'horizontal',
                showMap: false
            },
            translations: {
                create: [
                    {
                        locale: 'en',
                        content: {
                            heading: 'Get in Touch',
                            subheading: 'Ready to transform your business? Contact us today.',
                            addresses: [
                                {
                                    title: 'Seoul Office',
                                    lines: [
                                        'STARAJIN Corporation',
                                        '123 Business District',
                                        'Gangnam-gu, Seoul 06292',
                                        'South Korea'
                                    ]
                                }
                            ],
                            phones: [
                                {
                                    label: 'Main Office',
                                    number: '+82-2-1234-5678'
                                },
                                {
                                    label: 'Business Inquiries',
                                    number: '+82-2-1234-5679'
                                }
                            ],
                            emails: [
                                {
                                    label: 'General Inquiries',
                                    address: 'info@starajin.com'
                                },
                                {
                                    label: 'Business Development',
                                    address: 'business@starajin.com'
                                }
                            ]
                        }
                    },
                    {
                        locale: 'ko',
                        content: {
                            heading: '연락처',
                            subheading: '비즈니스 혁신을 준비하셨나요? 오늘 저희에게 연락하세요.',
                            addresses: [
                                {
                                    title: '서울 사무소',
                                    lines: [
                                        '스타라진 코퍼레이션',
                                        '비즈니스 디스트릭트 123',
                                        '서울시 강남구 06292',
                                        '대한민국'
                                    ]
                                }
                            ],
                            phones: [
                                {
                                    label: '본사',
                                    number: '+82-2-1234-5678'
                                },
                                {
                                    label: '비즈니스 문의',
                                    number: '+82-2-1234-5679'
                                }
                            ],
                            emails: [
                                {
                                    label: '일반 문의',
                                    address: 'info@starajin.com'
                                },
                                {
                                    label: '비즈니스 개발',
                                    address: 'business@starajin.com'
                                }
                            ]
                        }
                    }
                ]
            }
        }
    });
    console.log('🧭 Creating navigation menus...');
    const headerMenu = await prisma.menu.create({
        data: {
            key: 'header',
            isEnabled: true,
            translations: {
                create: [
                    {
                        locale: 'en',
                        items: [
                            { label: 'Home', href: '/', newTab: false },
                            { label: 'About', href: '/about', newTab: false },
                            { label: 'Services', href: '/services', newTab: false },
                            { label: 'Projects', href: '/projects', newTab: false },
                            { label: 'Contact', href: '/contact', newTab: false }
                        ]
                    },
                    {
                        locale: 'ko',
                        items: [
                            { label: '홈', href: '/', newTab: false },
                            { label: '회사 소개', href: '/about', newTab: false },
                            { label: '서비스', href: '/services', newTab: false },
                            { label: '프로젝트', href: '/projects', newTab: false },
                            { label: '연락처', href: '/contact', newTab: false }
                        ]
                    }
                ]
            }
        }
    });
    const footerMenu = await prisma.menu.create({
        data: {
            key: 'footer',
            isEnabled: true,
            translations: {
                create: [
                    {
                        locale: 'en',
                        items: [
                            {
                                label: 'Company',
                                href: '#',
                                newTab: false,
                                children: [
                                    { label: 'About Us', href: '/about', newTab: false },
                                    { label: 'Our Team', href: '/team', newTab: false },
                                    { label: 'Careers', href: '/careers', newTab: false }
                                ]
                            },
                            {
                                label: 'Services',
                                href: '#',
                                newTab: false,
                                children: [
                                    { label: 'Digital Transformation', href: '/services/digital', newTab: false },
                                    { label: 'Consulting', href: '/services/consulting', newTab: false },
                                    { label: 'Integration', href: '/services/integration', newTab: false }
                                ]
                            },
                            {
                                label: 'Resources',
                                href: '#',
                                newTab: false,
                                children: [
                                    { label: 'News', href: '/news', newTab: false },
                                    { label: 'Case Studies', href: '/case-studies', newTab: false },
                                    { label: 'White Papers', href: '/resources', newTab: false }
                                ]
                            }
                        ]
                    },
                    {
                        locale: 'ko',
                        items: [
                            {
                                label: '회사',
                                href: '#',
                                newTab: false,
                                children: [
                                    { label: '회사 소개', href: '/about', newTab: false },
                                    { label: '팀 소개', href: '/team', newTab: false },
                                    { label: '채용 정보', href: '/careers', newTab: false }
                                ]
                            },
                            {
                                label: '서비스',
                                href: '#',
                                newTab: false,
                                children: [
                                    { label: '디지털 전환', href: '/services/digital', newTab: false },
                                    { label: '컨설팅', href: '/services/consulting', newTab: false },
                                    { label: '통합', href: '/services/integration', newTab: false }
                                ]
                            },
                            {
                                label: '리소스',
                                href: '#',
                                newTab: false,
                                children: [
                                    { label: '뉴스', href: '/news', newTab: false },
                                    { label: '사례 연구', href: '/case-studies', newTab: false },
                                    { label: '백서', href: '/resources', newTab: false }
                                ]
                            }
                        ]
                    }
                ]
            }
        }
    });
    console.log('✅ Navigation menus created:', {
        header: headerMenu.key,
        footer: footerMenu.key
    });
    console.log('🎉 Database seeding completed successfully!');
    console.log('\n📝 Login credentials:');
    console.log('Admin: admin@starajin.com / admin123456');
    console.log('Editor: editor@starajin.com / editor123456');
}
main()
    .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map