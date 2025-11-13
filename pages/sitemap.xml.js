const Sitemap = () => {}

export async function getServerSideProps({ req, res }) {
  // Auto-detect website URL from request
  const protocol = req.headers['x-forwarded-proto'] || 'http'
  const host = req.headers.host
  const baseUrl = `${protocol}://${host}`
  
  const staticPages = [
    '',
    '/tool',
    '/docs',
    '/dashboard',
    '/generate',
    '/privacy',
    '/terms',
    '/contact'
  ]

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticPages.map((page) => `
    <url>
      <loc>${baseUrl}${page}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>${page === '' ? 'daily' : 'weekly'}</changefreq>
      <priority>${page === '' ? '1.0' : page === '/docs' ? '0.9' : '0.8'}</priority>
    </url>
  `).join('')}
</urlset>`

  res.setHeader('Content-Type', 'text/xml')
  res.write(sitemap)
  res.end()

  return {
    props: {},
  }
}

export default Sitemap
