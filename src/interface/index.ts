// Common API types used across multiple endpoints.  All interface names
// begin with `I` per project convention.

/**
 * Meta information present on most paginated responses coming from the
 * backend. Fields may vary but the properties shown here are the ones returned
 * by the sample response the user provided.
 */
export interface IBaseMeta {
    total?: number;
    page?: number;
    limit?: number;
    skip?: number;
    [key: string]: any;
}

/**
 * Wrapper for all API responses.  The generic parameter `T` represents the
 * shape of the `data` property returned by a particular endpoint.
 */
export interface IBaseResponse<T> {
    success: boolean;
    statusCode: number;
    message: string;
    meta: IBaseMeta;
    data: T;
}

/**
 * Base filtering options that can be sent to list endpoints.  Individual APIs
 * may extend this with more specific fields (for example, adding `categoryId`
 * or `tag`).
 *
 * `page` and `limit` are the most common properties; additional properties are
 * allowed via index signature.
 */
export interface IBaseFilter {
    page?: number;
    limit?: number;
    sort?: string;
    [key: string]: unknown;
}
