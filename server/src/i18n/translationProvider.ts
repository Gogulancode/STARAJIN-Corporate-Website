import { TranslationProvider, TranslationRequest, TranslationResponse } from '../types/api';

/**
 * Mock translation provider for development and testing
 */
export class MockTranslationProvider implements TranslationProvider {
  name = 'MockTranslator';

  async translate(req: TranslationRequest): Promise<TranslationResponse> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 100));

    // Mock Korean translations for common business terms
    const mockTranslations: Record<string, string> = {
      'Welcome to STARAJIN': '스타라진에 오신 것을 환영합니다',
      'Corporate Solutions': '기업 솔루션',
      'Our Services': '우리의 서비스',
      'About Us': '회사 소개',
      'Contact': '연락처',
      'Latest News': '최신 뉴스',
      'Key Achievements': '주요 성과',
      'Projects': '프로젝트',
      'Learn More': '자세히 알아보기',
      'Get Started': '시작하기',
      'Read More': '더 읽기',
      'View All': '모두 보기',
      'Home': '홈',
      'Innovation': '혁신',
      'Excellence': '우수성',
      'Partnership': '파트너십',
      'Global': '글로벌',
      'Technology': '기술',
      'Solution': '솔루션',
      'Business': '비즈니스',
      'Strategy': '전략',
      'Development': '개발',
      'Management': '관리',
      'Consulting': '컨설팅',
      'Digital': '디지털',
      'Transformation': '변환',
      'Enterprise': '기업',
      'Software': '소프트웨어',
      'Platform': '플랫폼',
      'Integration': '통합',
      'Analytics': '분석',
      'Artificial Intelligence': '인공지능',
      'Machine Learning': '머신러닝',
      'Cloud Computing': '클라우드 컴퓨팅',
      'Data Science': '데이터 사이언스'
    };

    // Check for exact matches first
    const exactMatch = mockTranslations[req.text];
    if (exactMatch) {
      return {
        translatedText: exactMatch,
        confidence: 0.95,
        provider: this.name
      };
    }

    // For Korean to English, reverse lookup
    if (req.fromLang === 'ko' && req.toLang === 'en') {
      const reverseEntry = Object.entries(mockTranslations).find(([, korean]) => korean === req.text);
      if (reverseEntry) {
        return {
          translatedText: reverseEntry[0],
          confidence: 0.95,
          provider: this.name
        };
      }
    }

    // Simple word-by-word replacement for partial matches
    let translatedText = req.text;
    for (const [english, korean] of Object.entries(mockTranslations)) {
      if (req.fromLang === 'en' && req.toLang === 'ko') {
        translatedText = translatedText.replace(new RegExp(english, 'gi'), korean);
      } else if (req.fromLang === 'ko' && req.toLang === 'en') {
        translatedText = translatedText.replace(new RegExp(korean, 'gi'), english);
      }
    }

    // If no translation was made, add a prefix to indicate mock translation
    if (translatedText === req.text) {
      if (req.toLang === 'ko') {
        translatedText = `[KO] ${req.text}`;
      } else {
        translatedText = `[EN] ${req.text}`;
      }
    }

    return {
      translatedText,
      confidence: 0.7,
      provider: this.name
    };
  }
}

/**
 * Google Translate provider (placeholder for future implementation)
 */
export class GoogleTranslateProvider implements TranslationProvider {
  name = 'GoogleTranslate';
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async translate(req: TranslationRequest): Promise<TranslationResponse> {
    // TODO: Implement Google Translate API integration
    throw new Error('Google Translate provider not implemented yet');
  }
}

/**
 * Naver Papago provider (placeholder for future implementation)
 */
export class NaverPapagoProvider implements TranslationProvider {
  name = 'NaverPapago';
  private clientId: string;
  private clientSecret: string;

  constructor(clientId: string, clientSecret: string) {
    this.clientId = clientId;
    this.clientSecret = clientSecret;
  }

  async translate(req: TranslationRequest): Promise<TranslationResponse> {
    // TODO: Implement Naver Papago API integration
    throw new Error('Naver Papago provider not implemented yet');
  }
}

/**
 * OpenAI GPT provider (placeholder for future implementation)
 */
export class OpenAITranslateProvider implements TranslationProvider {
  name = 'OpenAITranslate';
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async translate(req: TranslationRequest): Promise<TranslationResponse> {
    // TODO: Implement OpenAI GPT translation integration
    throw new Error('OpenAI Translate provider not implemented yet');
  }
}

/**
 * Translation service that manages multiple providers
 */
class TranslationService {
  private providers: TranslationProvider[] = [];
  private defaultProvider: TranslationProvider;

  constructor() {
    // Initialize with mock provider as default
    this.defaultProvider = new MockTranslationProvider();
    this.providers.push(this.defaultProvider);
  }

  addProvider(provider: TranslationProvider): void {
    this.providers.push(provider);
  }

  setDefaultProvider(provider: TranslationProvider): void {
    this.defaultProvider = provider;
  }

  async translate(request: TranslationRequest, providerName?: string): Promise<TranslationResponse> {
    let provider = this.defaultProvider;

    if (providerName) {
      const namedProvider = this.providers.find(p => p.name === providerName);
      if (namedProvider) {
        provider = namedProvider;
      }
    }

    try {
      return await provider.translate(request);
    } catch (error) {
      // Fallback to mock provider if main provider fails
      if (provider !== this.defaultProvider) {
        console.warn(`Translation provider ${provider.name} failed, falling back to ${this.defaultProvider.name}`);
        return await this.defaultProvider.translate(request);
      }
      throw error;
    }
  }

  getAvailableProviders(): string[] {
    return this.providers.map(p => p.name);
  }
}

// Export singleton instance
export const translationService = new TranslationService();

// Initialize additional providers if API keys are available
if (process.env.GOOGLE_TRANSLATE_API_KEY) {
  const googleProvider = new GoogleTranslateProvider(process.env.GOOGLE_TRANSLATE_API_KEY);
  translationService.addProvider(googleProvider);
  translationService.setDefaultProvider(googleProvider);
}

if (process.env.NAVER_CLIENT_ID && process.env.NAVER_CLIENT_SECRET) {
  const naverProvider = new NaverPapagoProvider(
    process.env.NAVER_CLIENT_ID,
    process.env.NAVER_CLIENT_SECRET
  );
  translationService.addProvider(naverProvider);
}

if (process.env.OPENAI_API_KEY) {
  const openaiProvider = new OpenAITranslateProvider(process.env.OPENAI_API_KEY);
  translationService.addProvider(openaiProvider);
}
