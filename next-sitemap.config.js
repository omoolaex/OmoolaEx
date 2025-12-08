/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://omoolaex.com.ng',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 7000,
  exclude: [
    '/server-sitemap.xml', 
    '/it-audit/audit', 
    '/it-audit/audit/result/*',
    '/api/sitemap',
  ],
  additionalSitemaps: ['https://omoolaex.com.ng/api/sitemap'],
  robotsTxtOptions: {
    policies: [{ userAgent: '*', allow: '/' }],
  },
};
