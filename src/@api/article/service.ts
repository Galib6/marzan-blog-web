import { toQueryString } from '@/lib/utils';
import { isrFetch } from 'src/lib/fetcher.server';
import { IArticle, IArticleFilter, IGetArticlesResponse } from './interfaces';


/**
 * Retrieve a page of articles from the API.  Accepts an optional filter object
 * which currently understands `page` and `limit` but may be extended later.
 */
export async function getArticles(
  filter: IArticleFilter = {},
): Promise<IGetArticlesResponse> {
  const { page = 1, limit = 10, ...rest } = filter;
  const qs = toQueryString({ page, limit, ...rest });
  return isrFetch<IGetArticlesResponse>(`/api/v1/web/articles?${qs}`);
}

/**
 * Load a single article by id (or slug, depending on the API).
 */
export async function getArticle(id: string): Promise<IArticle> {
  return isrFetch<IArticle>(`/api/v1/web/articles/${encodeURIComponent(id)}`);
}
