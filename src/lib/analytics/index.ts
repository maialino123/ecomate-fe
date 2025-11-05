/**
 * Analytics Tracking Utilities
 * Track events, conversions, and user interactions
 */

export type EventName =
  | 'page_view'
  | 'email_submit'
  | 'cta_click'
  | 'feature_view'
  | 'variant_assigned';

export interface EventData {
  event: EventName;
  variant?: string;
  properties?: Record<string, any>;
  timestamp?: number;
}

/**
 * Track an analytics event
 */
export function trackEvent(eventName: EventName, properties?: Record<string, any>) {
  const eventData: EventData = {
    event: eventName,
    properties,
    timestamp: Date.now(),
  };

  // Console log for development
  if (process.env.NODE_ENV === 'development') {
    console.log('📊 Analytics Event:', eventData);
  }

  // TODO: Send to your analytics service
  // Examples:
  // - Google Analytics 4
  // - Mixpanel
  // - Amplitude
  // - PostHog
  // - Custom backend

  // Example: Google Analytics 4
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', eventName, properties);
  }

  // Example: Custom backend
  if (typeof window !== 'undefined') {
    fetch('/api/analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(eventData),
    }).catch(err => {
      console.error('Failed to track event:', err);
    });
  }
}

/**
 * Track page view with variant info
 */
export function trackPageView(variant?: string) {
  trackEvent('page_view', { variant });
}

/**
 * Track conversion (email submission)
 */
export function trackConversion(variant: string, email?: string) {
  trackEvent('email_submit', {
    variant,
    email_domain: email ? email.split('@')[1] : undefined,
  });
}

/**
 * Track CTA click
 */
export function trackCTAClick(variant: string, ctaLocation: string) {
  trackEvent('cta_click', {
    variant,
    location: ctaLocation,
  });
}

/**
 * Track variant assignment
 */
export function trackVariantAssignment(variant: string) {
  trackEvent('variant_assigned', { variant });
}
