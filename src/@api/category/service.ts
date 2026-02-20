import { toQueryString } from '@/lib/utils';
import { isrFetch } from 'src/lib/fetcher.server';
import {
    ICategory,
    ICategoryFilter,
    IGetCategoriesResponse,
} from './interfaces';

/**
 * Retrieve a page of categories from the API. Accepts an optional filter
 * object containing page/limit and any other supported query params.
 */
export async function getCategories(
    filter: ICategoryFilter = {},
): Promise<IGetCategoriesResponse> {
    const { page = 1, limit = 10, ...rest } = filter;
    const qs = toQueryString({ page, limit, ...rest });
    return isrFetch<IGetCategoriesResponse>(
        `/api/v1/web/categories?${qs}`,
    );
}

/**
 * Fetch a single category by its ID (or slug).
 */
export async function getCategory(id: string): Promise<ICategory> {
    return isrFetch<ICategory>(
        `/api/v1/web/categories/${encodeURIComponent(id)}`,
    );
}
