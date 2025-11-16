import { getAllPosts } from '@/lib/blog-data'
import Main from './Main'

export default async function Page() {
  const posts = getAllPosts().map((post) => ({
    slug: post.slug,
    date: post.date,
    title: post.title,
    summary: post.summary,
    tags: post.tags,
    language: 'en',
    draft: post.draft,
  }))
  return <Main posts={posts} />
}
