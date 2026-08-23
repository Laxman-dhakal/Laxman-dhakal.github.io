const STORAGE_KEY = 'laxman_portfolio_analytics';

const defaultAnalytics = {
  visits: 0,
  pageViews: 0,
  messages: 0,
  lastVisit: null,
  pages: {}
};

const readAnalytics = () => {
  try {
    return { ...defaultAnalytics, ...JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}') };
  } catch {
    return { ...defaultAnalytics };
  }
};

const writeAnalytics = (analytics) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(analytics));
  return analytics;
};

export const trackPageView = (path) => {
  const analytics = readAnalytics();
  const isNewVisit = !sessionStorage.getItem('laxman_analytics_session');
  if (isNewVisit) {
    analytics.visits += 1;
    sessionStorage.setItem('laxman_analytics_session', 'true');
  }
  analytics.pageViews += 1;
  analytics.lastVisit = new Date().toISOString();
  analytics.pages[path] = (analytics.pages[path] || 0) + 1;
  return writeAnalytics(analytics);
};

export const trackMessage = () => {
  const analytics = readAnalytics();
  analytics.messages += 1;
  return writeAnalytics(analytics);
};

export const getAnalytics = () => readAnalytics();
