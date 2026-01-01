/**
 * Analytics Tracker for Vyxo CODEX
 * Tracks user events and sends them to the analytics API
 */

const ANALYTICS_API_URL = process.env.NEXT_PUBLIC_ANALYTICS_API_URL || 'http://localhost:3005';

interface TrackingEvent {
  eventType: string;
  userId?: string;
  sessionId: string;
  page?: string;
  referrer?: string;
  eventData?: Record<string, any>;
}

class AnalyticsTracker {
  private sessionId: string;
  private userId: string | null = null;

  constructor() {
    this.sessionId = this.getOrCreateSessionId();
  }

  /**
   * Initialize tracker with user info
   */
  initialize(userId?: string) {
    if (userId) {
      this.userId = userId;
    }
    
    // Track initial page view
    if (typeof window !== 'undefined') {
      this.pageView();
    }
  }

  /**
   * Set user ID
   */
  setUserId(userId: string) {
    this.userId = userId;
  }

  /**
   * Get or create session ID
   */
  private getOrCreateSessionId(): string {
    if (typeof window === 'undefined') {
      return 'server-side';
    }

    let sessionId = sessionStorage.getItem('vyxo_session_id');
    
    if (!sessionId) {
      sessionId = `sess_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      sessionStorage.setItem('vyxo_session_id', sessionId);
    }
    
    return sessionId;
  }

  /**
   * Track an event
   */
  async track(eventType: string, eventData?: Record<string, any>): Promise<void> {
    if (typeof window === 'undefined') {
      return; // Don't track on server side
    }

    const event: TrackingEvent = {
      eventType,
      sessionId: this.sessionId,
      page: window.location.pathname,
      referrer: document.referrer || undefined,
      eventData,
    };

    if (this.userId) {
      event.userId = this.userId;
    }

    try {
      const response = await fetch(`${ANALYTICS_API_URL}/api/track`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(event),
      });

      if (!response.ok) {
        console.warn('Analytics tracking failed:', response.status);
      }
    } catch (error) {
      // Silently fail - don't break the app for analytics
      console.warn('Analytics tracking error:', error);
    }
  }

  /**
   * Track page view
   */
  pageView(path?: string) {
    this.track('page_view', {
      path: path || (typeof window !== 'undefined' ? window.location.pathname : ''),
      title: typeof document !== 'undefined' ? document.title : '',
    });
  }

  /**
   * Track module started
   */
  moduleStarted(moduleId: string, moduleName: string) {
    this.track('module_started', {
      moduleId,
      moduleName,
    });
  }

  /**
   * Track module completed
   */
  moduleCompleted(moduleId: string, moduleName: string, duration?: number) {
    this.track('module_completed', {
      moduleId,
      moduleName,
      duration,
    });
  }

  /**
   * Track module viewed
   */
  moduleViewed(moduleId: string, moduleName: string) {
    this.track('module_viewed', {
      moduleId,
      moduleName,
    });
  }

  /**
   * Track lesson completed
   */
  lessonCompleted(lessonId: string, lessonName: string, moduleId: string) {
    this.track('lesson_completed', {
      lessonId,
      lessonName,
      moduleId,
    });
  }

  /**
   * Track quiz started
   */
  quizStarted(quizId: string, quizName: string) {
    this.track('quiz_started', {
      quizId,
      quizName,
    });
  }

  /**
   * Track quiz completed
   */
  quizCompleted(quizId: string, quizName: string, score: number, correct: number, total: number, duration?: number) {
    this.track('quiz_completed', {
      quizId,
      quizName,
      score,
      correct,
      total,
      duration,
    });
  }

  /**
   * Track certification obtained
   */
  certificationObtained(certificationId: string, certificationName: string) {
    this.track('certification_obtained', {
      certificationId,
      certificationName,
    });
  }

  /**
   * Track assessment started
   */
  assessmentStarted(assessmentId: string) {
    this.track('assessment_started', {
      assessmentId,
    });
  }

  /**
   * Track assessment completed
   */
  assessmentCompleted(assessmentId: string, score: number, gaps: number) {
    this.track('assessment_completed', {
      assessmentId,
      score,
      gaps,
    });
  }

  /**
   * Track user login
   */
  userLogin() {
    this.track('user_login', {
      userId: this.userId,
    });
  }

  /**
   * Track user logout
   */
  userLogout() {
    this.track('user_logout', {
      userId: this.userId,
    });
  }

  /**
   * Track search
   */
  search(query: string, resultsCount: number) {
    this.track('search', {
      query,
      resultsCount,
    });
  }

  /**
   * Track button click
   */
  buttonClick(buttonId: string, buttonLabel: string) {
    this.track('button_click', {
      buttonId,
      buttonLabel,
    });
  }

  // ===== DEMO FUNNEL TRACKING =====
  
  /**
   * Track demo vertical selection
   */
  demoVerticalSelected(vertical: string, verticalName: string) {
    this.track('demo_vertical_selected', {
      vertical,
      verticalName,
      step: 1,
      funnel: 'demo',
    });
  }

  /**
   * Track demo certification selection
   */
  demoCertificationSelected(certificationId: string, certificationName: string, vertical: string) {
    this.track('demo_certification_selected', {
      certificationId,
      certificationName,
      vertical,
      step: 2,
      funnel: 'demo',
    });
  }

  /**
   * Track demo form started
   */
  demoFormStarted(certificationId: string) {
    this.track('demo_form_started', {
      certificationId,
      step: 3,
      funnel: 'demo',
    });
  }

  /**
   * Track demo form completed
   */
  demoFormCompleted(certificationId: string, formData: { name?: string; company?: string; objective?: string }) {
    this.track('demo_form_completed', {
      certificationId,
      hasName: !!formData.name,
      hasCompany: !!formData.company,
      hasObjective: !!formData.objective,
      step: 4,
      funnel: 'demo',
    });
  }

  /**
   * Track demo assessment started
   */
  demoAssessmentStarted(certificationId: string, certificationName: string) {
    this.track('demo_assessment_started', {
      certificationId,
      certificationName,
      step: 5,
      funnel: 'demo',
    });
  }

  /**
   * Track demo assessment completed
   */
  demoAssessmentCompleted(certificationId: string, score: number, maturityLevel: string, gaps: number) {
    this.track('demo_assessment_completed', {
      certificationId,
      score,
      maturityLevel,
      gaps,
      step: 6,
      funnel: 'demo',
    });
  }

  /**
   * Track demo PDF downloaded
   */
  demoPdfDownloaded(certificationId: string, score: number) {
    this.track('demo_pdf_downloaded', {
      certificationId,
      score,
      step: 7,
      funnel: 'demo',
    });
  }

  /**
   * Track demo account created
   */
  demoAccountCreated(certificationId: string, email?: string) {
    this.track('demo_account_created', {
      certificationId,
      hasEmail: !!email,
      step: 8,
      funnel: 'demo',
    });
  }

  /**
   * Track pricing view
   */
  pricingViewed(source?: string) {
    this.track('pricing_viewed', {
      source: source || 'direct',
    });
  }

  /**
   * Track pricing plan selected
   */
  pricingPlanSelected(planName: string, billingPeriod: 'monthly' | 'annual') {
    this.track('pricing_plan_selected', {
      planName,
      billingPeriod,
    });
  }

  /**
   * Track CTA click
   */
  ctaClicked(ctaId: string, ctaLabel: string, location: string) {
    this.track('cta_clicked', {
      ctaId,
      ctaLabel,
      location,
    });
  }
}

// Singleton instance
export const analyticsTracker = new AnalyticsTracker();

// React hook for using the tracker
export function useAnalytics() {
  return analyticsTracker;
}

// Default export
export default analyticsTracker;
