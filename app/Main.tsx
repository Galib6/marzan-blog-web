import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import topics from '@/data/topicsData'
import NewsletterForm from 'pliny/ui/NewsletterForm'
import { formatDate } from 'pliny/utils/formatDate'

const MAX_DISPLAY = 5

function estimateReadMinutes(text = '') {
  const words = text.trim().split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(words / 200))
}

export default function Home({ posts }) {
  const featured = posts.slice(0, 4)

  return (
    <>
      <div className="space-y-6 pt-6 pb-8">
        <div className="space-y-2">
          <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 dark:text-gray-100">
            Latest
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            {siteMetadata.description}
          </p>
        </div>

        {/* Main area with featured sidebar (responsive) */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* Main column */}
          <main className="lg:col-span-8">
            <ul className="space-y-16">
              {!posts.length && 'No posts found.'}
              {posts.slice(0, MAX_DISPLAY).map((post) => {
                const { slug, date, title, summary, tags } = post
                const mins = estimateReadMinutes(summary)
                return (
                  <li key={slug}>
                    <article className="group">
                      <header className="space-y-4">
                        <h2 className="text-3xl leading-tight font-extrabold tracking-tight md:text-4xl">
                          <Link href={`/blog/${slug}`} className="text-gray-900 dark:text-gray-100">
                            {title}
                          </Link>
                        </h2>
                        <p className="max-w-3xl text-lg text-gray-600 dark:text-gray-400">
                          {summary}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-gray-400">
                          <time>{formatDate(date, siteMetadata.locale)}</time>
                          <span>—</span>
                          <span>{mins} MIN READ</span>
                          <svg
                            className="h-4 w-4 text-gray-300"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.785.57-1.84-.197-1.54-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
                          </svg>
                        </div>
                        <div className="mt-3 flex flex-wrap">
                          {tags.map((tag) => (
                            <Tag key={tag} text={tag} />
                          ))}
                        </div>
                      </header>

                      <div className="mt-6">
                        <Link
                          href={`/blog/${slug}`}
                          className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 font-medium"
                          aria-label={`Read more: "${title}"`}
                        >
                          Read more &rarr;
                        </Link>
                      </div>
                    </article>
                  </li>
                )
              })}
            </ul>
          </main>

          {/* Sidebar: Featured (on mobile this appears after main) */}
          <aside className="lg:col-span-4">
            <div className="mb-6 flex items-center gap-4">
              <h3 className="text-xs font-semibold tracking-widest text-gray-500 uppercase">
                Featured
              </h3>
              <div className="h-px flex-1 bg-gray-200 dark:bg-gray-800" />
            </div>

            <div className="space-y-6">
              {featured.map((post) => {
                const mins = estimateReadMinutes(post.summary)
                return (
                  <article key={post.slug} className="group">
                    <h4 className="text-base font-semibold text-gray-900 dark:text-gray-100">
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </h4>
                    <p className="mt-2 hidden text-sm text-gray-500 sm:block dark:text-gray-400">
                      {post.summary}
                    </p>
                    <div className="mt-2 text-xs text-gray-400">
                      <time>{formatDate(post.date, siteMetadata.locale)}</time> — {mins} MIN READ
                    </div>
                  </article>
                )
              })}
            </div>

            {/* Topics list (demo data) */}
            <div className="mt-8">
              <h3 className="text-xs font-semibold tracking-widest text-gray-500 uppercase">
                Topics
              </h3>
              <div className="mt-3 mb-4 h-px flex-1 bg-gray-200 dark:bg-gray-800" />
              <ul className="space-y-3">
                {topics.map((t) => (
                  <li key={t.name} className="flex items-center justify-between">
                    <div className="text-sm text-gray-900 dark:text-gray-100">{t.name}</div>
                    <div className="rounded-full border border-gray-200 bg-gray-50 px-2 py-0.5 text-xs text-gray-500 dark:border-gray-700 dark:bg-gray-900">
                      {t.count} {t.count === 1 ? 'issue' : 'issues'}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>

      {posts.length > MAX_DISPLAY && (
        <div className="flex justify-end text-base leading-6 font-medium">
          <Link
            href="/blog"
            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            aria-label="All posts"
          >
            All Posts &rarr;
          </Link>
        </div>
      )}

      {siteMetadata.newsletter?.provider && (
        <div className="flex items-center justify-center pt-4">
          <NewsletterForm />
        </div>
      )}
    </>
  )
}
