import { genPageMetadata } from 'app/seo'
import { getAllPosts } from '@/lib/blog-data'
import ListLayout from '@/layouts/ListLayoutWithTags'

const POSTS_PER_PAGE = 5

export const metadata = genPageMetadata({ title: 'Blog' })

export default async function BlogPage() {
  const posts = getAllPosts().map((post) => ({
    slug: post.slug,
    date: post.date,
    title: post.title,
    summary: post.summary,
    tags: post.tags,
    language: 'en',
    draft: post.draft,
    path: `blog/${post.slug}`,
  }))

  const pageNumber = 1
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE)
  const initialDisplayPosts = posts.slice(0, POSTS_PER_PAGE * pageNumber)
  const pagination = {
    currentPage: pageNumber,
    totalPages: totalPages,
  }

  return (
    <ListLayout
      posts={posts}
      initialDisplayPosts={initialDisplayPosts}
      pagination={pagination}
      title="All Posts"
    />
  )
}
