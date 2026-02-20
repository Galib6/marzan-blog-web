import { IBaseFilter, IBaseResponse } from "src/interface";


/**
 * Represents a category item returned by the API. Fields are taken from the
 * example response; update as needed when your backend schema changes.
 */
export interface ICategory {
    id: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    createdById: string;
    updatedById: string | null;
    title: string;
    description: string;
    slug: string;
    orderPriority: number;
    [key: string]: unknown;
}

/**
 * Response type for the categories list endpoint.
 */
export type IGetCategoriesResponse = IBaseResponse<ICategory[]>;

/**
 * Filter options for category list operations.  Currently just inherits the
 * base filter but may later include category‑specific criteria.
 */
export interface ICategoryFilter extends IBaseFilter { }
