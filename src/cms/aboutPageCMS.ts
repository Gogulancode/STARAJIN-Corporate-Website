// CMS Content Management for About Page
// This file provides a centralized location for managing About page content

export interface AboutHeroContent {
  title: string;
  breadcrumb: {
    home: string;
    current: string;
  };
  backgroundImage: string;
}

export interface AboutMissionSection {
  title: string;
  subtitle: string;
  description: string;
  mission: {
    title: string;
    tagline: string;
    subtitle: string;
    description: string;
  };
  vision: {
    title: string;
    tagline: string;
    subtitle: string;
    description: string;
  };
  coreValues: {
    title: string;
    tagline: string;
    subtitle: string;
    description: string;
  };
  cta: string;
}

export interface AboutAchievement {
  key: string;
  value: string;
  description: string;
  icon: string;
}

export interface AboutPageCMS {
  hero: AboutHeroContent;
  missionSection: AboutMissionSection;
  achievements: {
    title: string;
    subtitle: string;
    items: AboutAchievement[];
  };
  mission: {
    title: string;
    description: string;
  };
  vision: {
    title: string;
    description: string;
  };
  capabilities: {
    title: string;
    items: string[];
  };
}

// Default CMS Content - This can be easily modified or connected to a headless CMS
export const defaultAboutPageCMS: AboutPageCMS = {
  hero: {
    title: "About Us",
    breadcrumb: {
      home: "Home",
      current: "About Us"
    },
    backgroundImage: "https://images.pexels.com/photos/3183183/pexels-photo-3183183.jpeg"
  },
  missionSection: {
    title: "Empowering Your Financial Journey",
    subtitle: "with Clarity and Confidence",
    description: "We're a team of expert consultants committed to helping businesses and individuals make smarter financial decisions with tailored strategies and trusted guidance",
    mission: {
      title: "Our Mission",
      tagline: "Beyond Entering market, Building Excellence in India",
      subtitle: "Driven by Purpose, Guided by Results",
      description: "Our mission is simple — to simplify complex financial challenges and provide actionable solutions that help our clients grow, protect, and manage their wealth with confidence"
    },
    vision: {
      title: "Our Vision",
      tagline: "Supporting sustainable growth and successful market entry for Korean companies in India",
      subtitle: "Built on Trust, Backed by Experience",
      description: "Founded by industry veterans, our consulting firm started with a passion for empowering businesses to thrive financially. Over the years, we've worked with startups"
    },
    coreValues: {
      title: "Our Core Value",
      tagline: "Bridging | Expertise | Innovation | Sustainability | Trust",
      subtitle: "The Principles That Guide Every Step We Take",
      description: "At the heart of our consulting practice lies a clear set of values that shape every relationship, decision, and solution we deliver. These principles are more"
    },
    cta: "Free Consultation"
  },
  achievements: {
    title: "Our Key Achievements",
    subtitle: "Proven track record of success across Korea and India",
    items: [
      {
        key: "incorporations",
        value: "50+",
        description: "Company Incorporations",
        icon: "Building"
      },
      {
        key: "partners",
        value: "200+",
        description: "Business Partners",
        icon: "Users"
      },
      {
        key: "strategies",
        value: "100+",
        description: "Market Entry Strategies",
        icon: "Target"
      },
      {
        key: "jvDueDiligence",
        value: "75+",
        description: "JV & Due Diligence Projects",
        icon: "Handshake"
      },
      {
        key: "consultations",
        value: "500+",
        description: "Strategic Consultations",
        icon: "Award"
      },
      {
        key: "thoughtLeadership",
        value: "25+",
        description: "Thought Leadership Publications",
        icon: "Globe"
      }
    ]
  },
  mission: {
    title: "Our Mission",
    description: "To empower businesses by providing expert guidance and cultural insights for successful expansion between Korea and India."
  },
  vision: {
    title: "Our Vision",
    description: "To be the leading consulting firm facilitating Korea-India business partnerships and cultural exchange."
  },
  capabilities: {
    title: "Our Capabilities",
    items: [
      "Ease market entry barriers with local expertise",
      "Customized strategies for your business goals",
      "Extensive networks across government and industry",
      "End-to-end HR and operational support"
    ]
  }
};

// CMS Helper Functions
export const getAboutPageContent = (locale: string = 'en'): AboutPageCMS => {
  // In a real implementation, this would fetch from a CMS API
  // For now, we'll use the default content with potential locale variations
  return defaultAboutPageCMS;
};

export const updateAboutPageContent = (content: Partial<AboutPageCMS>): AboutPageCMS => {
  // In a real implementation, this would update the CMS
  return { ...defaultAboutPageCMS, ...content };
};

// SEO Meta Data for About Page
export interface AboutPageSEO {
  title: string;
  description: string;
  keywords: string[];
  ogImage: string;
  canonicalUrl: string;
}

export const aboutPageSEO: AboutPageSEO = {
  title: "About STARAJIN - Korea India Business Consulting | Company Overview",
  description: "Learn about STARAJIN, the leading Korea-India business consulting firm. Founded in 2020, we bridge Korean innovation with Indian market opportunities through expert consulting and cultural exchange.",
  keywords: [
    "STARAJIN",
    "Korea India business",
    "consulting firm",
    "market entry",
    "cultural exchange",
    "business expansion",
    "Korean companies in India",
    "Indian companies in Korea"
  ],
  ogImage: "/images/about-starajin-og.jpg",
  canonicalUrl: "https://starajin.com/about"
};