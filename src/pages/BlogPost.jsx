import { useParams, Link } from 'react-router-dom'
import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '../i18n/LanguageContext'

export default function BlogPost() {
  const { slug } = useParams()
  const { t, langPrefix } = useLanguage()

  const posts = t('blog.posts')
  const post = posts.find((p) => p.slug === slug)
  const content = t(`blogContent.${slug}`)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  if (!post || !Array.isArray(content)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream pt-20">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-navy mb-4">{t('blogPost.notFound')}</h1>
          <Link to={`${langPrefix}/`} className="text-gold-dark font-semibold hover:underline">
            &larr; {t('blogPost.backHome')}
          </Link>
        </div>
      </div>
    )
  }

  return (
    <article className="bg-cream min-h-screen pt-32 pb-20">
      <div className="max-w-3xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <Link
            to={`${langPrefix}/`}
            className="inline-flex items-center gap-2 text-gold-dark text-sm font-semibold tracking-widest uppercase hover:text-gold transition-colors duration-300 mb-12"
          >
            &larr; {t('blogPost.backInsights')}
          </Link>
        </motion.div>

        <motion.header
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-14"
        >
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-5">
            {post.date}
          </p>
          <h1
            className="text-3xl md:text-5xl font-bold text-navy leading-tight"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            {post.title}
          </h1>
        </motion.header>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="space-y-6"
        >
          {content.map((block, i) => {
            switch (block.type) {
              case 'p':
                return (
                  <p key={i} className="text-navy/70 text-lg leading-relaxed">
                    {block.text}
                  </p>
                )
              case 'h2':
                return (
                  <h2
                    key={i}
                    className="text-2xl md:text-3xl font-bold text-navy mt-12 mb-4"
                    style={{ fontFamily: 'var(--font-serif)' }}
                  >
                    {block.text}
                  </h2>
                )
              case 'h3':
                return (
                  <h3
                    key={i}
                    className="text-xl font-bold text-navy mt-8 mb-2"
                    style={{ fontFamily: 'var(--font-serif)' }}
                  >
                    {block.text}
                  </h3>
                )
              case 'quote':
                return (
                  <blockquote
                    key={i}
                    className="border-l-4 border-gold pl-6 py-2 my-8 text-navy/60 text-lg italic leading-relaxed"
                  >
                    {block.text}
                  </blockquote>
                )
              case 'list':
                return (
                  <ul key={i} className="list-disc pl-6 space-y-3">
                    {block.items.map((item, j) => (
                      <li key={j} className="text-navy/70 text-lg leading-relaxed">
                        {item}
                      </li>
                    ))}
                  </ul>
                )
              default:
                return null
            }
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20 pt-12 border-t border-navy/10"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <Link
              to={`${langPrefix}/`}
              className="text-gold-dark text-sm font-semibold tracking-widest uppercase hover:text-gold transition-colors duration-300"
            >
              &larr; {t('blogPost.backInsights')}
            </Link>
            <a
              href={`${langPrefix}/#contact`}
              className="px-8 py-3 bg-gold text-navy text-xs font-semibold tracking-widest uppercase hover:bg-gold-dark transition-all duration-300"
            >
              {t('blogPost.getInTouch')}
            </a>
          </div>
        </motion.div>
      </div>
    </article>
  )
}
