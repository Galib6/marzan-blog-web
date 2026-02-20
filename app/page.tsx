import { getArticles } from 'src/@api/article/service'
import Main from '../src/components/Main'

const POSTS_PER_PAGE = 10

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>
}) {
  const params = await searchParams
  const currentPage = Math.max(1, parseInt(params.page ?? '1', 10) || 1)

  const res = await getArticles({ page: currentPage, limit: POSTS_PER_PAGE })
  const posts = res.data ?? []
  const total = res.meta?.total ?? 0
  const totalPages = Math.ceil(total / POSTS_PER_PAGE)

  return (
    <Main
      posts={posts}
      pagination={{ currentPage, totalPages }}
    />
  )
}
