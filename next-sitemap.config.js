/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://omoolaex.com.ng',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  exclude: ['/server-sitemap.xml'],
  robotsTxtOptions: {
    policies: [{ userAgent: '*', allow: '/' }],
  },
};