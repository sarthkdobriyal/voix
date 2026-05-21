/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://getvoix.com',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
      {
        userAgent: '*',
        disallow: [
          '/api/',
          '/dashboard/',
          '/exercises/',
          '/speaking/',
          '/mock-exam/',
          '/login',
        ],
      },
    ],
    additionalSitemaps: ['https://getvoix.com/sitemap.xml'],
  },
  exclude: [
    '/dashboard',
    '/dashboard/*',
    '/exercises/*',
    '/speaking/*',
    '/mock-exam',
    '/login',
    '/api/*',
  ],
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 5000,
  transform: async (config, path) => {
    const priorities = {
      '/': 1.0,
      '/levels': 0.9,
      '/level-test': 0.9,
      '/blog': 0.8,
    }
    return {
      loc: path,
      changefreq: config.changefreq,
      priority: priorities[path] ?? config.priority,
      lastmod: new Date().toISOString(),
    }
  },
}
