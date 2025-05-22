import mixpanel from 'mixpanel-browser';

// Inicializar Mixpanel
mixpanel.init(process.env.NEXT_PUBLIC_MIXPANEL_TOKEN || '', {
  debug: process.env.NODE_ENV === 'development',
  track_pageview: true,
  persistence: 'localStorage'
});

// Tipos de eventos comunes
export enum AnalyticsEvent {
  PAGE_VIEW = 'Page View',
  BUTTON_CLICK = 'Button Click',
  FORM_SUBMIT = 'Form Submit',
  ERROR = 'Error',
  USER_ACTION = 'User Action'
}

// Interfaz para propiedades de eventos
interface EventProperties {
  [key: string]: string | number | boolean | null | undefined;
}

// Clase para manejar analytics
class Analytics {
  // Identificar usuario
  identify(userId: string, userProperties?: EventProperties) {
    mixpanel.identify(userId);
    if (userProperties) {
      mixpanel.people.set(userProperties);
    }
  }

  // Registrar evento
  track(event: AnalyticsEvent, properties?: EventProperties) {
    mixpanel.track(event, properties);
  }

  // Registrar página vista
  trackPageView(pageName: string, properties?: EventProperties) {
    this.track(AnalyticsEvent.PAGE_VIEW, {
      page: pageName,
      ...properties
    });
  }

  // Registrar error
  trackError(error: Error, properties?: EventProperties) {
    this.track(AnalyticsEvent.ERROR, {
      error: error.message,
      stack: error.stack,
      ...properties
    });
  }

  // Resetear usuario
  reset() {
    mixpanel.reset();
  }
}

// Exportar instancia única
export const analytics = new Analytics();
