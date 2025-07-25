export const GA_TRACKING_ID = 'G-41DFW8KYMT';

export const pageview = (url) => {
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  });
};